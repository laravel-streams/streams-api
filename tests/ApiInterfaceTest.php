<?php

namespace Streams\Api\Tests;

use Streams\Api\ApiInterface;

class ApiInterfaceTest extends ApiTestCase
{
    public function test_it_can_be_instantiated_with_id()
    {
        $interface = new ApiInterface('test-api');

        $this->assertInstanceOf(ApiInterface::class, $interface);
        $this->assertEquals('test-api', $interface->getId());
    }

    public function test_it_can_be_instantiated_without_id()
    {
        $interface = new ApiInterface;

        $this->assertInstanceOf(ApiInterface::class, $interface);
        $this->assertNull($interface->getId());
    }

    public function test_it_can_set_id()
    {
        $interface = new ApiInterface;
        $interface->id('my-api');

        $this->assertEquals('my-api', $interface->getId());
    }

    public function test_id_returns_instance_for_chaining()
    {
        $interface = new ApiInterface;
        $result = $interface->id('test');

        $this->assertSame($interface, $result);
    }

    public function test_it_can_add_middleware()
    {
        $interface = new ApiInterface;
        $interface->middleware(['auth', 'throttle:60,1']);

        $middleware = $interface->getMiddleware();

        $this->assertCount(2, $middleware);
        $this->assertContains('auth', $middleware);
        $this->assertContains('throttle:60,1', $middleware);
    }

    public function test_it_can_add_multiple_middleware_calls()
    {
        $interface = new ApiInterface;
        $interface->middleware(['auth']);
        $interface->middleware(['throttle:60,1']);

        $middleware = $interface->getMiddleware();

        $this->assertCount(2, $middleware);
        $this->assertContains('auth', $middleware);
        $this->assertContains('throttle:60,1', $middleware);
    }

    public function test_middleware_returns_instance_for_chaining()
    {
        $interface = new ApiInterface;
        $result = $interface->middleware(['auth']);

        $this->assertSame($interface, $result);
    }

    public function test_it_can_add_resources()
    {
        $interface = new ApiInterface;
        $interface->resources(['posts', 'comments']);

        $resources = $interface->getResources();

        $this->assertCount(2, $resources);
        $this->assertContains('posts', $resources);
        $this->assertContains('comments', $resources);
    }

    public function test_it_can_add_multiple_resources_calls()
    {
        $interface = new ApiInterface;
        $interface->resources(['posts']);
        $interface->resources(['comments']);

        $resources = $interface->getResources();

        $this->assertCount(2, $resources);
        $this->assertContains('posts', $resources);
        $this->assertContains('comments', $resources);
    }

    public function test_resources_merges_without_stripping_duplicates()
    {
        $interface = new ApiInterface;
        $interface->resources(['posts']);
        $interface->resources(['posts', 'comments']);

        $resources = $interface->getResources();

        $this->assertCount(3, $resources);
        $this->assertSame(['posts', 'posts', 'comments'], $resources);
    }

    public function test_resources_returns_instance_for_chaining()
    {
        $interface = new ApiInterface;
        $result = $interface->resources(['posts']);

        $this->assertSame($interface, $result);
    }

    public function test_it_can_add_endpoints()
    {
        $interface = new ApiInterface;
        $interface->endpoints(['api.users.index', 'api.users.show']);

        $endpoints = $interface->getEndpoints();

        $this->assertCount(2, $endpoints);
        $this->assertContains('api.users.index', $endpoints);
        $this->assertContains('api.users.show', $endpoints);
    }

    public function test_it_can_add_multiple_endpoints_calls()
    {
        $interface = new ApiInterface;
        $interface->endpoints(['api.users.index']);
        $interface->endpoints(['api.users.show']);

        $endpoints = $interface->getEndpoints();

        $this->assertCount(2, $endpoints);
        $this->assertContains('api.users.index', $endpoints);
        $this->assertContains('api.users.show', $endpoints);
    }

    public function test_endpoints_merges_without_stripping_duplicates()
    {
        $interface = new ApiInterface;
        $interface->endpoints(['api.users.index']);
        $interface->endpoints(['api.users.index', 'api.users.show']);

        $endpoints = $interface->getEndpoints();

        $this->assertCount(3, $endpoints);
    }

    public function test_endpoints_returns_instance_for_chaining()
    {
        $interface = new ApiInterface;
        $result = $interface->endpoints(['api.users.index']);

        $this->assertSame($interface, $result);
    }

    public function test_it_can_set_path()
    {
        $interface = new ApiInterface;
        $interface->path('/api/v1');

        $this->assertEquals('/api/v1', $interface->getPath());
    }

    public function test_path_defaults_to_empty_string()
    {
        $interface = new ApiInterface;

        $this->assertEquals('', $interface->getPath());
    }

    public function test_path_returns_instance_for_chaining()
    {
        $interface = new ApiInterface;
        $result = $interface->path('/api/v1');

        $this->assertSame($interface, $result);
    }

    public function test_it_can_set_routes_closure()
    {
        $interface = new ApiInterface;
        $routesClosure = function () {
            return 'routes';
        };

        $interface->routes($routesClosure);

        $this->assertSame($routesClosure, $interface->getRoutes());
    }

    public function test_routes_defaults_to_null()
    {
        $interface = new ApiInterface;

        $this->assertNull($interface->getRoutes());
    }

    public function test_routes_returns_instance_for_chaining()
    {
        $interface = new ApiInterface;
        $result = $interface->routes(fn () => null);

        $this->assertSame($interface, $result);
    }

    public function test_it_can_be_made_via_static_make_method()
    {
        $interface = ApiInterface::make('test-api');

        $this->assertInstanceOf(ApiInterface::class, $interface);
        $this->assertEquals('test-api', $interface->getId());
    }

    public function test_make_resolves_from_container()
    {
        $interface = ApiInterface::make();

        $this->assertInstanceOf(ApiInterface::class, $interface);
    }

    public function test_fluent_interface_chaining()
    {
        $interface = new ApiInterface;

        $result = $interface
            ->id('my-api')
            ->path('/api/v1')
            ->middleware(['auth'])
            ->resources(['posts'])
            ->endpoints(['api.posts.index']);

        $this->assertSame($interface, $result);
        $this->assertEquals('my-api', $interface->getId());
        $this->assertEquals('/api/v1', $interface->getPath());
        $this->assertCount(1, $interface->getMiddleware());
        $this->assertCount(1, $interface->getResources());
        $this->assertCount(1, $interface->getEndpoints());
    }

    public function test_register_method_can_be_called()
    {
        $interface = new ApiInterface;

        // Should not throw an exception
        $interface->register();

        $this->assertTrue(true);
    }

    public function test_boot_method_can_be_called()
    {
        $interface = new ApiInterface;

        // Should not throw an exception
        $interface->boot();

        $this->assertTrue(true);
    }
}
