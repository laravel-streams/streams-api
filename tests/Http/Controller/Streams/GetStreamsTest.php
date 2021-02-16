<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Core\Stream\Stream;
use Illuminate\Support\Collection;
use Streams\Core\Support\Facades\Streams;
use Streams\Api\Tests\Http\Controller\ApiControllerTest;

class GetStreamsTest extends ApiControllerTest
{

    public function getRouteName(): string
    {
        return 'ls.api.streams.index';
    }

    public function testResponseStructure()
    {
        //Streams::load(base_path('vendor/streams/api/tests/examples.json'));

        $response = $this->callRouteAction();

        $response->assertStatus(200);

        $json = $response->getContent();

        $content = json_decode($json, true);

        $this->assertTrue(array_key_exists('data', $content));
        $this->assertTrue(array_key_exists('meta', $content));
        $this->assertTrue(array_key_exists('links', $content));
    }
}
