import { User } from '../entity/User'

export interface UserDto {
  id: number
  email: string
  isActive: boolean
}

export const getUserDto = (user: User): UserDto => ({
  email: user.email,
  id: user.id,
  isActive: user.isActive,
})
