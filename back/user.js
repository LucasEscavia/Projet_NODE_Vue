const db=require('./db.js')
const axios = require('axios').default;
const urlConst=db.DB_ADDR+"utilisateur"



async function getUtilisateur(id)
{
	let url=urlConst+"/"+id
	//let url=urlConst+"?id="+id
	return await axios.get(url,db.DB_HEADERS).then(resp =>
	{
		return resp.data

	}).catch(fail=>
	{
		return fail
	})
}

async function insertUtilisateur(utilisateur)
{
	return await axios.post(urlConst,utilisateur,db.DB_HEADERS).then(resp =>
	{
		return resp.data

	}).catch(fail=>
	{
		return false
	})
}



module.exports =
{
  getUtilisateur: getUtilisateur,
  insertUtilisateur: insertUtilisateur,
}
