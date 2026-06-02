<?php

namespace Streams\Api\Builders\Concerns;

use Illuminate\Contracts\Container\BindingResolutionException;

trait EvaluatesClosures
{
    protected string $evaluationIdentifier;

    public function evaluate(
        mixed $value,
        array $namedInjections = [],
        array $typedInjections = []
    ) {
        if (! $value instanceof \Closure) {
            return $value;
        }

        $dependencies = [];

        foreach ((new \ReflectionFunction($value))->getParameters() as $parameter) {
            $dependencies[] = $this->resolveClosureDependencies(
                $parameter,
                $namedInjections,
                $typedInjections
            );
        }

        return $value(...$dependencies);
    }

    protected function resolveClosureDependencies(
        \ReflectionParameter $parameter,
        array $namedInjections,
        array $typedInjections
    ): mixed {
        $parameterName = $parameter->getName();

        if (array_key_exists($parameterName, $namedInjections)) {
            return value($namedInjections[$parameterName]);
        }

        $dependencyByName = $this->resolveDefaultClosureDependency($parameterName);

        if (count($dependencyByName)) {
            return $dependencyByName[0];
        }

        if (
            isset($this->evaluationIdentifier)
            && $parameterName === $this->evaluationIdentifier
        ) {
            return $this;
        }

        if ($parameter->isDefaultValueAvailable()) {
            return $parameter->getDefaultValue();
        }

        if ($parameter->isOptional()) {
            return null;
        }

        $staticClass = static::class;

        throw new BindingResolutionException("Unable to resolve parameter [\${$parameterName}] for closure in [{$staticClass}].");
    }

    protected function resolveDefaultClosureDependency(string $parameterName): array
    {
        return [];
    }
}
