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
const jwtStrategy = new JwtStrategy(jwtOptions, async function(payload, next) {
  const utilisateur = await user.getUtilisateurByLogin(payload.login)
  if (utilisateur) {
    next(null, utilisateur)
  } else {
    next(null, false)
  }
})
passport.use(jwtStrategy)
var jwtUser=""
const app = express()
const PORT = process.env.PORT || 5000
passport.use(JwtStrategy)
app.use(cors())
app.use(express.json());
app.use(function(req, res, next) {
	res.header("Accept", "application/json");
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.get('/', function (req, res) {
	res.status(200).json({ message: '<h1>Bienvenue sur le blog de NodeVueJs !!! </h1>' })
})

app.get('/getArticles', async function (req, res) {
	const articles = await article.getArticles()
	res.json(articles)
})

app.get('/getArticle/:id', async function (req, res) {
	const unArticle = await article.getArticle(req.params.id)
	res.json(unArticle)
})

app.get('/insertArticle/:titre.:description',passport.authenticate('jwt', { session: false }), async function (req, res) {
	let params=req.params
	let unArticle={
	titre:params.titre,
	date: Date.now(),
	description:params.description,
	idUtilisateur:req.user._id}
	const repInsert=await article.insertArticle(unArticle)
	res.json(repInsert)
})

app.get('/updateArticle/:id.:titre.:description', passport.authenticate('jwt', { session: false }),async function (req, res) {
	let params=req.params
	const unArticleBase = await article.getArticle(params.id)
	if (unArticleBase.idUtilisateur!=req.user._id)
	{
		res.status(401).json({ error: 'Vous n\'etes pas autorisé à faire cette action' })
	}
	else
	{
		let unArticle={
		id:params.id,
		titre:params.titre,
		date: Date.now(),
		description:params.description}
		const articles = await article.updateArticle(unArticle)
		res.json(articles)
	}
})

app.get('/deleteArticle/:id',passport.authenticate('jwt', { session: false }), async function (req, res) {
	let params=req.params
	const unArticleBase = await article.getArticle(params.id)
	if (unArticleBase.idUtilisateur!=req.user._id)
	{
		res.status(401).json({ error: 'Vous n\'etes pas autorisé à faire cette action' })
	}
	else
	{
		const articles = await article.deleteArticle(params.id)
		res.json(articles)
	}
})

app.post('/insertUtilisateur/',urlEncodedParser, async function (req, res)
{
	let login = req.body.login
	let password = req.body.password
	let cipher = crypto.createCipher(algorithme,cleDeChiffrement)
	let crypted = cipher.update(password,'utf8','hex')
	crypted += cipher.final('hex');
	let unUtilisateur=
	{
		login:login,
		password:crypted
	}
	const repInsertUtilisateur=await user.insertUtilisateur(unUtilisateur)
	if (repInsertUtilisateur == false)
	{
		res.status(500).json({ error: 'Une erreur s\'est produite veuillez reessayer' })
	}
	await seLoger(login,password)
	res.json({ jwt: jwtUser })
})

app.post('/login', urlEncodedParser,async function (req, res)
{
	let jwtHeader=""
	if(req.headers.authorization)
	{
		jwtHeader=JSON.stringify(req.headers.authorization).split(":")[1]
	}
	if (jwtHeader!="")
	{
		res.status(500).json({ error: 'Une erreur s\'est produite veuillez reessayer' })
	}
	let login = req.body.login
	let password = req.body.password
	if (!login || !password)
	{
		res.status(401).json({ error: 'Veuillez renseigner un mot de passe et un login' })
		return
	}
	await seLoger(login,password)
	if (jwtUser==="")
	{
		res.status(401).json({ error: 'login/mot de passe incorrect veuillez réessayer' })
		return
	}
	res.json({ jwt: jwtUser })
})

async function seLoger(login,password)
{
	const utilisateur = await user.getUtilisateurByLoginAndPassword(login,cryptPassword(password))
	if (Object.entries(utilisateur).length >0)
	{
		let infoUtilisateur = utilisateur[0]
		let loginUtilisateur = infoUtilisateur.login
		jwtUser = jwt.sign({ login: loginUtilisateur }, secret,{expiresIn:10})//changer le temps
	}
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
