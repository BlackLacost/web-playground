import express from 'express'

import { Client } from '../entities/Client'
import { Transaction, TransactionTypes } from '../entities/Transaction'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, cardNumber, balance } = req.body
    const client = Client.create({
      firstName,
      lastName,
      email,
      cardNumber,
      balance,
    })
    await client.save()

    return res.json(client)
  } catch (e) {
    console.log(e)
    return res.json({ message: 'Не могу создать нового клиента' })
  }
})

router.post('/:clientId/transaction', async (req, res) => {
  const { clientId } = req.params

  const { type, amount } = req.body

  const client = await Client.findOne(parseInt(clientId))

  if (!client) {
    return res.json({
      message: `Клиент с id: ${clientId} не найден`,
    })
  }

  if (!Object.values(TransactionTypes).includes(type)) {
    const error = `${type} неверный type транзакции `
    console.log(error)
    return res.json({ message: error })
  }

  const transaction = Transaction.create({
    amount,
    type,
    client,
  })

  if (type === TransactionTypes.DEPOSIT) {
    client.balance += amount
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance -= amount
  }

  await transaction.save()
  await client.save()
  return res.json({ message: 'Transaction added' })
})

export { router as clientsRouter }
