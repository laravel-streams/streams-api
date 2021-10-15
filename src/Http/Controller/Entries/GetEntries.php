<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Arr;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Streams\Core\Support\Traits\HasMemory;

class GetEntries extends Controller
{

    use HasMemory;

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($stream)
    {

        /**
         * The HTTP spec doesn't allow body content
         * for GET requests so fallback to JSON param.
         */
        if (!$payload = Request::json('query')) {
            $payload = Arr::get(json_decode(Request::get('json'), true) ?: [], 'query', []);
        }

        $criteria = Streams::entries($stream)->loadParameters($payload);

        $meta = [
            'parameters'   => Request::route()->parameters(),
            'payload'      => Request::json(),
        ];

        $links = [
            'self' => URL::full(),
            'streams' => URL::route('streams.api.streams.index'),
            'stream' => URL::route('streams.api.streams.show', ['stream' => $stream]),
        ];

        if (Request::get('all') !== true) {

            $results = $criteria->paginate([
                'per_page' => Request::get('per_page', 100),
                'page'     => Request::get('page', 1),
            ]);

            $meta['total'] = $results->total();
            $meta['per_page'] = $results->perPage();
            $meta['last_page'] = $results->lastPage();
            $meta['current_page'] = $results->currentPage();

            $links['first_page'] = $results->url(1);
            $links['next_page'] = $results->nextPageUrl();
            $links['previous_page'] = $results->previousPageUrl();
        }

        if (!Request::get('all') !== true) {

            $results = $criteria->get();

            $meta['total'] = $results->total();
        }

        $checksum = md5(
            Request::getContent()
                . json_encode(Request::all())
                . json_encode(Request::route()->parameters)
        );

        return Response::json([
            'meta' => $meta,
            'links' => $links,
            'data' => $results->all(),
        ], 200, [
            'ETag' => $checksum,
        ]);
    }
}
