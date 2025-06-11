<?php

namespace Streams\Api;

use Streams\Api\Support\Facades\API;
use Streams\Core\Support\Integrator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ApiServiceProvider extends ServiceProvider
{
    public function register()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                \Streams\Api\Commands\DumpApiSchema::class,
                \Streams\Api\Commands\CreateApiDocumentation::class,
            ]);
        }

        $this->app->alias(\Streams\Api\ApiManager::class, 'api');

        Integrator::aliases([
            'API' => \Streams\Api\Support\Facades\API::class,
        ]);
    }

    public function boot()
    {
        $this->app->booted(function () {

            Route::name('streams.api.')
                ->group(function () {

                    foreach (API::getInterfaces() as $interface) {

                        $id = $interface->getId();
                        $path = $interface->getPath();

                        foreach ([null] as $domain) {

                            Route::domain($domain)
                                ->middleware($interface->getMiddleware())
                                ->name($id . '.')
                                ->prefix($path ?: $id)
                                ->group(function () use ($interface) {

                                    if ($routes = $interface->getRoutes()) {
                                        $routes($interface);
                                    }

                                    /**
                                     * Register generic interface endpoints.
                                     */
                                    foreach ($interface->getEndpoints() as $route => $endpoint) {
                                        // @todo: $endpoint::routes($interface);
                                        Route::any($route, $endpoint);
                                    }

                                    /**
                                     * Register API resources.
                                     */
                                    foreach ($interface->getResources() as $resource) {
                                        $resource::routes($interface);
                                    }
                                });
                        }
                    }
                });
        });
    }

    protected function registerConfig(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../resources/config/api.php', 'streams.api');

        $this->publishes([
            __DIR__ . '/../resources/config/api.php' => config_path('streams/api.php'),
        ], 'config');
    }
}
