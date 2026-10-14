<?php

namespace Streams\Api\Tests;

use Symfony\Component\Yaml\Yaml;
use Illuminate\Support\Facades\Route;

class OpenApiDocumentTest extends ApiTestCase
{
    private function document(): array
    {
        $path = __DIR__.'/../resources/openapi/openapi.yaml';

        $this->assertFileExists($path);

        return Yaml::parseFile($path);
    }

    public function test_reference_spec_documents_exactly_the_registered_crud_routes(): void
    {
        $document = $this->document();
        $registered = [];

        foreach (Route::getRoutes() as $route) {
            if (! str_starts_with($route->getName() ?? '', 'streams.api.')) {
                continue;
            }

            $path = '/'.substr($route->uri(), strlen(config('streams.api.prefix')) + 1);

            foreach (array_diff($route->methods(), ['HEAD']) as $method) {
                $registered[] = strtolower($method).' '.$path;
            }
        }

        $documented = [];
        $operationIds = [];

        foreach ($document['paths'] as $path => $item) {
            foreach ($item as $method => $operation) {
                if (! in_array($method, ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'])) {
                    continue;
                }

                $documented[] = $method.' '.$path;
                $operationIds[] = $operation['operationId'];
                $this->assertNotEmpty($operation['responses']);
            }
        }

        $this->assertCount(13, $registered);
        $this->assertEqualsCanonicalizing($registered, $documented);
        $this->assertSame($operationIds, array_values(array_unique($operationIds)));
    }

    public function test_reference_spec_has_resolvable_components_and_required_path_parameters(): void
    {
        $document = $this->document();

        $this->assertSame('3.0.3', $document['openapi']);
        $this->assertSame('/api', $document['servers'][0]['url']);
        $this->assertSame([], $document['security']);
        $this->assertSame(['meta', 'links', 'errors', 'data'], array_keys($document['components']['schemas']['Envelope']['properties']));
        $this->assertTrue($document['components']['schemas']['Entry']['additionalProperties']);

        array_walk_recursive($document, function ($value, $key) use ($document) {
            if ($key !== '$ref') {
                return;
            }

            $this->assertStringStartsWith('#/', $value);
            $resolved = $document;

            foreach (explode('/', substr($value, 2)) as $segment) {
                $segment = str_replace(['~1', '~0'], ['/', '~'], $segment);
                $this->assertArrayHasKey($segment, $resolved, $value);
                $resolved = $resolved[$segment];
            }
        });

        foreach ($document['paths'] as $path => $item) {
            preg_match_all('/\{([^}]+)\}/', $path, $matches);
            $parameters = [];

            foreach ($item['parameters'] ?? [] as $parameter) {
                $parameter = $document['components']['parameters'][basename($parameter['$ref'])];
                $this->assertSame('path', $parameter['in']);
                $this->assertTrue($parameter['required']);
                $parameters[] = $parameter['name'];
            }

            $this->assertEqualsCanonicalizing($matches[1], $parameters, $path);
        }
    }

    public function test_reference_spec_describes_query_parameters_and_the_live_paginated_envelope(): void
    {
        $document = $this->document();
        $expected = [
            '/streams' => ['per_page', 'page', 'where', 'constraint', 'order_by', 'limit', 'skip'],
            '/streams/{stream}/entries' => ['per_page', 'page', 'where', 'constraint', 'order_by', 'limit', 'skip', 'with'],
            '/streams/{stream}/entries/{entry}' => ['with'],
        ];

        foreach ($expected as $path => $names) {
            $parameters = array_map(
                fn ($reference) => $document['components']['parameters'][basename($reference['$ref'])],
                $document['paths'][$path]['get']['parameters'],
            );

            $this->assertEqualsCanonicalizing($names, array_column($parameters, 'name'), $path);

            foreach ($parameters as $parameter) {
                $this->assertSame('query', $parameter['in']);
            }
        }

        $this->assertSame(100, $document['components']['parameters']['PerPage']['schema']['default']);
        $this->assertSame(1, $document['components']['parameters']['Page']['schema']['default']);

        $response = $this->getJson(route('streams.api.streams.list', ['per_page' => 2, 'page' => 1]));
        $response->assertOk();
        $response->assertJsonPath('meta.per_page', 2);
        $response->assertJsonPath('meta.current_page', 1);

        foreach ($document['components']['schemas']['Envelope']['properties'] as $name => $schema) {
            $this->assertArrayHasKey($name, $response->json());
        }

        foreach ($document['components']['schemas']['PaginationMeta']['properties'] as $name => $schema) {
            $this->assertSame('integer', $schema['type']);
            $this->assertIsInt($response->json('meta.'.$name));
        }

        $this->assertSame(
            '#/components/responses/List',
            $document['paths']['/streams']['get']['responses'][200]['$ref'],
        );
        $this->assertSame(
            '#/components/schemas/PaginationMeta',
            $document['components']['responses']['List']['content']['application/json']['schema']['allOf'][1]['properties']['meta']['$ref'],
        );
    }
}
