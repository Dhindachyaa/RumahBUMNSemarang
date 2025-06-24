const Umkm = require('../models/umkmModel');

exports.getAll = (req, res) => {
  Umkm.getAllUMKM((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getById = (req, res) => {
  Umkm.getUMKMById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: 'UMKM tidak ditemukan' });
    res.json(result[0]);
  });
};
