const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important

app.get('/', function (req, res) {
  res.json({"test":"oui"})
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
