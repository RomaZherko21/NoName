import { NextFunction, Request, Response } from 'express'

import { log } from 'shared/helpers'
export interface HttpException {
  status: number
  message: string
}

const useHttpError = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  log.negative(`${error.status}: ${error.message}`)
  res.status(error.status || 500).json({
    status: error.status,
    message: error.message,
  })
}

export default useHttpError
