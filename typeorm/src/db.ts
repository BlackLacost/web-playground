import { Banker } from './entities/Banker'
import { createConnection } from 'typeorm'

import { Client } from './entities/Client'
import { Transaction } from './entities/Transaction'

export const connectDb = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pa$$word',
      database: 'typeorm',
      entities: [Client, Banker, Transaction],
      // Синхронизация entities с базой данных
      synchronize: true,
    })
    console.log('Connected to postgres')
  } catch (e) {
    console.error(e)
    throw new Error('Unable to connect to postgres')
  }
}
