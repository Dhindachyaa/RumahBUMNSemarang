const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ganti kalau ada password
  database: 'rumah_bumn_semarang'
})

connection.connect((err) => {
  if (err) throw err
  console.log('✅ Terkoneksi dengan database MySQL!')
})

module.exports = connection
