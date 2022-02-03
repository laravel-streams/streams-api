<?php

namespace Streams\Api;

use Illuminate\Support\Arr;
use Streams\Core\Stream\Stream;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Streams\Core\Support\Facades\Streams;
use Illuminate\Contracts\Support\Jsonable;
use Streams\Core\Support\Traits\Prototype;
use Illuminate\Contracts\Support\Arrayable;

class ApiResponse implements Arrayable, Jsonable
{
    use Prototype {
        Prototype::__construct as private constructPrototype;
    }

    public Stream $stream;

    protected $__attributes = [
        'status' => 200,
        'headers' => [],
        'errors' => [],
        'links' => [],
        'meta' => [],
        'data' => null,
    ];

    protected $__properties = [
        'status' => [
            'type' => 'integer',
            'rules' => [
                'in:200,201,204,400,404,409'
            ],
            'config' => [
                'default' => 200,
            ],
        ],
        'headers' => [
            'type' => 'array',
        ],
        'errors' => [
            'type' => 'array',
            'config' => [
                'items' => [
                    [
                        'properties' => [
                            'message' => [
                                'type' => 'string',
                            ],
                            'field' => [
                                'type' => 'string',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'links' => [
            'type' => 'array',
        ],
        'meta' => [
            'type' => 'object',
        ],
    ];

    public function __construct($stream = null)
    {
        $this->constructPrototype();

        if ($stream && is_string($stream)) {
            $stream = Streams::make($stream);
        }

        $this->stream = $stream;

        if ($query = Request::query()) {
            $this->addMeta('query', $query);
        }

        if ($payload = Request::json()->all()) {
            $this->addMeta('payload', $payload);
        }

        if ($parameters = Request::route()->parameters()) {
            $this->addMeta('parameters', $parameters);
        }

        $this->addLink('self', URL::full());

        if (isset($this->stream)) {

            $this->addMeta('stream', $this->stream->id);

            $this->addStreamLinks($this->stream);
        }
    }

    public function make(mixed $data = null, int $status = null, array $headers = []): JsonResponse
    {
        $this->data = $data ?: $this->data;

        if (Request::isMethodCacheable() && $this->data) {
            $this->addCacheHeaders($this->data);
        }

        $attributes = $this->toArray();

        $status = $status ?: Arr::get($attributes, 'status');
        $headers = $headers ?: Arr::get($attributes, 'headers');

        Arr::pull($attributes, 'status');
        Arr::pull($attributes, 'headers');

        return Response::json($attributes, $status, $headers);
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function addHeader(string $name, mixed $value): self
    {
        $this->__prototype['attributes']['headers'][$name] = $value;

        return $this;
    }

    public function removeHeader(string $name): self
    {
        unset($this->__prototype['attributes']['headers'][$name]);

        return $this;
    }

    public function addCacheHeaders($data)
    {
        if (is_object($data) && method_exists($data, 'lastModified')) {

            $date = $data->lastModified();
            
            if ($date instanceof \DateTime) {
                $date = \DateTimeImmutable::createFromMutable($date);
            }

            $date = $date->setTimezone(new \DateTimeZone('UTC'));

            $this->addHeader('Last-Modified', $date->format('D, d M Y H:i:s') . ' GMT');
        }
    }

    public function addError(array $error): self
    {
        $this->__prototype['attributes']['errors'][] = $error;

        return $this;
    }

    public function addLink(string $name, mixed $value): self
    {
        $this->__prototype['attributes']['links'][$name] = $value;

        return $this;
    }

    public function removeLink(string $name): self
    {
        unset($this->__prototype['attributes']['links'][$name]);

        return $this;
    }

    public function addStreamLinks(Stream $stream): self
    {
        $parameters = ['stream' => $stream->id];

        $this->addLink('streams', URL::route('streams.api.streams.index'));
        $this->addLink('stream', URL::route('streams.api.streams.show', $parameters));
        $this->addLink('entries', URL::route('streams.api.entries.index',  $parameters));

        return $this;
    }

    public function addMeta(string $name, mixed $value): self
    {
        $this->__prototype['attributes']['meta'][$name] = $value;

        return $this;
    }

    public function removeMeta(string $name): self
    {
        unset($this->__prototype['attributes']['meta'][$name]);

        return $this;
    }

    public function setData(mixed $data): self
    {
        $this->data = $data;

        return $this;
    }

    public function toArray()
    {
        return $this->getPrototypeAttributes();
    }

    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    public function jsonSerialize()
    {
        return $this->toArray();
    }

    public function __toString()
    {
        return $this->toJson();
    }
}
