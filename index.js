var app = require('./src/app');
var port = process.env.GH1_PORT || 5000;
var ip = process.env.GH1_IP || '0.0.0.0';

app.createServer().listen(port, ip, function () {
    console.log('Server is running on http://%s:%s', ip, port);
});
