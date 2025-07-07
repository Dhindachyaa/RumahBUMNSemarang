<template>
  <AdminLayout>
    <div class="admin-galeri-page">
      <h1>Kelola Galeri</h1>

      <!-- Form tambah galeri -->
      <div class="galeri-form">
        <input type="file" @change="handleFileUpload" accept="image/*" />
        <input type="text" v-model="caption" placeholder="Tulis keterangan..." />
        <button @click="addGaleri">Tambah</button>
      </div>

      <!-- Tabel daftar galeri (desktop) -->
      <div class="table-responsive">
        <table class="galeri-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Gambar</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in galeriList" :key="item.id">
              <td>{{ item.id }}</td>
              <td><img :src="item.imageUrl" alt="Galeri" /></td>
              <td>{{ item.caption }}</td>
              <td class="galeri-actions">
                <button class="edit-btn" @click="editGaleri(item)">Edit</button>
                <button class="delete-btn" @click="deleteGaleri(item.id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Card daftar galeri (mobile) -->
      <div class="galeri-card-list">
        <div class="galeri-card" v-for="item in galeriList" :key="item.id">
          <p><strong>ID:</strong> {{ item.id }}</p>
          <img :src="item.imageUrl" alt="Galeri" />
          <p><strong>Keterangan:</strong> {{ item.caption }}</p>
          <div class="card-actions">
            <button @click="editGaleri(item)">Edit</button>
            <button @click="deleteGaleri(item.id)">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const galeriList = ref([
  { id: 1, imageUrl: 'https://via.placeholder.com/120', caption: 'Contoh Foto 1' },
  { id: 2, imageUrl: 'https://via.placeholder.com/120', caption: 'Contoh Foto 2' },
]);

const caption = ref('');
const selectedFile = ref(null);

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const addGaleri = () => {
  if (!selectedFile.value || !caption.value) {
    alert('Lengkapi gambar dan keterangan!');
    return;
  }

  const newId = galeriList.value.length + 1;
  galeriList.value.push({
    id: newId,
    imageUrl: URL.createObjectURL(selectedFile.value),
    caption: caption.value,
  });

  selectedFile.value = null;
  caption.value = '';
};

const editGaleri = (item) => {
  alert(`Edit galeri ID ${item.id} (fitur edit belum diimplementasi)`);
};

const deleteGaleri = (id) => {
  galeriList.value = galeriList.value.filter((item) => item.id !== id);
};
</script>

<style src="@/assets/css/admin-galeri.css"></style>