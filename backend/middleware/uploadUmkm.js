// middleware/uploadUmkm.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder sementara untuk menyimpan file sebelum diupload ke Supabase
const tempDir = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Konfigurasi storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueName);
  },
});

// Filter file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar (jpeg, png, jpg, webp)'));
  }
};

// Export middleware multer
const uploadUmkm = multer({ storage, fileFilter });
module.exports = uploadUmkm