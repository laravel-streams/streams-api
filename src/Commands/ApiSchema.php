<?php

namespace Streams\Api\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Streams\Api\Facades\Api;
use Symfony\Component\Yaml\Yaml;

class ApiSchema extends Command
{
    protected $signature = 'api:schema';

    public function handle()
    {
        $yaml = Yaml::dump(Api::schema()->create()->toArray(), 100);

        File::put($path = 'bootstrap/cache/api.yaml', $yaml);

        $this->info('Dumped YAML to '.base_path($path));
    }
}
