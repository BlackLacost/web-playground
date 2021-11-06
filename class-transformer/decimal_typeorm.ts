import 'reflect-metadata'
import { classToPlain, plainToClass, Transform, Type } from 'class-transformer'
import Decimal from 'decimal.js'
import { Entity, createConnection, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: Decimal) => value.toString(),
      from: (value: string) => new Decimal(value),
    },
  })
  @Transform(({ value }: { value: Decimal }) => value.toNumber(), { toPlainOnly: true })
  @Transform(({ value }: { value: number }) => new Decimal(value), { toClassOnly: true })
  costPerUnit: Decimal

  units: number
}

// console.log(new Number(99).toString())
// const costPerUnit = new Decimal(99.99)
// console.log(costPerUnit)

const dataDto = {
  costPerUnit: 99.99,
  units: 20,
}

const product = plainToClass(Product, dataDto)
console.log(product)
console.log(product.costPerUnit instanceof Decimal)
// console.log(product.costPerUnit.toOctal())

// createConnection()
//   .then(async connection => {
//     console.log('Inserting a new user into the database...')
//     const product = new Product()
//     product.costPerUnit = new Decimal(99.993)
//     product.units = 10
//     await connection.manager.save(product)
//     console.log('Saved a new product with id: ' + product.id)

//     console.log('Loading product from the database...')
//     const products = await connection.manager.find(Product)
//     console.log('Loaded products: ', products)
//     products.forEach(product => {
//       // console.log(typeof product.costPerUnit)
//       console.log(classToPlain(product))
//     })
//   })
//   .catch(error => console.log(error))
