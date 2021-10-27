import { ServiceProvider } from '@laravel-streams/core';
export declare class ApiServiceProvider extends ServiceProvider {
    register(): void;
    boot(): any;
    protected bootETag(): void;
}
