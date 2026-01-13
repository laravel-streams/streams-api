<?php

namespace Streams\Api;

use Illuminate\Routing\Router;
use Streams\Api\Support\Facades\API;
use Streams\Core\Support\Integrator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Streams\Api\Http\Middleware\SetUpInterface;

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

        $this->app->singleton(\Streams\Api\ApiManager::class);

        $this->app->alias(\Streams\Api\ApiManager::class, 'api');

        Integrator::aliases([
            'API' => \Streams\Api\Support\Facades\API::class,
        ]);

        $this->registerConfig();
    }

    public function boot()
    {
        app(Router::class)->aliasMiddleware('interface', SetUpInterface::class);

        Integrator::aliases([
            'API' => \Streams\Api\Support\Facades\API::class,
        ]);

        // Ensure SetUpInterface middleware runs on all API routes
        // by pushing it into the api middleware group
        app(Router::class)->pushMiddlewareToGroup('api', SetUpInterface::class);

        $this->app->booted(function () {
            $this->loadRoutesFrom(__DIR__.'/../resources/routes/api.php');
        });
    }

    protected function registerConfig(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../resources/config/api.php', 'streams.api');

        $this->publishes([
            __DIR__.'/../resources/config/api.php' => config_path('streams/api.php'),
        ], 'config');
    }
}
