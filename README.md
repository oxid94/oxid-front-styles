# Oxid Front Styles

El paquete esta basado en la tecnologia Webpack, y esta configurado para tener 2 opciones:
1.- La compilación de assets CSS y JS
El CSS se compila mediante SCSS
El JS se compila con ES6
2.- La generación de maquetas planas, utilizando lo nombrado anteriormente y el HTML se compila con Twig.

## Installation

Es necesario instalar por terminal el paquete de npm
```sh
npm i --save-dev git+https://github.com/oxid94/oxid-front-styles.git
```

Al instalar dicho paquete, es recomendable copiar la configuración del starter-kit
```sh
cp node_modules/oxid-front-styles/starter-kit/[drupal | wordpress | templating].config.js webpack.config.js
```

Una copiado este fichero en la raiz del proyecto, es necesario reemplazar cada una de las lineas que aparecen a continuación, adaptandolas al proyecto correspondiente.

```sh
const generalConfig = {
    entry: {
        'main': './src/assets/scripts/main.js',
        'style': './src/assets/scss/style.scss',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    scss: {
        lint: {
            path: 'src/assets/scss/**/*.scss'
        }
    },
    img: {
        from: path.join(__dirname, '/src/assets/img/'),
        to: path.join(__dirname, '/dist/img')
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
```