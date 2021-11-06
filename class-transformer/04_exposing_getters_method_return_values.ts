// https://github.com/typestack/class-transformer#exposing-getters-and-method-return-values
import 'reflect-metadata'
import { classToPlain, Expose } from 'class-transformer'

export class User {
  id: number
  firstName: string
  lastName: string
  password: string

  @Expose()
  get name() {
    return this.firstName + ' ' + this.lastName
  }

  @Expose()
  getFullName() {
    return this.firstName + ' ' + this.lastName
  }
}

const user = {
  id: 1,
  firstName: 'Ilya',
  lastName: 'Lisin',
  password: 'pass',
}

console.log(classToPlain(Object.assign(new User(), user)))
