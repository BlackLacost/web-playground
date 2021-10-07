import 'reflect-metadata'
import { createConnection } from 'typeorm'

export const connectDb = async () => {
  try {
    await createConnection()
    console.log('Connected to postgres')
  } catch (error) {
    console.log(error)
  }
}
