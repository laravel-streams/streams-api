import { Stream } from './Stream';
import { Config } from '@laravel-streams/core';
import { Http } from '@/Streams/Http';
export declare class Streams {
    config: Config;
    http: Http;
    all(): Promise<Stream[]>;
    make<ID extends string>(id: ID): Promise<Stream<ID>>;
    merge(): void;
    has(): boolean;
    build(): void;
    load(): void;
    register(): void;
    overload(): void;
    entries(): void;
    repository(): void;
    collection(): void;
}
