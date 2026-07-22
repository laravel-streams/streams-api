<?php

namespace Streams\Api;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Streams\Api\Builders\Endpoints\EndpointRouter;
use Streams\Api\Support\Facades\API;

class ApiResource
{
    protected static ?string $slug = null;

    protected static string|array $middleware = [];

    protected static string|array $withoutMiddleware = [];

    public static function routes(ApiInterface $interface): void
    {
        $slug = static::getSlug();

        $group = Route::name(static::getRouteNamePrefix($interface));

        if (static::usesRoutePrefix() && filled($slug)) {
            $group = $group->prefix($slug);
        }

        $group
            ->middleware(static::getRouteMiddleware($interface) ?: [])
            ->withoutMiddleware(static::getWithoutRouteMiddleware($interface))
            ->group(function () use ($interface) {
                foreach (static::getEndpoints() as $name => $endpoint) {
                    if ($endpoint instanceof EndpointRouter) {
                        $endpoint->registerRoute($interface)?->name($name);
                    } elseif (\is_string($endpoint) || \is_array($endpoint) || $endpoint instanceof \Closure) {
                        Route::get($name, $endpoint);
                    }
                }
            });
    }

    public static function usesRoutePrefix(): bool
    {
        return true;
    }

    protected static function getRouteNamePrefix(ApiInterface $interface): string
    {
        $slug = (string) str(static::getSlug())
            ->replace('/', '.')
            ->append('.');

        $interfaceId = $interface->getId();
        $defaultId = config('streams.api.default_interface', 'api');

        if ($interfaceId && $interfaceId !== $defaultId) {
            return "{$interfaceId}.{$slug}";
        }

        return $slug;
    }

    public static function getRouteBaseName(string|ApiInterface|null $interface = null): string
    {
        if (\is_string($interface)) {
            $interfaceId = $interface;
        } elseif ($interface instanceof ApiInterface) {
            $interfaceId = $interface->getId();
        } else {
            $interfaceId = ($interface ?? API::currentApiInterface())?->getId();
        }

        $defaultId = config('streams.api.default_interface', 'api');

        if ($interfaceId && $interfaceId !== $defaultId) {
            return (string) str(static::getSlug())
                ->replace('/', '.')
                ->prepend("streams.api.{$interfaceId}.");
        }

        return (string) str(static::getSlug())
            ->replace('/', '.')
            ->prepend('streams.api.');
    }

    public static function getSlug(): string
    {
        return static::$slug ?? (string) str(class_basename(static::class))
            ->kebab()
            ->slug();
    }

    public static function getRouteMiddleware(ApiInterface $interface): string|array
    {
        return Arr::wrap(static::$middleware);
    }

    public static function getWithoutRouteMiddleware(ApiInterface $interface): string|array
    {
        return Arr::wrap(static::$withoutMiddleware);
    }

    public static function getEndpoints(): array
    {
        return [];
    }
}
