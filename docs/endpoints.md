---
title: Endpoints
category: basics
sort: 0
enabled: true
---

## Entries

### Read

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

## Entry 

### Read

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

### Updating

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

### Deleting

Deletes an entry.

`DELETE` `/api/streams/{stream}/entries/{entry}`

```json
{
    "data": [],
    "links": {...},
    "meta": {...}
}
```



## Streams

### Read

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
    --form 'id="contacts"' \
    --form 'name="Contacts"' \
    --form 'fields="{...}"'
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

## Stream 

### Read

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

### Updating

To update select values of a stream, use **patch**.

`PATCH` `/api/streams/{stream}`

To replace the attributes entirely, use **put**.

`PUT` `/api/streams/{stream}`

```bash
curl --location --request PATCH '/api/streams/{stream}' \
    --form 'description="A simple contacts listing."'
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

### Deleting

Deletes an stream.

`DELETE` `/api/streams/{stream}`

```json
{
    "data": [],
    "links": {...},
    "meta": {...}
}
```


## Filtering

You can filter the query using criteria parameters in the URI.
