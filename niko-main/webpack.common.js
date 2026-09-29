const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        'customizer': "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "assets")
    },

    plugins: [
        new Dotenv()
    ]
}