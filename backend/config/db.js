const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'rumah_bumn_semarang'
})

connection.connect((err) => {
  if (err) throw err
  console.log('✅ Terkoneksi dengan database MySQL!')
})

module.exports = connection
