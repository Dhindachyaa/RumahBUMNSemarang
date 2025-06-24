const db = require('../config/db');

exports.getAllUMKM = (cb) => {
  db.query('SELECT id, nama, kategori, image_path FROM umkm', cb);
};
exports.getUMKMById = (id, cb) => {
  db.query(
    'SELECT id, nama, pemilik, kategori, telepon, instagram, facebook, image_path FROM umkm WHERE id = ?',
    [id], cb
  );
};
