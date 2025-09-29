// models/umkmModel.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const TABLE_NAME = 'umkm';

const UmkmModel = {
  getPagedUMKM: async (limit = 20, offset = 0, search = '', category = '') => {
    let query = supabase.from(TABLE_NAME).select('*').order('id', { ascending: false }).range(offset, offset + limit - 1);

    if (search) query = query.ilike('nama', `%${search}%`);
    if (category) query = query.eq('kategori', category);

    const { data, error } = await query;
    if (error) throw error;

    // Ambil total count
    let countQuery = supabase.from(TABLE_NAME).select('*', { count: 'exact', head: true });
    if (search) countQuery = countQuery.ilike('nama', `%${search}%`);
    if (category) countQuery = countQuery.eq('kategori', category);

    const { count, error: countError } = await countQuery;
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

  getTotalCount: async (search = '', category = '') => {
    let query = supabase.from(TABLE_NAME).select('*', { count: 'exact', head: true });
    if (search) query = query.ilike('nama', `%${search}%`);
    if (category) query = query.eq('kategori', category);

    const { count, error } = await query;
    if (error) throw error;
    return count;
  },

  getUMKMById: async (id) => {
    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  addUMKM: async (data) => {
    const { data: inserted, error } = await supabase.from(TABLE_NAME).insert([data]);
    if (error) throw error;
    return inserted;
  },

  updateUMKM: async (id, data) => {
    const { data: updated, error } = await supabase.from(TABLE_NAME).update(data).eq('id', id);
    if (error) throw error;
    return updated;
  },

  deleteUMKM: async (id) => {
    const { data: deleted, error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
    if (error) throw error;
    return deleted;
  },
};

module.exports = UmkmModel;
