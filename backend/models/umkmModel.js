const db = require('../config/db')

// Ambil semua UMKM dengan paginasi
exports.getPagedUMKM = (limit, offset, result) => {
  db.query(
    `SELECT id, nama, deskripsi, varian, kategori, pemilik, instagram, image_path
     FROM umkm LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, res) => {
      if (err) return result(err, null)
      result(null, res)
    }
  )
}

// Ambil total jumlah UMKM
exports.getTotalCount = (result) => {
  db.query('SELECT COUNT(*) AS total FROM umkm', (err, res) => {
    if (err) return result(err, null)
    result(null, res)
  })
}

// Ambil UMKM by ID
exports.getUMKMById = (id, result) => {
  db.query(
    `SELECT id, nama, deskripsi, varian, kategori, pemilik, instagram, image_path
     FROM umkm WHERE id = ?`,
    [id],
    (err, res) => {
      if (err) return result(err, null)
      result(null, res)
    }
  )
}

// Tambah UMKM
exports.addUMKM = (data, result) => {
  const sql = `
    INSERT INTO umkm (id, nama, deskripsi, varian, kategori, pemilik, instagram, image_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  const values = [
    data.id, data.nama, data.deskripsi, data.varian,
    data.kategori, data.pemilik, data.instagram, data.image_path
  ]
  db.query(sql, values, result)
}

// Update UMKM
exports.updateUMKM = (id, data, result) => {
  const sql = `
    UPDATE umkm
    SET nama = ?, deskripsi = ?, varian = ?, kategori = ?, pemilik = ?, instagram = ?, image_path = ?
    WHERE id = ?
  `
  const values = [
    data.nama, data.deskripsi, data.varian,
    data.kategori, data.pemilik, data.instagram, data.image_path, id
  ]
  db.query(sql, values, result)
}

// Hapus UMKM
exports.deleteUMKM = (id, result) => {
  db.query('DELETE FROM umkm WHERE id = ?', [id], result)
}
