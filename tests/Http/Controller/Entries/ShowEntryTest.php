<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class ShowEntryTest extends ApiTestCase
{

    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.entries.show', [
            'stream' => 'people',
            'entry' => '1',
        ]));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_returns_404_if_not_found()
    {
        $response = $this->get(URL::route('streams.api.entries.show', [
            'stream' => 'people',
            'entry' => '100',
        ]));

        $response->assertStatus(404);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertNull($response['data']);
    }

    public function test_it_returns_an_entry()
    {
        $response = $this->get(URL::route('streams.api.entries.show', [
            'stream' => 'people',
            'entry' => '1',
        ]));

        $this->assertEquals(Streams::entries('people')->find(1)->name, $response['data']['name']);
    }

    public function test_it_includes_relationship_links()
    {
        $response = $this->get(URL::route('streams.api.entries.show', [
            'stream' => 'people',
            'entry' => '1',
        ]));

        $this->assertTrue(isset($response['links']['homeworld']));
    }
}
