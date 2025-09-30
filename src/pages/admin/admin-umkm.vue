<template>
  <AdminLayout>
    <div class="admin-umkm-page">
      <h2>Kelola UMKM</h2>

      <div class="toolbar">
        <button class="btn-save" @click="bukaModal">+ Tambah UMKM</button>
      </div>

      <div class="table-responsive">
        <table class="umkm-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Varian</th>
              <th>Deskripsi</th>
              <th>Instagram</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(u, index) in umkmList" :key="u.id">
              <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
              <td>{{ u.nama }}</td>
              <td>{{ u.kategori }}</td>
              <td>{{ u.harga }}</td>
              <td>{{ u.varian }}</td>
              <td class="wrap-text">{{ getPreview(u.deskripsi) }}</td>
              <td>{{ u.instagram }}</td>
              <td>
                <img :src="getImageUrl(u.image_path)" alt="UMKM" @error="handleImageError" />
              </td>
              <td>
                <div class="table-actions">
                  <button class="btn-edit" @click="editUMKM(u)">Edit</button>
                  <button class="btn-delete" @click="deleteUMKM(u.id)">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
        <button
          v-for="page in totalPages"
          :key="'page-' + page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>

      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ isEdit ? 'Edit' : 'Tambah' }} UMKM</h3>
            <button class="btn-close" @click="tutupModal">×</button>
          </div>
          <form @submit.prevent="submitForm" class="modal-form">
            <input v-model="form.nama" placeholder="Nama UMKM" required />
            <input v-model="form.harga" placeholder="Harga" />
            <input v-model="form.varian" placeholder="Varian Produk" />
            <textarea v-model="form.deskripsi" placeholder="Deskripsi Produk" class="deskripsi-editor"></textarea>
            <select v-model="form.kategori">
              <option value="">-- Pilih Kategori --</option>
              <option value="Fashion">Fashion</option>
              <option value="Craft/Accessoris/Home Decor">Craft/Accessoris/Home Decor</option>
              <option value="Foods & Beverages">Foods & Beverages</option>
              <option value="Healthy & Beauty">Healthy & Beauty</option>
            </select>
            <input v-model="form.instagram" placeholder="Instagram" />
            <input type="file" @change="handleFile" name="image" />
            <img v-if="gambarPreview" :src="gambarPreview" class="preview-img" />
            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="tutupModal">Batal</button>
              <button type="submit" class="btn-save">{{ isEdit ? 'Update' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/adminlayout.vue'
import '@/assets/css/admin-umkm.css'
import { supabase } from '@/supabase.js'

const umkmList = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 20
const showModal = ref(false)
const isEdit = ref(false)
const gambarPreview = ref(null)
const selectedFile = ref(null)

const form = ref({
  id: '', nama: '', harga: '', kategori: '', varian: '', deskripsi: '', instagram: '', image_path: ''
})

const DEFAULT_IMAGE = 'https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/umkm/rumah-bumn.png'

const fetchUMKM = async (page = 1) => {
  try {
    const offset = (page - 1) * limit
    const { data, error, count } = await supabase
      .from('umkm')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
    if (error) throw error

    umkmList.value = data.map(u => ({
      ...u,
      image_path: u.image_path ? u.image_path : DEFAULT_IMAGE
    }))
    currentPage.value = page
    totalPages.value = Math.ceil(count / limit) || 1
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error('Gagal ambil data UMKM:', err)
  }
}

const getPreview = text => {
  if (!text) return ''
  const clean = text.replace(/<[^>]*>/g, '')
  return clean.length > 150 ? clean.slice(0, 150).trim() + '...' : clean
}

const getImageUrl = path => path || DEFAULT_IMAGE
const handleImageError = e => { e.target.src = DEFAULT_IMAGE }

const bukaModal = () => { resetForm(); showModal.value = true }
const tutupModal = () => { resetForm(); showModal.value = false }
const handleFile = e => { 
  selectedFile.value = e.target.files[0]; 
  gambarPreview.value = selectedFile.value ? URL.createObjectURL(selectedFile.value) : null 
}

const submitForm = async () => {
  try {

    const payload = {
      nama: form.value.nama || '',
      kategori: form.value.kategori || '',
      varian: form.value.varian || '',
      deskripsi: form.value.deskripsi || '',
      instagram: form.value.instagram || '',
      harga: form.value.harga ? parseInt(form.value.harga) : null,
      image_path: form.value.image_path || DEFAULT_IMAGE
    }

    if (selectedFile.value) {
      const fileExt = selectedFile.value.name.split('.').pop()
      const fileName = `umkm/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('umkm')
        .upload(fileName, selectedFile.value, { upsert: true })

      if (uploadError) throw uploadError

      payload.image_path = `https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/${fileName}`
    }

    if (isEdit.value) {
      const { error } = await supabase
        .from('umkm')
        .update(payload)
        .eq('id', form.value.id)
      if (error) throw error
      alert('UMKM berhasil diupdate!')
    } else {
 
      const { error } = await supabase
        .from('umkm')
        .insert([payload])
      if (error) throw error
      alert('UMKM berhasil ditambahkan!')
    }

    await fetchUMKM(currentPage.value)
    tutupModal()
  } catch (err) {
    console.error('Gagal simpan data:', err)
    alert('Gagal menyimpan data. Lihat console untuk detail.')
  }
}


const editUMKM = umkm => {
  form.value = { ...umkm }
  gambarPreview.value = getImageUrl(form.value.image_path)
  isEdit.value = true
  showModal.value = true
}

const deleteUMKM = async id => {
  if (!confirm('Yakin ingin menghapus data ini?')) return
  try {
    const { error } = await supabase.from('umkm').delete().eq('id', id)
    if (error) throw error
    await fetchUMKM(currentPage.value)
  } catch (err) {
    console.error('Gagal hapus data:', err)
    alert('Gagal menghapus data.')
  }
}

const resetForm = () => {
  form.value = { id: '', nama: '', harga: '', kategori: '', varian: '', deskripsi: '', instagram: '', image_path: '' }
  selectedFile.value = null
  isEdit.value = false
  gambarPreview.value = null
}

const goToPage = async page => {
  if (page >= 1 && page <= totalPages.value) await fetchUMKM(page)
}

onMounted(() => fetchUMKM())
</script>
