// https://github.com/typestack/class-transformer#methods
import {
  classToPlain,
  plainToClass,
  plainToClassFromExist,
  serialize,
  deserialize,
  deserializeArray,
} from 'class-transformer'
import 'reflect-metadata'

const plainUsers = [
  {
    id: 1,
    firstName: 'Ilya',
    lastName: 'Lisin',
    age: 30,
  },
  {
    id: 2,
    firstName: 'Mila',
    lastName: 'Petrova',
    age: 21,
  },
]

class User {
  public id: number = 1
  public firstName: string = 'Ilya'
  public lastName: string = 'Lisin'
  public age: number = 39
  public role: string = 'guest'

  getName() {
    return this.firstName + ' ' + this.lastName
  }
}

console.log('------------------------------------------------------')
console.log('- plainToClass')
console.log('------------------------------------------------------')

const users = plainToClass(User, plainUsers)

users.forEach(user => console.log(user.getName()))

console.log('\n\n------------------------------------------------------')
console.log('- plainToClassFromExist')
console.log('------------------------------------------------------')

const defaultUser = new User()
defaultUser.role = 'user'

const user = {
  id: 2,
  firstName: 'Mila',
  lastName: 'Petrova',
  age: 21,
}

let mixedUser = plainToClassFromExist(defaultUser, user)
console.log('mixedUser', mixedUser.getName(), mixedUser.role)

console.log('\n\n------------------------------------------------------')
console.log('- plainToClass')
console.log('------------------------------------------------------')

const plainMixedUser = classToPlain(mixedUser)
console.log(plainMixedUser, JSON.stringify(plainMixedUser))

console.log('\n\n------------------------------------------------------')
console.log('- serialize')
console.log('------------------------------------------------------')

const serializedMixedUser = serialize(mixedUser)
console.log(serializedMixedUser)

console.log('\n\n------------------------------------------------------')
console.log('- deserialize')
console.log('------------------------------------------------------')

const deserializedMixedUser = deserialize(User, serializedMixedUser)
console.log(deserializedMixedUser)

console.log('\n\n------------------------------------------------------')
console.log('- deserializeArray')
console.log('------------------------------------------------------')

const deserializedUsers = deserializeArray(User, JSON.stringify(plainUsers))
console.log(deserializedUsers)
