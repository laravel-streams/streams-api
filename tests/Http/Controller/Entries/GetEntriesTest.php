<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class GetEntriesTest extends ApiTestCase
{
    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'films',
        ]));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_returns_stream_entries()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'films',
        ]));

        $this->assertEquals(Streams::entries('films')->count(), count($response['data']));
    }

    public function test_it_returns_constrained_stream_entries()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'films',
            'where[director]' => 'George Lucas',
        ]));

        $entries = Streams::entries('films')->where('director', 'George Lucas')->count();

        $this->assertEquals($entries, count($response['data']));

        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'films',
            'where[director]' => 'George Lucas',
            'limit' => 1,
            'skip' => 2,
            'order_by[title]' => 'ASC',
        ]));

        $entries = Streams::entries('films')
            ->where('director', 'George Lucas')
            ->orderBy('title', 'ASC')
            ->limit(1, 2)
            ->get();

        $this->assertEquals(
            $entries->first()->title,
            array_values($response['data'])[0]['title']
        );
    }

    public function test_it_returns_paginated_stream_entries()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'films',
            'per_page' => 2,
            'page' => 2,
        ]));

        $this->assertTrue(isset($response['links']['next_page']));
        $this->assertTrue(isset($response['links']['first_page']));
        $this->assertTrue(isset($response['links']['previous_page']));

        $this->assertTrue(isset($response['meta']['per_page']));
        $this->assertTrue(isset($response['meta']['last_page']));
        $this->assertTrue(isset($response['meta']['current_page']));
    }

    public function test_it_eager_loads_requested_relationships()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'people',
            'with' => ['homeworld'],
            'limit' => 1,
        ]));

        $response->assertStatus(200);

        $person = array_values($response['data'])[0];

        $this->assertIsArray($person['homeworld']);
        $this->assertEquals('Tatooine', $person['homeworld']['name']);
    }

    public function test_it_ignores_unknown_with_relations()
    {
        $response = $this->get(URL::route('streams.api.entries.list', [
            'stream' => 'people',
            'with' => ['not_a_relation'],
            'limit' => 1,
        ]));

        $response->assertStatus(200);

        $person = array_values($response['data'])[0];

        $this->assertTrue(is_scalar($person['homeworld']) || $person['homeworld'] === null);
    }
}
