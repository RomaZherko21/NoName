import User from '../models/user.model'

class AuthController {
  async signIn(req: any, res: any) {
    console.log('signIn', req.body)
    try {
      const { email, password } = req.body

      const data = await User.findOne({
        where: {
          email,
          password,
        },
      })
      res.status(200).json()
    } catch (err) {
      res.status(403).send(err)
    }
  }
}

export default new AuthController()
