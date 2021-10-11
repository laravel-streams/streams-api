import { HttpServiceProvider } from '@laravel-streams/core/resources/lib/Http/HttpServiceProvider';
import { ServiceProvider } from '@laravel-streams/core/resources/lib/Support';
import { Streams } from '@/Streams/Streams';
import { Http } from '@/Streams/Http';

export class StreamsServiceProvider extends ServiceProvider {
    providers: [
        HttpServiceProvider
    ]
    register() {
        this.app.singleton('streams', Streams).addBindingGetter('streams');
        this.app.singleton('streams.http', Http);
    }
}
