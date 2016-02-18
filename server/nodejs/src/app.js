var restify = require('restify');
var jwt = require('jsonwebtoken');
var route = require('restify-route');
var Sequelize = require('sequelize');
var createModels = require('./models');
var createServices = require('./services');

var databaseUrl = process.env.DATABASE_URL;
var db = new Sequelize(databaseUrl, { logging: false, maxConnections: 5 });
var models = createModels(db, Sequelize);
var services = createServices(models);

var DEFAULT_URL = process.env.GH1_DEFAULT_URL || 'https://gustavohenrique.github.io/gh1';
var JWT_SECRET = 'secret';

function createServer() {
    var siteService = services.Site;
    var userService = services.User;

    var server = restify.createServer({ name: 'GH1' });

    server
        .use(restify.bodyParser())
        .use(restify.gzipResponse())
        .use(restify.CORS({ credentials: true }))
        .use(restify.queryParser())
        .use(restify.fullResponse())
        .use(restify.throttle({
            burst: 100,
            rate: 50,
            ip: true
        }));

    route
        .use(server)
        .jwt({
            secretOrPrivateKey: JWT_SECRET,
            allwaysVerifyAuthentication: false,
            callback: function (req, next, decoded) {
                if (decoded) {
                    req.user = decoded;
                    next();
                }
                else {
                    next(new restify.NotAuthorizedError('Invalid token.'));
                }
            }
        })

        .set('/users/authenticate', 'POST', authenticate)
        .set('/users', 'POST', userService.create)

        .set('/sites', 'GET', siteService.find)
        .set('/sites', 'POST', siteService.create)
        .set('/sites/:id', 'PUT', siteService.update, true)
        .set('/sites/:id', 'DEL', siteService.destroy)

        .set('/:code', 'GET', function (req, res, next) {
            if (req.params.code) {
                siteService.redirect(req, res, next);
            }
            else {
                res.redirect(301, DEFAULT_URL, next);
            }
        });

    function authenticate (req, res, next) {
        userService.authenticate(req, res, next).then(function () {
            if (res.statusCode === 200) {
                var token = jwt.sign({ id: req.user.id, email: req.user.email }, JWT_SECRET);
				var user = req.user;
				user.token = token;
                res.send({ user: user });
            }
            next();
        });
    }

    return server;
}

module.exports = {
    db: db,
    models: models,
    createServer: createServer
}
