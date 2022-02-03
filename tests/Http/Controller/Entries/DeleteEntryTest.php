<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class DeleteEntryTest extends ApiTestCase
{

    public function test_it_returns_an_empty_response()
    {
        $response = $this->delete(URL::route('streams.api.entries.delete', [
            'stream' => 'films',
            'entry' => 4,
        ]));

        $response->assertNoContent(204);

        $this->assertEquals(6, Streams::entries('films')->count());
    }

    public function test_it_returns_404_not_found()
    {
        $response = $this->delete(URL::route('streams.api.entries.delete', [
            'stream' => 'films',
            'entry' => 400,
        ]));

        $response->assertStatus(404);

        $this->assertTrue(isset($response['errors'][0]['message']));

        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        
        $this->assertNull($response['data']);

        $this->assertEquals(7, Streams::entries('films')->count());
    }
}
