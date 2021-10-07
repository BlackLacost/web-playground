import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'

import router from './routers'
import { connectDb } from './db'
import errorMiddleware from './middlewares/error.middleware'

config()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', router)
// Мидлеваре ошибок подключается в конце
app.use(errorMiddleware)

const start = async () => {
  try {
    await connectDb()
    app.listen(port, () => console.log(`Server on http://localhost:${port}`))
  } catch (e) {
    console.log(e)
  }
}

start()
