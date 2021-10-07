import { NextFunction, Request, Response } from 'express'

export const createController =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (e) {
      next(e)
    }
  }
