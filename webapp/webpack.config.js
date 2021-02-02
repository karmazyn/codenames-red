const path = require('path');

module.exports = {
    entry: "./src/app/App.jsx",
    output: {
        path: path.resolve(__dirname,'build/static/dist'),
        filename: "react-app.js"
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }, {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            exclude: /node_modules/,
            type: 'asset/resource'
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};