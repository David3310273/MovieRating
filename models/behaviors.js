var log4js = require("log4js")
var configuration = require('../config').logConfigurations;
log4js.configure(configuration);

var utils = {
    genres: (info) => {
        const logger = log4js.getLogger("genres");
        logger.info(info)
    },

    movies: (info) => {
        const logger = log4js.getLogger("movies");
        logger.info(info);
    },

    ratings: (info) => {
        const logger = log4js.getLogger("ratings");
        logger.info(info);
    }
}

module.exports = utils