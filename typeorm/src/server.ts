import express from 'express'

import { connectDb } from './db'
import { routes } from './routes'

const app = express()
const hostname = 'localhost'
const port = 3000

// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const main = async () => {
  await connectDb()
  routes(app)
  app.listen(port, () => console.log(`Server on http://${hostname}:${port}`))
}

main()
