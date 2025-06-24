// config/db.js
const mysql = require('mysql2') // ✅ Tambahkan baris ini!

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // atau isi password jika kamu set
  database: 'rumah_bumn_semarang'
})

connection.connect((err) => {
  if (err) throw err
  console.log('Terkoneksi dengan database MySQL!')
})

module.exports = connection
