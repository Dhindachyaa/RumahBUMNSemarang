<template>
  <AdminLayout>
    <template #default>
      <div class="dashboard-admin">
        <h2>Dashboard Admin</h2>
        <p>Selamat datang di Dashboard Admin Rumah BUMN</p>

        <div class="dashboard-cards">
          <div class="dashboard-card blue">
            <div class="card-content">
              <h3>Total UMKM</h3>
              <p>{{ totalUmkm }}</p>
              <router-link to="/admin/umkm" class="card-link">Lihat Semua →</router-link>
            </div>
            <i class="fas fa-store card-icon"></i>
          </div>

          <div class="dashboard-card yellow">
            <div class="card-content">
              <h3>Total Galeri</h3>
              <p>{{ totalGaleri }}</p>
              <router-link to="/admin/galeri" class="card-link">Lihat Semua →</router-link>
            </div>
            <i class="fas fa-images card-icon"></i>
          </div>

          <div class="dashboard-card green">
            <div class="card-content">
              <h3>Total Berita</h3>
              <p>{{ totalBerita }}</p>
              <router-link to="/admin/berita" class="card-link">Lihat Semua →</router-link>
            </div>
            <i class="fas fa-newspaper card-icon"></i>
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script>
import { supabase } from '@/supabase.js'
import AdminLayout from '@/layouts/adminlayout.vue'
import '@/assets/css/admin-dashboard.css'

export default {
  components: { AdminLayout },
  data() {
    return {
      totalUmkm: 0,
      totalGaleri: 0,
      totalBerita: 0
    }
  },
  async mounted() {
    await this.fetchTotalUmkm()
    await this.fetchTotalGaleri()
    await this.fetchTotalBerita()
  },
  methods: {
    // Hitung total data UMKM dari tabel "umkm"
    async fetchTotalUmkm() {
      try {
        const { count, error } = await supabase
          .from('umkm')
          .select('*', { count: 'exact', head: true })
        if (error) throw error
        this.totalUmkm = count || 0
      } catch (err) {
        console.error('❌ Gagal ambil total UMKM:', err.message)
      }
    },

    // Hitung total data galeri dari tabel "galeri"
    async fetchTotalGaleri() {
      try {
        const { count, error } = await supabase
          .from('galeri')
          .select('*', { count: 'exact', head: true })
        if (error) throw error
        this.totalGaleri = count || 0
      } catch (err) {
        console.error('❌ Gagal ambil total galeri:', err.message)
      }
    },

    // Hitung total data berita dari tabel "berita"
    async fetchTotalBerita() {
      try {
        const { count, error } = await supabase
          .from('berita')
          .select('*', { count: 'exact', head: true })
        if (error) throw error
        this.totalBerita = count || 0
      } catch (err) {
        console.error('❌ Gagal ambil total berita:', err.message)
      }
    }
  }
}
</script>
