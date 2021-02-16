<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Tests\TestCase;
use Illuminate\Routing\Route;
use Streams\Core\Stream\Stream;
use Illuminate\Support\Collection;
use Illuminate\Foundation\Auth\User;
use Illuminate\Testing\TestResponse;
use Streams\Core\Support\Facades\Streams;

class GetStreamsTest extends TestCase
{

    public function setUp(): void
    {
        $this->createApplication();

        Streams::load(base_path('vendor/streams/api/tests/examples.json'));
    }

    public function testIndexMethod()
    {
        $response = $this->callRouteAction(
            'streams.api.streams.index'
        );

        $json = $response->getContent();

        $this->assertJson($json);

        $json = json_decode($json, true);

        $streams = new Collection($json['data']);
        
        $this->assertInstanceOf(Stream::class, $streams->where('handle', 'testing.examples')->first());
    }

    public function assertRouteContainsMiddleware($name, ...$names)
    {
        $route = $this->getRouteByName($name);

        foreach ($names as $name) {
            $this->assertContains(
                $name,
                $route->middleware(),
                "Route doesn't contain middleware [{$name}]"
            );
        }

        return $this;
    }

    public function assertRouteHasExactMiddleware($name, ...$names)
    {
        $route = $this->getRouteByName($name);

        $this->assertRouteContainsMiddleware(...$names);
        $this->assertTrue(count($names) === count($route->middleware()), 'Route contains not the same amount of middleware.');

        return $this;
    }


    /**
     * @return Route
     */
    private function getRouteByName($name): Route
    {
        $routes = \Illuminate\Support\Facades\Route::getRoutes();

        /** @var Route $route */
        $route = $routes->getByName($name);

        if (!$route) {
            $this->fail("Route with name [{$name}] not found!");
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
    protected function callRouteAction($name, array $data = [], array $parameters = [], array $headers = []): TestResponse
    {
        $route = $this->getRouteByName($name);
        $method = $route->methods()[0];
        $url = route($name, $parameters);

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
