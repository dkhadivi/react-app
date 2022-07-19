const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = (env, argv) => {
    // The mode is passed in as argument. Default to 'development'.
    const mode = argv.mode || 'development';

    // Define the current environment based on the "mode" parameter.
    const isDevelopment = mode !== 'production';

    // Define the port # based on the environment.
    const port = (mode !== 'production') ? 4100 : 4000;

    // Define the deployment folder based on the environment.
    const deployFolder = (mode !== 'production') ? 'public' : 'dist';

    console.log('\n>>>> Begin ENV');
    console.log('    argv.mode    : ' + mode);
    console.log('    isDevelopment: ' + isDevelopment);
    console.log('    deployFolder : ' + deployFolder);
    console.log('    port         : ' + port);
    console.log('>>>> End ENV\n');

    return {
        mode: mode,
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.(js)x?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        {
                            loader: "css-loader",
                            options: {
                                modules: false,
                            }
                        },
                        // Compiles Sass to CSS
                        {
                            loader: "sass-loader",
                            options: {
                                // Prefer `dart-sass`
                                implementation: require("sass"),
                            },
                        }
                    ],
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            })
        ],
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 4000,
            hot: true
        },
    };
};