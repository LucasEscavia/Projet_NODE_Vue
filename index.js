const express = require('express')
const cors = require('cors')
const axios = require('axios')
const article = require('./back/article.js')
const user = require('./back/user.js')
const crypto = require('crypto')
const algorithme = 'aes256'
const cleDeChiffrement = 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3'
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
	const unArticle = await article.getArticle(req.params.id)
	res.send(unArticle)
})

app.get('/insertArticle/:titre.:description', async function (req, res) {
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


app.get('/insertUtilisateur/:login.:password', async function (req, res)
{
	let params=req.params
	
	let cipher = crypto.createCipher(algorithme,cleDeChiffrement)
	let crypted = cipher.update(params.password,'utf8','hex')
	crypted += cipher.final('hex');

	let unUtilisateur={
		login:params.login,
		password:crypted}
	const repInsertUtilisateur=await user.insertUtilisateur(unUtilisateur)
	if (repInsertUtilisateur == false)
	{
		res.status(500).send("Une erreur s'est produite veuillez reessayer")
	}
	res.send(repInsertUtilisateur)
})

app.listen(PORT, function () {
  console.log('J écoute sur le port suivant :  ' + PORT)
})
