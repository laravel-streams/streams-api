---
title: Caching
category: basics
intro:
sort: 31
stage: drafting
enabled: true
---

## Cache Parameter

The `cache` parameter can be specified in seconds when sending `query` parameters:

```json
// GET /api/streams/examples/entries
{
    "query": [
        {"cache": [300]}
        {"where": ["statu", "active"]}
    ]
}
```

## Cache configuration

Stream-specific cache configuration can be specified on the stream.

```json
// streams/examples.json
{
    "config": {
        "cache": {
            "enabled": true,
            "ttl": 300
        }
    }
}
```

## Related Documentation

- [Caching](/docs/core/caching)
- [Query Cache](/docs/core/querying#caching)
- [API Cache](endpoints#querying)
<!-- - [@todo Response Cache](routing#caching-responses) -->
<!-- - [@todo View Cache](querying#caching-results) -->
