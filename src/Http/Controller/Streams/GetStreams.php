<?php

namespace Streams\Api\Http\Controller\Streams;

use Illuminate\Support\Arr;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;

class GetStreams extends Controller
{

    /**
     * Return an index of Streams.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        $parameters = Request::query('parameters', Request::json('parameters') ?: []);

        $criteria = Streams::entries('core.streams')->loadParameters($parameters);

        $meta = [
            'parameters' => Request::route()->parameters(),
            'payload' => Request::json(),
        ];

        $links = [
            'self' => URL::full(),
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
