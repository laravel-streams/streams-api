<?php

namespace Streams\Api\Tests;

use Illuminate\Routing\Route;
use Symfony\Component\Yaml\Yaml;

class OpenApiDocumentTest extends ApiTestCase
{
    protected const VERBS = ['get', 'post', 'put', 'patch', 'delete'];

    protected function document(): array
    {
        return Yaml::parseFile(dirname(__DIR__).'/resources/openapi/openapi.yaml');
    }

    /**
     * "METHOD /path" for every route the built-in resources register,
     * relative to the API prefix, e.g. "GET /streams/{stream}/entries".
     */
    protected function registeredOperations(): array
    {
        $prefix = trim(config('streams.api.prefix', 'api'), '/');

        $operations = [];

        /** @var Route $route */
        foreach (app('router')->getRoutes() as $route) {
            if (! str_starts_with((string) $route->getName(), 'streams.api.')) {
                continue;
            }

            $uri = '/'.ltrim(substr($route->uri(), strlen($prefix)), '/');

            foreach ($route->methods() as $method) {
                if (in_array(strtolower($method), static::VERBS, true)) {
                    $operations[] = strtoupper($method).' '.$uri;
                }
            }
        }

        sort($operations);

        return array_values(array_unique($operations));
    }

    protected function documentedOperations(): array
    {
        $operations = [];

        foreach ($this->document()['paths'] as $path => $item) {
            foreach (array_keys($item) as $method) {
                if (in_array($method, static::VERBS, true)) {
                    $operations[] = strtoupper($method).' '.$path;
                }
            }
        }

        sort($operations);

        return $operations;
    }

    public function test_the_document_is_openapi_3_with_paths()
    {
        $document = $this->document();

        $this->assertStringStartsWith('3.0', $document['openapi']);
        $this->assertNotEmpty($document['paths']);
        $this->assertSame('/api', $document['servers'][0]['url']);
    }

    public function test_the_built_in_routes_are_registered()
    {
        $this->assertCount(13, $this->registeredOperations());
    }

    public function test_every_registered_route_is_documented_and_nothing_else()
    {
        $this->assertSame($this->registeredOperations(), $this->documentedOperations());
    }

    public function test_operation_ids_are_unique()
    {
        $ids = [];

        foreach ($this->document()['paths'] as $item) {
            foreach ($item as $method => $operation) {
                if (in_array($method, static::VERBS, true)) {
                    $ids[] = $operation['operationId'];
                }
            }
        }

        $this->assertSame(array_unique($ids), $ids);
    }

    public function test_every_reference_resolves()
    {
        $document = $this->document();

        array_walk_recursive($document, function ($value, $key) use ($document) {
            if ($key !== '$ref') {
                return;
            }

            $this->assertStringStartsWith('#/', $value);

            $node = $document;

            foreach (explode('/', substr($value, 2)) as $segment) {
                $this->assertArrayHasKey($segment, $node, "Unresolved reference [$value].");
                $node = $node[$segment];
            }
        });
    }
}
