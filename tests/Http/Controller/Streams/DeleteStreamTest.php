<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class DeleteStreamTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'ls.api.streams.delete';
    }

    public function setUp(): void
    {
        parent::setUp();

        $file = base_path('streams/api_test_stream.json');

        if (!file_exists($file)) {
            file_put_contents($file, json_encode([
                'name' => 'API Test Stream',
                'fields' => [
                    'date' => 'datetime',
                ],
            ]));
        }
    }

    public function testResponseStructure()
    {
        Streams::load(base_path('streams/api_test_stream.json'));

        $response = $this->callRouteAction([], [
            'stream' => 'api_test_stream',
        ]);

        $response->assertStatus(204);
    }

    public function test404ResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([
            'name' => 'Updated!',
        ], [
            'entry' => 'test_404',
            'stream' => 'testing.examples',
        ]);

        $response->assertStatus(404);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('errors', $content));
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $file = base_path('streams/api_test_stream.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
