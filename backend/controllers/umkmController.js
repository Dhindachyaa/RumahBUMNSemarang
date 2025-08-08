const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const umkmModel = require('../models/umkmModel');

// GET semua UMKM (untuk frontend/admin, RAW)
exports.getAll = (req, res) => {
  const search = req.query.search || '';
  const kategori = req.query.kategori || '';
  const limit = parseInt(req.query.limit) || 0;
  const offset = parseInt(req.query.offset) || 0;

let sql = `
  SELECT * FROM umkm
  WHERE nama LIKE ? 
`;
const params = [`%${search}%`];

if (kategori !== '') {
  sql += ' AND kategori = ?';
  params.push(kategori);
}


  if (limit > 0) {
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
    res.json({ data: result }); // ✅ dibungkus dalam objek data
  });
};

// GET UMKM by ID
exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM umkm WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
    if (result.length === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' });
    res.json(result[0]);
  });
};

// POST: Tambah UMKM
exports.create = (req, res) => {
  console.log('req.body:', req.body)
  console.log('req.file:', req.file) // pastikan ini tidak undefined!

  const { nama, deskripsi, varian, kategori, pemilik, instagram } = req.body
  const image_path = req.file ? `images/umkm/${req.file.filename}` : 'images/umkm/rumah-bumn.png';

  const sql = `
    INSERT INTO umkm (nama, deskripsi, varian, kategori, pemilik, instagram, image_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  const values = [nama, deskripsi, varian, kategori, pemilik, instagram, image_path]

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menambah data', error: err })
    res.status(201).json({ message: 'UMKM berhasil ditambahkan', id: result.insertId })
  })
}

// PUT: Update UMKM
// PUT: Update UMKM (hanya field yang diubah akan disimpan)
exports.update = (req, res) => {
  const id = req.params.id;

  // Ambil data lama dari database
  db.query('SELECT * FROM umkm WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data lama', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

    const oldData = results[0];

    // Gunakan data baru jika ada, jika tidak pakai data lama
    const {
      nama = oldData.nama,
      deskripsi = oldData.deskripsi,
      varian = oldData.varian,
      kategori = oldData.kategori,
      pemilik = oldData.pemilik,
      instagram = oldData.instagram
    } = req.body;

      const newImage = req.file
       ? `images/umkm/${req.file.filename}`
       : oldData.image_path;

    const sql = `
      UPDATE umkm
      SET nama=?, deskripsi=?, varian=?, kategori=?, pemilik=?, instagram=?, image_path=?
      WHERE id=?
    `;
    const values = [nama, deskripsi, varian, kategori, pemilik, instagram, newImage, id];

db.query(sql, values, (err) => {
  console.log('Query:', sql);
  console.log('Values:', values);
  if (err) {
    console.error('❌ SQL ERROR:', err);
    return res.status(500).json({ message: 'Gagal mengupdate data', error: err });
  }


      // Hapus gambar lama jika upload gambar baru
      if (req.file && oldData.image_path && oldData.image_path !== 'images/umkm/rumah-bumn.png') {
        const oldImagePath = path.join(__dirname, '../public/', oldData.image_path);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Gagal menghapus gambar lama:', err);
        });
      }

      res.json({ message: 'UMKM berhasil diupdate' });
    });
  });
};

// DELETE UMKM
exports.remove = (req, res) => {
  const id = req.params.id;

  db.query('SELECT image_path FROM umkm WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

    const imagePath = results[0].image_path;

    db.query('DELETE FROM umkm WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ message: 'Gagal menghapus data', error: err });

      if (imagePath && imagePath !== 'images/umkm/rumah-bumn.png') {
        const fullPath = path.join(__dirname, '../public/', imagePath);
        fs.unlink(fullPath, (err) => {
          if (err) console.error('Gagal menghapus gambar:', err);
        });
      }

      res.json({ message: 'UMKM berhasil dihapus' });
    });
  });
};

// GET dengan paginasi
exports.getPagedUMKM = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || '';
  const category = req.query.kategori || '';

  try {
    umkmModel.getPagedUMKM(limit, offset, search, category, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      umkmModel.getTotalCount(search, category, (countErr, countRes) => {
        if (countErr) return res.status(500).json({ error: countErr.message });

        const total = countRes?.total || 0;
        const currentPage = Math.floor(offset / limit) + 1;
        const totalPages = Math.ceil(total / limit);

        res.json({
          data,
          pagination: {
            currentPage,
            totalPages,
          }
        });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getUmkmCount = (req, res) => {
  db.query('SELECT COUNT(*) AS totalItems FROM umkm', (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal ambil data', error: err });
    res.json({ totalItems: result[0].totalItems });
  });
};
