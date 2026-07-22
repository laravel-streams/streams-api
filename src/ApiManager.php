<?php

namespace Streams\Api;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Streams\Api\Builders\Endpoints\EndpointRouter;
use Streams\Api\Resources\EntriesResource;
use Streams\Api\Resources\StreamsResource;

class ApiManager
{
    protected array $interfaces = [];

    protected array $booted = [];

    protected array $routesRegistered = [];

    protected ?string $current = null;

    protected ?\Closure $tenant = null;

    public function tenant(\Closure $tenant): void
    {
        $this->tenant = $tenant;
    }

    public function getTenant(): mixed
    {
        $key = 'streams.api.tenant';

        if (app()->bound($key)) {
            return app($key);
        }

        if (($interface = $this->currentApiInterface()) && $interface->hasTenant()) {
            $tenant = $interface->getTenant();
        } else {
            $tenant = $this->tenant ? call_user_func($this->tenant) : null;
        }

        app()->instance($key, $tenant);

        return $tenant;
    }

    public function interface(ApiInterface $interface): void
    {
        $id = $interface->getId() ?? spl_object_hash($interface);

        $this->interfaces[$id] = $interface;

        $interface->register();

        $this->registerInterfaceRoutes($interface);
    }

    public function getInterfaces(): array
    {
        return $this->interfaces;
    }

    public function getInterface(?string $id = null): ?ApiInterface
    {
        if ($id) {
            return $this->interfaces[$id] ?? null;
        }

        return $this->currentApiInterface() ?? $this->getDefaultInterface();
    }

    public function getDefaultInterface(): ?ApiInterface
    {
        $id = config('streams.api.default_interface', 'api');

        return $this->interfaces[$id] ?? null;
    }

    public function setCurrentApiInterface(ApiInterface $interface): void
    {
        $this->current = $interface->getId();
    }

    public function currentApiInterface(): ?ApiInterface
    {
        if ($this->current === null) {
            return null;
        }

        return $this->interfaces[$this->current] ?? null;
    }

    public function bootCurrentApiInterface(): void
    {
        $interface = $this->currentApiInterface();

        if (! $interface) {
            return;
        }

        $id = $interface->getId() ?? spl_object_hash($interface);

        if (isset($this->booted[$id])) {
            return;
        }

        $interface->boot();

        $this->booted[$id] = true;
    }

    public function registerDefaultInterface(): ApiInterface
    {
        $id = config('streams.api.default_interface', 'api');

        if (isset($this->interfaces[$id])) {
            return $this->interfaces[$id];
        }

        $interface = ApiInterface::make($id)
            ->path(config('streams.api.prefix', 'api'));

        $this->interface($interface);

        return $interface;
    }

    /**
     * Register the default interface with stream management endpoints.
     */
    public function routeStreams(): void
    {
        $this->registerInterfaceWithResources([
            StreamsResource::class,
        ]);
    }

    /**
     * Register the default interface with entry CRUD endpoints.
     */
    public function routeEntries(): void
    {
        $this->registerInterfaceWithResources([
            EntriesResource::class,
        ]);
    }

    /**
     * Register the default interface with both stream and entry endpoints.
     */
    public function routeCrud(): void
    {
        $this->registerInterfaceWithResources([
            StreamsResource::class,
            EntriesResource::class,
        ]);
    }

    protected function registerInterfaceWithResources(array $resources): void
    {
        $id = config('streams.api.default_interface', 'api');

        if (isset($this->interfaces[$id])) {
            return;
        }

        $this->interface(
            ApiInterface::make($id)
                ->path(config('streams.api.prefix', 'api'))
                ->resources($resources)
        );
    }

    public function registerInterfaceRoutes(ApiInterface $interface): void
    {
        $id = $interface->getId() ?? spl_object_hash($interface);

        if (isset($this->routesRegistered[$id])) {
            return;
        }

        $this->routesRegistered[$id] = true;

        $path = $interface->getPath();

        foreach ($interface->getDomains() ?: [null] as $domain) {

            if ($routes = $interface->getRoutes()) {
                $routes($interface);
            }

            $namePrefix = ($id && $id !== config('streams.api.default_interface', 'api'))
                ? $id.'.'
                : '';

            Route::domain($domain)
                ->middleware([
                    ...Arr::wrap(config('streams.api.middleware', 'api')),
                    config('streams.api.gate_middleware'),
                    \Streams\Api\Http\Middleware\SetUpApiInterface::class,
                    ...$interface->getMiddleware(),
                ])
                ->name('streams.api.'.$namePrefix)
                ->prefix($path ?: ($id ?? ''))
                ->group(function () use ($interface) {
                    foreach ($interface->getEndpoints() as $route => $endpoint) {
                        if ($endpoint instanceof EndpointRouter) {
                            $endpoint->registerRoute($interface);
                        } elseif (\is_string($route)) {
                            Route::get($route, $endpoint);
                        }
                    }

                    foreach ($interface->getResources() as $resource) {
                        $resource::routes($interface);
                    }
                });
        }

        Route::getRoutes()->refreshNameLookups();
    }

    public function bootRegisteredInterfaceRoutes(): void
    {
        foreach ($this->interfaces as $interface) {
            $this->registerInterfaceRoutes($interface);
        }
    }
}
