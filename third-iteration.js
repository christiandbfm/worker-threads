const WorkerPool = require('./worker-pool')
const { v1 } = require('uuid')
const express = require('express')
const app = express()
const port = 3000

const workerPool = new WorkerPool(4)

app.get('/', (req, res) => {
  console.log('Hello ' + v1())
  res.send('Hello World!')
})

app.get('/expensive', (req, res) => {
  console.log('Expensive operation ' + v1())

  workerPool.runTask({ count: 10_000_000_000 }, (err, data) => {
    if (err) {
      return res.status(500).send('error')
    }
    res.send(data.toString())
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
