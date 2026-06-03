<?php

namespace Streams\Api;

use Streams\Api\Builders\ApiInterface\Concerns\HasEndpoints;
use Streams\Api\Builders\ApiInterface\Concerns\HasId;
use Streams\Api\Builders\ApiInterface\Concerns\HasMiddleware;
use Streams\Api\Builders\ApiInterface\Concerns\HasResources;
use Streams\Api\Builders\ApiInterface\Concerns\HasRoutes;
use Streams\Api\Builders\ApiInterface\Concerns\HasTenant;
use Streams\Api\Builders\Builder;

class ApiInterface extends Builder
{
    use HasEndpoints;
    use HasId;
    use HasMiddleware;
    use HasResources;
    use HasRoutes;
    use HasTenant;

    public function __construct(?string $id = null)
    {
        if ($id) {
            $this->id($id);
        }
    }

    public static function make(?string $id = null): static
    {
        $instance = app(static::class, [
            'id' => $id,
        ]);

        $instance->configure();

        return $instance;
    }

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        //
    }
}
