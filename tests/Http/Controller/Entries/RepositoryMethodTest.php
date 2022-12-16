<?php

namespace Streams\Api\Tests\Http\Controller\Entries;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\URL;
use Streams\Core\Repository\Repository;
use Streams\Core\Support\Facades\Streams;
use Illuminate\Contracts\Pagination\Paginator;

class RepositoryMethodTest extends ApiTestCase
{
    public function test_it_returns_standard_response_structure()
    {
        $response = $this->get(URL::route('streams.api.entries.repository', [
            'stream' => 'films',
            'method' => 'all',
        ]));

        $response->assertStatus(200);

        $this->assertTrue(isset($response['errors']));
        $this->assertTrue(isset($response['links']));
        $this->assertTrue(isset($response['meta']));
        $this->assertTrue(isset($response['data']));
    }

    public function test_it_supports_method_parameters()
    {
        $response = $this->get(URL::route('streams.api.entries.repository', [
            'stream' => 'films',
            'method' => 'findBy',
            'field' => 'title',
            'value' => 'Return of the Jedi',
        ]));

        $this->assertEquals($response['data']['title'], 'Return of the Jedi');
    }

    public function test_it_supports_paginated_results()
    {
        Streams::overload('films', [
            'config' => [
                'repository' => RepositoryWithPagination::class,
            ],
        ]);

        $response = $this->call('GET', URL::route('streams.api.entries.repository', [
            'stream' => 'films',
            'method' => 'paginateTest',
            'per' => 3,
            'page' => 2,
        ]));

        $this->assertTrue(isset($response['links']['next_page']));
        $this->assertTrue(isset($response['links']['first_page']));
        $this->assertTrue(isset($response['links']['previous_page']));

        $this->assertTrue(isset($response['meta']['per_page']));
        $this->assertTrue(isset($response['meta']['last_page']));
        $this->assertTrue(isset($response['meta']['current_page']));
    }
}

class RepositoryWithPagination extends Repository
{
    public function paginateTest(int $per = 10, int $page = 1): Paginator
    {
        return Streams::entries('films')->paginate([
            'per_page' => $per,
        ]);
    }
}
