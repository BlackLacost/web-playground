// https://github.com/typestack/class-transformer#enforcing-type-safe-instance

import { Expose, plainToClass } from 'class-transformer'

class User {
  public id: number
  public firstName: string
  public lastName: string
}

const fromPlainUser = {
  unkownProp: 'hello there',
  firstName: 'Umed',
  lastName: 'Khudoiberdiev',
}

console.log(plainToClass(User, fromPlainUser))

// User {
//   unkownProp: 'hello there',
//   firstName: 'Umed',
//   lastName: 'Khudoiberdiev',
// }

class User2 {
  @Expose() public id: number
  @Expose() public firstName: string
  @Expose() public lastName: string
}

console.log(plainToClass(User2, fromPlainUser, { excludeExtraneousValues: true }))

// User2 { id: undefined, firstName: 'Umed', lastName: 'Khudoiberdiev' }
