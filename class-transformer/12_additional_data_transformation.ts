// https://github.com/typestack/class-transformer#additional-data-transformation
import 'reflect-metadata'
import moment from 'moment'
import { classToPlain, plainToClass, Transform, Type } from 'class-transformer'
import { Moment } from 'moment'

export class Photo {
  id: number

  @Type(() => Date)
  @Transform(({ value }) => moment(value), { toClassOnly: true })
  date: Moment
}

const photoDto = {
  id: 1,
  date: new Date().toString(),
}
const photo = plainToClass(Photo, photoDto)
console.log(photo)

console.log(classToPlain(photo))
console.log(photo.date.fromNow())
