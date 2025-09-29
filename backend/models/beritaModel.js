// models/beritaModel.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const TABLE_NAME = 'berita';

exports.getAllBerita = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('tanggal', { ascending: false });
  if (error) throw error;
  return data;
};

exports.getBeritaById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

exports.insertBerita = async (berita) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([berita]);
  if (error) throw error;
  return data;
};

exports.updateBerita = async (id, berita) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(berita)
    .eq('id', id);
  if (error) throw error;
  return data;
};

exports.deleteBerita = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};

exports.countBerita = async () => {
  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count;
};
