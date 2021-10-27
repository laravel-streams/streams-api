import { bootstrap, env } from './_support/bootstrap';
import { app, Application, CoreServiceProvider } from '@laravel-streams/core';
import { FS } from './_support/utils';

import { Streams } from '@laravel-streams/streams-api';
import { ApiServiceProvider, ETag } from '../resources/lib';

declare module '@laravel-streams/streams-api/src/Streams' {

    interface Streams {
        etag:ETag
    }
}

export abstract class TestCase {
    env = env;

    fs: FS;
    app: Application = app;

    async before() {
        this.fs = new FS();
    }

    static async before() {
        const { env } = bootstrap();
        await this.createApp(env);
    }

    protected createStreams(): Streams {
        return this.app.get<Streams>('streams');
    }

    protected static async createApp(env) {
        if ( !app.isBound('env') ) {
            app.instance('env', env).addBindingGetter('env');
        }
        if ( app.isBooted() ) {
            return app;
        }
        await app
        .initialize({
            providers: [
                CoreServiceProvider,
                ApiServiceProvider,
            ],
            config   : {
                api    : {
                    baseURL: env.get('APP_URL', 'http://localhost') + '/' + env.get('STREAMS_API_PREFIX', 'api'),
                },
                http   : {
                    baseURL: env.get('APP_URL', 'http://localhost') + '/' + env.get('STREAMS_API_PREFIX', 'api'),
                },
                streams: {
                    xdebug: true,
                },
            },
        })
        .then(app.boot.bind(app))
        .then(app.start.bind(app));

        return app;
    }

}
