<?php

namespace Streams\Api\Builders\ApiInterface\Concerns;

trait HasTenant
{
    protected mixed $tenant = null;

    protected mixed $cachedTenant = null;

    public function tenant(mixed $tenant): static
    {
        $this->tenant = $tenant;

        return $this;
    }

    public function hasTenant(): bool
    {
        return $this->tenant !== null;
    }

    public function getTenant(): mixed
    {
        return $this->cachedTenant ?: $this->cachedTenant = $this->evaluate($this->tenant);
    }
}
