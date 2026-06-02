<?php

namespace Streams\Api\Builders\Endpoints;

use Illuminate\Routing\Route;
use Streams\Api\ApiInterface;

class EndpointRouter
{
    public function __construct(
        protected string $endpoint,
        protected \Closure $route,
    ) {}

    public function registerRoute(ApiInterface $interface): ?Route
    {
        return ($this->route)($interface);
    }

    public function getEndpoint(): string
    {
        return $this->endpoint;
    }
}
