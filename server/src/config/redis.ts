import Redis from 'ioredis'

const redis = new Redis({
  host: 'redis',
})

redis.set('mykey', 'myvalue')

redis
  .get('mykey')
  .then((result) => {
    return console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })

export { redis }
