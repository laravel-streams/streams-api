import { Stream } from '@/Streams/Stream';
import { Http } from '@/Streams/Http';
export interface Entry<ID extends string = string> {
    id: string;
}
export declare class Entry<ID extends string = string> {
    protected _stream: Stream<ID>;
    protected _data: any;
    protected _fresh: boolean;
    http: Http;
    constructor(_stream: Stream<ID>, _data?: any, _fresh?: boolean);
    get stream(): Stream<ID>;
    save(): Promise<import("..").IStreamResponse<any, "entries" | "self">>;
    validator(): void;
}
