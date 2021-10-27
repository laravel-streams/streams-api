import { ETagCache } from './ETagCache';
import { Client, Streams } from '@laravel-streams/streams-api';
export declare class ETag {
    protected streams: Streams;
    cache: ETagCache;
    protected readonly requestKey: string;
    protected readonly responseKey: string;
    protected enabled: boolean;
    get client(): Client;
    constructor(streams: Streams);
    enableEtag(): void;
    disableEtag(): void;
    isEnabled(): boolean;
    protected getRequestInterceptor(): (request: Request) => Request;
    protected getResponseInterceptor(): (response: Response, request: Request) => Response;
}
