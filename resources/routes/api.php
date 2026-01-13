<?php

use Illuminate\Support\Facades\Route;
use Streams\Api\Support\Facades\API;

/*
|--------------------------------------------------------------------------
| API Interface Routes
|--------------------------------------------------------------------------
|
| This file registers all API interfaces and their resources/endpoints.
| Each interface is registered with its middleware stack including the
| SetUpInterface middleware to ensure proper interface bootstrapping.
|
*/

Route::name('streams.api.')
    ->group(function () {
        foreach (API::getInterfaces() as $interface) {
            $id = $interface->getId();
            $path = $interface->getPath();

            Route::middleware($interface->getMiddleware())
                ->name($id.'.')
                ->prefix($path ?: $id)
                ->group(function () use ($interface) {
                    
                    // Set current interface for this route group
                    API::setCurrentInterface($interface);

                    // Custom routes closure
                    if ($routes = $interface->getRoutes()) {
                        $routes($interface);
                    }

                    // Generic interface endpoints
                    foreach ($interface->getEndpoints() as $route => $endpoint) {
                        Route::any($route, $endpoint);
                    }

                    // API resources
                    foreach ($interface->getResources() as $resource) {
                        $resource::routes($interface);
                    }
                });
        }
    });
