// define functionality of webpack
const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv.mode', argv.mode)
    
    const backend_url = argv.mode === 'production' ? 'https://notes2023.fly.dev/api/notes' : 'http://localhost:3001/notes' 

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
        // generate source map for the bundle
        // to map errors that occur during execution of bundle to the corresponding part in original source code
        devtool: 'source-map',
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
        },
        plugins: [
            // define global default constant to be used in bundled code
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config