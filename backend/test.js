const pool = require('./config/db');

(async () => {
  try {
    const res = await pool.query('SELECT * FROM umkm LIMIT 5'); // ambil 5 data pertama UMKM
    console.log('Koneksi berhasil! Data sample:');
    console.log(res.rows);
    process.exit(0);
  } catch (err) {
    console.error('Koneksi gagal:', err);
    process.exit(1);
  }
})();
