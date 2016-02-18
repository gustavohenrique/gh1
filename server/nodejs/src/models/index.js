var User = require('./User');
var Site = require('./Site');

(function () {

    function createModels (db, Sequelize) {
        this.User = new User({
            db: db,
            Sequelize: Sequelize
        });

        this.Site = new Site({
            db: db,
            Sequelize: Sequelize
        });

        this.User.hasMany(this.Site, {as: 'sites', constraints: false});
        this.Site.belongsTo(this.User);

        this.User.sync();
        this.Site.sync();

        return this;

    }

    module.exports = createModels;

})();