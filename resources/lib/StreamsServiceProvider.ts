import { ServiceProvider } from '@laravel-streams/core/resources/lib/Support';
import { Streams } from '@/Streams/Streams';
import { HttpServiceProvider } from '@laravel-streams/core/resources/lib/Http/HttpServiceProvider';
import Axios, { AxiosRequestConfig } from 'axios';
import { Http } from '@/Streams/Http';
import { Stream } from '@/Streams/Stream';

export class StreamsServiceProvider extends ServiceProvider {
    providers: [
        HttpServiceProvider
    ]
    register() {
        this.app.singleton('streams', Streams).addBindingGetter('streams');
        this.app.singleton('streams.http', Http);
    }
}
