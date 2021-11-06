// https://github.com/typestack/class-transformer#%D1%81onverting-date-strings-into-date-objects
import 'reflect-metadata'
import { classToPlain, plainToClass, Type } from 'class-transformer'

export class User {
  id: number

  email: string

  password: string

  @Type(() => Date)
  registrationDate: Date
}

const userDto = {
  id: 1,
  email: 'black@mail.ru',
  password: 'pass',
  registrationDate: new Date().toString(),
}
const user = plainToClass(User, userDto)
console.log(user)
console.log(user.registrationDate.getMinutes())

console.log(classToPlain(user))
