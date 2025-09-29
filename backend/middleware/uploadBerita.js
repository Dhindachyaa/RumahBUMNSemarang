// middleware/uploadBerita.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder sementara untuk menyimpan file sebelum diupload ke Supabase
const tempDir = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung'), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
