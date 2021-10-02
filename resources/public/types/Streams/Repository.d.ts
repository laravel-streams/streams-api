import { Stream } from './Stream';
import { Criteria } from '@/Streams/Criteria';
import { Http } from '@/Streams/Http';
import { EntryCollection } from '@/Streams/EntryCollection';
import { Entry } from '@/Streams/Entry';
export declare class Repository<ID extends string = string> {
    protected stream: Stream;
    protected http: Http;
    constructor(stream: Stream);
    all(): Promise<EntryCollection>;
    find(): this;
    findAll(): this;
    findBy(): this;
    findAllWhere(): this;
    create(data: any): Promise<Entry>;
    save(): this;
    delete(): this;
    truncate(): this;
    newInstance(): this;
    newCriteria(): Criteria<ID>;
    newSelfAdapter(): this;
    newFileAdapter(): this;
    newFilebaseAdapter(): this;
    newDatabaseAdapter(): this;
    newEloquentAdapter(): this;
}
