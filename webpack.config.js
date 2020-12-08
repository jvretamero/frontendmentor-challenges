const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
    const appArg = process.env.app;

    if (!appArg)
        throw Error("App path not defined");

    const appPath = path.resolve(__dirname, appArg);
    const distPath = path.resolve(__dirname, "dist");

    return {
        mode: "development",
        devtool: false,
        entry: path.resolve(appPath, "app.js"),
        output: {
            path: distPath
        },
        devServer: {
            contentBase: distPath,
            watchContentBase: true
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(appPath, "index.html")
            }),
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        }
    }
};