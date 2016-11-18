var q = require('q');
var twitter = require('twit');
var configuration = require('./configuration');

var connectWithToken = function () {
    var connectionDefer = q.defer();

    configuration.access.getToken().then(function (token) {
        var twit = new twitter(token);

        connectionDefer.resolve(twit);

    }).catch(function (err) {
        connectionDefer.reject(err);
    });

    return connectionDefer.promise;
};

exports = module.exports = connectWithToken();