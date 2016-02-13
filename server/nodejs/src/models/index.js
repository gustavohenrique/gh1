// var User = require('./User');
var SiteModel = require('./Site');

(function () {

    function createModels (db, Sequelize) {
        var self = this;
        // this.User = new User({
        //     db: db,
        //     Sequelize: Sequelize,
        //     models: this
        // });

        self.Site = new SiteModel({
            db: db,
            Sequelize: Sequelize
        });

        // this.User.sync();
        self.Site.sync();

        return self;

    }

    module.exports = createModels;

})();