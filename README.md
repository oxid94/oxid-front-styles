# Oxid Front Styles

The package is based on Webpack technology and is used to compile assets

## Installation

It is necessary to install the npm package by terminal
```sh
npm i --save-dev git+https://github.com/oxid94/oxid-front-styles.git
```

When installing this package, it is recommended to copy the configuration of the starter-kit
```sh
cp node_modules/oxid-front-styles/starter-kit/normal.js index.js
```

Once this file has been copied to the root of the project, it is necessary to replace each of the lines that appear below, adapting them to the corresponding project.

```sh
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
        path: path.resolve(__dirname, '/source/assets/scss/**/*.scss'),
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
```
> Note: 
> `entry` here goes all the files to compile (SCSS and JS), you can import SCSS files inside JS
> `output > path` the destination path of compiled files
> `output > filename` the configuration of the path and names of JS files
> `scss > path` the path to lintern all scss files
> `img > from` the path of original images
> `img > to` the destination path of compresed images
> `browsersSync` requires a configuration object of [browsersSync]





It is necessary to include these 2 lines in the package.json of your project in order to compile
```sh
[…]
"scripts": {
    […]
    "build": "webpack --env=development --progress --config index.js",
    "build:prod": "webpack --env=production --progress --config index.js",
    […]
},
[…]
```
> Note: 
> `npm run build` have a watch files system
> `npm run build:prod` have a minifyed files system and don't watch files


[browsersSync]: https://browsersync.io/
