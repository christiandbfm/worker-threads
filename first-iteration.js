const express = require('express')
const { v1 } = require('uuid')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('Hello ' + v1())
  res.send('Hello World!')
})

app.get('/expensive', (req, res) => {
  console.log('Expensive operation ' + v1())
  let count = 0;
  for (let iteration = 0; iteration < 10_000_000_000; iteration++) {
    count += iteration;
  }
  res.send(count.toString())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
