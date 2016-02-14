var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('password123', salt);
console.log('hash', hash);

var compare = bcrypt.compareSync('password', '$2a$08$.qYPWI7DoF7DzRGuAXzNZejxXnTnut/OJ4iUFj4uZMUebEiTvquGm');
compare = bcrypt.compareSync('password', '$2a$10$mPawUsc3/Rk5Xb4796hUM.msED8R6BlZ.qBx8jcPvkZVjO2FdSmy6');
console.log('compare', compare);
