<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class PatchStreamTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'streams.api.streams.patch';
    }

    public function setUp(): void
    {
        parent::setUp();

        $file = base_path('streams/api_test_patch_stream.json');

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
        $response = $this->callRouteAction([
            'name' => 'Patched!',
        ], [
            'stream' => 'api_test_patch_stream',
        ]);

        $response->assertStatus(200);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('links', $content));

        $instance = Streams::entries('core.streams')->find('api_test_patch_stream');

        $this->assertEquals('Patched!', $instance->name);
    }

    public function test404ResponseStructure()
    {
        $response = $this->callRouteAction([
            'name' => '404!',
        ], [
            'stream' => 'api_test_patch_stream_test_404',
        ]);

        $response->assertStatus(404);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('errors', $content));
    }

    public function test400ResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([], [
            'stream' => 'api_test_patch_stream',
        ]);

        $response->assertStatus(400);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('errors', $content));
    }

    // public function test409ResponseStructure()
    // {
    //     $response = $this->callRouteAction([
    //         'name' => 'Sm',
    //     ], [
    //         'entry' => 'test_patch',
    //         'stream' => 'testing.examples',
    //     ]);

    //     $response->assertStatus(409);

    //     $json = $response->getContent();

    //     $content = json_decode($json, true);

    //     $this->assertTrue(array_key_exists('data', $content));
    //     $this->assertTrue(array_key_exists('meta', $content));
    //     $this->assertTrue(array_key_exists('errors', $content));
    // }

    public function tearDown(): void
    {
        parent::tearDown();

        $file = base_path('streams/api_test_patch_stream.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
