const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const TABLE_NAME = 'umkm';
const STORAGE_BUCKET = 'umkm'; // bucket Supabase Storage untuk gambar UMKM

// Normalisasi path gambar
const normalizeImagePath = (filename) => {
  if (!filename) return null;
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
};

// GET ALL UMKM
exports.getAllUMKM = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;

    const normalized = data.map(item => ({
      ...item,
      image_path: normalizeImagePath(item.image_path)
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET UMKM BY ID
exports.getUMKMById = async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

    data.image_path = normalizeImagePath(data.image_path);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD UMKM
exports.addUMKM = async (req, res) => {
  try {
    const { nama, deskripsi, varian, kategori, harga, instagram } = req.body;
    const image_path = req.file?.filename || 'rumah-bumn.png'; // default jika tidak ada gambar

    if (!nama || !deskripsi || !kategori) {
      return res.status(400).json({ message: 'Nama, deskripsi, dan kategori wajib diisi' });
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .insert([{ nama, deskripsi, varian, kategori, harga, instagram, image_path }]);
    if (error) throw error;

    res.status(201).json({ message: 'UMKM berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE UMKM
exports.updateUMKM = async (req, res) => {
  const id = req.params.id;
  const { nama, deskripsi, varian, kategori, harga, instagram } = req.body;
  const newImage = req.file?.filename;

  try {
    const { data: oldData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('nama, deskripsi, varian, kategori, harga, instagram, image_path')
      .eq('id', id)
      .single();
    if (fetchError || !oldData) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

    const updateFields = {};
    if (nama && nama !== oldData.nama) updateFields.nama = nama;
    if (deskripsi && deskripsi !== oldData.deskripsi) updateFields.deskripsi = deskripsi;
    if (varian && varian !== oldData.varian) updateFields.varian = varian;
    if (kategori && kategori !== oldData.kategori) updateFields.kategori = kategori;
    if (harga && harga !== oldData.harga) updateFields.harga = harga;
    if (instagram && instagram !== oldData.instagram) updateFields.instagram = instagram;
    if (newImage) {
      updateFields.image_path = newImage;

      // Hapus gambar lama dari Supabase Storage jika bukan default
      if (oldData.image_path && oldData.image_path !== 'rumah-bumn.png') {
        await supabase.storage.from(STORAGE_BUCKET).remove([oldData.image_path]);
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

    res.json({ message: 'UMKM berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE UMKM
exports.deleteUMKM = async (req, res) => {
  const id = req.params.id;
  try {
    const { data: oldData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('image_path')
      .eq('id', id)
      .single();
    if (fetchError || !oldData) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

    // Hapus gambar lama jika bukan default
    if (oldData.image_path && oldData.image_path !== 'rumah-bumn.png') {
      await supabase.storage.from(STORAGE_BUCKET).remove([oldData.image_path]);
    }

    const { error: deleteError } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    if (deleteError) throw deleteError;

    res.json({ message: 'UMKM berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PAGED UMKM
exports.getPagedUMKM = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || '';
  const kategori = req.query.kategori || '';

  try {
    let query = supabase.from(TABLE_NAME).select('*');
    if (search) query = query.ilike('nama', `%${search}%`);
    if (kategori) query = query.eq('kategori', kategori);

    const { data, error } = await query
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;

    const { count, error: countError } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });
    if (countError) throw countError;

    const normalizedData = data.map(item => ({
      ...item,
      image_path: normalizeImagePath(item.image_path)
    }));

    res.json({
      data: normalizedData,
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(count / limit),
        totalItems: count
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TOTAL UMKM COUNT
exports.getUMKMCount = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    res.json({ totalItems: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
