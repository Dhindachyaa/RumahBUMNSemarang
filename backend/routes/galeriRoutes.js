const express = require('express');
const router = express.Router();
const galeriController = require('../controllers/galeriController');
const upload = require('../middleware/uploadGaleri');

router.get('/', galeriController.getAllGaleri);
router.get('/paginate', galeriController.getPaginatedGaleri);
router.get('/count', galeriController.getGaleriCount);
router.post('/', upload.single('gambar'), galeriController.addGaleri);
router.put('/:id', upload.single('gambar'), galeriController.updateGaleri);

router.post('/:id', upload.single('gambar'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return galeriController.updateGaleri(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

router.delete('/:id', galeriController.deleteGaleri);

module.exports = router;
