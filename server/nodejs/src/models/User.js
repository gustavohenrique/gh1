var bcrypt = require('bcrypt');

(function () {

    function F (args) {
        var db = args.db;
        var Sequelize = args.Sequelize;

        var User = db.define('user', {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            hooks: {
                beforeCreate: hashPassword,
                beforeUpdate: function (instance) {
                    if (instance.changed('password')) {
                        hashPassword(instance);
                    }
                }
            },
            instanceMethods: {
                isHashPasswordEqualsTo: compareHashPassword
            }
        });

        return User;
    }

    function hashPassword (instance) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
    }

    function compareHashPassword (plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    }

    module.exports = F;

})();