<template>
  <AdminLayout>
    <template #default>
      <div class="admin-umkm-page">
        <h2>Kelola UMKM</h2>

        <!-- FORM TAMBAH/EDIT -->
        <form class="umkm-form" @submit.prevent="submitForm">
          <input v-model="form.id" placeholder="ID (slug, contoh: batik-amel)" required />
          <input v-model="form.nama" placeholder="Nama UMKM" required />
          <input v-model="form.pemilik" placeholder="Nama Pemilik" />
          <input v-model="form.varian" placeholder="Varian Produk" />           <!-- baru -->
          <textarea v-model="form.deskripsi" placeholder="Deskripsi" rows="3"></textarea>  <!-- baru -->

          <select v-model="form.kategori">
            <option value="">-- Pilih Kategori --</option>
            <option value="Perdagangan">Perdagangan</option>
            <option value="Craft/Kerajinan Tangan">Craft/Kerajinan Tangan</option>
            <option value="Fashion/Busana">Fashion/Busana</option>
            <option value="Makanan & Minuman">Makanan & Minuman</option>
          </select>

          <input v-model="form.instagram" placeholder="Instagram" />

          <input type="file" @change="handleFile" />

          <button type="submit">{{ isEdit ? 'Update' : 'Tambah' }}</button>
          <button v-if="isEdit" type="button" @click="cancelEdit">Batal</button>
        </form>

        <hr />

        <!-- TABEL UNTUK DESKTOP -->
        <div class="table-responsive">
          <table class="umkm-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Pemilik</th>
                <th>Varian</th>
                <th>Deskripsi</th>
                <th>Instagram</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in umkmList" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.nama }}</td>
                <td>{{ u.kategori }}</td>
                <td>{{ u.pemilik }}</td>
                <td>{{ u.varian }}</td>
                <td class="wrap-text">{{ u.deskripsi }}</td>
                <td>{{ u.instagram }}</td>
                <td>
                  <img
                    v-if="u.image_path"
                    :src="`http://localhost:3000/${u.image_path}`"
                    alt="gambar UMKM"
                    style="width: 60px; height: auto;"
                  />
                  <span v-else>-</span>
                </td>
                <td>
                  <button @click="editUMKM(u)">Edit</button>
                  <button @click="deleteUMKM(u.id)">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CARD UNTUK MOBILE -->
        <div class="umkm-card-list">
          <div class="umkm-card" v-for="u in umkmList" :key="u.id">
            <p><strong>ID:</strong> {{ u.id }}</p>
            <p><strong>Nama:</strong> {{ u.nama }}</p>
            <p><strong>Kategori:</strong> {{ u.kategori }}</p>
            <p><strong>Pemilik:</strong> {{ u.pemilik }}</p>
            <p><strong>Varian:</strong> {{ u.varian }}</p>
            <p><strong>Deskripsi:</strong> {{ u.deskripsi }}</p>
            <p><strong>Instagram:</strong> {{ u.instagram }}</p>
            <div class="image-container">
              <img v-if="u.image_path" :src="`http://localhost:3000/${u.image_path}`" alt="gambar UMKM" />
              <span v-else>-</span>
            </div>
            <div class="card-actions">
              <button @click="editUMKM(u)">Edit</button>
              <button @click="deleteUMKM(u.id)">Hapus</button>
            </div>
          </div>
        </div>

        <!-- PAGINATION -->
        <div class="pagination">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/admin-umkm.css'

const umkmList = ref([])
const form = ref({
  id: '', nama: '', pemilik: '', kategori: '', varian: '', deskripsi: '',  instagram: '', image_path: ''
})
const isEdit = ref(false)
const selectedFile = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)

const fetchUMKM = async (page = 1) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/umkm?page=${page}&limit=30`)
    umkmList.value = res.data.data
    currentPage.value = res.data.currentPage
    totalPages.value = res.data.totalPages
  } catch (e) {
    console.error('Gagal mengambil data UMKM', e)
  }
}

const handleFile = (e) => {
  selectedFile.value = e.target.files[0]
}

const submitForm = async () => {
  try {
    let imagePath = form.value.image_path
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('image', selectedFile.value)
      const uploadRes = await axios.post('http://localhost:3000/api/umkm/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      imagePath = uploadRes.data.imagePath
      form.value.image_path = imagePath
    }
    const umkmData = { ...form.value }
    if (isEdit.value) {
      await axios.put(`http://localhost:3000/api/umkm/${form.value.id}`, umkmData)
      alert('UMKM berhasil diupdate!')
    } else {
      await axios.post('http://localhost:3000/api/umkm', umkmData)
      alert('UMKM berhasil ditambahkan!')
    }
    await fetchUMKM(1)
    resetForm()
  } catch (e) {
    alert('Gagal menyimpan data')
    console.error(e)
  }
}

const editUMKM = (umkm) => {
  form.value = { ...umkm }
  isEdit.value = true
  selectedFile.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => resetForm()

const deleteUMKM = async (id) => {
  if (confirm('Yakin ingin menghapus?')) {
    try {
      await axios.delete(`http://localhost:3000/api/umkm/${id}`)
      await fetchUMKM(currentPage.value)
    } catch (e) {
      alert('Gagal menghapus data')
      console.error(e)
    }
  }
}

const resetForm = () => {
  form.value = { id: '', nama: '', pemilik: '', kategori: '', varian: '', deskripsi: '', instagram: '', image_path: '' }
  selectedFile.value = null
  isEdit.value = false
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) fetchUMKM(page)
}

onMounted(() => fetchUMKM())
</script>
