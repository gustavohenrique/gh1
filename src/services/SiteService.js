var validUrl = require('valid-url');

(function () {

    function SiteService (models) {

        this.find = function (req, res) {
            var query = {
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {isPublic: true}
            };

            var fields = req.params.fields;
            if (fields) {
                query.attributes = fields.split(',');
            }

            var perPage = req.params.perPage || 10;
            if (perPage > 0) {
                query.limit = perPage;
            }

            var page = parseInt(req.params.page) || 1;
            var offset = (page - 1) * perPage;
            if (offset > 0) {
                query.offset = offset;
            }

            var sort = req.params.sort || '';
            var fieldName = sort.replace('-', '');
            if (fieldName) {
                var order = sort.startsWith('-') ? 'DESC' : 'ASC';
                query.order = [ [fieldName, order] ];
            }

            var tag = req.params.tag;
            if (tag) {
                query.where.tags = {
                    $contains: [ tag ]
                };
            }

            var user = req.user;
            if (user && user.id) {
                delete query.where.isPublic;
            }

            models.Site.findAll(query).then(function (sites) {
                res.send({
                    sites: sites,
                    current: page,
                    previous: (page <= 1) ? 1 : page - 1,
                    next: page + 1
                });
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

        this.redirect = function (req, res, next) {
            var code = req.params.code;
            
            models.Site.findOne({ where: { code: code }}).then(function (site) {
                site.increment('hits');
                res.redirect(301, site.longUrl, next);
                return next();
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

        this.create = function (req, res) {
            var body = req.body || {};
            var longUrl = body.longUrl || '';

            if (! validUrl.isUri(longUrl)) {
                res.send(400, {
                    errors: ['invalid uri']
                });
                return;
            }

            var code = Math.random().toString(36).substr(2, 5);

            var status = 200;

            models.Site.findOne({
                where: { longUrl: longUrl }
            })
            .then(function (result) {
                if (! result) {
                    return models.Site.create({
                        longUrl: longUrl,
                        code: code
                    });
                }
                return result;
            })
            .then(function (site) {
                status = site.$options.isNewRecord ? 201 : 200;

                var userId = body.userId;
                if (userId > 0) {
                    return site.setUser(userId);
                }
                return site;
            })
            .then(function (site) {
                res.send(status, {
                    site: site.toJSON()
                });
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

        this.update = function (req, res) {
            var id = req.params.id;
            if (! id) {
                res.send(400, {
                    errors: ['no id specified']
                });
                return;
            }

            var body = req.body;

            var fields = {
                title: body.title,
                hits: body.hits,
                likes: body.likes,
                isPublic: body.isPublic,
                tags: body.tags
            };

            models.Site.update(fields, {
                fields: Object.keys(fields),
                where: {
                    id: id
                },
                returning: true
            })
            .then(function (result) {
                return result[1][0].toJSON();
            })
            .then(function (site) {
                res.send(200, {
                    site: site
                });
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

        this.destroy = function (req, res) {
            var id = req.params.id;
            if (! id) {
                res.send(400, {
                    errors: ['no id specified']
                });
                return;
            }

            var site = null;
            models.Site.findById(id).then(function (result) {
                site = result;
                return site.destroy();
            })
            .then(function () {
                res.send(200, {
                    site: site
                });
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

    }

    // function generateCode () {
    //     var i = new Date().getTime();
    //     var digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    //     var factor = 0;
    //     var result = null;

    //     while (true) {
    //         factor += 1;
    //         result = Math.pow(36, factor);
    //         if (i < result) {
    //             factor -= 1;
    //             break;
    //         }
    //     }
    //     var base36 = [];

    //     while (factor >= 0) {
    //         var j = Math.pow(36, factor);
    //         base36.push(digits[parseInt(i / j)]);
    //         i = i % j;
    //         factor -= 1;
    //     }
    //     return base36.join('').substr(0,5);
    // }


    module.exports = SiteService;

})();