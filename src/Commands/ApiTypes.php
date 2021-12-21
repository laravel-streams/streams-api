<?php

namespace Streams\Api\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Streams\Api\TSGenerator;

class ApiTypes extends Command
{
    protected $signature = 'api:types {filepath?} {--empty}';

    protected $description = 'Generates typescript definitions stream entry\'s';

    public function handle()
    {
        $gen = new TSGenerator($this->option('empty'));
        $generated = $gen->generate();
        if ($this->argument('filepath')) {
            $path = base_path($this->argument('filepath'));
        } else {
            $path = resource_path('ts/streams.d.ts');
        }
        File::ensureDirectoryExists(File::dirname($path));
        File::put($path, $generated);
        $this->info("Successfully generated to: $path");
    }
}