<?php

namespace Streams\Api\Tests\Commands;

use Streams\Api\ApiSchema;
use Symfony\Component\Yaml\Yaml;
use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use Streams\Api\Commands\DumpApiSchema;

class DumpApiSchemaTest extends ApiTestCase
{
    protected $testFilePath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->testFilePath = base_path('test-api-schema.yaml');
    }

    protected function tearDown(): void
    {
        // Clean up any test files created
        if (File::exists($this->testFilePath)) {
            File::delete($this->testFilePath);
        }

        if (File::exists(base_path('api.yaml'))) {
            File::delete(base_path('api.yaml'));
        }

        if (File::exists(base_path('custom-path.yaml'))) {
            File::delete(base_path('custom-path.yaml'));
        }

        parent::tearDown();
    }

    public function test_command_is_registered()
    {
        $commands = Artisan::all();

        $this->assertArrayHasKey('api:schema', $commands);
        $this->assertInstanceOf(DumpApiSchema::class, $commands['api:schema']);
    }

    public function test_command_has_correct_signature()
    {
        $command = new DumpApiSchema();

        // The command signature property includes the command name without arguments
        $this->assertStringContainsString('api:schema', $command->getName());
    }

    public function test_command_creates_yaml_file_with_default_path()
    {
        $this->artisan('api:schema')
            ->assertExitCode(0);

        $this->assertFileExists(base_path('api.yaml'));
        
        $content = File::get(base_path('api.yaml'));
        $this->assertNotEmpty($content);
        $this->assertStringContainsString('openapi:', $content);
    }

    public function test_command_creates_yaml_file_with_custom_path()
    {
        $this->artisan('api:schema', [
            'path' => 'custom-path.yaml',
        ])
            ->assertExitCode(0);

        $this->assertFileExists(base_path('custom-path.yaml'));
        
        $content = File::get(base_path('custom-path.yaml'));
        $this->assertNotEmpty($content);
    }    public function test_command_generates_valid_yaml_structure()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $this->assertFileExists($this->testFilePath);

        $content = File::get($this->testFilePath);

        // Check for OpenAPI structure
        $this->assertStringContainsString('openapi:', $content);
        $this->assertStringContainsString('info:', $content);
        $this->assertStringContainsString('title:', $content);
        $this->assertStringContainsString('version:', $content);
    }

    public function test_command_includes_streams_api_title()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $content = File::get($this->testFilePath);

        $this->assertStringContainsString('Streams API Specification', $content);
    }

    public function test_command_displays_success_message()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ])
            ->expectsOutput('Generated YAML: '.base_path('test-api-schema.yaml'))
            ->assertExitCode(0);
    }

    public function test_command_overwrites_existing_file()
    {
        // Create initial file
        File::put($this->testFilePath, 'initial content');

        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $content = File::get($this->testFilePath);

        $this->assertNotEquals('initial content', $content);
        $this->assertStringContainsString('openapi:', $content);
    }

    public function test_generated_yaml_contains_servers_section()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $content = File::get($this->testFilePath);

        $this->assertStringContainsString('servers:', $content);
    }

    public function test_generated_yaml_contains_paths_section()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $content = File::get($this->testFilePath);

        $this->assertStringContainsString('paths:', $content);
    }

    public function test_generated_yaml_contains_components_section()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $content = File::get($this->testFilePath);

        $this->assertStringContainsString('components:', $content);
    }

    public function test_command_uses_api_schema_create_method()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        // Verify the schema was created by checking for expected API schema content
        $content = File::get($this->testFilePath);

        // ApiSchema::create() should produce a schema with these characteristics
        $this->assertStringContainsString('3.0.2', $content); // OpenAPI version
    }

    public function test_command_accepts_nested_path()
    {
        $nestedPath = 'docs/api/schema.yaml';
        $fullPath = base_path($nestedPath);

        // Create directory if it doesn't exist
        $dir = dirname($fullPath);
        if (! File::exists($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        try {
            $this->artisan('api:schema', [
                'path' => $nestedPath,
            ]);

            $this->assertFileExists($fullPath);

            $content = File::get($fullPath);
            $this->assertStringContainsString('openapi:', $content);
        } finally {
            // Clean up
            if (File::exists($fullPath)) {
                File::delete($fullPath);
            }
            if (File::exists(base_path('docs/api'))) {
                File::deleteDirectory(base_path('docs/api'));
            }
            if (File::exists(base_path('docs'))) {
                File::deleteDirectory(base_path('docs'));
            }
        }
    }

    public function test_command_can_be_called_via_artisan_call()
    {
        $exitCode = Artisan::call('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $this->assertEquals(0, $exitCode);
        $this->assertFileExists($this->testFilePath);
    }

    public function test_generated_yaml_is_parseable()
    {
        $this->artisan('api:schema', [
            'path' => 'test-api-schema.yaml',
        ]);

        $content = File::get($this->testFilePath);

        // Parse YAML to ensure it's valid
        $parsed = Yaml::parse($content);

        $this->assertIsArray($parsed);
        $this->assertArrayHasKey('openapi', $parsed);
        $this->assertArrayHasKey('info', $parsed);
        $this->assertArrayHasKey('paths', $parsed);
    }
}
