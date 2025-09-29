const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');
const upload = require('../middleware/uploadBerita');

// GET semua berita
router.get('/', beritaController.getAll);

// GET berita berdasarkan ID
router.get('/:id', beritaController.getById);

// POST tambah berita
router.post('/', upload.single('gambar'), beritaController.create);

// PUT update berita (pakai POST + override juga support)
router.put('/:id', upload.single('gambar'), beritaController.update);
router.post('/:id', upload.single('gambar'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return beritaController.update(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

// DELETE hapus berita
router.delete('/:id', beritaController.remove);

// GET total berita untuk dashboard
router.get('/count/dashboard', beritaController.count);

module.exports = router;
