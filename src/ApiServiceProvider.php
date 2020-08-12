<?php

namespace Anomaly\Streams\Api;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

/**
 * Class StreamsServiceProvider
 *
 * @link   http://pyrocms.com/
 * @author PyroCMS, Inc. <support@pyrocms.com>
 * @author Ryan Thompson <ryan@pyrocms.com>
 */
class UiServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        Route::prefix('api', function() {
            Route::apiResource('streams', 'PhotoController');
        })->middleware('api');
    }

    /**
     * Boot the service provider.
     */
    public function boot()
    {
        //
    }
}
