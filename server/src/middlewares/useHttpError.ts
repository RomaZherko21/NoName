import { NextFunction, Request, Response } from 'express'

import { HttpException } from '../shared/types'
import { log } from '../shared/helpers'

const useHttpError = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  log.negative(`${error.status}: ${error.message}`)
  res.status(error.status || 500).json({
    status: error.status,
    message: error.message,
  })
}

export default useHttpError
