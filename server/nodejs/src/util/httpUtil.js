var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
var url = require('url');
var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;

(function () {

    function isValid (uri) {
        try {
            url.parse(uri, true);
            return true;
        }
        catch (e) {
            return false;
        }
    }

    function scrapTitleFrom (uri) {
        var client = http;
        var parts = url.parse(uri, true);
        if (parts.protocol === 'https:') {
            client = https;
        }
        client.get(uri, function (response) {
            response.on('data', function (chunk) {
                var str = chunk.toString();
                var match = re.exec(str);
                if (match && match[2]) {
                    return match[2];
                }
            });
            return null;
        });
    }

    module.exports = {
        isValid: isValid,
        scrapTitleFrom: scrapTitleFrom
    };

})();