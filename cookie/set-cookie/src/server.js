const express = require('express')

const app = express()
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.post('/', (req, res) => {
  const { key, value, seconds } = req.body
  res.set('set-cookie', `${key}=${value}; max-age=${seconds}`)
  res.redirect(301, '/')
})

app.listen(port, () => console.log(`Listening on ${port}`))
