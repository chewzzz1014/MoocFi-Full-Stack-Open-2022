// define functionality of webpack
const path = require('path')

const config = () => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        // webpack-dev-server config
        devServer: {
          static: path.resolve(__dirname, 'build'),
          compress: true,
          port: 3000  
        },
        // loaders to inform webpack of files need to be processed before they're bundled
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        }
    }
}

module.exports = config