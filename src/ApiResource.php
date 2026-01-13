<?php

namespace Streams\Api;

use Streams\Api\Support\Facades\API;
use Illuminate\Support\Facades\Route;

class ApiResource
{
    protected static ?string $slug = null;

    protected static string|array $middleware = [];

    protected static string|array $withoutMiddleware = [];

    public static function routes(ApiInterface $interface): void
    {
        // $slug = static::getSlug();

        // Route::name(
        //     (string) str($slug)
        //         ->replace('/', '.')
        //         ->append('.'),
        // )
        //     ->prefix($slug)
        //     ->middleware(static::getRouteMiddleware($interface) ?: ['web'])
        //     ->withoutMiddleware(static::getWithoutRouteMiddleware($interface))
        //     ->group(function () use ($interface) {
        //         foreach (static::getEndpoints() as $name => $endpoint) {
        //             // $endpoint->registerRoute($interface)?->name($name);
        //         }
        //     });

        $slug = static::getSlug();

        Route::name(
            (string) str($slug)
                ->replace('/', '.')
                ->append('.'),
        )
            ->prefix($slug)
            ->middleware(static::getRouteMiddleware($interface) ?: [])
            ->withoutMiddleware(static::getWithoutRouteMiddleware($interface))
            ->group(function () {
                foreach (static::getEndpoints() as $route => $endpoint) {
                    if (is_array($endpoint)) {
                        // Handle ['endpoint', ['withoutMiddleware' => [...]]]
                        $handler = $endpoint[0];
                        $options = $endpoint[1] ?? [];
                        $routeDefinition = Route::any($route, $handler);
                        
                        if (isset($options['withoutMiddleware'])) {
                            $routeDefinition->withoutMiddleware($options['withoutMiddleware']);
                        }
                    } else {
                        Route::any($route, $endpoint);
                    }
                }
            });

        // foreach (static::getEndpoints() as $route => $endpoint) {
        //     // foreach ($resource::getPages() as $route => $endpoint) {
        //     //     // $endpoint::routes($interface);
        //     Route::any($route, $endpoint);
        // }
    }

    public static function getRouteBaseName(?string $interface = null): string
    {
        $interface ??= API::currentApiInterface()->getId();

        return (string) str(static::getSlug())
            ->replace('/', '.')
            ->prepend("streams.ui.{$interface}.");
    }

    public static function getSlug(): string
    {
        return static::$slug ?? (string) str(class_basename(static::class))
            ->kebab()
            ->slug();
    }

    public static function getRouteMiddleware(ApiInterface $interface): string|array
    {
        return static::$middleware;
    }

    public static function getWithoutRouteMiddleware(ApiInterface $interface): string|array
    {
        return static::$withoutMiddleware;
    }

    public static function getEndpoints(): array
    {
        return [];
    }
}
