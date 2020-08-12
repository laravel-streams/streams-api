<?php

namespace Anomaly\Streams\Api;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Anomaly\Streams\Platform\Http\Controller\StreamsController;
use Anomaly\Streams\Platform\Http\Controller\EntriesController;

/**
 * Class ApiServiceProvider
 *
 * @link   http://pyrocms.com/
 * @author PyroCMS, Inc. <support@pyrocms.com>
 * @author Ryan Thompson <ryan@pyrocms.com>
 */
class ApiServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        Route::prefix('api', function() {
            Route::apiResource('streams', StreamsController::class);
            Route::apiResource('entries/{stream}', EntriesController::class);
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
