<?php

namespace Streams\Api\Builders\ApiInterface\Concerns;

trait HasEndpoints
{
    protected array $endpoints = [];

    public function endpoints(array $endpoints): static
    {
        $this->endpoints = [
            ...$this->endpoints,
            ...$endpoints,
        ];

        return $this;
    }

    public function getEndpoints(): array
    {
        return $this->endpoints;
    }
}
