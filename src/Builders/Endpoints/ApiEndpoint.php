<?php

namespace Streams\Api\Builders\Endpoints;

use Illuminate\Routing\Route;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route as RouteFacade;
use Streams\Api\ApiInterface;
use Streams\Api\Builders\Builder;
use Streams\Api\Builders\Endpoints\Concerns\HasRouteDefinition;

abstract class ApiEndpoint extends Builder
{
    use HasRouteDefinition;

    protected static ?string $stream = null;

    protected ?string $streamHandle = null;

    public function __construct()
    {
        $this->configure();
    }

    public function stream(?string $stream): static
    {
        $this->streamHandle = $stream;

        return $this;
    }

    protected function resolveStream(?string $stream = null): mixed
    {
        return stream($stream ?: $this->streamHandle ?: static::$stream);
    }

    public static function route(
        string $path,
        string|array $methods = 'get',
        ?string $routeName = null,
        array $where = [],
    ): EndpointRouter {
        return new EndpointRouter(
            static::class,
            function (ApiInterface $interface) use ($path, $methods, $routeName, $where): Route {
                $route = RouteFacade::match(
                    Arr::wrap($methods),
                    $path,
                    static::class,
                );

                if ($routeName) {
                    $route->name($routeName);
                }

                if ($where !== []) {
                    $route->where($where);
                }

                $instance = app(static::class);

                if ($middleware = $instance->getRouteMiddleware()) {
                    $route->middleware(Arr::wrap($middleware));
                }

                if ($without = $instance->getWithoutRouteMiddleware()) {
                    $route->withoutMiddleware(Arr::wrap($without));
                }

                return $route;
            },
        );
    }

    protected function setUp(): void
    {
        if ($uri = $this->getDefaultUri()) {
            $this->uri($uri);
        }

        if ($methods = $this->getDefaultMethods()) {
            $this->methods($methods);
        }

        if ($where = $this->getDefaultWhere()) {
            $this->where($where);
        }
    }

    protected function getDefaultUri(): ?string
    {
        return null;
    }

    protected function getDefaultMethods(): string|array|null
    {
        return null;
    }

    protected function getDefaultWhere(): array
    {
        return [];
    }
}
