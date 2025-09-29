const express = require('express');
const router = express.Router();
const galeriController = require('../controllers/galeriController');
const upload = require('../middleware/uploadGaleri');

// GET semua galeri
router.get('/', galeriController.getAllGaleri);

// GET galeri dengan pagination
router.get('/paginate', galeriController.getPaginatedGaleri);

// GET jumlah galeri
router.get('/count', galeriController.getGaleriCount);

// POST tambah galeri (upload gambar sementara dulu, nanti di controller ke Supabase)
router.post('/', upload.single('gambar'), galeriController.addGaleri);

// PUT update galeri
router.put('/:id', upload.single('gambar'), galeriController.updateGaleri);

// POST dengan method override untuk update
router.post('/:id', upload.single('gambar'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return galeriController.updateGaleri(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

// DELETE hapus galeri
router.delete('/:id', galeriController.deleteGaleri);

module.exports = router;
