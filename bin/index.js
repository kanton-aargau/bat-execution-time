
const { join, isAbsolute } = require('path')
const createUi = require('cliui')
const chalk = require('chalk')
const run = require('..')
const fs = require('mz/fs')

const ui = createUi({
  width: 80
})

const argv = require('yargs')
  .usage('$0 [batfile] [args]')
  .option('times', {
     alias: 't',
     describe: 'run the tests `t` times',
     default: 1,
     type: 'number'
   })
  .option('output', {
    alias: 'o',
    describe: 'write the results into a json file',
    type: 'string'
  })
  .demand(1)
  .alias({ h: 'help'})
  .help('help')
  .argv

let path = argv._[0]

if (!isAbsolute(path)) {
  path = join(process.cwd(), argv._[0])
}

run(path, argv.times)
  .then((results) => {
    return argv.output
      ? saveResults(argv.output, results)
      : logResults(results)
  })
  .catch(console.error)

function saveResults (outputPath, results) {
  return fs.writeFile(
    outputPath,
    JSON.stringify({ data: results }, null, 2),
    'utf-8'
  )
}

function logResults (results) {
  log(chalk.yellow('results'))
  
  ui.div(
    { text: chalk.bold('Execution Time'), padding: [0, 0, 0, 2], width: 40 },
    { text: chalk.bold('Time of day'), width: 20 }
  )

  results.forEach((result) => {
    ui.div(
      { text: result.processTime, padding: [0, 0, 0, 2], width: 40 },
      { text: result.timeOfDay, width: 20 }
    )
  })
  
  console.log(ui.toString())
}

function log (msg, indent = 2) {
  console.log()
  console.log(indentString(indent, msg))
  console.log()
}

function indentString (times, msg) {
  return ' '.repeat(times) + msg
}