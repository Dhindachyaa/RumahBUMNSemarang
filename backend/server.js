const express = require('express');
const cors = require('cors');
require('./config/db');       // koneksi DB
const umkmRoutes = require('./routes/umkmRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Serve folder public/images untuk URL /images/…
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// route root
app.get('/', (req, res) => {
  res.send('Server is up & running ⚡️');
});

// route API UMKM
app.use('/umkm', umkmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
