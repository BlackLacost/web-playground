// https://github.com/typestack/class-transformer#exposing-properties-with-different-names
import 'reflect-metadata'
import { classToPlain, Expose, plainToClass } from 'class-transformer'

export class User {
  @Expose({ name: 'uid' })
  id: number
  firstName: string
  lastName: string

  @Expose({ name: 'secretKey' })
  password: string

  get name() {
    return this.firstName + ' ' + this.lastName
  }

  @Expose({ name: 'fullName' })
  getFullName() {
    return this.firstName + ' ' + this.lastName
  }
}

const userDto = {
  uid: 1,
  firstName: 'Ilya',
  lastName: 'Lisin',
  secretKey: 'pass',
}
const user = plainToClass(User, userDto)
console.log(user)

console.log(classToPlain(user))
