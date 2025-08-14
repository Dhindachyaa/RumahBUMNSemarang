import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'bu6wesetu8gdk6zfb75j-mysql.services.clever-cloud.com',
  user: 'ugcsmhaklusqufzh',
  password: '7D6zKBWKI3MLDlO899Zo',
  database: 'bu6wesetu8gdk6zfb75j',
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected to Clever Cloud!');
});

export default db;
