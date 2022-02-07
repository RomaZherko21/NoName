import User from '../models/user.model'

class AuthController {
  async signUp(req: any, res: any) {
    console.log('signUp', req.body)
    const { email, password } = req.body

    User.create({
      email,
      password,
    })
  }
  async signIn(req: any, res: any) {
    console.log('signIn', req.body)
    const { email, password } = req.body

    const data = await User.findOne({
      where: {
        email,
        password,
      },
    })

    if (!Boolean(data)) {
      res.status(403).send()
    } else {
      res.status(200).json()
    }

    console.log('HEHEH', data)
  }
}

export default new AuthController()
