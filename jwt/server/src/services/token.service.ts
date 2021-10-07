import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { UserDto } from '../dtos/user.dto'
import { Token } from '../entity/Token'

import { User } from '../entity/User'
import { ApiError } from '../exceptions/api.error'

export const tokenServices = {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '15m',
      }
    )

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: '30d',
      }
    )

    return { accessToken, refreshToken }
  },

  async saveToken(userId: number, refreshToken: string) {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(userId)
    if (!user) {
      throw ApiError.BadRequet(`Пользователь с userId: ${userId} не найден`)
    }
    console.log(user)

    const tokenRepository = getRepository(Token)
    const token = await tokenRepository.findOne({ where: { refreshToken } })
    // tokenRepository.createQueryBuilder().relation(Token, 'user').of(token).add
    console.log(token)

    if (token) {
      console.log(token.user)
      token.refreshToken = refreshToken
      return await tokenRepository.save(token)
    }

    const newToken = Token.create({ user, refreshToken })
    return await tokenRepository.save(newToken)
  },

  async removeToken(refreshToken: string) {
    const tokenRepository = getRepository(Token)
    const token = await tokenRepository.findOne({ refreshToken })
    if (!token) {
      throw ApiError.BadRequet(
        `Нельзя удалить несуществующий refreshToken: ${refreshToken}`
      )
    }
    return await token.remove()
  },
}
