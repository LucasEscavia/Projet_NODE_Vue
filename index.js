const express = require('express')
const cors = require('cors')
const axios = require('axios')
const article = require('./back/article.js')
const user = require('./back/user.js')
const crypto = require('crypto')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const algorithme = 'aes256'
const cleDeChiffrement = 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3'

const secret = 'Le[+36>6(gJW*/>E:&,K'
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const jwtOptions =
{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}




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
	if (req.session.passport.user == null )
	{
		res.send('Pas autorisé');
	}
	else
	{
		let params=req.params
		let unArticle={
		titre:params.titre,
		date: Date.now(),
		description:params.description,
		idUtilisateur:req.session.passport.user._id}
		const repInsert=await article.insertArticle(unArticle)
		res.send(repInsert)
	}
	
})

app.get('/updateArticle/:id.:titre.:description', async function (req, res) {
	let params=req.params
	const unArticleBase = await article.getArticle(params.id)
	if (req.session.passport.user == null || unArticleBase.idUtilisateur!=req.session.passport.user._id)
	{
		res.redirect('/');
	}
	else
	{
		let unArticle={
		id:params.id,
		titre:params.titre,
		date: Date.now(),
		description:params.description}
		const articles = await article.updateArticle(unArticle)
		res.send(articles)
	}
	
})

app.get('/deleteArticle/:id', async function (req, res) {
	let params=req.params
	const unArticleBase = await article.getArticle(params.id)
	if (req.session.passport.user == null || unArticleBase.idUtilisateur!=req.session.passport.user._id )
	{
		res.redirect('/');
	}
	else
	{
		const articles = await article.deleteArticle(params.id)
		res.send(articles)
	}
})


app.get('/insertUtilisateur/:login.:password', async function (req, res)
{
	let params=req.params

	let cipher = crypto.createCipher(algorithme,cleDeChiffrement)
	let crypted = cipher.update(params.password,'utf8','hex')
	crypted += cipher.final('hex');

	let unUtilisateur=
	{
		login:params.login,
		password:crypted
	}
	const repInsertUtilisateur=await user.insertUtilisateur(unUtilisateur)
	if (repInsertUtilisateur == false)
	{
		res.status(500).send("Une erreur s'est produite veuillez reessayer")
	}
	res.send(repInsertUtilisateur)
})

app.post('/login', urlEncodedParser,async function (req, res)
{
	let login = req.body.login
  let password = req.body.password

  if (!login || !password)
	{
    res.status(401).json({ error: 'Veuillez renseigner un mot de passe et un login' })
    return
  }

  const utilisateur = await user.getUtilisateurByLogin(login,cryptPassword(password))
  console.log(Object.entries(utilisateur))
  if (Object.entries(utilisateur).length === 0)
  {
   res.status(401).json({ error: 'login/mot de passe incorrect veuillez réessayer' })
   return
  }
  else
  {
    let infoUtilisateur = utilisateur[0]
    let loginUtilisateur = infoUtilisateur.login
    const userJwt = jwt.sign({ utilisateur: loginUtilisateur }, secret)
    res.json({ jwt: userJwt })
  }


})

function decryptPassword(password)
{
  let decipher = crypto.createDecipher(algorithme,cleDeChiffrement)
  let dec = decipher.update(password,'hex','utf8')
  dec =+ decipher.final('utf8')
  return dec
}

function cryptPassword(password)
{
  let cipher = crypto.createCipher(algorithme,cleDeChiffrement)
	let crypted = cipher.update(password,'utf8','hex')
	crypted += cipher.final('hex')
  return crypted
}

app.listen(PORT, function () {
  console.log('J écoute sur le port suivant :  ' + PORT)
})
