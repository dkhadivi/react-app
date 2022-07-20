const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
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
        context: path.resolve(__dirname, 'src'),
        entry: {
            app: './index.js'
        },
        mode: mode,
        devtool: false,
        output: {
            path: path.resolve(__dirname, deployFolder),
            filename: 'assets/js/[name].bundle.js',
            publicPath: '/',
        },
        devServer: {
            static: {
                directory: path.join(__dirname, deployFolder),
            },
            compress: true,
            port: 4000,
            hot: true
        },
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
                },
                {
                    // Emit all the fonts to the "/assets/fonts/Roboto" folder within the "outputPath" folder.
                    test: /\.(woff(2)?|ttf|eot|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: './assets/fonts/Roboto/[name][ext]',
                        outputPath: '.',
                    },
                },
                {
                    // Media assets.
                    // Emit all the images preserving the folder source image folder structure.
                    test: /\.(png|jpe?g|gif|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: (name) => {
                            // Remove the last segment in the path.
                            const path = name.filename.split("/").slice(0, -1).join("/");
                            return `${path}/[name][ext]`;
                        },
                    },
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './index.html',
                filename: 'index.html',
                favicon: './favicon.ico',
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            })
        ],
        resolve: {
            extensions: [".js", ".jsx"],
        }
    };
};