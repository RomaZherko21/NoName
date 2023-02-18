import { NextFunction, Request, Response } from 'express'
import { permission, Role } from 'shared/consts'

const usePermission = (req: Request, res: Response, next: NextFunction) => {
  const authorization_role: Role = res.locals.authorization_role

  const resource: string = req.originalUrl.split('/')[1]
  const action: string = req.method.toLowerCase()

  if (
    permission[authorization_role][resource] &&
    permission[authorization_role][resource].includes(action)
  ) {
    next()
  } else {
    res.status(404).send('You do not have permission to access this resource.')
  }
}

export default usePermission
