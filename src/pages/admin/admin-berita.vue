<template>
  <AdminLayout>
    <div class="admin-berita-page">
      <h2>Kelola Berita</h2>

      <div class="toolbar">
        <button class="btn-save" @click="openModal">+ Tambah Berita</button>
      </div>

      <div class="table-responsive">
        <table class="berita-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Isi</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(berita, index) in beritaList" :key="berita.id">
              <td>{{ index + 1 }}</td>
              <td>{{ berita.judul }}</td>
              <td>{{ formatTanggal(berita.tanggal) }}</td>
              <td class="wrap-text"><span>{{ getPreview(berita.isi) }}</span></td>
              <td><img :src="getImage(berita.gambar)" alt="gambar" class="thumb"/></td>
              <td>
                <div class="table-actions">
                  <button class="btn-edit" @click="editBerita(berita)">Edit</button>
                  <button class="btn-delete" @click="hapusBerita(berita.id)">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ beritaForm.id ? 'Edit' : 'Tambah' }} Berita</h3>
            <button class="btn-close" @click="closeModal">&times;</button>
          </div>

          <form @submit.prevent="submitForm" class="modal-form">
            <input v-model="beritaForm.judul" placeholder="Judul Berita" required />
            <input type="date" v-model="beritaForm.tanggal" required />

            <div
              ref="isiEditor"
              contenteditable="true"
              class="editable-div"
              v-html="beritaForm.isi"
              @input="sanitizeContent"
              @paste.prevent="handlePaste"
              @focus="forceLTR"
              data-placeholder="Tulis isi berita di sini..."
            ></div>

            <input type="file" @change="handleFileUpload" />
            <img v-if="previewGambar" :src="previewGambar" class="preview-img" />

            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
              <button type="submit" class="btn-save">
                {{ beritaForm.id ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '@/layouts/adminlayout.vue'
import { supabase } from '@/supabase.js'

export default {
  components: { AdminLayout },
  data() {
    return {
      beritaList: [],
      showModal: false,
      previewGambar: null,
      beritaForm: {
        id: null,
        judul: '',
        tanggal: '',
        isi: '',
        gambar: null,
      },
      DEFAULT_IMAGE: 'https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/berita/rumah-bumn.png'
    }
  },
  methods: {
    forceLTR() {
      const el = this.$refs.isiEditor
      if (!el) return
      el.setAttribute('dir', 'ltr')
      el.style.direction = 'ltr'
      el.style.textAlign = 'left'
      el.innerHTML = this.removeBidiControlChars(el.innerHTML)
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT)
      while (walker.nextNode()) {
        const node = walker.currentNode
        node.removeAttribute('dir')
        node.removeAttribute('style')
      }
      const cleanHTML = this.removeBidiControlChars(el.innerHTML)
      el.innerHTML = cleanHTML
      this.beritaForm.isi = cleanHTML
    },

    handlePaste(e) {
      const text = e.clipboardData.getData('text/plain')
      const cleaned = this.removeBidiControlChars(text)
      const el = this.$refs.isiEditor
      if (el) document.execCommand('insertText', false, cleaned)
    },

    removeBidiControlChars(text) {
      return text.replace(/[\u202A-\u202E\u200E\u200F]/g, '')
    },

    getPreview(htmlContent) {
      const plainText = htmlContent.replace(/<[^>]+>/g, '')
      return plainText.length > 150 ? plainText.slice(0, 150).trim() + '...' : plainText
    },

    getImage(url) {
      return url || this.DEFAULT_IMAGE
    },

    formatTanggal(tgl) {
      return new Date(tgl).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    },

    openModal() {
      this.resetForm()
      this.showModal = true
      this.$nextTick(() => this.forceLTR())
    },

    closeModal() {
      this.showModal = false
      this.resetForm()
    },

    editBerita(berita) {
      this.beritaForm = {
        id: berita.id,
        judul: berita.judul,
        tanggal: berita.tanggal.slice(0, 10),
        isi: berita.isi,
        gambar: null,
      }
      this.previewGambar = berita.gambar || this.DEFAULT_IMAGE
      this.showModal = true
      this.$nextTick(() => this.forceLTR())
    },

    handleFileUpload(e) {
      const file = e.target.files[0]
      this.beritaForm.gambar = file
      if (file) this.previewGambar = URL.createObjectURL(file)
    },

    async fetchBerita() {
      const { data, error } = await supabase.from('berita').select('*').order('id', { ascending: false })
      if (error) console.error(error)
      else this.beritaList = data
    },

    async submitForm() {
      const el = this.$refs.isiEditor
      if (el) this.beritaForm.isi = el.innerHTML.trim()

      let uploadedFileUrl = null
      if (this.beritaForm.gambar instanceof File) {
        const file = this.beritaForm.gambar
        const fileName = `${Date.now()}_${file.name}`
        const { error } = await supabase.storage.from('berita').upload(fileName, file)
        if (error) {
          alert('Gagal upload gambar')
          return
        }
        uploadedFileUrl = `https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/berita/${encodeURIComponent(fileName)}`
      }

      try {
        if (this.beritaForm.id) {
          const { error } = await supabase
            .from('berita')
            .update({
              judul: this.beritaForm.judul,
              tanggal: this.beritaForm.tanggal,
              isi: this.beritaForm.isi,
              ...(uploadedFileUrl && { gambar: uploadedFileUrl }),
            })
            .eq('id', this.beritaForm.id)
          if (error) throw error
        } else {
          const { error } = await supabase.from('berita').insert([
            {
              judul: this.beritaForm.judul,
              tanggal: this.beritaForm.tanggal,
              isi: this.beritaForm.isi,
              gambar: uploadedFileUrl,
            },
          ])
          if (error) throw error
        }

        this.fetchBerita()
        this.closeModal()
      } catch (err) {
        alert('Gagal menyimpan berita')
        console.error(err)
      }
    },

    async hapusBerita(id) {
      if (confirm('Yakin ingin menghapus berita ini?')) {
        const { error } = await supabase.from('berita').delete().eq('id', id)
        if (error) alert('Gagal menghapus berita')
        else this.fetchBerita()
      }
    },

    resetForm() {
      this.beritaForm = { id: null, judul: '', tanggal: '', isi: '', gambar: null }
      this.previewGambar = null
    },
  },

  mounted() {
    this.fetchBerita()
  },
}
</script>

<style scoped src="@/assets/css/admin-berita.css"></style>
