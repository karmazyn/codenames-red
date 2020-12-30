const path = require('path');

module.exports = {
    entry: "./src/app/Main.jsx",
    output: {
        path: path.resolve(__dirname,'build/static/dist'),
        filename: "react-app.js"
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader"
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};