const db = require('../config/db');

exports.getAllBerita = (result) => {
  db.query('SELECT * FROM berita ORDER BY tanggal DESC', result);
};

exports.getBeritaById = (id, result) => {
  db.query('SELECT * FROM berita WHERE id = ?', [id], result);
};

exports.insertBerita = (data, result) => {
  db.query('INSERT INTO berita SET ?', [data], result);
};

exports.updateBerita = (data, id, result) => {
  db.query('UPDATE berita SET ? WHERE id = ?', [data, id], result);
};

exports.deleteBerita = (id, result) => {
  db.query('DELETE FROM berita WHERE id = ?', [id], result);
};

exports.countBerita = (result) => {
  db.query('SELECT COUNT(*) AS total FROM berita', result);
};
