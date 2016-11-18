var fs = require('fs');
var path = require('path');
var q = require('q');

var configuration = {
    tokenLocation: Path.join(__dirname, 'token.json'),

    _loadToken: function (callback) {
        return fs.readfile(configuration.tokenLocation, {
            encoding: 'utf8'
        }, callback);
    },
    
    _loadTokenSync: function () {
        return fs.readFileSync(configuration.tokenLocation, {encoding: 'utf8'});
    },
    
    _getToken: function () {
        try {
            return JSON.parse(configuration._loadTokenSync());
        } catch (error) {
            return {};
        }
    },
    
    token: null,
    
    access: {
        _isTokenVerified: function (token) { // TODO Verify token
            return true;
        }
    },
    
    getToken: function () {
        var deferred = Q.defer();
        
        if (configuration.token !== null) {
            return deferred.resolve(token);
        }
        
        var tokenData = configuration._getToken();
        
        deferred.resolve(configuration.token)
        
    },
    
    setToken: function (token) {
        var deferred = q.defer();
        
        if (configuration.access._isTokenVerified(token)) {
            if (!fs.existsSync(configuration.tokenLocation)) {
                fs.writeFileSync(configuration.tokenLocation, '{}');
            }
            configuration.token = token;
            
            var tokenData = configuration._getToken();
            
        }
    }
    
};

exports = module.exports = configuration;