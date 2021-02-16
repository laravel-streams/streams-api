<?php

namespace Streams\Api;

use Illuminate\Support\Facades\Route;
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
        Route::prefix('api')->middleware('api')->group(function () {

            Route::get('streams', [
                'uses' => GetStreams::class,
                'as' => 'streams.api.streams.index',
            ]);
            Route::post('streams', [
                'uses' => CreateStream::class,
                'as' => 'streams.api.streams.create',
            ]);

            Route::get('streams/{stream}', ShowStream::class);
            Route::put('streams/{stream}', UpdateStream::class);
            Route::patch('streams/{stream}', PatchStream::class);
            Route::delete('streams/{stream}', DeleteStream::class);

            Route::get('streams/{stream}/entries', GetEntries::class);
            Route::post('streams/{stream}/entries', CreateEntry::class);

            Route::get('streams/{stream}/entries/{entry}', ShowEntry::class);
            Route::put('streams/{stream}/entries/{entry}', UpdateEntry::class);
            Route::patch('streams/{stream}/entries/{entry}', PatchEntry::class);
            Route::delete('streams/{stream}/entries/{entry}', DeleteEntry::class);
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
    }
}
