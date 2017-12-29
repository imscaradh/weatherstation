const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {AureliaPlugin} = require('aurelia-webpack-plugin')
const {TsConfigPathsPlugin, CheckerPlugin} = require('awesome-typescript-loader')

module.exports = (env) => {
    let config = {
        entry: {
            'app': 'aurelia-bootstrapper',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].bundle.js',
            sourceMapFilename: '[name].[hash].bundle.map',
            chunkFilename: '[name].[hash].chunk.js'
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['src', 'node_modules'],
        },
        module: {
            rules: [
                {test: /\.ts$/, loader: 'awesome-typescript-loader'},
                {test: /\.html$/, loader: 'html-loader'},
                {test: /\.json$/, loader: 'json-loader'},
                {test: /\.scss$/, loader: 'css-loader!sass-loader'},
                {test: /\.css$/, loader: 'css-loader'},
                {test: /\.(jpg|png|svg)$/, loader: 'file-loader'},
                {test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'file-loader'}
            ]
        },
        plugins: [
            new AureliaPlugin(),
            new TsConfigPathsPlugin(),
            new CheckerPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                Popper: 'popper.js',
                'window.jQuery': 'jquery',
            })
        ]
    }

    if (env === 'prod') {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin())
        config.plugins.push(new CopyWebpackPlugin([
            {from: 'static', to: 'static'}
        ]))
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }))
    } else if (env === 'dev') {
        config.devtool = 'cheap-module-eval-source-map'
        config.devServer = {
            stats: 'errors-only'
        }
    }

    return config
}
