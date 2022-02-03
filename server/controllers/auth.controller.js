const User = require('../models/user.model')

class AuthController {
  async signUp(req, res, next) {
    console.log('signUp', req.body)
    const { email, password } = req.body

    User.create({
      email,
      password,
    })
  }
  async signIn(req, res, next) {
    console.log('signIn', req.body)
  }
}

module.exports = new AuthController()
