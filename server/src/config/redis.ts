import Redis from 'ioredis'

const { REDIS_PASSWORD, REDIS_PORT_OUTER } = process.env

const redis = new Redis({
  host: 'redis',
  password: REDIS_PASSWORD,
  port: Number(REDIS_PORT_OUTER),
})

const DICTIONARIES = {
  emailCode: 'emailCode',
  phoneCode: 'phoneCode',
  qrSecret: 'QrSecret',
}

export { redis, DICTIONARIES }
