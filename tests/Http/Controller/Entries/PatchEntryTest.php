<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class PatchEntryTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'ls.api.entries.patch';
    }

    public function setUp(): void
    {
        parent::setUp();

        $file = base_path('vendor/streams/api/tests/data/examples/test_patch.json');

        if (!file_exists($file)) {
            file_put_contents($file, json_encode([
                'name' => 'Patch Me!',
            ]));
        }
    }

    public function testResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([
            'name' => 'Patched!',
        ], [
            'entry' => 'test_patch',
            'stream' => 'testing.examples',
        ]);

        $response->assertStatus(200);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('links', $content));

        $entry = Streams::make('testing.examples')->find('test_patch');

        $this->assertEquals('Patched!', $entry->name);
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $file = base_path('vendor/streams/api/tests/data/examples/test_patch.json');

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
