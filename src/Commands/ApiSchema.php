<?php

namespace Streams\Api\Commands;

use Streams\Api\Facades\Api;
use Illuminate\Console\Command;
use Symfony\Component\Yaml\Yaml;

class ApiSchema extends Command
{

    protected $signature = 'api:schema {path?}';

    public function handle()
    {
        $yaml = Yaml::dump(Api::schema()->create()->toArray(), 100);

        $path = base_path($this->argument('path') ?: 'api.yaml');
        
        file_put_contents($path, $yaml);

        $this->info('Dumped YAML to ' . $path);
    }
}
