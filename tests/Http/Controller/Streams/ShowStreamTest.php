<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class ShowStreamTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'streams.api.streams.show';
    }

    public function testResponseStructure()
    {
        Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction([], [
            'stream' => 'testing.examples',
        ]);

        $response->assertStatus(200);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('links', $content));
    }
}
