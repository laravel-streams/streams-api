<?php

namespace Streams\Api\Builders\Endpoints\Concerns;

trait HasRouteDefinition
{
    protected string|array $methods = 'get';

    protected ?string $uri = null;

    protected ?string $routeName = null;

    protected string|array $routeMiddleware = [];

    protected string|array $withoutRouteMiddleware = [];

    protected array $where = [];

    public function methods(string|array $methods): static
    {
        $this->methods = $methods;

        return $this;
    }

    public function uri(string $uri): static
    {
        $this->uri = $uri;

        return $this;
    }

    public function routeName(?string $name): static
    {
        $this->routeName = $name;

        return $this;
    }

    public function routeMiddleware(string|array $middleware): static
    {
        $this->routeMiddleware = $middleware;

        return $this;
    }

    public function withoutRouteMiddleware(string|array $middleware): static
    {
        $this->withoutRouteMiddleware = $middleware;

        return $this;
    }

    public function where(array $constraints): static
    {
        $this->where = [
            ...$this->where,
            ...$constraints,
        ];

        return $this;
    }

    public function getMethods(): string|array
    {
        return $this->methods;
    }

    public function getUri(): ?string
    {
        return $this->uri;
    }

    public function getRouteName(): ?string
    {
        return $this->routeName;
    }

    public function getRouteMiddleware(): string|array
    {
        return $this->routeMiddleware;
    }

    public function getWithoutRouteMiddleware(): string|array
    {
        return $this->withoutRouteMiddleware;
    }

    public function getWhere(): array
    {
        return $this->where;
    }
}
