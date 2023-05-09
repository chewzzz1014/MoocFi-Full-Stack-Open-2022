// define functionality of webpack
const path = require('path')

const config = () => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        // loaders to inform webpack of files need to be processed before they're bundled
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-react']
                    }
                }
            ]
        }
    }
}

module.exports = config