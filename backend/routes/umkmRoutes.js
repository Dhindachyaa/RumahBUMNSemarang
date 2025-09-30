const express = require('express');
const router = express.Router();
const umkmController = require('../controllers/umkmController'); 
const uploadUmkm = require('../middleware/uploadUmkm'); 

router.get('/count/dashboard', umkmController.getUMKMCount);
router.post('/upload', uploadUmkm.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Upload berhasil',
    imagePath: `images/umkm/${req.file.filename}`
  });
});

router.get('/paginate', umkmController.getPagedUMKM);
router.get('/', umkmController.getAllUMKM);
router.post('/', uploadUmkm.single('image'), umkmController.addUMKM);
router.put('/:id', uploadUmkm.single('image'), umkmController.updateUMKM);

router.post('/:id', uploadUmkm.single('image'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return umkmController.update(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

router.delete('/:id', umkmController.deleteUMKM);
router.get('/:id', umkmController.getUMKMById);

module.exports = router;
