// var User = require('./User');
var SiteService = require('./SiteService');

(function () {

    function createServices (models) {
        return {
            Site: new SiteService(models)
        }
    }

    module.exports = createServices;

})();