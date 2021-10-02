import { Entry } from './Entry';
import { Collection } from '@laravel-streams/core';
import { IStreamLinks, IStreamMeta } from '@/types';
export declare type IEntriesLinks = IStreamLinks<'next_page' | 'previous_page' | 'self'>;
export interface IEntriesMeta extends IStreamMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
export declare class EntryCollection extends Collection<Entry> {
    readonly meta?: IEntriesMeta;
    readonly links?: IEntriesLinks;
    constructor(entries: Entry[], meta?: IEntriesMeta, links?: IEntriesLinks);
}
