<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Core\Stream\Stream;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class CreateStreamTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'streams.api.streams.create';
    }

    public function setUp(): void
    {
        parent::setUp();

        $file = base_path('streams/api_test_create_stream.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function testResponseStructure()
    {
        $response = $this->callRouteAction([
            'id' => 'api_test_create_stream',
            'name' => 'API Test Stream',
            'fields' => [
                'date' => 'datetime',
            ],
        ]);

        $response->assertStatus(201);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('links', $content));
        $this->assertTrue(array_key_exists('id', $content['data']));
    }

    public function test400ResponseStructure()
    {
        $response = $this->callRouteAction([]);

        $response->assertStatus(400);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('errors', $content));
    }

    /**
     * @return void
     * @expectedException
     */
    public function test409ResponseStructure()
    {
        $response = $this->callRouteAction([
            'name' => 'API Test Stream',
        ]);

        $response->assertStatus(409);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('errors', $content));
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $file = base_path('streams/api_test_create_stream.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
