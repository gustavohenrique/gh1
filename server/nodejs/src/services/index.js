// var User = require('./User');
var SiteService = require('./SiteService');
var UserService = require('./UserService');

(function () {

    function createServices (models) {
        return {
            Site: new SiteService(models),
            User: new UserService(models)
        };
    }

    module.exports = createServices;

})();