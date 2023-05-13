import ICacheClientTestes from '@i1k/smart-cache-manager/test/cache-client.test'
import RedisCacheClient from '../src'

jest.mock('ioredis', () => require('ioredis-mock'))

const client = new RedisCacheClient({ maxRetriesPerRequest: 0 })
ICacheClientTestes(client, async () => {
  await client.quit()
})
