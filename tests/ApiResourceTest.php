<?php

namespace Streams\Api\Tests;

use Streams\Api\ApiResource;
use Streams\Api\ApiInterface;
use Illuminate\Support\Facades\Route;

class ApiResourceTest extends ApiTestCase
{
    public function test_get_slug_uses_static_slug_property()
    {
        $resource = new class extends ApiResource
        {
            protected static ?string $slug = 'custom-slug';
        };

        $this->assertEquals('custom-slug', $resource::getSlug());
    }

    public function test_get_slug_generates_from_class_name_when_no_slug_set()
    {
        $resource = new class extends ApiResource {};

        // Anonymous class name will be converted to kebab case
        $slug = $resource::getSlug();

        $this->assertIsString($slug);
        $this->assertNotEmpty($slug);
    }

    public function test_get_slug_converts_class_name_to_kebab_case()
    {
        $resource = new MyTestResource;

        $this->assertEquals('my-test-resource', $resource::getSlug());
    }

    public function test_get_route_base_name_includes_interface_id()
    {
        $resource = new class extends ApiResource
        {
            protected static ?string $slug = 'posts';
        };

        $interface = new ApiInterface('admin');

        // Mock the API facade to return our interface
        $baseName = $resource::getRouteBaseName('admin');

        $this->assertEquals('streams.api.admin.posts', $baseName);
    }

    public function test_get_route_base_name_replaces_slashes_with_dots()
    {
        $resource = new class extends ApiResource
        {
            protected static ?string $slug = 'admin/posts';
        };

        $baseName = $resource::getRouteBaseName('admin');

        $this->assertEquals('streams.api.admin.admin.posts', $baseName);
    }

    public function test_get_route_middleware_returns_empty_array_by_default()
    {
        $resource = new class extends ApiResource {};

        $interface = new ApiInterface;
        $middleware = $resource::getRouteMiddleware($interface);

        $this->assertEquals([], $middleware);
    }

    public function test_get_route_middleware_returns_configured_middleware()
    {
        $resource = new class extends ApiResource
        {
            protected static string|array $middleware = ['auth', 'verified'];
        };

        $interface = new ApiInterface;
        $middleware = $resource::getRouteMiddleware($interface);

        $this->assertEquals(['auth', 'verified'], $middleware);
    }

    public function test_get_route_middleware_can_be_string()
    {
        $resource = new class extends ApiResource
        {
            protected static string|array $middleware = 'auth';
        };

        $interface = new ApiInterface;
        $middleware = $resource::getRouteMiddleware($interface);

        $this->assertEquals(['auth'], $middleware);
    }

    public function test_get_without_route_middleware_returns_empty_array_by_default()
    {
        $resource = new class extends ApiResource {};

        $interface = new ApiInterface;
        $withoutMiddleware = $resource::getWithoutRouteMiddleware($interface);

        $this->assertEquals([], $withoutMiddleware);
    }

    public function test_get_without_route_middleware_returns_configured_middleware()
    {
        $resource = new class extends ApiResource
        {
            protected static string|array $withoutMiddleware = ['throttle'];
        };

        $interface = new ApiInterface;
        $withoutMiddleware = $resource::getWithoutRouteMiddleware($interface);

        $this->assertEquals(['throttle'], $withoutMiddleware);
    }

    public function test_get_without_route_middleware_can_be_string()
    {
        $resource = new class extends ApiResource
        {
            protected static string|array $withoutMiddleware = 'throttle';
        };

        $interface = new ApiInterface;
        $withoutMiddleware = $resource::getWithoutRouteMiddleware($interface);

        $this->assertEquals(['throttle'], $withoutMiddleware);
    }

    public function test_get_endpoints_returns_empty_array_by_default()
    {
        $resource = new class extends ApiResource {};

        $endpoints = $resource::getEndpoints();

        $this->assertIsArray($endpoints);
        $this->assertEmpty($endpoints);
    }

    public function test_get_endpoints_can_be_overridden()
    {
        $resource = new class extends ApiResource
        {
            public static function getEndpoints(): array
            {
                return [
                    'index' => 'IndexController',
                    'show' => 'ShowController',
                ];
            }
        };

        $endpoints = $resource::getEndpoints();

        $this->assertCount(2, $endpoints);
        $this->assertEquals('IndexController', $endpoints['index']);
        $this->assertEquals('ShowController', $endpoints['show']);
    }

    public function test_routes_method_registers_routes()
    {
        // Clear any existing routes
        Route::getRoutes()->refreshNameLookups();

        $resource = new class extends ApiResource
        {
            protected static ?string $slug = 'test-resource';

            public static function getEndpoints(): array
            {
                return [
                    'index' => function () {
                        return 'index';
                    },
                ];
            }
        };

        $interface = new ApiInterface('test');

        // Register routes
        $resource::routes($interface);

        // Check if route was registered
        $routes = Route::getRoutes();
        $registered = false;

        foreach ($routes as $route) {
            if (str_contains($route->getName() ?? '', 'test-resource')) {
                $registered = true;
                break;
            }
        }

        $this->assertTrue($registered);
    }

    public function test_routes_method_uses_slug_as_prefix()
    {
        Route::getRoutes()->refreshNameLookups();

        $resource = new class extends ApiResource
        {
            protected static ?string $slug = 'my-prefix';

            public static function getEndpoints(): array
            {
                return [
                    'test' => function () {
                        return 'test';
                    },
                ];
            }
        };

        $interface = new ApiInterface;
        $resource::routes($interface);

        $routes = Route::getRoutes();
        $foundPrefix = false;

        foreach ($routes as $route) {
            if (str_contains($route->uri(), 'my-prefix')) {
                $foundPrefix = true;
                break;
            }
        }

        $this->assertTrue($foundPrefix);
    }

    public function test_routes_method_converts_slug_to_dot_notation_for_names()
    {
        Route::getRoutes()->refreshNameLookups();

        $resource = new class extends ApiResource
        {
            protected static ?string $slug = 'admin/posts';

            public static function getEndpoints(): array
            {
                return [
                    'index' => function () {
                        return 'index';
                    },
                ];
            }
        };

        $interface = new ApiInterface;
        $resource::routes($interface);

        $routes = Route::getRoutes();
        $foundDotNotation = false;

        foreach ($routes as $route) {
            $name = $route->getName() ?? '';
            if (str_contains($name, 'admin.posts.')) {
                $foundDotNotation = true;
                break;
            }
        }

        $this->assertTrue($foundDotNotation);
    }
}

class MyTestResource extends ApiResource {}
