const auth = require('express').Router()

const authController = require('../controllers/auth.controller.js')

auth.post('/signIn', authController.signIn)
auth.post('/signUp', authController.signUp)

module.exports = auth
