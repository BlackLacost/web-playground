import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { getRepository } from 'typeorm'

import { sendActivationMail } from './mail.service'
import { tokenServices } from './token.service'
import { User } from '../entity/User'
import { getUserDto } from '../dtos/user.dto'
import { ApiError } from '../exceptions/api.error'

export const userServices = {
  async registration(email: string, password: string) {
    const userRepository = getRepository(User)
    const candiadate = await userRepository.findOne({ email })

    if (candiadate) {
      const err: ApiError = ApiError.BadRequet(
        `Пользователь с почтовым адресом ${email} уже существует`
      )
      throw err
    }

    const hashPassword = await bcrypt.hash(password, 6)
    const activationLink = uuidv4()
    const user = User.create({ email, password: hashPassword, activationLink })
    await userRepository.save(user)

    sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )

    const userDto = getUserDto(user)
    const tokens = tokenServices.generateTokens(userDto)
    await tokenServices.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  },

  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink })

    if (!user) {
      throw ApiError.BadRequet('Неккоректная ссылка активации')
    }

    user.isActive = true
    await user.save()
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email })
    if (!user) {
      throw ApiError.BadRequet('Неверный логин или пароль')
    }

    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
      throw ApiError.BadRequet('Неверный логин или пароль')
    }

    const userDto = getUserDto(user)
    const tokens = tokenServices.generateTokens(userDto)
    await tokenServices.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  },

  async logout(refreshToken: string) {
    return await tokenServices.removeToken(refreshToken)
  },
}
