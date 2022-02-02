<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Illuminate\Support\Facades\URL;
use Streams\Api\Tests\ApiTestCase;
use Streams\Core\Support\Facades\Streams;

class GetEntriesTest extends ApiTestCase
{

    public function test_response_structure()
    {
        $response = $this->get(URL::route('streams.api.entries.index', [
            'stream' => 'films',
        ]));

        $response->assertStatus(200);
        
        $this->assertTrue(isset($response['data']));
    }
}
