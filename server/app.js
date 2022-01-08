const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const process = require('dotenv').config().parsed

const sequelize = require('./config/mySQL')
const Users = require('./models/users.model')

const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

sequelize
  .sync()
  .then(() => {
    app.listen(process.PORT, process.HOST, () => {
      console.log(
        chalk.blue.bold(
          `Server has been started: ${process.HOST}:${process.PORT}`
        )
      )
    })
  })
  .catch((err) => console.log(err))

app.use('/', (req, res) => {
  Users.create({
    name: 'alice12312',
  })

  Users.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      return next(createError(500, `No data!`))
    })
})
