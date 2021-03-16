<?php

namespace Streams\Api;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
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
use Streams\Api\Http\Controller\Streams\CreateStream;
use Streams\Api\Http\Controller\Streams\DeleteStream;
use Streams\Api\Http\Controller\Streams\UpdateStream;

class ApiServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerConfig();

        if (!Config::get('streams.api.enabled')) {
            return;
        }

        Route::prefix('api')->middleware('api')->group(function () {

            Route::get('streams', [
                'uses' => GetStreams::class,
                'as' => 'ls.api.streams.index',
            ]);
            Route::post('streams', [
                'uses' => CreateStream::class,
                'as' => 'ls.api.streams.create',
            ]);
            Route::get('streams/{stream}', [
                'uses' => ShowStream::class,
                'as' => 'ls.api.streams.show',
            ]);
            Route::put('streams/{stream}', [
                'uses' => UpdateStream::class,
                'as' => 'ls.api.streams.update',
            ]);
            Route::patch('streams/{stream}', [
                'uses' => PatchStream::class,
                'as' => 'ls.api.streams.patch',
            ]);
            Route::delete('streams/{stream}', [
                'uses' => DeleteStream::class,
                'as' => 'ls.api.streams.delete',
            ]);


            Route::get('streams/{stream}/entries', [
                'uses' => GetEntries::class,
                'as' => 'ls.api.entries.index',
            ]);
            Route::post('streams/{stream}/entries', [
                'uses' => CreateEntry::class,
                'as' => 'ls.api.entries.create',
            ]);

            Route::get('streams/{stream}/entries/{entry}', [
                'uses' => ShowEntry::class,
                'as' => 'ls.api.entries.show',
            ]);
            Route::put('streams/{stream}/entries/{entry}', [
                'uses' => UpdateEntry::class,
                'as' => 'ls.api.entries.update',
            ]);
            Route::patch('streams/{stream}/entries/{entry}', [
                'uses' => PatchEntry::class,
                'as' => 'ls.api.entries.patch',
            ]);
            Route::delete('streams/{stream}/entries/{entry}', [
                'uses' => DeleteEntry::class,
                'as' => 'ls.api.entries.delete',
            ]);
        });
    }

    /**
     * Boot the service provider.
     */
    public function boot()
    {
        $this->publishes([
            base_path('vendor/streams/api/resources/public')
            => public_path('vendor/streams/api')
        ], ['public']);

        Assets::addPath('api', 'vendor/streams/api');

        Assets::register('api::js/index.js');

        if (!Config::get('streams.api.enabled')) {
            return;
        }
    }

    /**
     * Register UI config.
     */
    protected function registerConfig()
    {
        $this->mergeConfigFrom(__DIR__ . '/../resources/config/api.php', 'streams.api');

        if (file_exists($config = __DIR__ . '/../../../../config/streams/api.php')) {
            $this->mergeConfigFrom($config, 'streams.api');
        }

        $this->publishes([
            __DIR__ . '/../resources/config/api.php' => config_path('streams/api.php')
        ], 'config');
    }
}
