const { parentPort } = require('node:worker_threads')

parentPort.on('message', (task) => {
  let count = 0
  for (let iteration = 0; iteration < task.count; iteration++) {
    count += iteration
  }

  parentPort.postMessage(count)
})
