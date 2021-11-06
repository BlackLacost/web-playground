// https://github.com/typestack/class-transformer#using-groups-to-control-excluded-properties
import { Exclude, Expose, classToPlain, plainToClass } from 'class-transformer'

export class User {
  id: number

  name: string

  @Expose({ groups: ['user', 'admin'] }) // this means that this data will be exposed only to users and admins
  email: string

  @Expose({ groups: ['user'] }) // this means that this data will be exposed only to users
  password: string
}

const userDto = {
  id: 1,
  name: 'Ilya',
  email: 'black@mail.ru',
  password: 'pass',
}
const userGuest = plainToClass(User, userDto)
console.log(userGuest)

let userGuest1 = classToPlain(userGuest) // will contain id, name, email and password
console.log(userGuest1)

const user = plainToClass(User, userDto, { groups: ['user'] })
console.log(user)

let user1 = classToPlain(user, { groups: ['user'] }) // will contain id, name, email and password
console.log(user1)

const admin = plainToClass(User, userDto, { groups: ['admin'] })
console.log(admin)

let user2 = classToPlain(admin, { groups: ['admin'] }) // will contain id, name and email
console.log(user2)
