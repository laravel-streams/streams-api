<?php

namespace Streams\Api\Builders;

use Illuminate\Support\Traits\Conditionable;
use Illuminate\Support\Traits\Tappable;
use Streams\Api\Builders\Concerns\CanBeConfigured;
use Streams\Api\Builders\Concerns\EvaluatesClosures;
use Streams\Core\Support\Traits\FiresCallbacks;
use Streams\Core\Support\Traits\HasMemory;

abstract class Builder
{
    use CanBeConfigured;
    use Conditionable;
    use EvaluatesClosures;
    use FiresCallbacks;
    use HasMemory;
    use Tappable;
}
