const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Inisialisasi Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const TABLE_NAME = 'berita';
const STORAGE_BUCKET = 'berita'; // bucket Supabase Storage tempat gambar berita

// Normalisasi path gambar ke URL Supabase Storage
const normalizeImagePath = (filename) => {
  if (!filename) return null;
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
};

exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('tanggal', { ascending: false });

    if (error) throw error;

    const normalized = data.map(item => ({
      ...item,
      gambar: normalizeImagePath(item.gambar)
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ message: 'Berita tidak ditemukan' });

    data.gambar = normalizeImagePath(data.gambar);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, tanggal } = req.body;
    const isi = req.body.isi ? req.body.isi.replace(/\n/g, '<br>') : '';
    const gambar = req.file ? req.file.filename : null;

    const { error } = await supabase
      .from(TABLE_NAME)
      .insert([{ judul, tanggal, isi, gambar }]);

    if (error) throw error;

    res.json({ message: '✅ Berita berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const { judul, tanggal } = req.body;
    const isi = req.body.isi ? req.body.isi.replace(/\n/g, '<br>') : '';
    const gambarBaru = req.file ? req.file.filename : null;

    // Ambil data lama
    const { data: oldData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('gambar')
      .eq('id', id)
      .single();

    if (fetchError || !oldData) return res.status(404).json({ message: 'Berita tidak ditemukan' });

    // Hapus gambar lama dari Supabase Storage jika ada
    if (gambarBaru && oldData.gambar && oldData.gambar !== 'default-berita.jpg') {
      await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([oldData.gambar]);
    }

    const updateData = { judul, tanggal, isi };
    if (gambarBaru) updateData.gambar = gambarBaru;

    const { error } = await supabase
      .from(TABLE_NAME)
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    res.json({ message: '✅ Berita berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const { data: oldData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('gambar')
      .eq('id', id)
      .single();

    if (fetchError || !oldData) return res.status(404).json({ message: 'Berita tidak ditemukan' });

    // Hapus gambar lama dari Supabase Storage
    if (oldData.gambar && oldData.gambar !== 'default-berita.jpg') {
      await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([oldData.gambar]);
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: '🗑️ Berita berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.count = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    res.json({ total: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
