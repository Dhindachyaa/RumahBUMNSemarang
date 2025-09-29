<template>
  <div class="news-page">
    <header class="news-header">
      <div class="container">
        <h1 class="animate-fade-in">BERITA TERKINI</h1>
      </div>
    </header>

    <main class="news-content">
      <div class="container">
        <!-- 🔹 Berita utama -->
        <section class="featured-section" v-if="featuredArticle">
          <router-link 
            :to="{ name: 'BeritaDetail', params: { id: featuredArticle.id } }"
            class="featured-article animate-fade-in"
          >
            <div class="featured-content">
              <div class="featured-image">
                <img 
                  :src="getImageUrl(featuredArticle.imageUrl)" 
                  :alt="featuredArticle.title" 
                  @error="handleImageError"
                />
                <div class="featured-badge">UTAMA</div>
              </div>
              <div class="featured-info">
                <h2 class="featured-title">{{ featuredArticle.title }}</h2>
                <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
                <div class="featured-meta">
                  <span><i class="fas fa-clock"></i> {{ featuredArticle.date }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </section>

        <!-- 🔹 Daftar berita -->
        <section class="news-grid" v-if="paginatedNews.length > 0">
          <router-link
            v-for="(berita, index) in paginatedNews"
            :key="berita.id"
            :to="{ name: 'BeritaDetail', params: { id: berita.id } }"
            class="news-card animate-on-scroll"
            :style="{ '--animation-delay': `${(index % 4) * 0.1}s` }"
          >
            <div class="news-card-image">
              <img 
                :src="getImageUrl(berita.imageUrl)" 
                :alt="berita.title"
                @error="handleImageError"
              />
            </div>
            <div class="news-card-content">
              <h3 class="news-card-title">{{ berita.title }}</h3>
              <p class="news-card-excerpt">{{ berita.excerpt }}</p>
              <div class="news-card-meta">
                <div class="news-card-date">
                  <i class="fas fa-clock"></i>
                  <span>{{ berita.date }}</span>
                </div>
                <span class="read-more">Baca Selengkapnya</span>
              </div>
            </div>
          </router-link>
        </section>

        <!-- 🔹 Jika tidak ada berita -->
        <section v-else class="no-results animate-fade-in">
          <i class="fas fa-newspaper"></i>
          <p>Tidak ada berita yang ditemukan.</p>
        </section>

        <!-- 🔹 Tombol load more -->
        <section class="load-more-section" v-if="hasMoreNews">
          <button 
            class="load-more-btn" 
            @click="loadMore"
            :disabled="isLoading"
          >
            <i class="fas" :class="isLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
            {{ isLoading ? 'Memuat...' : 'Muat Lebih Banyak' }}
          </button>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { supabase } from '@/supabase.js'

// State utama
const allNews = ref([])
const currentPage = ref(1)
const itemsPerPage = 6
const isLoading = ref(false)

// Base URL Supabase Storage untuk berita (jika path relatif)
const SUPABASE_IMAGE_URL = 'https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/berita/'

// 🔹 Helper untuk handle URL gambar
const getImageUrl = (path) => {
  if (!path) return getPlaceholderImage()
  if (path.startsWith('http')) return path
  return SUPABASE_IMAGE_URL + path
}

// 🔹 Placeholder jika gambar gagal
const getPlaceholderImage = () => {
  return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="400" height="200" fill="#f8f9fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="16">No Image</text></svg>'
}

const handleImageError = e => {
  e.target.src = getPlaceholderImage()
}

// 🔹 Fetch berita
const fetchBerita = async () => {
  try {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('tanggal', { ascending: false })

    if (error) throw error

    allNews.value = data.map(item => ({
      id: item.id,
      title: item.judul,
      excerpt: stripHtml(item.isi).slice(0, 120) + '...',
      imageUrl: item.gambar || null,
      date: formatTanggal(item.tanggal)
    }))

    await nextTick()
    initScrollAnimations()
  } catch (err) {
    console.error('❌ Gagal memuat berita:', err)
  }
}

// 🔹 Hapus tag HTML
const stripHtml = html => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// 🔹 Format tanggal
const formatTanggal = tgl => {
  const d = new Date(tgl)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// 🔹 Berita utama
const featuredArticle = computed(() => allNews.value[0] || null)

// 🔹 Pagination
const filteredNews = computed(() => allNews.value.slice(1))
const paginatedNews = computed(() => filteredNews.value.slice(0, currentPage.value * itemsPerPage))
const hasMoreNews = computed(() => paginatedNews.value.length < filteredNews.value.length)

const loadMore = async () => {
  if (isLoading.value || !hasMoreNews.value) return
  isLoading.value = true
  setTimeout(() => {
    currentPage.value += 1
    nextTick(() => initScrollAnimations())
    isLoading.value = false
  }, 500)
}

// 🔹 Scroll animations
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll:not(.show)')
    .forEach(el => observer.observe(el))
}

// 🔹 Lifecycle
onMounted(fetchBerita)
onUnmounted(() => {
  window.removeEventListener('scroll', initScrollAnimations)
})
</script>

<style scoped>
@import '@/assets/css/berita.css';
</style>
