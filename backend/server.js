const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://rumahbumnsemarang.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Request masuk:', req.method, req.url);
  next();
});

app.use(
  '/images',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, 'public/images'))
);

app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
    if (req.originalUrl.includes('_method=PUT')) {
      return 'PUT';
    }
  })
);

const adminRoutes = require('./routes/adminRoutes');
const umkmRoutes = require('./routes/umkmRoutes');
const galeriRoutes = require('./routes/galeriRoutes');
const beritaRoutes = require('./routes/beritaRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/umkm', umkmRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/berita', beritaRoutes);
app.get('/', (req, res) => res.send('Server is up & running'));
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack || err);
  res.status(500).json({ message: 'Terjadi kesalahan di server', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
