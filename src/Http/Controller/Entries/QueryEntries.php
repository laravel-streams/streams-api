<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Str;
use Streams\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Streams\Core\Criteria\Criteria;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\URL;
use Streams\Core\Entry\Contract\EntryInterface;
use Streams\Core\Support\Facades\Streams;

class QueryEntries extends Controller
{
    public function __invoke(string $stream, string $method = null): JsonResponse
    {
        $response = new ApiResponse($stream);

        $parameters = Request::json('parameters', []);

        $criteria = $response->stream->entries();

        // Seems unnecessary with the performPayload.
        // if ($method) {
        //     $criteria = $criteria->{Str::camel($method)}(...Request::query());
        // }

        $this->performPayload($criteria, $parameters);

        if (Request::get('limit') == 1) {
            
            if ($results = $criteria->first()) {
                $this->addRelationshipLinks($response, $results);
            }

            $response->setData($results);
        } else {
            $results = $criteria->paginate([
                'per_page' => Request::get('per_page', 100),
                'page' => Request::get('page', 1),
            ]);

            $response->setData($results->all());
    
            $response->addMeta('total', $results->total());
            $response->addMeta('per_page', $results->perPage());
            $response->addMeta('last_page', $results->lastPage());
            $response->addMeta('current_page', $results->currentPage());
    
            $response->addLink('first_page', $results->url(1));
            $response->addLink('next_page', $results->nextPageUrl());
            $response->addLink('previous_page', $results->previousPageUrl());
        }

        return $response->make();
    }

    protected function performPayload(Criteria $criteria, $payload)
    {
        foreach ($payload as $parameter) {
            foreach ($parameter as $method => $arguments) { 
                $criteria->{$method}(...$arguments);
            }
        }
    }

    public function addRelationshipLinks(ApiResponse $response, EntryInterface $instance)
    {
        foreach ($instance->stream()->fields as $field) {

            if ($field->type == 'relationship') {

                if (!$value = $instance->getAttribute($field->handle)) {
                    continue;
                }

                $stream = Streams::make($field->config('related'));

                $response->addLink($field->handle, URL::route('streams.api.entries.show', [
                    'stream' => $stream->id,
                    'entry' => $value,
                ]));
            }
        }
    }
}
