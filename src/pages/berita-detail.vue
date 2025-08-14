<template>
  <div class="berita-detail">
    <section class="hero-section" v-if="berita">
      <div class="hero-content">
        <nav class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">Beranda</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/berita" class="breadcrumb-link">Berita</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ berita.judul }}</span>
        </nav>
        <div class="article-meta">
          <span class="article-date">{{ formatTanggal(berita.tanggal) }}</span>
        </div>
        <h1 class="article-title">{{ berita.judul }}</h1>
      </div>
    </section>

    <section class="article-section" v-if="berita">
      <div class="container">
        <div class="article-layout">
          <main class="article-main">
            <div class="article-image">
              <img 
                :src="getImageUrl(berita.gambar)" 
                :alt="berita.judul"
                @error="handleImageError"
              />
            </div>
            <div class="article-content">
              <div class="article-body" v-html="berita.isi"></div>
              <div class="article-share">
                <h4>Bagikan Artikel:</h4>
                <div class="share-buttons">
                  <button @click="shareToFacebook" class="share-btn facebook">
                    <i class="fab fa-facebook-f"></i> Facebook
                  </button>
                  <button @click="shareToTwitter" class="share-btn twitter">
                    <i class="fab fa-twitter"></i> Twitter
                  </button>
                  <button @click="shareToWhatsApp" class="share-btn whatsapp">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                  </button>
                  <button @click="copyLink" class="share-btn copy">
                    <i class="fas fa-copy"></i> Salin Link
                  </button>
                </div>
              </div>
            </div>
          </main>

          <aside class="article-sidebar">
            <div class="sidebar-widget">
              <h3>Berita Terbaru</h3>
              <div class="latest-articles">
                <router-link
                  v-for="item in beritaTerbaru"
                  :key="item.id"
                  :to="{ name: 'BeritaDetail', params: { id: item.id } }"
                  class="latest-article"
                >
                  <img 
                    :src="getImageUrl(item.gambar)" 
                    :alt="item.judul"
                    @error="handleImageError"
                  />
                  <div class="latest-content">
                    <h4>{{ item.judul }}</h4>
                    <span class="latest-category">{{ formatTanggal(item.tanggal) }}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section v-else class="article-section">
      <div class="container">
        <div class="article-not-found">
          <div class="not-found-content">
            <h2>Artikel Tidak Ditemukan</h2>
            <p>Artikel yang Anda cari tidak dapat ditemukan.</p>
            <router-link to="/berita" class="breadcrumb-link">
              <i class="fas fa-arrow-left"></i>
              Kembali ke Berita
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <button 
      class="back-to-top" 
      v-show="showBackToTop"
      @click="scrollToTop"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import '@/assets/css/berita-detail.css'

const route = useRoute()
const berita = ref(null)
const beritaTerbaru = ref([])
const showBackToTop = ref(false)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const getImageUrl = (filename) => {
 return filename ? `${API_BASE_URL.replace('/api','')}/images/berita/${filename}` : '/placeholder-news.png'}

const formatTanggal = (tanggal) => {
  if (!tanggal) return '-'
  const d = new Date(tanggal)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const ambilDetailBerita = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/berita/${route.params.id}`)
    berita.value = res.data
    document.title = `${res.data.judul} - UMKM Semarang`
  } catch (err) {
    berita.value = null
    console.error('Gagal ambil detail:', err)
  }
}

const ambilBeritaTerbaru = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/berita`)
    beritaTerbaru.value = res.data.slice(0, 4)
  } catch (err) {
    console.error('Gagal ambil berita terbaru:', err)
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(berita.value?.judul || 'Berita menarik')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(berita.value?.judul || '')
  window.open(`https://wa.me/?text=${text} ${url}`, '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link berhasil disalin!')
  } catch (err) {
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Link berhasil disalin!')
  }
}

const handleImageError = (event) => {
  event.target.src = getImageUrl(null)
}

onMounted(() => {
  ambilDetailBerita()
  ambilBeritaTerbaru()
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 300
  })
})

watch(() => route.params.id, async () => {
  await ambilDetailBerita()
  scrollToTop() 
})
</script>
