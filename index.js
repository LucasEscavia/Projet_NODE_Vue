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
	res.json(articles)
})

app.get('/getArticle/:id', async function (req, res) {
	const unArticle = await article.getArticle(req.params.id)
	res.json(unArticle)
})

app.get('/insertArticle/:titre.:description', async function (req, res) {
	/*if(pasConnecte)
	{
		res.send(); //error
	}*/
	let params=req.params
	let unArticle={
		id:null,
		titre:params.titre,
		date: Date.now(),
		description:params.description}
	const repInsert=await article.insertArticle(unArticle)
	res.send(repInsert)
})

app.get('/updateArticle/:id.:titre.:description', async function (req, res) {
	let params=req.params
	let unArticle={
		id:params.id,
		titre:params.titre,
		date: Date.now(),
		description:params.description}
	const articles = await article.updateArticle(unArticle)
	res.send(articles)
})

app.get('/deleteArticle/:id', async function (req, res) {
	const articles = await article.deleteArticle(req.params.id)
	res.send(articles)
})


app.listen(PORT, function () {
  console.log('J écoute sur le port suivant :  ' + PORT)
})

