const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi' });
  }

  try {
    const { data, error } = await supabase
      .from('admin')
      .select('id, username')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    res.status(200).json({
      message: 'Login berhasil',
      user: data
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('admin')
      .select('id, username');

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Get admins error:', err);
    res.status(500).json({ message: 'Gagal mengambil data admin' });
  }
});

router.post('/add', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const { error } = await supabase
      .from('admin')
      .insert([{ username, password }]);

    if (error) throw error;

    res.status(201).json({ message: 'Admin berhasil ditambahkan' });
  } catch (err) {
    console.error('Add admin error:', err);
    res.status(500).json({ message: 'Gagal menambahkan admin' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('admin')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Admin berhasil dihapus' });
  } catch (err) {
    console.error('Delete admin error:', err);
    res.status(500).json({ message: 'Gagal menghapus admin' });
  }
});

module.exports = router;
