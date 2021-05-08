const path = require('path');
const { argv } = require('yargs');

const generalConfig = {
    entry: {
        'main': path.resolve(__dirname, 'source/assets/scripts/main.js'),
        'style': path.resolve(__dirname, 'source/assets/scss/style.scss'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    scss: {
        lint: {
            path: path.resolve(__dirname, '/source/assets/scss/**/*.scss'),
        }
    },
    img: {
        from: path.join(__dirname, 'source/assets/img/'),
        to: path.join(__dirname, 'dist/img')
    },
    browsersSync: [
        {
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: path.resolve(__dirname, 'dist')
            },
            proxy: 'http://localhost:3000/'
        }, {
            reload: false
        }
    ],
}



// module.exports = require('./webpack/webpack.config.js')(generalConfig);

// const isNormal = !!((argv.type && argv.type == 'normal') || argv.normal);
// const isTemplating = !!((argv.type && argv.type == 'templating') || argv.templating);

// if (isNormal) {
//     require('./webpack/webpack.config.js')(generalConfig);
// }

// if (isTemplating) {
//     require('./webpack/templating.config.js')(generalConfig);
// }

module.exports = function(config = generalConfig , type = 'normal') {

    const isNormal = !!((argv.type && argv.type == 'normal') || argv.normal || type == 'normal');
    const isTemplating = !!((argv.type && argv.type == 'templating') || argv.templating || type == 'templating');

    if (isNormal) {
        require('./webpack/webpack.config.js')(config);
    }
    
    if (isTemplating) {
        require('./webpack/templating.config.js')(config);
    }
}