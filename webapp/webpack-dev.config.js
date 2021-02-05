const path = require('path');
const commonConfig = require("./webpack.config");

module.exports = Object.assign({}, commonConfig, {
    output: {
        path: path.resolve(__dirname, '../build/resources/main/static/dist'),
        filename: "react-app.js"
    },
    mode: "development",
    devServer: {
        port: 9090,
        writeToDisk: true,
        proxy: {
            "/": {
                target: "http://localhost:8080",
                secure: false,
                prependPath: false
            },
        },
    }
});
