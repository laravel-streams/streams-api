const mix = require('laravel-mix');
require('@laravel-streams/mix-extension');

mix
    .ts('resources/lib/index.ts', '')
    .copyDirectory('resources/public', '../../../public/vendor/streams/api')
    .streams({
        name: ['streams', 'api'],
        ts: {
            declaration: true,
            declarationDir: './resources/public/types'
        }
    });

mix.alias({
    '@laravel-streams/streams-api': '@laravel-streams/streams-api/src'
})
if ( !mix.inProduction() ) {
    mix.sourceMaps();
}

