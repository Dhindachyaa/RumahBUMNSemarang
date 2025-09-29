// routes/umkmRoutes.js
const express = require('express');
const router = express.Router();
const umkmController = require('../controllers/umkmController'); // pastikan controller ada
const uploadUmkm = require('../middleware/uploadUmkm'); // multer instance

// GET jumlah UMKM untuk dashboard
router.get('/count/dashboard', umkmController.getUMKMCount);

// POST upload gambar sementara (sebelum ke Supabase)
router.post('/upload', uploadUmkm.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Upload berhasil',
    imagePath: `images/umkm/${req.file.filename}`
  });
});

// GET UMKM dengan pagination
router.get('/paginate', umkmController.getPagedUMKM);

// GET semua UMKM
router.get('/', umkmController.getAllUMKM);

// POST tambah UMKM
router.post('/', uploadUmkm.single('image'), umkmController.addUMKM);

// PUT update UMKM
router.put('/:id', uploadUmkm.single('image'), umkmController.updateUMKM);

// POST dengan method override untuk update
router.post('/:id', uploadUmkm.single('image'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return umkmController.update(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

// DELETE hapus UMKM
router.delete('/:id', umkmController.deleteUMKM);

// GET UMKM by ID
router.get('/:id', umkmController.getUMKMById);

module.exports = router;
