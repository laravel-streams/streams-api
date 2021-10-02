import { Stream } from '@/Streams/Stream';
import { inject } from '@laravel-streams/core';
import { Http } from '@/Streams/Http';

export interface Entry<ID extends string = string> {
    id: string;
}

export class Entry<ID extends string = string> {
    @inject('streams.http') http: Http;

    constructor(
        protected _stream: Stream<ID>,
        protected _data: any      = {},
        protected _fresh: boolean = true,
    ) {
        let proxy = new Proxy(this, {
            get(target: Entry<ID>, p: string | symbol, receiver: any): any {
                if ( Reflect.has(target, p) ) {
                    return Reflect.get(target, p, receiver);
                }
                if ( Reflect.has(target._data, p) ) {
                    return Reflect.get(target._data, p);
                }
            },
            set(target: Entry<ID>, p: string | symbol, value: any, receiver: any): boolean {
                if ( Reflect.has(target, p) ) {
                    return Reflect.set(target, p, value, receiver);
                }
                return Reflect.set(target._data, p, value);
            },
        });
        return proxy;
    }

    get stream(): Stream<ID> {
        return this._stream;
    }

    async save() {
        if ( this._fresh ) {
            return this.http.postEntry(this._stream.id, this._data);
        }
        return this.http.patchEntry(this._stream.id, this._data.id, this._data);

    }

    validator() {

    }

}
