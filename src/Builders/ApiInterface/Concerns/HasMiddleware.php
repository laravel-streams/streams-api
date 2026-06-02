<?php

namespace Streams\Api\Builders\ApiInterface\Concerns;

trait HasMiddleware
{
    protected array $middleware = [];

    public function middleware(array $middleware): static
    {
        $this->middleware = [
            ...$this->middleware,
            ...$middleware,
        ];

        return $this;
    }

    public function getMiddleware(): array
    {
        return $this->middleware;
    }
}
