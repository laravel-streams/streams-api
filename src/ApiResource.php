<?php

namespace Streams\Api;

use Illuminate\Support\Facades\Route;

class ApiResource
{
    
    protected static ?string $slug = null;

    protected static string | array $middleware = [];

    protected static string | array $withoutMiddleware = [];

    public static function routes(ApiInterface $interface): void
    {
        $slug = static::getSlug();
        
        Route::name(
            (string) str($slug)
                ->replace('/', '.')
                ->append('.'),
        )
            ->prefix($slug)
            ->middleware(static::getRouteMiddleware($interface) ?: ['web'])
            ->withoutMiddleware(static::getWithoutRouteMiddleware($interface))
            ->group(function () use ($interface) {
                foreach (static::getPages() as $name => $page) {
                    $page->registerRoute($interface)?->name($name);
                }
            });
    }

    public static function getRouteBaseName(?string $interface = null): string
    {
        $interface ??= UI::currentApiInterface()->getId();

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

    public static function getRouteMiddleware(ApiInterface $interface): string | array
    {
        return static::$middleware;
    }

    public static function getWithoutRouteMiddleware(ApiInterface $interface): string | array
    {
        return static::$withoutMiddleware;
    }


    /**
     * Endpoints for this resource.
     *
     * @var array
     */
    protected array $endpoints = [];

    public function endpoints(array $endpoints): static
    {
        $this->endpoints = [
            ...$this->endpoints,
            ...$endpoints,
        ];
        
        foreach ($endpoints as $endpoint) {
            // $this->queueLivewireComponent($endpoint);
        }

        return $this;
    }

    public function getEndpoints(): array
    {
        return array_unique($this->endpoints);
    }
}
