<?php

namespace Streams\Api\Tests;

use Tests\TestCase;
use Illuminate\Routing\Route;
use Illuminate\Foundation\Auth\User;
use Illuminate\Testing\TestResponse;

abstract class ApiTestCase extends TestCase
{

    /**
     * The route name
     *
     * @return string
     */
    abstract public function getRouteName(): string;

    public function assertRouteContainsMiddleware(...$names)
    {
        $route = $this->getRouteByName();

        foreach ($names as $name) {
            $this->assertContains(
                $name,
                $route->middleware(),
                "Route doesn't contain middleware [{$name}]"
            );
        }

        return $this;
    }

    public function assertRouteHasExactMiddleware(...$names)
    {
        $route = $this->getRouteByName();

        $this->assertRouteContainsMiddleware(...$names);
        $this->assertTrue(count($names) === count($route->middleware()), 'Route contains not the same amount of middleware.');

        return $this;
    }


    /**
     * @return Route
     */
    private function getRouteByName(): Route
    {
        $routes = \Illuminate\Support\Facades\Route::getRoutes();

        /** @var Route $route */
        $route = $routes->getByName($this->getRouteName());

        if (!$route) {
            $this->fail("Route with name [{$this->getRouteName()}] not found!");
        }

        return $route;
    }

    /**
     * Call an unauthorized request to the controller
     *
     * @param array $data Request body
     * @param array $parameters Route parameters
     * @param array $headers Request headers
     *
     * @return TestResponse
     */
    protected function callRouteAction(array $data = [], array $parameters = [], array $headers = []): TestResponse
    {
        $route = $this->getRouteByName();
        $method = $route->methods()[0];
        $url = route($this->getRouteName(), $parameters);

        return $this->json($method, $url, $data, $headers);
    }

    /**
     * 
     * Call an authorized request from random user to the controller
     *
     * @param array $data Request body
     * @param array $parameters Route parameters
     * @param array $headers Request headers
     * @param array $scopes
     *
     * @return TestResponse
     */
    protected function callAuthorizedRouteAction(array $data = [], array $parameters = [], array $headers = [], array $scopes = []): TestResponse
    {
        $user = User::factory()->create();

        return $this->callAuthorizedByUserRouteAction($user, $data, $parameters, $headers, $scopes);
    }

    /**
     * Call an authorized request from given user to the controller
     *
     * @param User $user
     * @param array $data
     * @param array $parameters
     * @param array $headers
     * @param array $scopes
     *
     * @return TestResponse
     */
    protected function callAuthorizedByUserRouteAction(User $user, array $data = [], array $parameters = [], array $headers = [], array $scopes = []): TestResponse
    {
        $this->signIn($user, [], $scopes);

        return $this->callRouteAction($data, $parameters, $headers);
    }
}
