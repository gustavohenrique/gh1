var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
var url = require('url');
var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
var validUrl = require('valid-url');
var Promise = require('bluebird');

(function () {

    function isValid (uri) {
        var blacklist = ['gh1.co', 'localhost'];
        if (validUrl.isUri(uri)) {
            var parts = url.parse(uri, true);
            for (var i = 0; i < blacklist.length; i++) {
                if (parts.hostname.indexOf(blacklist[i]) >= 0) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function scrapAndAddTitle (site, uri) {
        // return new Promise(function (resolve, reject) {
            var client = http;
            var parts = url.parse(uri, true);
            if (parts.protocol === 'https:') {
                client = https;
            }

            client.get(uri, function (response) {
                if (response.statusCode !== 200) {
                    // reject(new Error('URL not found. HTTP status is ' + response.statusCode));
                    return;
                }

                response.on('data', function (chunk) {
                    var str = chunk.toString();
                    var match = re.exec(str);
                    if (match && match[2]) {
                        site.title = match[2];
                    }
                });

                response.on('end', function () {
                    if (site.title) {
                        // resolve(site.save());
                        site.save();
                    }
                    // else {
                    //    resolve(site);
                    // }
                });
                // response.on('error', function () {
                    // reject(new Error('response error'));
                // });
            });
        //});
    }

    module.exports = {
        isValid: isValid,
        scrapAndAddTitle: scrapAndAddTitle
    };

})();