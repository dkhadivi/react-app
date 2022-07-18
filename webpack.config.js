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
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                }
            ]
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 4000,
        },
    };
};