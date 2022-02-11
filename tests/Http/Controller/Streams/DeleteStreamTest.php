<?php

namespace Streams\Api\Tests\Http\Controller\Streams;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Support\Facades\Streams;

class DeleteStreamTest extends ApiTestCase
{

    public function test_it_returns_an_empty_response()
    {
        $response = $this->delete(URL::route('streams.api.streams.delete', [
            'stream' => 'films',
        ]));

        $response->assertNoContent(204);

        $this->assertNull(Streams::repository('core.streams')->find('films'));
    }

    public function test_it_returns_404_not_found()
    {
        $response = $this->delete(URL::route('streams.api.streams.delete', [
            'stream' => 'sources',
        ]));

        $response->assertStatus(404);

        $this->assertTrue(isset($response['errors'][0]['message']));

        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));

        $this->assertNull($response['data']);
    }
}
