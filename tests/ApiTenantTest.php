<?php

namespace Streams\Api\Tests;

use Streams\Api\ApiInterface;
use Streams\Api\Support\Facades\API;

class ApiTenantTest extends ApiTestCase
{
    public function test_get_tenant_returns_null_when_no_resolver_is_registered(): void
    {
        $this->assertNull(API::getTenant());
    }

    public function test_tenant_resolver_is_registered_and_resolved(): void
    {
        API::tenant(fn () => 'organization-1');

        $this->assertSame('organization-1', API::getTenant());
    }

    public function test_get_tenant_is_resolved_once_per_request(): void
    {
        $calls = 0;

        API::tenant(function () use (&$calls) {
            $calls++;

            return 'organization-1';
        });

        API::getTenant();
        API::getTenant();

        $this->assertSame(1, $calls);
    }

    public function test_current_interface_tenant_takes_precedence_over_global_resolver(): void
    {
        API::tenant(fn () => 'global');

        $interface = ApiInterface::make('tenant-api')
            ->path('tenant-api')
            ->tenant(fn () => 'interface');

        API::interface($interface);
        API::setCurrentApiInterface($interface);

        $this->assertSame('interface', API::getTenant());
    }

    public function test_interface_can_define_tenant_with_chaining(): void
    {
        $interface = new ApiInterface('test-api');

        $result = $interface->tenant(fn () => 'org');

        $this->assertSame($interface, $result);
        $this->assertTrue($interface->hasTenant());
        $this->assertSame('org', $interface->getTenant());
    }
}
