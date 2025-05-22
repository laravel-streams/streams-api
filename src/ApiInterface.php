<?php

namespace Streams\Api;

class ApiInterface
{

    /**
     * Middleware to include.
     *
     * @var array
     */
    protected array $middleware = [];

    public function middleware(array $middleware): static
    {
        $this->middleware = [
            ...$this->middleware,
            ...$middleware,
        ];

        return $this;
    }

    public function getMiddleware(): array
    {
        return [
            // "api:{$this->getId()}",
            ...$this->middleware,
        ];
    }

    
    /**
     * Resources are entry interfaces.
     *
     * @var array
     */
    protected array $resources = [];

    public function resources(array $resources): static
    {
        $this->resources = [
            ...$this->resources,
            ...$resources,
        ];

        return $this;
    }

    public function getResources(): array
    {
        return array_unique($this->resources);
    }


    /**
     * Endpoints
     */
    protected array $endpoints = [];

    public function endpoints(array $endpoints): static
    {
        $this->endpoints = [
            ...$this->endpoints,
            ...$endpoints,
        ];
        
        foreach ($endpoints as $endpoint) {
            // $this->queueLivewireComponent($endpoint);
        }

        return $this;
    }

    public function getEndpoints(): array
    {
        return array_unique($this->endpoints);
    }


    /**
     * Helps us identify the API interface.
     */
    protected string | \Closure | null $id = null;

    public function id(string | \Closure | null $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): ?string
    {
        return $this->id;
        // return $this->evaluate($this->id);
    }



    /**
     * Boot cycle stuff.
     *
     * @param string|null $id
     */
    public function __construct(?string $id = null)
    {
        if ($id) {
            $this->id($id);
        }
    }

    static public function make(?string $id = null): self
    {
        $instance = app(static::class, [
            'id' => $id,
        ]);

        // $instance->configure();

        return $instance;
    }

    public function register(): void
    {
        //$this->registerLivewireComponents();
        //$this->registerLivewirePersistentMiddleware();
    }

    public function boot(): void
    {
        // Boot
    }


    /**
     * Routing stuff
     *
     * @var string
     */
    protected string $path = '';

    protected \Closure | null $routes = null;

    public function path(string $path): static
    {
        $this->path = $path;

        return $this;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function routes(?\Closure $routes): static
    {
        $this->routes = $routes;

        return $this;
    }

    public function getRoutes(): ?\Closure
    {
        return $this->routes;
    }
}
