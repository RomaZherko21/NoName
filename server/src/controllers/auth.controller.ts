import User from '../models/user.model'

class AuthController {
  async signUp(req: any, res: any, next: any) {
    console.log('signUp', req.body)
    const { email, password } = req.body

    User.create({
      email,
      password,
    })
  }
  async signIn(req: any, res: any, next: any) {
    console.log('signIn', req.body)
    const { email, password } = req.body

    const data = await User.findOne({
      where: {
        email,
        password,
      },
    })

    if (!Boolean(data)) {
      res.send({ msg: 'Not authorized' })
    }

    console.log('HEHEH', data)
  }
}

export default new AuthController()
