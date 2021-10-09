<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class CreateEntryTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'streams.api.entries.create';
    }

    public function setUp(): void
    {
        parent::setUp();

        $file = base_path('vendor/streams/api/tests/data/examples/test_create.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function testResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([
            'id' => 'test_create',
            'name' => 'Test Create',
        ], [
            'stream' => 'testing.examples',
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
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([], [
            'stream' => 'testing.examples',
        ]);

        $response->assertStatus(400);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('errors', $content));
    }

    public function test409ResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([
            'id' => 'test_create',
            'name' => 'Sm',
        ], [
            'stream' => 'testing.examples',
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

        $file = base_path('vendor/streams/api/tests/data/examples/test_create.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
