<?php

namespace Streams\Api\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateApiDocumentation extends Command
{

    //protected $signature = 'api:documentation {path?}';
    protected $signature = 'api:documentation';

    public function handle()
    {
        $source = realpath(__DIR__ . '/../../resources/swagger');

        //$path = public_path($this->argument('path') ?: 'swagger');
        $path = public_path('swagger');

        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
        
        File::copyDirectory($source, $path);

        $this->info('Copied to: ' . $path);

        $this->call('api:schema', [
            'path' => 'public/swagger/api.yaml',
        ]);
    }
}
