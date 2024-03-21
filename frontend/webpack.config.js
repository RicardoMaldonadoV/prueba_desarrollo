//We add a const "path" to identify where we are going work
const path = require('path');
//instance references for plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Object where we add the configuration for our project
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath:"/"
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        //Add aliases for managing directory paths
        alias: {
            '@styles' : path.resolve(__dirname, 'src/styles/'),
        }
    },
    module: {
        rules: [
            {
                // This is repeated for each package, this is from Babel, then there is the html one and finally the css one
                // The elements to be worked with are specified
                test: /\.(js|jsx)$/,
                //What you don't want the WP to read is excluded
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test:/\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            //images managing in wp
            {
                test:/\.(png|jpg|ico)$/,
                type: 'asset'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: './index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
    }    
}