const express = require('express')
const cors = require('cors')
const axios = require('axios')
const article = require('./back/article.js')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important


app.use(cors())

app.get('/', function (req, res) {
	res.json({test : "ok"})
})

app.get('/lesArticles', async function (req, res) {
	const articles = await article.getArticles()
	res.send(articles)
})


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
