import { Config, StorageAdapterInterface } from '@laravel-streams/core';
export interface ETagCacheValue {
    etag: string;
    value: any;
}
export declare class ETagCache {
    storage: StorageAdapterInterface;
    config: Config;
    get manifestKey(): string;
    get(key: string): ETagCacheValue | undefined;
    set(key: string, etag: string, value: any): StorageAdapterInterface;
    reset(): void;
    protected getUuidManifest(): string[];
    protected addToUuidManifest(uuid: any): void;
}
