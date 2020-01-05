const express = require('express')
const cors = require('cors')
const axios = require('axios')
const article = require('./back/article.js')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.get('/', function (req, res) {
	res.send("<h1>Bienvenue sur le blog de NodeVueJs !!! </h1>")
})

app.get('/getArticles', async function (req, res) {
	const articles = await article.getArticles()
	res.send(articles)
})

app.get('/getArticle/:id', async function (req, res) {
	const article = await article.getArticle(req.params.id)
	res.send(article)
})

app.get('/insertArticle', async function (req, res) {
	//article = ?
	let unArticle={id:4,titre:"Quelle est la différence entre la flexibilité et l'agilité ?",date:"17/12/2019 04:45:12",description:"Baise tes morts"}
	const repInsert=await article.insertArticle(unArticle)
	res.send(repInsert)
})

app.get('/updateArticle/:id', async function (req, res) {
	//article = ?
	const articles = await article.updateArticle(req.params.id,article)
	res.send(articles)
})

app.get('/deleteArticle/:id', async function (req, res) {
	const articles = await article.deleteArticle(req.params.id)
	res.send(articles)
})


app.listen(PORT, function () {
  console.log('J écoute sur le port suivant :  ' + PORT)
})
