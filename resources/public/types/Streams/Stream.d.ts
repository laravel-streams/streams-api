import { Field } from './Field';
import { Repository } from './Repository';
import { Criteria } from '@/Streams/Criteria';
import { IBaseStream, IStreamLinks, IStreamMeta } from '@/types';
export interface Stream<ID extends string = string> extends Omit<IBaseStream<ID>, 'fields'> {
}
export declare class Stream<ID extends string = string> {
    readonly meta?: IStreamMeta;
    readonly links?: IStreamLinks<'self' | 'entries'>;
    constructor(stream: IBaseStream<ID>, meta?: IStreamMeta, links?: IStreamLinks<'self' | 'entries'>);
    protected _repository: Repository<ID>;
    protected _rules: Array<any>;
    protected _validators: Array<any>;
    fields: Map<string, Field>;
    get repository(): Repository<ID>;
    entries(): Criteria<ID>;
    isRequired: any;
    config: any;
    cached: any;
    cache: any;
    forget: any;
    flush: any;
    toArray: any;
    toJson: any;
    jsonSerialize: any;
    __toString: any;
    onInitializing: any;
    onInitialized: any;
    extendInput: any;
    importInput: any;
    normalizeInput: any;
    fieldsInput: any;
    merge: any;
}
