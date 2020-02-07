const DB_ADDR="https://projetjs-6fa4.restdb.io/rest/";
const DB_KEY="261f999481edf18ecde9aae71eace5c946e80";
const DB_HEADERS=
{
	"headers":
	{
	    "Content-Type": "application/json",
	    "x-apikey": DB_KEY,
	    "Cache-Control": "no-cache"
	}
}


module.exports = {
  DB_ADDR: DB_ADDR,
  DB_KEY: DB_KEY,
  DB_HEADERS: DB_HEADERS
}