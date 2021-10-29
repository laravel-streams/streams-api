import { app, Configuration, ServiceProvider } from '@laravel-streams/core';
import { Client, Http,Streams } from '@laravel-streams/streams-api';
import { ETagCache } from './ETagCache';
import { ETag } from './ETag';


app.events.on('Application:initialize:defaultConfig', (config: Configuration) => {
    config.api = {
        baseURL: '/api',
        etag   : {
            enabled    : true,
            manifestKey: 'streams',
        },
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        Client: Client,
        Http: Http
    };
});

export class ApiServiceProvider extends ServiceProvider {
    public register() {
        this.app.binding('streams', app => {
            return new Streams({
                ...app.config.api,
            });
        }).addBindingGetter('streams');
    }

    public boot(): any {
        this.bootETag();
    }

    protected bootETag() {
        // Add ETag caching to our axios instance
        // The ETag instance will also be accessible under 'etag' property on the axios instance
        this.app.singleton('api.etag.cache', ETagCache);
        const etag = new ETag(this.app.streams);
        this.app.instance('api.etag', etag);
        if ( this.app.config.api.etag.enabled ) {
            etag.enableEtag();
        }

    }
}
