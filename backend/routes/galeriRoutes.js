const express = require('express');
const router = express.Router();
const galeriController = require('../controllers/galeriController');
const upload = require('../middleware/uploadGaleri'); // ✅ SUDAH BENAR

// ✅ Ambil semua galeri
router.get('/', galeriController.getAllGaleri);

// ✅ Ambil total galeri (untuk dashboard admin)
router.get('/count', galeriController.getGaleriCount);

// ✅ Tambah galeri baru
router.post('/', upload.single('gambar'), galeriController.addGaleri);

// ✅ Update galeri langsung pakai PUT (jika tidak pakai override)
router.put('/:id', upload.single('gambar'), galeriController.updateGaleri);

// ✅ Support method override untuk PUT jika pakai multipart/form-data
router.post('/:id', upload.single('gambar'), (req, res) => {
  if (req.originalMethod === 'PUT') {
    req.method = 'PUT';
    return galeriController.updateGaleri(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

// ✅ Hapus galeri
router.delete('/:id', galeriController.deleteGaleri);

module.exports = router;
