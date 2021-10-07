const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8000

app.post('/', (req, res) => {
  const { user, samesite, secure } = req.body
  let cookie = `user=${user}`
  if (samesite !== 'null') {
    cookie += `; samesite=${samesite}`
  }
  if (secure === 'on') {
    cookie += `; secure`
  }
  res.set('set-cookie', [cookie])
  res.redirect(301, '/')
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.get('/img', (req, res) => {
  const cookie = req.headers.cookie
  if (cookie) res.sendFile(`${__dirname}/cookie.jpg`)
  else {
    res.sendStatus(403)
    res.end()
  }
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
