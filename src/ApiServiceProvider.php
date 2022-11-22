<?php

namespace Streams\Api;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Streams\Core\StreamsServiceProvider;
use Streams\Core\Support\Facades\Assets;
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
use Streams\Api\Http\Controller\Entries\RepositoryMethod;

class ApiServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->register(StreamsServiceProvider::class);

        $this->registerConfig();

        if (!Config::get('streams.api.enabled')) {
            return;
        }

        $this->registerRoutes();
    }

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                \Streams\Api\Commands\DumpApiSchema::class,
                \Streams\Api\Commands\CreateApiDocumentation::class,
            ]);
        }

        if (!Config::get('streams.api.enabled')) {
            return;
        }

        Assets::addPath('api', 'vendor/streams/api');

        Assets::register('api::js/index.js');
    }

    protected function registerConfig(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../resources/config/api.php', 'streams.api');

        if (file_exists($config = config_path('streams/api.php'))) {
            $this->mergeConfigFrom($config, 'streams.api');
        }

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
                    'as'   => 'streams.api.streams.index',
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
                    'uses' => GetEntries::class,
                    'as'   => 'streams.api.entries.index',
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
                Route::get('streams/{stream}/repository/{method}', [
                    'uses'  => RepositoryMethod::class,
                    'as'    => 'streams.api.entries.repository',
                ]);
                Route::post('streams/{stream}/query/{method?}', [
                    'uses'  => QueryEntries::class,
                    'as'    => 'streams.api.entries.query',
                ]);
                Route::put('streams/{stream}/entries/{entry}', [
                    'uses' => UpdateEntry::class,
                    'as'   => 'streams.api.entries.update',
                ]);
                Route::patch('streams/{stream}/entries/{entry}', [
                    'uses' => PatchEntry::class,
                    'as'   => 'streams.api.entries.patch',
                ]);
                Route::delete('streams/{stream}/entries/{entry}', [
                    'uses' => DeleteEntry::class,
                    'as'   => 'streams.api.entries.delete',
                ]);
            });
    }
}
