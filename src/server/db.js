const pg = require('pg');
const url = require('url');

if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

} else {

	var configs = {
		user: 'jodich',
	  	host: '127.0.0.1',
	  	database: 'howah',
		  port: 5432
    };

}

const db = new pg.Pool(configs);

module.exports = db;