<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class DeleteEntryTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'streams.api.entries.delete';
    }

    public function setUp(): void
    {
        parent::setUp();

        $file = base_path('vendor/streams/api/tests/data/examples/test_delete.json');

        if (!file_exists($file)) {
            file_put_contents($file, json_encode([
                'name' => 'Delete Me!',
            ]));
        }
    }

    public function testResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([], [
            'entry' => 'test_delete',
            'stream' => 'testing.examples',
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

        $file = base_path('vendor/streams/api/tests/data/examples/test_delete.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
