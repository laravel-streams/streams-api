const mix = require('laravel-mix');
const path = require('path');

mix
    .ts('resources/ts/index.ts', 'js')
    .webpackConfig(
        function (webpack) {
            return {
                externals: {
                    '@streams/core': ['streams', 'core'],
                    'axios': ['streams', 'core', 'axios'],
                },
                output: {
                    path: path.resolve('./resources/public'),
                    chunkFilename: 'js/chunk.[name].js',
                    library: ['streams', 'api'],
                    publicPath: '/vendor/streams/api/',
                    libraryTarget: 'window',
                }
            };
        }
    )
    .copyDirectory('resources/public', '../../../public/vendor/streams/api')
    .sourceMaps();
