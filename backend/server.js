const express = require('express')
const cors = require('cors')
require('./config/db')                   // koneksi database
const umkmRoutes = require('./routes/umkmRoutes')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// Serve folder public/images agar file bisa diakses di /images/…
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// Route root untuk tes server
app.get('/', (req, res) => {
  res.send('Server is up & running ⚡️')
})

// ✅ Routes UMKM API pakai /api/umkm
app.use('/api/umkm', umkmRoutes)

// Middleware 404 jika route tidak ada
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' })
})

// Middleware error global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Terjadi kesalahan di server' })
})

// Jalankan server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
})
