<?php

namespace Streams\Api\Http\Controller\Entries;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\URL;
use Streams\Api\Http\Controller\ApiController;
use Streams\Core\Criteria\Criteria;
use Streams\Core\Support\Facades\Streams;

class GetEntries extends ApiController
{

    /**
     * Return all entries for the stream.
     *
     * @param $stream
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function __invoke($stream)
    {

        $headers = [];

        // atm doing this in steps for xdebug
        $payload = collect(Request::query('parameters',[]));
        $payload = $payload->filter(function ($value, $key) {
            // all statements from frontend streams api are in this array with a numeric key
            // filtering out stuff like XDEBUG_SESSION=PHPSTORM, which shouldn't be load as parameter
            return is_numeric($key);
        });
        $payload = $payload->map(function ($value) {
            // Mapping to see if the $value array keys are methods of Criteria.
            // Otherwise, they should not be loaded as parameter, avoid hacks and bugs
            // we filter them out of the query
            $keys = array_filter(array_keys($value), static function ($key) {
                return method_exists(Criteria::class, $key);
            });
            return Arr::only($value, $keys);
        });
        $payload = $payload->toArray();
        $criteria = Streams::entries($stream)->loadParameters($payload);

        $meta = [
            'parameters' => Request::route()->parameters(),
            'payload'    => $payload,
        ];

        $links = [
            'self'    => URL::full(),
            'streams' => URL::route('streams.api.streams.index'),
            'stream'  => URL::route('streams.api.streams.show', [ 'stream' => $stream ]),
        ];

        if (Request::query('paginate')) {
            $results = $criteria->paginate([
                'per_page' => Request::get('per_page', 100),
                'page'     => Request::get('page', 1),
            ]);

            $meta[ 'total' ]        = $results->total();
            $meta[ 'per_page' ]     = $results->perPage();
            $meta[ 'last_page' ]    = $results->lastPage();
            $meta[ 'current_page' ] = $results->currentPage();

            $links[ 'first_page' ]    = $results->url(1);
            $links[ 'next_page' ]     = $results->nextPageUrl();
            $links[ 'previous_page' ] = $results->previousPageUrl();
        } else {
            $results = $criteria->get();
            $meta[ 'total' ] = $results->count();
        }

        return Response::json([
            'meta'  => $meta,
            'links' => $links,
            'data'  => $results->all(),
        ], 200, $headers);
    }
}
