import { Request, Response, Express } from 'express'

import { bankersRouter } from './bankers'
import { clientsRouter } from './clients'

export function routes(app: Express) {
  app.use('/api/bankers', bankersRouter)
  app.use('/api/clients', clientsRouter)

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
  })
}
