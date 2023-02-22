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
        $request = $this->createGetEntriesRequest();

        $request->headers->set('Cache-Control', 'no-cache');

        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $response->assertHeader('cache-control', 'no-cache, private');
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

    public function test_it_skips_when_cache_is_disabled()
    {
        Streams::extend('films', [
            'config' => [
                'cache' => [
                    'enabled' => false,
                ]
            ]
        ]);

        $request = $this->createGetEntriesRequest();

        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $response->assertHeader('cache-control', 'no-cache, private');
    }

    /**
     * @preserveGlobalState disabled
     * @runInSeparateProcess
     */
    public function test_it_supports_max_age()
    {
        $request = $this->createGetEntriesRequest();

        /**
         * The request should miss and
         * return an accurate entry count.
         */
        $request->headers->set('Cache-Control', 'public, max-age=600');

        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $this->assertSame(Streams::entries('films')->count(), count($response['data']));

        /**
         * Manually remove an item to bypass
         * internal cache management actions.
         */
        $file = base_path('streams/data/films.json');

        $json = json_decode(file_get_contents($file), true);

        unset($json[4]);

        file_put_contents($file, json_encode($json, JSON_PRETTY_PRINT));

        /**
         * The request should hit cache and return 
         * the previous count of data despite above.
         */
        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $this->assertSame(Streams::entries('films')->count() + 1, count($response['data']));

        /**
         * The request should miss again and
         * return an accurate entry count.
         */
        $request->headers->set('Cache-Control', 'public, max-age=0');

        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $this->assertSame(Streams::entries('films')->count(), count($response['data']));
    }

    /**
     * @preserveGlobalState disabled
     * @runInSeparateProcess
     */
    public function test_it_handles_if_none_match()
    {
        $request = $this->createGetEntriesRequest();

        /**
         * The request should miss and
         * return an accurate entry count.
         */
        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $response->assertHeader('Etag', '"' . md5($response->getContent()) . '"');

        $this->assertSame(Streams::entries('films')->count(), count($response['data']));

        /**
         * The request should cause an empty 302 response
         */
        $request->headers->set('If-None-Match', $response->headers->get('Etag'));

        $response = (new ApiCache)->handle($request, function () {
            return $this->call('GET', URL::route('streams.api.entries.list', [
                'stream' => 'films',
            ]));
        });

        $this->assertSame(304, $response->getStatusCode());
        $this->assertSame('', $response->getContent());
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
        $request = Request::create(URL::route('streams.api.entries.list', [
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
