<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class GetStreamsTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.streams.index'));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_returns_stream_entries()
    {
        $response = $this->get(URL::route('streams.api.streams.index'));

        $this->assertEquals(Streams::entries('core.streams')->count(), count($response['data']));
    }

    public function test_it_returns_constrained_stream_entries()
    {
        $response = $this->call('GET', URL::route('streams.api.streams.index'),
        [], [], [], [], json_encode([
            'parameters' => [['where' => ['id', 'like', 'p%']]]
        ]));

        $entries = Streams::entries('core.streams')->where('id', 'like', 'p%')->count();

        $this->assertEquals($entries, count($response['data']));
    }

    public function test_it_returns_paginated_stream_entries()
    {
        $response = $this->call('GET', URL::route('streams.api.streams.index'),
        ['per_page' => 2, 'page' => 2]);

        $this->assertTrue(isset($response['links']['next_page']));
        $this->assertTrue(isset($response['links']['first_page']));
        $this->assertTrue(isset($response['links']['previous_page']));

        $this->assertTrue(isset($response['meta']['per_page']));
        $this->assertTrue(isset($response['meta']['last_page']));
        $this->assertTrue(isset($response['meta']['current_page']));
    }
}
