<?php

namespace Streams\Api;

class ApiManager
{
    protected array $interfaces = [];
    protected array $booted = [];

    public function interface(ApiInterface $interface): void
    {
        $this->interfaces[$interface->getId()] = $interface;

        $interface->register();
    }

    public function getInterfaces()
    {
        return $this->interfaces;
        // return $this->evalulate($this->interfaces);
    }
}
