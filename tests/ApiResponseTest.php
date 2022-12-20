<?php

namespace Streams\Api\Tests;

use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\URL;

class ApiResponseTest extends ApiTestCase
{
    public function test_it_makes_json_responses()
    {
        $response = new ApiResponse('films');

        $this->assertInstanceOf(JsonResponse::class, $response->make());
    }

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'films',
            'limit' => 3,
            'where[director]' => 'George Lucas',
        ]));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_supports_modifiers()
    {
        $response = (new ApiResponse('films'))
            ->setStatus(404)
            ->addHeader('Powered-By', 'Streams')
            ->addHeader('Author', 'Ryan')
            ->removeHeader('Author')
            ->addError(['Error Example'])
            ->addLink('docs', 'https://example.com')
            ->addLink('login', 'https://example.com/login')
            ->removeLink('login', 'https://example.com/login')
            ->addMeta('foo', 'bar')
            ->addMeta('baz', 'test')
            ->removeMeta('baz')
            ->setData(['Testing'])
            ->make();
        
        $content = json_decode($response->content(), true);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Streams', $response->headers->get('Powered-By'));
        $this->assertNull($response->headers->get('Author'));
        $this->assertEquals('https://example.com', $content['links']['docs']);
        $this->assertNull(Arr::get($content['links'], 'login'));
        $this->assertNotEmpty($content['errors']);
        $this->assertEquals('bar', $content['meta']['foo']);
        $this->assertNull(Arr::get($content['meta'], 'baz'));
        $this->assertEquals(['Testing'], $content['data']);
    }
}
