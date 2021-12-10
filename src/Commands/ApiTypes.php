<?php

namespace Streams\Api\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Streams\Api\TSGenerator;

class ApiTypes extends Command
{
    protected $signature = 'api:types {filepath?}';

    protected $description = 'Generates typescript definitions stream entry\'s';

    public function handle()
    {
        $gen = new TSGenerator();
        $generated =$gen->generate();
        if($this->argument('filepath')) {
            $path = base_path($this->argument('filepath'));
        } else {
            $path = base_path('packages/@laravel-streams/src/types/generated.ts');
        }
        File::ensureDirectoryExists(File::dirname($path));
        File::put($path,$generated);
        $this->info("Successfully generated to: $path");
    }
}
