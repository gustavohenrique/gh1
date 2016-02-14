(function () {

    function UserService (models) {

        this.create = function (req, res) {
            var body = req.body || {};

            models.User.create({
                email: body.email,
                password: body.password
            })
            .then(function (user) {
                res.send(201, {
                    user: {
                        id: user.id,
                        email: user.email,
                        isAuthenticated: user.isHashPasswordEqualsTo(body.password)
                    }
                });
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

        this.authenticate = function (req, res, next) {
            var email = req.body.email;
            var password = req.body.password;
            if (! email || ! password) {
                res.send(400, {
                    errors: ['empty email', 'empty password']
                });
                return;
            }

            return models.User.findOne({ where: {
                email: email
            }}).then(function (user) {
                if (user.isHashPasswordEqualsTo(password)) {
                    req.user = {
                        id: user.id,
                        email: user.email
                    };
                    next();
                }
                else {
                    res.send(400, {
                        errors: ['wrong password']
                    });
                }
            })
            .catch(function (err) {
                res.send(400, {
                    errors: [err.message]
                });
            });
        };

    }

    module.exports = UserService;

})();