import { ApiConfiguration, ClientConfiguration, Streams } from '@laravel-streams/streams-api';
import { Streams as streams } from '@laravel-streams/core';

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

declare module '@laravel-streams/streams-api' {

    export interface IStream<ID extends string = string> {
        ui: streams.Ui.Ui
    }
}
