import { ApiConfiguration, ClientConfiguration, Streams } from '@laravel-streams/streams-api';

export * from './ApiServiceProvider';
export * from './ETag';
export * from './ETagCache';

export interface StreamsApiConfiguration extends ApiConfiguration {
    etag?: {
        enabled?: boolean
        manifestKey?: string
    };
}


declare module '@laravel-streams/core' {
    export interface Configuration {
        api?: StreamsApiConfiguration & ClientConfiguration & ApiConfiguration;
    }

    export interface Application {
        streams?: Streams;
    }
}
