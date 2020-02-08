const db=require('./db.js')
const axios = require('axios').default;
const urlConst=db.DB_ADDR+"article"

async function getArticles()
{
	return await axios.get(urlConst,db.DB_HEADERS).then(resp => 
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

async function getArticle(id)
{
	let url=urlConst+"/"+id
	return await axios.get(url,db.DB_HEADERS).then(resp => 
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

async function insertArticle(article)
{
	return await axios.post(urlConst,article,db.DB_HEADERS).then(resp => 
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

async function updateArticle(article)
{
	let url=urlConst+"/"+article.id
	return await axios.put(url,article,db.DB_HEADERS).then(resp => 
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

async function deleteArticle(id)
{
	let url=urlConst+"/"+id
	return await axios.delete(url,db.DB_HEADERS).then(resp => 
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

module.exports = 
{
  getArticles: getArticles,
  getArticle:getArticle,
  insertArticle: insertArticle,
  updateArticle:updateArticle,
  deleteArticle: deleteArticle
}