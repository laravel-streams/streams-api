<?php

namespace Streams\Api\Builders\ApiInterface\Concerns;

trait HasResources
{
    protected array $resources = [];

    public function resources(array $resources): static
    {
        $this->resources = [
            ...$this->resources,
            ...$resources,
        ];

        return $this;
    }

    public function getResources(): array
    {
        return $this->resources;
    }
}
