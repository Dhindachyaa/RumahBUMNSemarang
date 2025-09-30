const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const TABLE_NAME = 'galeri';
const STORAGE_BUCKET = 'galeri'; 

const normalizeImagePath = (filename) => {
  if (!filename) return null;
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
};

exports.getAllGaleri = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;

    const normalized = data.map(item => ({
      ...item,
      gambar: normalizeImagePath(item.gambar)
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPaginatedGaleri = async (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;

    const { count, error: countError } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });
    if (countError) throw countError;

    const normalized = data.map(item => ({
      ...item,
      gambar: normalizeImagePath(item.gambar)
    }));

    res.json({
      data: normalized,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGaleriCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    res.json({ total: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addGaleri = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const gambar = req.file?.filename;

    if (!judul || !deskripsi || !gambar) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .insert([{ judul, deskripsi, gambar }]);
    if (error) throw error;

    res.json({ message: 'Galeri berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGaleri = async (req, res) => {
  const id = req.params.id;
  const { judul, deskripsi } = req.body;
  const newImage = req.file?.filename;

  try {
    const { data: oldData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('gambar, judul, deskripsi')
      .eq('id', id)
      .single();
    if (fetchError || !oldData) return res.status(404).json({ message: 'Data tidak ditemukan' });

    const updateFields = {};
    if (judul && judul !== oldData.judul) updateFields.judul = judul;
    if (deskripsi && deskripsi !== oldData.deskripsi) updateFields.deskripsi = deskripsi;
    if (newImage) {
      updateFields.gambar = newImage;

    if (oldData.gambar && oldData.gambar !== 'default-galeri.jpg') {
      await supabase.storage.from(STORAGE_BUCKET).remove([oldData.gambar]);
    }
  }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'Tidak ada perubahan dilakukan' });
    }

    const { error: updateError } = await supabase
      .from(TABLE_NAME)
      .update(updateFields)
      .eq('id', id);
    if (updateError) throw updateError;

    res.json({ message: 'Galeri berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGaleri = async (req, res) => {
  const id = req.params.id;
  try {
    const { data: oldData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('gambar')
      .eq('id', id)
      .single();
    if (fetchError || !oldData) return res.status(404).json({ message: 'Data tidak ditemukan' });

    if (oldData.gambar && oldData.gambar !== 'default-galeri.jpg') {
      await supabase.storage.from(STORAGE_BUCKET).remove([oldData.gambar]);
    }

    const { error: deleteError } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    if (deleteError) throw deleteError;

    res.json({ message: 'Galeri berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
