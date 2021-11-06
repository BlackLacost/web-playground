// https://github.com/typestack/class-transformer#working-with-nested-objects
import 'reflect-metadata'
import { Type, plainToClass } from 'class-transformer'

class Album {
  id: number

  name: string

  @Type(() => Photo)
  photos: Photo[]
}

class Photo {
  id: number
  filename: string
}

const albumJson = {
  id: 1,
  name: 'Album 1',
  photos: [
    { id: 1, filename: 'filename1' },
    { id: 2, filename: 'filename2' },
  ],
}

let album = plainToClass(Album, albumJson)
// now album is Album object with Photo objects inside

console.log(album)

abstract class AbstractPhoto {
  id: number
  filename: string
}

class Landscape extends AbstractPhoto {
  panorama: boolean
}

class Person {
  name: string
}

class Portrait extends AbstractPhoto {
  person: Person
}

class UnderWater extends AbstractPhoto {
  depth: number
}

class Album2 {
  id: number
  name: string

  @Type(() => AbstractPhoto, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: Landscape, name: 'landscape' },
        { value: Portrait, name: 'portrait' },
        { value: UnderWater, name: 'underwater' },
      ],
    },
  })
  topPhoto: Landscape | Portrait | UnderWater
}

const albumJson2 = {
  id: 1,
  name: 'foo',
  topPhoto: {
    id: 9,
    filename: 'cool_wale.jpg',
    // depth: 1245,
    // __type: 'underwater',
    panorama: 'panorama',
    __type: 'landscape',
  },
}

let album2 = plainToClass(Album2, albumJson2)
// now album is Album object with a UnderWater object without `__type` property.

console.log(album2)
