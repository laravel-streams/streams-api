<?php

namespace Streams\Api;

use Illuminate\Routing\Router;
use Streams\Api\Http\Middleware\EnsureApiIsEnabled;
use Streams\Api\Http\Middleware\SetUpApiInterface;
use Streams\Api\Support\Facades\API;
use Streams\Core\Support\Integrator;
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

        $this->app->singleton(ApiManager::class);

        $this->app->alias(ApiManager::class, 'api');

        Integrator::aliases([
            'API' => \Streams\Api\Support\Facades\API::class,
        ]);

        $this->registerConfig();
    }

    public function boot()
    {
        app(Router::class)->aliasMiddleware('api.interface', SetUpApiInterface::class);
        app(Router::class)->aliasMiddleware('api.gate', EnsureApiIsEnabled::class);

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
