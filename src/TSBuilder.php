<?php

namespace Streams\Api;

/**
 * @property-read TSBuilder $export
 * @property-read TSBuilder $declare
 * @property-read TSBuilder $root
 * @property-read TSBuilder $parent
 * @property-read integer   $indent
 */
class TSBuilder
{
    protected array $lines = [];

    protected array $children = [];

    protected bool $_required = false;

    protected ?TSBuilder $_parent;

    protected int $depth = 0;

    protected $modifier;

    public function __construct(?TSBuilder $parent = null, int $depth = 0, $modifier = null)
    {
        if ($modifier === null) {
            $modifier = static fn(string $val): string => $val;
        }
        $this->_parent  = $parent;
        $this->depth    = $depth;
        $this->modifier = $modifier;
    }

    public function build()
    {
        return implode("\n", $this->lines);
    }

    public function __get($name)
    {
        if ($name === 'export') {
            return new static($this, $this->depth, static fn($v) => "export $v");
        }

        if ($name === 'declare') {
            return new static($this, $this->depth, static fn($v) => "declare $v");
        }

        if ($name === 'parent') {
            return $this->parent();
        }

        if ($name === 'root') {
            return $this->root();
        }
        if ($name === 'indent') {
            return str_repeat(' ', $this->depth * 4);
        }
    }

    protected function parent()
    {
        $parent = $this->_parent;
        while (true) {
            if ($parent->_parent) {
                $parent = $parent->_parent;
                if ($parent->depth !== $this->depth) {
                    break;
                }
            } else {
                break;
            }
        }
        return $parent;
    }

    protected function root()
    {
        $parent = $this;
        while ($parent) {
            if ($parent->_parent) {
                $parent = $parent->_parent;
            } else {
                break;
            }
        }
        return $parent;
    }

    public function line(string $value, bool $useModifier = true)
    {
        if ($useModifier) {
            $value = call_user_func($this->modifier, $value);
        }
        $this->root()->lines[] = $this->indent . $value;
        return $this;
    }

    protected function child($modifier = null)
    {
        $g                = new static($this, $this->depth + 1, $modifier);
        $this->children[] = $g;
        return $g;
    }

    public function required(bool $required = true)
    {
        $this->_required = $required;
        return $this;
    }

    public function open(string $type, string $name)
    {
        $this->line("$type  $name {");
        return $this->child();
    }

    public function close()
    {
        $this->parent->line('}', false);
        return $this->parent;
    }

    public function add(string $name, string $type, ?bool $required = null)
    {
        if ($required === null) {
            $required = $this->_required;
        }
        $assign = $required ? ':' : '?:';
        $this->line("{$name}{$assign} {$type}");
        return $this;
    }

    public function addArray(array $arr, ?bool $required = null)
    {
        if ($required === null) {
            $required = $this->_required;
        }
        foreach ($arr as $key => $value) {
            $this->add($key, $value, $required);
        }
    }

    public function type(string $name, string $value)
    {
        $this->line("type {$name} = {$value}");
        return $this;
    }

    /**
     * @param string|string[] $comments
     */
    public function docblock($comments)
    {
        if (is_array($comments)) {
            $comments = explode("\n", $comments);
        }
        $comments = array_map(fn($c) => " * $c", $comments);
        array_unshift($comments, '/**');
        $comments[] = ' */';
        foreach ($comments as $comment) {
            $this->line($comment);
        }
        return $this;
    }
}

