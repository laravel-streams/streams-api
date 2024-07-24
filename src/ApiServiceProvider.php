<?php

namespace Streams\Api;

use Streams\Api\Support\Facades\API;
use Streams\Core\Support\Integrator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Streams\Api\Http\Controller\Entries\ShowEntry;
use Streams\Api\Http\Controller\Entries\GetEntries;
use Streams\Api\Http\Controller\Entries\PatchEntry;
use Streams\Api\Http\Controller\Streams\GetStreams;
use Streams\Api\Http\Controller\Streams\ShowStream;
use Streams\Api\Http\Controller\Entries\CreateEntry;
use Streams\Api\Http\Controller\Entries\DeleteEntry;
use Streams\Api\Http\Controller\Entries\UpdateEntry;
use Streams\Api\Http\Controller\Streams\PatchStream;
use Streams\Api\Http\Controller\Entries\QueryEntries;
use Streams\Api\Http\Controller\Streams\CreateStream;
use Streams\Api\Http\Controller\Streams\DeleteStream;
use Streams\Api\Http\Controller\Streams\UpdateStream;

class ApiServiceProvider extends ServiceProvider
{
    public function boot()
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




        $this->app->booted(function () {

            Route::name('streams.api.')
                ->group(function () {

                    foreach (API::getInterfaces() as $interface) {

                        $id = $interface->getId();
                        $path = $interface->getPath();

                        foreach ([null] as $domain) {

                            if ($routes = $interface->getRoutes()) {
                                $routes($interface);
                            }

                            Route::domain($domain)
                                ->middleware($interface->getMiddleware())
                                ->name($id . '.')
                                ->prefix($path)
                                ->group(function () use ($interface) {

                                    foreach ($interface->getEndpoints() as $route => $endpoint) {
                                        // $endpoint::routes($interface);
                                        Route::any($route, $endpoint);
                                    }

                                    foreach ($interface->getResources() as $resource) {
                                        // $resource::routes($interface);
                                        $slug = $resource::getSlug();

                                        Route::name(
                                            (string) str($slug)
                                                ->replace('/', '.')
                                                ->append('.'),
                                        )
                                            ->prefix($slug)
                                            // ->middleware(static::getRouteMiddleware($panel) ?: ['web'])
                                            // ->withoutMiddleware(static::getWithoutRouteMiddleware($panel))
                                            ->group(function () use ($resource) {
                                                foreach ($resource::getEndpoints() as $route => $endpoint) {
                                                    Route::any($route, $endpoint);
                                                }
                                            });
                                        foreach ($resource::getEndpoints() as $route => $endpoint) {
                                            // $endpoint::routes($interface);
                                            Route::any($route, $endpoint);
                                        }
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

    protected function registerRoutes(): void
    {
        Route::prefix(Config::get('streams.api.prefix', 'api'))
            ->middleware(Config::get('streams.api.middleware', 'api'))
            ->group(function () {

                /*
                 * Route Streams API endpoints.
                 */
                Route::get('streams', [
                    'uses' => GetStreams::class,
                    'as'   => 'streams.api.streams.list',
                ]);
                Route::post('streams', [
                    'uses' => CreateStream::class,
                    'as'   => 'streams.api.streams.create',
                ]);
                Route::get('streams/{stream}', [
                    'uses' => ShowStream::class,
                    'as'   => 'streams.api.streams.show',
                ]);
                Route::put('streams/{stream}', [
                    'uses' => UpdateStream::class,
                    'as'   => 'streams.api.streams.update',
                ]);
                Route::patch('streams/{stream}', [
                    'uses' => PatchStream::class,
                    'as'   => 'streams.api.streams.patch',
                ]);
                Route::delete('streams/{stream}', [
                    'uses' => DeleteStream::class,
                    'as'   => 'streams.api.streams.delete',
                ]);

                /*
                 * Route entries API endpoints.
                 */
                Route::get('streams/{stream}/entries', [
                    'uses'  => GetEntries::class,
                    'as'    => 'streams.api.entries.list',
                ]);
                Route::post('streams/{stream}/entries', [
                    'uses' => CreateEntry::class,
                    'as'   => 'streams.api.entries.create',
                ]);
                Route::get('streams/{stream}/entries/{entry}', [
                    'uses'  => ShowEntry::class,
                    'as'    => 'streams.api.entries.show',
                    'where' => [
                        'entry' => '(.*)',
                    ],
                ]);
                Route::put('streams/{stream}/entries/{entry}', [
                    'uses' => UpdateEntry::class,
                    'as'   => 'streams.api.entries.update',
                    'where' => [
                        'entry' => '(.*)',
                    ],
                ]);
                Route::patch('streams/{stream}/entries/{entry}', [
                    'uses' => PatchEntry::class,
                    'as'   => 'streams.api.entries.patch',
                    'where' => [
                        'entry' => '(.*)',
                    ],
                ]);
                Route::delete('streams/{stream}/entries/{entry}', [
                    'uses' => DeleteEntry::class,
                    'as'   => 'streams.api.entries.delete',
                    'where' => [
                        'entry' => '(.*)',
                    ],
                ]);
                Route::post('streams/{stream}/query', [
                    'uses'  => QueryEntries::class,
                    'as'    => 'streams.api.entries.query',
                ]);
            });
    }
}
