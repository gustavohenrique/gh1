(function () {

    function F (args) {
        var db = args.db;
        var Sequelize = args.Sequelize;

        var Site = db.define('site', {
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Untitled'
            },
            longUrl: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            lastAccessAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            hits: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            isPublic: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                defaultValue: []
            }
        }, {
            paranoid: false,
            getterMethods: {
                shortUrl: function () {
                    return 'http://gh1.co/' + this.code;
                }
            },
            classMethods: {
                getTags: function () {
                    return db.query('select distinct unnest(tags) as tag from sites order by 1', { type: Sequelize.QueryTypes.SELECT });
                },
                getTagsByUser: function (user) {
                    return db.query('select distinct unnest(tags) as tag from sites where "userId" = :userId order by 1', { type: Sequelize.QueryTypes.SELECT, replacements: { userId: user.id } });
                }
            }
        });

        return Site;
    }

    module.exports = F;

})();