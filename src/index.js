
const exec = require('child_process').exec
const { join } = require('path')

module.exports = run

function run (path, times) {
  return seq(fillArray(() => measure(path), times + 1))
}

// sequentially run all tasks and gather their results in an array
function seq (arr) {
  if (!arr) return Promise.reject(new Error('Seq is required!'))
  let results = []
  let queue = Promise.resolve()
  queue = arr.reduce((q, step, i) => {
    return q.then((result) => {
      results.push(result)
      console.log('start measuring', i)
      return step()
    }).then((res) => {
      console.log('stop measuring', i)
      return res
    })
  }, queue)
  return queue.then(() => drop(1, results))
}

// execute given `path` and measure the time it took
function measure (path) {
  return new Promise((resolve, reject) => {
    const start = process.hrtime()
    const now = (new Date()).getTime()
    exec(path, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      const [s, ns] = process.hrtime(start)
      resolve({
        processTime: s + ns / 1e9,
        timeOfDay: fmt(now)
      })
    })
  })
}

function fmt () {
  const date = new Date()

  let hour = date.getHours()
  hour = (hour < 10 ? '0' : '') + hour

  let min = date.getMinutes()
  min = (min < 10 ? '0' : '') + min

  let sec = date.getSeconds()
  sec = (sec < 10 ? '0' : '') + sec

  return `${hour}:${min}:${sec}`
}

// drop `n` items from the `arr`
function drop (n, arr) {
  return arr.slice(Math.max(0, n), Infinity)
}

// fill the array with the given `value` `len` times
function fillArray (value, len) {
  var arr = []
  for (var i = 0; i < len; i++) {
    arr.push(value)
  }
  return arr
}