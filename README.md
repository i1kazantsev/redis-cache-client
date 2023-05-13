# @i1k/redis-cache-client

Redis cache client with the same interface as [@ik/smart-cache-manager](https://github.com/ivan1kazantsev/smart-cache-manager#readme).
Uses [ioredis](https://github.com/luin/ioredis#readme) under the hood.

## Installation

```bash
# using pnpm
pnpm i @i1k/redis-cache-client

# using npm
npm i @i1k/redis-cache-client
```

## Usage

```typescript
import RedisCacheClient from '@i1k/redis-cache-client'

// supports all ioredis options
const cacheClient = new RedisCacheClient()

cacheClient.set('key', 'value')
```

## API Reference

```typescript
interface ICacheClient {
  set: (key: string, value: string) => Promise<'OK'>
  get: (key: string) => Promise<string | null>
  del: (key: StringOrGlobPattern | StringOrGlobPattern[]) => Promise<string[]>
  clear: () => Promise<string[]>
  keys: (pattern: StringOrGlobPattern | StringOrGlobPattern[]) => Promise<string[]>
}
```

### set

To set a key-value pair.

```typescript
cacheClient.set('foo', 'bar')
// => Promise<'OK'>

cacheClient.set('foo/main', 'bar')
// => Promise<'OK'>
```

### get

To get a value by key.

```typescript
cacheClient.get('foo')
// => Promise<'bar'>

cacheClient.get('bar')
// => Promise<null>
```

### del

To delete a key-value pair by a specific key or a glob pattern.

```typescript
cacheClient.del('foo')
// => Promise<['foo']>

cacheClient.del('foo*')
// => Promise<['foo', 'foo/main']>

cacheClient.del(['foo', 'foo/*'])
// => Promise<['foo', 'foo/main']>
```

### clear

To clear the store.

```typescript
cacheClient.clear()
// => Promise<['foo', 'foo/main']>
```

### keys

To get keys by a specific key or a glob pattern.

```typescript
cacheClient.keys('foo')
// => Promise<['foo']>

cacheClient.keys('foo*')
// => Promise<['foo', 'foo/main']>

cacheClient.keys(['foo', 'foo/*'])
// => Promise<['foo', 'foo/main']>
```

## License

[MIT](./LICENSE)
