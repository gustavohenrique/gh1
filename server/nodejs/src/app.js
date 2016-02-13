var restify = require('restify');
var route = require('restify-route');
var Sequelize = require('sequelize');
var createModels = require('./models');
var createServices = require('./services');

var databaseUrl = process.env.DATABASE_URL;
var db = new Sequelize(databaseUrl, { logging: false, maxConnections: 5 });
var models = createModels(db, Sequelize);
var services = createServices(models);

var DEFAULT_URL = process.env.GH1_DEFAULT_URL || 'https://gustavohenrique.github.io/gh1';


function createServer() {
    var siteService = services.Site;

    var server = restify.createServer({ name: 'GH1' });
    server
        .use(restify.fullResponse())
        .use(restify.bodyParser())
        .use(restify.CORS())
        .use(restify.gzipResponse())
        .use(restify.queryParser())
        .use(restify.throttle({
            burst: 100,
            rate: 50,
            ip: true
        }));

    route
        .use(server)
        .set('/sites', 'get', siteService.find)
        .set('/sites', 'post', siteService.create)
        .set('/sites/:id', 'put', siteService.update)
        .set('/sites/:id', 'del', siteService.destroy)
        .set('/:code', 'get', function (req, res, next) {
            if (req.params.code) {
                siteService.redirect(req, res, next);
            }
            else {
                res.redirect(301, DEFAULT_URL, next);
            }
        });

    return server;
}

module.exports = {
    db: db,
    models: models,
    createServer: createServer
}
