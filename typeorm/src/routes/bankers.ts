import express from 'express'

import { Banker } from '../entities/Banker'
import { Client } from '../entities/Client'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, cardNumber, employeeNumber } = req.body
    const banker = Banker.create({
      firstName,
      lastName,
      email,
      cardNumber,
      employeeNumber,
    })
    await banker.save()

    return res.json(banker)
  } catch (e) {
    console.log(e)
    return res.json({ message: 'Не могу создать нового банкира' })
  }
})

router.put('/:bankerId/clients/:clientId', async (req, res) => {
  const { clientId, bankerId } = req.params

  const client = await Client.findOne(parseFloat(clientId))
  const banker = await Banker.findOne(parseFloat(bankerId))

  if (!banker || !client) {
    return res.json({
      message: 'Banker or client not found',
    })
  }

  banker.clients = [client]

  await banker.save()

  return res.json({
    message: `Client ${clientId} added to banker ${bankerId}`,
  })
})

export { router as bankersRouter }
