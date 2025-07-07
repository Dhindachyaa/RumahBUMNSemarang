const express = require('express')
const router = express.Router()
const umkmController = require('../controllers/umkmController')
const multer = require('multer')
const path = require('path')

// Konfigurasi multer: upload ke public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  }
})
const upload = multer({ storage })

/* -------------------------------
  Upload Gambar UMKM (pindah ke atas biar tidak tabrakan dengan :id)
--------------------------------- */
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.json({
    message: 'Upload berhasil',
    imagePath: `images/${req.file.filename}`
  })
})

/* -------------------------------
  CRUD UMKM
--------------------------------- */
router.get('/', umkmController.getAll)
router.post('/', umkmController.create)
router.put('/:id', umkmController.update)
router.delete('/:id', umkmController.remove)
router.get('/:id', umkmController.getById)

module.exports = router
