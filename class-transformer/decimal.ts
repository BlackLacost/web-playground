import 'reflect-metadata'
import { plainToClass, Transform, Type } from 'class-transformer'
import Decimal from 'decimal.js'

const costPerUnit = new Decimal(99.99)
console.log(costPerUnit)

const dataDto = {
  costPerUnit: costPerUnit.toNumber(),
  units: 20,
}

class Product {
  @Transform(({ value }) => new Decimal(value))
  costPerUnit: Decimal

  units: number
}

const product = plainToClass(Product, dataDto)
console.log(product)
console.log(product.costPerUnit instanceof Decimal)
console.log(product.costPerUnit.toOctal())
