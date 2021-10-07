import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api.error'

import { userServices } from '../services/user.service'

export const userController = {
  async registration(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw ApiError.BadRequet('Ошибка при валидации', errors.array())
    }
    const { email, password } = req.body
    const data = await userServices.registration(email, password)
    res.cookie('refreshToken', data.refreshToken, {
      maxAge: 30 * 24 * 3600,
      httpOnly: true,
    })
    return res.json(data)
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    const data = await userServices.login(email, password)
    res.cookie('refreshToken', data.refreshToken, {
      maxAge: 30 * 24 * 3600,
      httpOnly: true,
    })
    return res.json(data)
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies
    const token = await userServices.logout(refreshToken)
    res.clearCookie('refreshToken')
    console.log(token)
    return res.json({ message: `Logout: refreshToken: ${token} удален` })
  },

  async activate(req: Request, res: Response, next: NextFunction) {
    const activationLink = req.params.link
    await userServices.activate(activationLink)
    return res.redirect(process.env.CLIENT_URL as string)
  },

  async refresh(req: Request, res: Response, next: NextFunction) {},

  async getUsers(req: Request, res: Response, next: NextFunction) {
    res.json(['123', '123'])
  },
}
