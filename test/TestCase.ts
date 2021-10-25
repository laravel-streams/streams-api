import { bootstrap, env } from './_support/bootstrap';
import { app, Application, CoreServiceProvider } from '@laravel-streams/core';
import { FS, ProxyEnv } from './_support/utils';

import { Streams } from '@laravel-streams/streams-api';
import { ApiServiceProvider } from '../resources/lib';

declare module '@laravel-streams/core/resources/public/types/Foundation/Application' {
    export interface Application {
        env: ProxyEnv<any>;
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

    protected createStreams():Streams {
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
                    baseURL: app.env.get('APP_URL', 'http://localhost') + '/' + app.env.get('STREAMS_API_PREFIX', 'api'),
                },
                http   : {
                    baseURL: app.env.get('APP_URL', 'http://localhost') + '/' + app.env.get('STREAMS_API_PREFIX', 'api'),
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
