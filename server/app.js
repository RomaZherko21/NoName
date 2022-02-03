require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./routes')
const sequelize = require('./models')
const log = require('./helpers/logs')

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT } =
  process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/', router)

sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, SERVER_HOST, () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT}`)
    })
  })
  .catch((err) => log.negative(`Server has not been started: ${err.message}`))

// app.use('/', (req, res) => {
//   Users.create({
//     name: 'alice12312',
//   })

//   Users.findAll()
//     .then((data) => {
//       res.send(data)
//     })
//     .catch(() => {
//       return next(createError(500, `No data!`))
//     })
// })
