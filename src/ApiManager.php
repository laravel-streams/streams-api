<?php

namespace Streams\Api;

class ApiManager
{
    public function schema(): ApiSchema
    {
        return new ApiSchema;
    }
}
