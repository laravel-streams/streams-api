---
title: Endpoints
category: basics
sort: 0
enabled: true
---

## Entries

### List

Return entries within a configured stream.

`GET` `/api/streams/{stream}/entries`

```json
{
    "data": [
        {
            "title": "Hello World"
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Create

Create a new entry.

`POST` `/api/streams/{stream}/entries`

```bash
curl --location --request POST '/api/streams/{stream}/entries' \
    --form 'id="hello_world"' \
    --form 'title="Hello World"'
```

Return result:

```json
{
    "data": [
        {
            "id": "hello_world",
            "title": "Hello World"
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Show

Return a single entry.

`GET` `/api/streams/{stream}/entries/{entry}`

```json
{
    "data": [
        {
            "title": "Hello World"
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Update

To update select values of an entry, use **patch**.

`PATCH` `/api/streams/{stream}/entries/{entry}`

To replace the entry attributes entirely, use **put**.

`PUT` `/api/streams/{stream}/entries/{entry}`

```bash
curl --location --request PATCH '/api/streams/{stream}/entries/{entry}' \
    --form 'title="Hello World!"'
```

Return result:

```json
{
    "data": [
        {
            "id": "hello_world",
            "title": "Hello World!"
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Delete

Deletes an entry.

`DELETE` `/api/streams/{stream}/entries/{entry}`



## Streams

### List

Return configured streams.

`GET` `/api/streams/{stream}`

```json
{
    "data": {...},
    "links": {...},
    "meta": {...}
}
```

### Create

Create a new stream.

`POST` `/api/streams`

```bash
curl --location --request POST '/api/streams' \
    -H 'Content-Type: application/json'
    -d '{"id": "contacts", "name": "Contacts", "fields": {...}}'   
```

Return result:

```json
{
    "data": [
        {
            "id": "contacts",
            "name": "Contacts"
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Show

Return a single stream.

`GET` `/api/streams/{stream}`

```json
{
    "data": [
        {
            "name": "Contacts"
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Update

To update select values of a stream, use **patch**.

`PATCH` `/api/streams/{stream}`

To replace the attributes entirely, use **put**.

`PUT` `/api/streams/{stream}`

```bash
curl --location --request PATCH '/api/streams/{stream}' \
    -H 'Content-Type: application/json'
    -d '{"description": "A simple contacts listing."}'   
```

Return result:

```json
{
    "data": [
        {
            "title": "Contacts",
            "description": "A simple contacts listing."
        }
    ],
    "links": {...},
    "meta": {...}
}
```

### Delete

Deletes an stream.

`DELETE` `/api/streams/{stream}`

```json
{
    "data": [],
    "links": {...},
    "meta": {...}
}
```


## Querying

You can manipulate the query using criteria parameters in the URI.

### Filtering

`/api/streams?q={"where": [["id", "LIKE", "%doc%"]]}`

### Sorting

`/api/streams/docs/entries?q={"where": [["enabled", true]]}`
