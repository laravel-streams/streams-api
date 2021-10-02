import { ServiceProvider } from '@laravel-streams/core/resources/lib/Support';
import { HttpServiceProvider } from '@laravel-streams/core/resources/lib/Http/HttpServiceProvider';
export declare class StreamsServiceProvider extends ServiceProvider {
    providers: [
        HttpServiceProvider
    ];
    register(): void;
}
