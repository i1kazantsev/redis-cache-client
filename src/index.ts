import { ICacheClient, StringOrGlobPattern } from '@i1k/smart-cache-manager'
import Redis, { RedisOptions } from 'ioredis'

interface IRedisCacheClient extends ICacheClient {
  quit: () => Promise<'OK'>
}

class RedisCacheClient implements IRedisCacheClient {
  private _client: Redis

  constructor(options?: RedisOptions) {
    this._client = options ? new Redis(options) : new Redis()
  }

  public set(key: string, value: string): Promise<'OK'> {
    return this._client.set(key, value)
  }

  public get(key: string): Promise<string | null> {
    return this._client.get(key)
  }

  public async del(key: StringOrGlobPattern | StringOrGlobPattern[]): Promise<string[]> {
    const keys: string[] = await this.keys(key)

    if (keys.length) {
      await this._client.del(keys)
    }

    return keys
  }

  public async clear(): Promise<string[]> {
    const keys: string[] = await this.keys('*')

    if (keys) {
      await this._client.flushdb()
    }

    return keys
  }

  public async keys(pattern: StringOrGlobPattern | StringOrGlobPattern[]): Promise<string[]> {
    let keys: string[]

    if (Array.isArray(pattern)) {
      // prettier-ignore
      keys = await Promise.all(
        pattern.map(async p => await this._client.keys(p))
      ).then((keys: string[][]): string[] => Array.from(new Set(keys.flat())))
    } else {
      keys = await this._client.keys(pattern)
    }

    return keys
  }

  public quit(): Promise<'OK'> {
    return this._client.quit()
  }
}

export default RedisCacheClient
