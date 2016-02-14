var validUrl = require('valid-url');

(function () {

    function SiteService (models) {

        this.find = function (req, res) {
            var query = {
                order: [
                    ['id', 'ASC']
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

            var page = req.params.page || 1;
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
                    sites: sites
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

            models.Site.findOrCreate({
                where: { longUrl: longUrl },
                defaults: {
                    longUrl: longUrl,
                    code: code
                }
            })
            .then(function (result) {
                var status = result[0].$options.isNewRecord ? 201 : 200;
                res.send(status, {
                    site: result[0].dataValues
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

            models.Site.update({
                title: body.title,
                hits: body.hits,
                likes: body.likes,
                isPublic: body.isPublic,
                tags: body.tags
            }, {
                fields: ['title', 'hits', 'likes', 'isPublic', 'tags'],
                where: {
                    id: id
                },
                returning: true
            })
            .then(function (result) {
                return result[1][0].dataValues;
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