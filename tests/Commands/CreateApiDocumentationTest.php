<?php

namespace Streams\Api\Tests\Commands;

use Streams\Api\Tests\ApiTestCase;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use Streams\Api\Commands\CreateApiDocumentation;

class CreateApiDocumentationTest extends ApiTestCase
{
    protected $swaggerPath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->swaggerPath = public_path('swagger');
    }

    protected function tearDown(): void
    {
        // Clean up swagger directory
        if (File::exists($this->swaggerPath)) {
            File::deleteDirectory($this->swaggerPath);
        }

        parent::tearDown();
    }

    public function test_command_is_registered()
    {
        $commands = Artisan::all();

        $this->assertArrayHasKey('api:documentation', $commands);
        $this->assertInstanceOf(CreateApiDocumentation::class, $commands['api:documentation']);
    }

    public function test_command_has_correct_signature()
    {
        $command = new CreateApiDocumentation();

        $this->assertStringContainsString('api:documentation', $command->getName());
    }

    public function test_command_creates_swagger_directory()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertDirectoryExists($this->swaggerPath);
    }

    public function test_command_copies_swagger_ui_files()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        // Check for key swagger UI files
        $this->assertFileExists($this->swaggerPath.'/index.html');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui.css');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui-bundle.js');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui-standalone-preset.js');
    }

    public function test_command_copies_oauth_redirect_file()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/oauth2-redirect.html');
    }

    public function test_command_copies_favicon_files()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/favicon-16x16.png');
        $this->assertFileExists($this->swaggerPath.'/favicon-32x32.png');
    }

    public function test_command_generates_api_yaml_schema()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/api.yaml');

        $content = File::get($this->swaggerPath.'/api.yaml');
        $this->assertStringContainsString('openapi:', $content);
        $this->assertStringContainsString('Streams API Specification', $content);
    }

    public function test_command_calls_api_schema_command()
    {
        // Mock the artisan command to track it was called
        Artisan::command('api:schema-test {path?}', function () {
            return 0;
        });

        $this->artisan('api:documentation')
            ->assertExitCode(0);

        // Verify the api.yaml file exists which proves api:schema was called
        $this->assertFileExists($this->swaggerPath.'/api.yaml');
    }

    public function test_command_displays_success_message()
    {
        $this->artisan('api:documentation')
            ->expectsOutput('Copied to: '.$this->swaggerPath)
            ->assertExitCode(0);
    }

    public function test_command_creates_directory_if_not_exists()
    {
        // Ensure directory doesn't exist
        if (File::exists($this->swaggerPath)) {
            File::deleteDirectory($this->swaggerPath);
        }

        $this->assertDirectoryDoesNotExist($this->swaggerPath);

        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertDirectoryExists($this->swaggerPath);
    }

    public function test_command_overwrites_existing_files()
    {
        // Create directory with a test file
        if (!File::exists($this->swaggerPath)) {
            File::makeDirectory($this->swaggerPath, 0755, true);
        }
        File::put($this->swaggerPath.'/index.html', 'old content');

        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $content = File::get($this->swaggerPath.'/index.html');
        $this->assertNotEquals('old content', $content);
        $this->assertStringContainsString('swagger', strtolower($content));
    }

    public function test_swagger_index_html_is_valid()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $content = File::get($this->swaggerPath.'/index.html');

        // Check for essential swagger UI elements
        $this->assertStringContainsString('<!DOCTYPE html>', $content);
        $this->assertStringContainsString('swagger-ui', $content);
    }

    public function test_all_source_files_are_copied()
    {
        $sourcePath = realpath(__DIR__.'/../../resources/swagger');
        $sourceFiles = File::files($sourcePath);

        $this->artisan('api:documentation')
            ->assertExitCode(0);

        foreach ($sourceFiles as $file) {
            $fileName = $file->getFilename();
            $targetFile = $this->swaggerPath.'/'.$fileName;

            $this->assertFileExists(
                $targetFile,
                "File {$fileName} was not copied to swagger directory"
            );
        }
    }

    public function test_command_can_be_called_via_artisan_call()
    {
        $exitCode = Artisan::call('api:documentation');

        $this->assertEquals(0, $exitCode);
        $this->assertDirectoryExists($this->swaggerPath);
        $this->assertFileExists($this->swaggerPath.'/index.html');
    }

    public function test_swagger_css_is_copied()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/swagger-ui.css');

        $content = File::get($this->swaggerPath.'/swagger-ui.css');
        $this->assertNotEmpty($content);
    }

    public function test_swagger_javascript_files_are_copied()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/swagger-ui.js');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui-bundle.js');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui-standalone-preset.js');

        // Verify files have content
        $this->assertGreaterThan(0, File::size($this->swaggerPath.'/swagger-ui.js'));
    }

    public function test_swagger_map_files_are_copied()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/swagger-ui.css.map');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui-bundle.js.map');
    }

    public function test_directory_permissions_are_set_correctly()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertDirectoryExists($this->swaggerPath);
        $this->assertDirectoryIsWritable($this->swaggerPath);
        $this->assertDirectoryIsReadable($this->swaggerPath);
    }

    public function test_es_bundle_files_are_copied()
    {
        $this->artisan('api:documentation')
            ->assertExitCode(0);

        $this->assertFileExists($this->swaggerPath.'/swagger-ui-es-bundle.js');
        $this->assertFileExists($this->swaggerPath.'/swagger-ui-es-bundle-core.js');
    }
}
