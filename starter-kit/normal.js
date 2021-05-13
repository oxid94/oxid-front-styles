const path = require('path');
const generalConfig = {
    entry: {
        'main': path.resolve(__dirname, 'source/assets/scripts/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:3000/dist/',
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
    browsersSync: {
            host: 'localhost',
            port: 3000,
            open: false,
            server: {
                baseDir: ['./dist']
            },
            files: ['./dist/*']
        },
}

module.exports = require('oxid-front-styles')(generalConfig, 'normal');