// models/galeriModel.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const TABLE_NAME = 'galeri';

const Galeri = {
  getAll: async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  insert: async ({ judul, deskripsi, gambar }) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{ judul, deskripsi, gambar }]);
    if (error) throw error;
    return data;
  },

  updateFlexibleById: async (id, fields) => {
    if (!fields || Object.keys(fields).length === 0) return null;
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(fields)
      .eq('id', id);
    if (error) throw error;
    return data;
  },

  deleteById: async (id) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return data;
  },

  countAll: async () => {
    const { count, error } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  },

  getPaginated: async (limit = 10, offset = 0) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;

    const { count, error: countError } = await supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact', head: true });
    if (countError) throw countError;

    return {
      data,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
  },
};

module.exports = Galeri;