<?php

namespace Streams\Api\Tests\Http\Middleware;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use Streams\Api\Http\Middleware\ApiCache;
use Streams\Core\Support\Facades\Streams;

class ApiCacheTest extends ApiTestCase
{
    public function test_it_skips_non_cacheable_requests()
    {
        Streams::extend('films', [
            'config' => [
                'cache' => [
                    'enabled' => true,
                ]
            ]
        ]);

        $request = $this->createPatchEntryRequest();

        $response = (new ApiCache)->handle($request, function () {
            return $this->json('PATCH', URL::route('streams.api.entries.patch', [
                'stream' => 'films',
                'entry' => 4,
            ]), [
                'title' => 'Test Title',
            ]);
        });

        $response->assertHeader('cache-control', 'no-cache, private');
    }

    public function test_it_respects_no_cache_header()
    {
        Streams::extend('films', [
            'config' => [
                'cache' => [
                    'enabled' => true,
                ]
            ]
        ]);

        $request = $this->createGetEntriesRequest();

        $request->headers->set('Cache-Control', 'no-cache');

        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.index', [
                'stream' => 'films',
            ]));
        });

        $response->assertHeader('cache-control', 'no-cache, private');

        // $file = base_path('streams/data/films.json');

        // $json = json_decode(file_get_contents($file), true);

        // unset($json[4]);

        // file_put_contents($file, json_encode($json, JSON_PRETTY_PRINT));
    }

    public function test_it_skips_when_stream_is_unknown()
    {
        Route::get('api/test', function () {
            return 'OK';
        });

        $this->setUpApplicationRoutes();

        $request = $this->createTestRequest();

        $response = (new ApiCache)->handle($request, function () use ($request) {
            return $this->get('api/test');
        });

        $response->assertHeader('cache-control', 'no-cache, private');
    }

    protected function createPatchEntryRequest()
    {
        $request = Request::create(URL::route('streams.api.entries.patch', [
            'stream' => 'films',
            'entry' => 4,
        ]), 'PATCH');

        $request->headers->set('Cache-Control', 'no-cache');

        $route = Route::getRoutes()->match($request);

        $request->setRouteResolver(function () use ($route) {
            return $route;
        });

        return $request;
    }

    protected function createGetEntriesRequest()
    {
        $request = Request::create(URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]), 'GET');

        $route = Route::getRoutes()->match($request);

        $request->setRouteResolver(function () use ($route) {
            return $route;
        });

        return $request;
    }

    protected function createTestRequest()
    {
        $request = Request::create('api/test', 'GET');

        $route = Route::getRoutes()->match($request);

        $request->setRouteResolver(function () use ($route) {
            return $route;
        });

        return $request;
    }
}
