const db=require('./db.js')
const axios = require('axios').default;

async function getArticles()
{
	return await axios.get(db.DB_ADDR+"article",db.DB_HEADERS).then(resp => 
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

module.exports = {
  getArticles: getArticles
}