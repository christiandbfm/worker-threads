const { Worker } = require('worker_threads')
const { v1 } = require('uuid')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('Hello ' + v1())
  res.send('Hello World!')
})

app.get('/expensive', (req, res) => {
  // THIS IS A NAIVE IMPLEMENTATION
  // Your users can take your application down
  // What happens when you receive many concurrent calls to this endpoint?
  // Your server won't have enough resources and will crash
  // Use a QUEUE (background or in process)
  console.log('Expensive operation ' + v1())

  const worker = new Worker('./worker')
  worker.postMessage({ count: 10_000_000_000 })
  worker.on('message', (response) => {
    res.send(response.toString())
  })
  worker.on('error', () => {
    res.status(500).send('error')
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
