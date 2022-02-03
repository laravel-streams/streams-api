<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class ShowStreamTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.streams.show', [
            'stream' => 'people',
        ]));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_returns_404_if_not_found()
    {
        $response = $this->get(URL::route('streams.api.streams.show', [
            'stream' => 'lost',
        ]));

        $response->assertStatus(404);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertNull($response['data']);
    }

    public function test_it_returns_a_stream_entry()
    {
        $response = $this->get(URL::route('streams.api.streams.show', [
            'stream' => 'people',
        ]));

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }
}
