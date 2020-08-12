<?php

namespace Anomaly\Streams\Api;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Anomaly\Streams\Api\Http\Controller\EntriesController;
use Anomaly\Streams\Api\Http\Controller\StreamsController;

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
        Route::prefix('api')->middleware('api')->group(function () {
            
            Route::get('streams', StreamsController::class . '@index');
            Route::get('streams/{stream}', StreamsController::class . '@show');
            
            Route::get('entries/{streams}', EntriesController::class . '@index');
            Route::get('entries/{streams}/{entry}', EntriesController::class . '@show');
        });
    }

    /**
     * Boot the service provider.
     */
    public function boot()
    {
        //
    }
}
