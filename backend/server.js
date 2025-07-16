const express = require('express');
const cors = require('cors');
const path = require('path');

// ⬇️ Database config
require('./config/db');

// ⬇️ Import routes
const umkmRoutes = require('./routes/umkmRoutes');
const galeriRoutes = require('./routes/galeriRoutes');
const beritaRoutes = require('./routes/beritaRoutes'); // ✅ Tambah berita

const app = express();
app.use(cors());

// ✅ Method override untuk PUT dengan multipart/form-data (multer)
app.use((req, res, next) => {
  if (req.method === 'PUT' && req.headers['content-type']?.includes('multipart/form-data')) {
    req.method = 'POST';
    req.originalMethod = 'PUT';
  }
  next();
});

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder for images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ Register routes
app.use('/api/umkm', umkmRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/berita', beritaRoutes); // ✅ Tambahkan berita

// ✅ Root test
app.get('/', (req, res) => res.send('🚀 Server is up & running ⚡️'));

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan di server' });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
