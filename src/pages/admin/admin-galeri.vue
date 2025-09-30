<template>
  <AdminLayout>
    <div class="admin-galeri-page">
      <h1>Kelola Galeri</h1>
      <div class="toolbar">
        <button class="btn-save" @click="bukaModal()">+ Tambah Galeri</button>
      </div>

      <div class="table-responsive">
        <table class="galeri-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in galeriList" :key="item.id">
              <td>{{ offset + index + 1 }}</td>
              <td>
                <img :src="item.gambarUrl" class="thumb" />
              </td>
              <td>{{ item.judul }}</td>
              <td>{{ item.deskripsi }}</td>
              <td class="galeri-actions">
                <button class="edit-btn" @click="bukaModal(item)">Edit</button>
                <button class="delete-btn" @click="deleteGaleri(item)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
          <span v-for="page in totalPages" :key="page">
            <button @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
          </span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>

      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ form.id ? 'Edit' : 'Tambah' }} Galeri</h3>
            <button class="btn-close" @click="tutupModal">×</button>
          </div>

          <form @submit.prevent="submitForm" class="modal-form">
            <input type="text" v-model="form.judul" placeholder="Judul gambar" required />
            <textarea v-model="form.deskripsi" placeholder="Deskripsi gambar..." rows="5"></textarea>
            <input type="file" @change="handleFileUpload" />
            <img v-if="gambarPreview" :src="gambarPreview" class="preview-img" />

            <div class="modal-footer">
              <button type="button" @click="tutupModal" class="btn-cancel">Batal</button>
              <button type="submit" class="btn-save">{{ form.id ? 'Update' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { supabase } from '@/supabase.js'
import AdminLayout from '@/layouts/adminlayout.vue'

export default {
  components: { AdminLayout },
  data() {
    return {
      galeriList: [],
      showModal: false,
      form: { id: null, judul: '', deskripsi: '', gambar: null },
      gambarPreview: null,
      offset: 0,
      limit: 20,
      totalPages: 1,
      currentPage: 1,
      defaultImage: 'https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/galeri/rumah-bumn.png',
    }
  },
  mounted() {
    this.fetchGaleri()
  },
  methods: {
    getImageUrl(fileName) {
      if (!fileName) return this.defaultImage
      if (fileName.startsWith('http')) return fileName
      return `https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/galeri/${encodeURIComponent(fileName)}`
    },

    async fetchGaleri() {
      try {
        const { data, error, count } = await supabase
          .from('galeri')
          .select('*', { count: 'exact' })
          .range(this.offset, this.offset + this.limit - 1)
          .order('id', { ascending: false })

        if (error) throw error

        this.galeriList = data.map(item => ({
          ...item,
          gambarUrl: this.getImageUrl(item.gambar)
        }))

        this.totalPages = Math.ceil(count / this.limit) || 1
      } catch (err) {
        console.error('Gagal fetch galeri:', err.message)
      }
    },

    goToPage(page) {
      this.currentPage = page
      this.offset = (page - 1) * this.limit
      this.fetchGaleri()
    },
    nextPage() { if (this.currentPage < this.totalPages) this.goToPage(this.currentPage + 1) },
    prevPage() { if (this.currentPage > 1) this.goToPage(this.currentPage - 1) },

    bukaModal(item = null) {
      this.showModal = true
      if (item) {
        this.form = { ...item, gambar: null }
        this.gambarPreview = item.gambarUrl || this.defaultImage
      } else {
        this.resetForm()
      }
    },
    tutupModal() {
      this.showModal = false
      this.resetForm()
    },
    resetForm() {
      this.form = { id: null, judul: '', deskripsi: '', gambar: null }
      this.gambarPreview = null
    },
    handleFileUpload(e) {
      const file = e.target.files[0]
      this.form.gambar = file
      if (file) this.gambarPreview = URL.createObjectURL(file)
    },

    async submitForm() {
      try {
        if (!this.form.judul || !this.form.deskripsi) {
          alert('Judul dan deskripsi wajib diisi')
          return
        }

        let gambarPath = this.form.gambar

        if (this.form.gambar instanceof File) {
          const fileName = `${Date.now()}-${this.form.gambar.name}`
          const { error: uploadError } = await supabase
            .storage
            .from('galeri')
            .upload(fileName, this.form.gambar, { upsert: true })
          if (uploadError) throw uploadError

          gambarPath = fileName
        }

        const payload = {
          judul: this.form.judul,
          deskripsi: this.form.deskripsi,
          gambar: gambarPath || null
        }

        if (this.form.id) {

          const { error } = await supabase
            .from('galeri')
            .update(payload)
            .eq('id', this.form.id)
          if (error) throw error
        } else {

          const { error } = await supabase
            .from('galeri')
            .insert([payload])
          if (error) throw error
        }

        alert('Berhasil menyimpan galeri')
        this.fetchGaleri()
        this.tutupModal()
      } catch (err) {
        console.error('Gagal simpan galeri:', err)
        alert('Gagal menyimpan galeri. Cek console.')
      }
    },

    async deleteGaleri(item) {
      if (!confirm('Yakin ingin menghapus gambar ini?')) return
      try {
        if (item.gambar) {
          const { error: delError } = await supabase
            .storage
            .from('galeri')
            .remove([item.gambar])
          if (delError) console.warn('Gagal hapus file storage:', delError.message)
        }

        const { error } = await supabase
          .from('galeri')
          .delete()
          .eq('id', item.id)
        if (error) throw error

        this.fetchGaleri()
      } catch (err) {
        console.error('Gagal hapus galeri:', err.message)
        alert('Gagal menghapus galeri')
      }
    },
  }
}
</script>

<style scoped src="@/assets/css/admin-galeri.css"></style>
