let express = require('express')
let compression = require('compression')

// var port = process.env.PORT || config.build.port
let port = 8011

let app = express()

app.use(compression())

app.use(express.static('./build'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})