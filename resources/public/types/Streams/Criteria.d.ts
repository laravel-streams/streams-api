import { Stream } from './Stream';
import { Entry } from './Entry';
import { EntryCollection } from './EntryCollection';
import { IBaseStream } from '@/types';
import { Http } from '@/Streams/Http';
export declare type OrderByDirection = 'asc' | 'desc';
export declare type ComparisonOperator = '>' | '<' | '==' | '!=' | '>=' | '<=' | '!<' | '!>' | '<>';
export declare const comparisonOperators: ComparisonOperator[];
export declare type LogicalOperator = 'BETWEEN' | 'EXISTS' | 'OR' | 'AND' | 'NOT' | 'IN' | 'ALL' | 'ANY' | 'LIKE' | 'IS NULL' | 'UNIQUE';
export declare const logicalOperators: LogicalOperator[];
export declare const operators: Operator[];
export declare type Operator = ComparisonOperator | LogicalOperator;
export interface CriteriaStatement {
    name: string;
    [key: string]: any;
}
export declare class Criteria<ID extends string = string> {
    protected stream: Stream;
    http: Http;
    protected statements: CriteriaStatement[];
    constructor(stream: Stream);
    protected compileStatements(): {};
    all(): Promise<EntryCollection>;
    find(): this;
    first(): Promise<Entry<ID> & IBaseStream<ID>>;
    cache(): this;
    orderBy(key: string, direction?: OrderByDirection): this;
    limit(value: number): this;
    where(key: string, value: any): this;
    where(key: string, operator: Operator, value: any): this;
    orWhere(): this;
    get(): Promise<EntryCollection>;
    count(): number;
    create(): this;
    save(): this;
    delete(): this;
    truncate(): this;
    paginate(): this;
    newInstance(): this;
    getParameters(): this;
    setParameters(): this;
}
