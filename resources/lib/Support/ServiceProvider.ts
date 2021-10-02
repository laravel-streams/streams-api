import { Application } from '../Foundation/Application';

export class ServiceProvider implements IServiceProvider {
    constructor(public app: Application) {}
}

export type Constructor<T = any> = new (...args: any[]) => T

export type IServiceProviderClass = {
    new(app: Application): IServiceProvider
}

export interface IServiceProvider {
    app: Application;
    providers?: IServiceProviderClass[];
    singletons?: Record<string, Constructor>;
    bindings?: Record<string, Constructor>;

    register?(): any | Promise<any>;

    boot?(): any | Promise<any>;
}
