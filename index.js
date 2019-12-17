const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important

app.use(cors())

app.get('/', function (req, res) {
	res.json({test : "ok"})
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
