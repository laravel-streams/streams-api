import { ETagCache } from './ETagCache';
import { injectable ,inject } from '@laravel-streams/core';
import { Client, Streams } from '@laravel-streams/streams-api';

const byLowerCase              = toFind => value => toLowerCase(value) === toFind;
const toLowerCase              = value => value.toLowerCase();
const getKeys                  = headers => Object.keys(headers);
const isCacheableMethod        = (request: Request) => ~ [ 'GET', 'HEAD' ].indexOf(request.method.toUpperCase());
const getHeaderCaseInsensitive = (headerName, headers = {}) => headers[ getKeys(headers).find(byLowerCase(headerName)) ];
const getBase64UrlFromConfig   = (request: Request) => btoa(request.url);

@injectable()
export class ETag {
    @inject('api.etag.cache') public cache: ETagCache;
    protected readonly requestKey: string  = 'ApiETagRequest';
    protected readonly responseKey: string = 'ApiETagResponse';
    protected enabled: boolean             = false;

    get client(): Client {
        return this.streams.client;
    }

    constructor(protected streams: Streams) {
        // Object.defineProperty(streams, 'etag', {
        //     get         : () => {return this;},
        //     configurable: true,
        //     enumerable  : true,
        // });
    }

    enableEtag() {
        if ( this.enabled ) return;
        const requestInterceptor  = this.getRequestInterceptor();
        const responseInterceptor = this.getResponseInterceptor();
        this.client.hooks.request.tap('ApiETagRequest', request => requestInterceptor(request));
        this.client.hooks.response.tap('ApiETagResponse', (response, request) => responseInterceptor(response, request));
        this.enabled = true;
    }

    disableEtag() {
        if ( !this.enabled ) return;
        this.client.hooks.request.taps  = this.client.hooks.request.taps.filter(tap => tap.name === this.requestKey);
        this.client.hooks.response.taps = this.client.hooks.response.taps.filter(tap => tap.name === this.responseKey);
        this.enabled                    = false;
    }

    isEnabled() {return this.enabled;}

    //

    protected getRequestInterceptor() {
        return (request: Request) => {
            if ( isCacheableMethod(request) ) {
                const uuid             = getBase64UrlFromConfig(request);
                const lastCachedResult = this.cache.get(uuid);
                if ( lastCachedResult ) {
                    request.headers.set('If-None-Match', lastCachedResult.etag);
                }
            }
            return request;
        };
    }

    protected getResponseInterceptor() {
        return (response: Response, request: Request) => {
            if ( response.ok && isCacheableMethod(request) ) {
                if ( response.status === 304 ) {
                    const responseETAG = response.headers.get('ETag');//getHeaderCaseInsensitive('etag', response.headers.get('ETag'));
                    if ( responseETAG ) {
                        let data = response.text();
                        if ( response.headers.get('Content-Type') === 'application/json' ) {
                            data = response.json();
                        }
                        this.cache.set(getBase64UrlFromConfig(request), responseETAG, data);
                    }
                }
            }
            return response;
        };
    }

    // protected getCacheByAxiosConfig(config: AxiosRequestConfig) {
    //     return this.cache.get(getBase64UrlFromConfig(config));
    // }
    // protected getResponseErrorInterceptor() {
    //     return (error: AxiosError) => {
    //         if ( error.response && error.response.status === 304 ) {
    //             const getCachedResult = this.getCacheByAxiosConfig(error.response.config);
    //             if ( !getCachedResult ) {
    //                 return Promise.reject(error);
    //             }
    //             const newResponse  = error.response;
    //             newResponse.status = 200;
    //             newResponse.data   = getCachedResult.value;
    //             return Promise.resolve(newResponse);
    //         }
    //         return Promise.reject(error);
    //     };
    // }
}
