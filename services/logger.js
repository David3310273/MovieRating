var log4js = require('log4js');
var configuration = require('../config').logConfigurations;

//singleton way to achieve logger
function Logger()
{
    this._errorLogger = null;
    this._accessLogger = null;
    this._debugLogger = null;

    function getInstance(type)
    {
        log4js.configure(configuration);

        switch (type) {
            case "error": {
                if (!this._errorLogger) {
                    this._errorLogger = log4js.getLogger(type);
                }

                return this._errorLogger;
            };

            case "info": {
                if (!this._accessLogger) {
                    this._accessLogger = log4js.getLogger(type);
                }

                return this._accessLogger;
            };

            case "debug": {
                if (!this._debugLogger) {
                    this._debugLogger = log4js.getLogger(type);
                }

                return this._debugLogger;
            };
        } 
    }

    return {
        error: function(info) {
            getInstance("error").error(info);
        },

        info: function(info) {
            getInstance("info").info(info);
        },

        debug: function(info) {
            getInstance("debug").debug(info);
        }
    }
}

module.exports = Logger();