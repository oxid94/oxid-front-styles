const path = require('path');
const { argv } = require('yargs');

module.exports = function(config , type = 'normal') {

    const isNormal = !!((argv.type && argv.type == 'normal') || argv.normal || type == 'normal');
    const isTemplating = !!((argv.type && argv.type == 'templating') || argv.templating || type == 'templating');

    if (isNormal) {
        return require('./webpack/webpack.config.js')(config);
    }
    
    if (isTemplating) {
        return require('./webpack/templating.config.js')(config);
    }
}