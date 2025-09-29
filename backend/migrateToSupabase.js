const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const SUPABASE_URL = 'https://hzpaqqpcjxoseaaiivaj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cGFxcXBjanhvc2VhYWlpdmFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzMzM4OCwiZXhwIjoyMDc0NzA5Mzg4fQ.RmNzpTgzwyV6TtyRABynyjYS6P3PZ-JL6MsJHOP4xNA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Konfigurasi MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan
  database: 'rumah_bumn_semarang'
});

// Helper function untuk upload folder
async function uploadFolder(folderPath, bucket) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileData = fs.readFileSync(filePath);

    const { error } = await supabase.storage.from(bucket).upload(file, fileData, {
      cacheControl: '3600',
      upsert: true
    });

    if (error) {
      console.error('❌ Error uploading', file, error.message);
    } else {
      console.log('✅ Uploaded', file);

      // Update database sesuai bucket
      let table, column;
      if (bucket === 'berita') {
        table = 'berita';
        column = 'gambar';
      } else if (bucket === 'galeri') {
        table = 'galeri';
        column = 'gambar';
      } else if (bucket === 'umkm') {
        table = 'umkm';
        column = 'image_path';
      }

      const url = `https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/${bucket}/${file}`;
      const sql = `UPDATE ${table} SET ${column} = ? WHERE ${column} LIKE ?`;
      db.query(sql, [url, `%${file}%`], (err, res) => {
        if (err) console.error('❌ DB Update Error for', file, err);
        else console.log('📝 DB Updated for', file);
      });
    }
  }
}

// Jalankan upload untuk tiap bucket
(async () => {
  await uploadFolder(path.join(__dirname, 'public/images/berita'), 'berita');
  await uploadFolder(path.join(__dirname, 'public/images/galeri'), 'galeri');
  await uploadFolder(path.join(__dirname, 'public/images/umkm'), 'umkm');

  console.log('🎉 Semua file berhasil diupload dan database diupdate!');
})();
