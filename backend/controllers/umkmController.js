const Umkm = require('../models/umkmModel')

// Ambil semua UMKM dengan paginasi
exports.getAll = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 30
  const offset = (page - 1) * limit

  Umkm.getPagedUMKM(limit, offset, (err, data) => {
    if (err) return res.status(500).json({ error: 'Gagal mengambil data UMKM', details: err })

    Umkm.getTotalCount((err2, countResult) => {
      if (err2) return res.status(500).json({ error: 'Gagal menghitung total data', details: err2 })

      const totalItems = countResult[0].total
      const totalPages = Math.ceil(totalItems / limit)

      res.json({
        data,
        currentPage: page,
        totalPages,
        totalItems
      })
    })
  })
}

// Ambil detail UMKM by ID
exports.getById = (req, res) => {
  Umkm.getUMKMById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Gagal mengambil data', details: err })
    if (!result.length) return res.status(404).json({ message: 'UMKM tidak ditemukan' })
    res.json(result[0])
  })
}

// Tambah UMKM baru
exports.create = (req, res) => {
  console.log('=== DATA DITERIMA ===', req.body)
  Umkm.addUMKM(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Gagal menambahkan UMKM', details: err })
    res.json({ message: 'UMKM berhasil ditambahkan', id: req.body.id })
  })
}

// Update UMKM by ID
exports.update = (req, res) => {
  Umkm.updateUMKM(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Gagal mengupdate UMKM', details: err })
    if (result.affectedRows === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' })
    res.json({ message: 'UMKM berhasil diupdate' })
  })
}

// Hapus UMKM by ID
exports.remove = (req, res) => {
  Umkm.deleteUMKM(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Gagal menghapus UMKM', details: err })
    if (result.affectedRows === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' })
    res.json({ message: 'UMKM berhasil dihapus' })
  })
}
