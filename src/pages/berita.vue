<template>
  <div class="news-page">
    <!-- Header Section -->
    <header class="news-header">
      <div class="container">
        <h1 class="animate-fade-in">BERITA TERKINI</h1>
      </div>
    </header>

    <!-- News Content -->
    <main class="news-content">
      <div class="container">
        <!-- Featured Article -->
        <section class="featured-section" v-if="featuredArticle">
          <router-link 
            :to="{ name: 'BeritaDetail', params: { id: featuredArticle.id } }"
            class="featured-article animate-fade-in"
          >
            <div class="featured-content">
              <div class="featured-image">
                <img 
                  :src="featuredArticle.imageUrl || getPlaceholderImage()" 
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
                  <span><i class="fas fa-user"></i> {{ featuredArticle.author || 'Admin' }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </section>

        <!-- News Grid -->
        <section class="news-grid" v-if="paginatedNews.length > 0">
          <router-link
            v-for="(berita, index) in paginatedNews"
            :key="berita.id"
            :to="{ name: 'BeritaDetail', params: { id: berita.id } }"
            class="news-card animate-fade-in"
            :class="`animate-delay-${(index % 4) + 1}`"
          >
            <div class="news-card-image">
              <img 
                :src="berita.imageUrl || getPlaceholderImage()" 
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

        <!-- No Results -->
        <section v-else class="no-results animate-fade-in">
          <i class="fas fa-newspaper"></i>
          <p>Tidak ada berita yang ditemukan.</p>
        </section>

        <!-- Load More Button -->
        <section class="load-more-section" v-if="hasMoreNews">
          <button 
            class="load-more-btn" 
            @click="loadMoreNews"
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// ===== ROUTER =====
const router = useRouter()

// ===== REACTIVE DATA =====
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(6)
const isLoading = ref(false)
const searchTimeout = ref(null)

// ===== NEWS DATA =====
const allNews = ref([
  {
    id: 'kunjungan-menteri-semarang',
    title: 'Kunjungan Menteri ke UMKM di Semarang Perkuat Ekonomi Lokal',
    excerpt: 'Menteri Koperasi dan UKM melakukan kunjungan kerja ke Semarang untuk melihat langsung perkembangan UMKM lokal dan memberikan dukungan kebijakan yang mendorong pertumbuhan ekonomi kerakyatan.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    category: 'ekonomi',
    date: '05 Juli 2025',
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'inovasi-teknologi-kampus',
    title: 'Inovasi Teknologi Terbaru dari Mahasiswa Kampus Lokal',
    excerpt: 'Mahasiswa dari universitas lokal berhasil menciptakan aplikasi inovatif yang dapat membantu UMKM dalam mengelola bisnis mereka dengan lebih efisien.',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    category: 'teknologi',
    date: '03 Juli 2025',
    isTrending: true
  },
  {
    id: 'sosialisasi-daur-ulang',
    title: 'Pentingnya Daur Ulang: Sosialisasi di Tingkat Komunitas',
    excerpt: 'Kegiatan sosialisasi tentang pentingnya daur ulang sampah dilakukan di berbagai komunitas untuk meningkatkan kesadaran masyarakat terhadap lingkungan.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    category: 'lingkungan',
    date: '01 Juli 2025',
  },
  {
    id: 'workshop-pemasaran-digital',
    title: 'Workshop Pemasaran Digital Sukses Digelar untuk Pengusaha Muda',
    excerpt: 'Workshop pemasaran digital yang diselenggarakan untuk pengusaha muda mendapat respons positif dan membantu mengembangkan strategi bisnis digital.',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    category: 'pendidikan',
    date: '28 Juni 2025',
  },
  {
    id: 'pusat-kreatif-baru',
    title: 'Pusat Kreatif Baru Diresmikan, Dorong Talenta Lokal',
    excerpt: 'Peresmian pusat kreatif baru diharapkan dapat menjadi wadah bagi talenta lokal untuk mengembangkan kreativitas dan inovasi di berbagai bidang.',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    category: 'umum',
    date: '25 Juni 2025',
  },
  {
    id: 'penghijauan-kota-semarang',
    title: 'Gerakan Penghijauan Kota Semarang Targetkan Ribuan Pohon',
    excerpt: 'Program penghijauan kota Semarang menargetkan penanaman ribuan pohon untuk meningkatkan kualitas udara dan menciptakan lingkungan yang lebih sehat.',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    category: 'lingkungan',
    date: '20 Juni 2025',
    isTrending: true
  },
  {
    id: 'startup-lokal-investasi',
    title: 'Startup Lokal Raih Pendanaan Besar dari Investor Asing',
    excerpt: 'Startup teknologi lokal berhasil menarik perhatian investor asing dan mendapatkan pendanaan besar untuk pengembangan produk dan ekspansi pasar.',
    imageUrl: 'https://picsum.photos/600/400?random=7',
    category: 'ekonomi',
    date: '18 Juni 2025',
  },
  {
    id: 'kurikulum-baru-sekolah',
    title: 'Implementasi Kurikulum Baru di Sekolah Dasar Berjalan Lancar',
    excerpt: 'Program implementasi kurikulum baru di tingkat sekolah dasar menunjukkan hasil yang positif dengan dukungan penuh dari guru dan orang tua.',
    imageUrl: 'https://picsum.photos/600/400?random=8',
    category: 'pendidikan',
    date: '15 Juni 2025',
  }
])

// ===== COMPUTED PROPERTIES =====
const featuredArticle = computed(() => 
  allNews.value.find(news => news.isFeatured)
)

const trendingNews = computed(() => 
  allNews.value
    .filter(news => news.isTrending && !news.isFeatured)
    .slice(0, 3)
)

const filteredNews = computed(() => {
  let filtered = allNews.value.filter(news => !news.isFeatured)
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(news =>
      news.title.toLowerCase().includes(query) ||
      news.excerpt.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const paginatedNews = computed(() => {
  const start = 0
  const end = currentPage.value * itemsPerPage.value
  return filteredNews.value.slice(start, end)
})

const hasMoreNews = computed(() => {
  return paginatedNews.value.length < filteredNews.value.length
})

// ===== METHODS =====
const handleSearch = () => {
  currentPage.value = 1
}

const loadMoreNews = () => {
  if (isLoading.value || !hasMoreNews.value) return
  
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    currentPage.value += 1
    isLoading.value = false
  }, 1000)
}

const handleImageError = (event) => {
  event.target.src = getPlaceholderImage()
}

const getPlaceholderImage = () => {
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect width="400" height="200" fill="%23f8f9fa"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236c757d" font-family="Arial, sans-serif" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E'
}

const getRelativeTime = (dateString) => {
  try {
    // Parse date string in format "DD MMM YYYY"
    const months = {
      'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
      'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    }
    
    const parts = dateString.split(' ')
    if (parts.length === 3) {
      const day = parseInt(parts[0])
      const month = months[parts[1]]
      const year = parseInt(parts[2])
      
      if (month !== undefined) {
        const date = new Date(year, month, day)
        const now = new Date()
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
        
        if (diffInHours < 1) return 'Baru saja'
        if (diffInHours < 24) return `${diffInHours} jam lalu`
        
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays} hari lalu`
      }
    }
    
    return dateString
  } catch (error) {
    return dateString
  }
}

const navigateToArticle = (id) => {
  // Navigate to detail page using Vue Router
  router.push({ name: 'BeritaDetail', params: { id } })
}

// ===== LIFECYCLE HOOKS =====
onMounted(() => {
  // Initialize scroll animations
  nextTick(() => {
    initScrollAnimations()
  })
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll)
})

const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)
  
  // Observe elements with animation class
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach(el => {
    observer.observe(el)
  })
}

const handleScroll = () => {
  // Add any scroll-based functionality here
  // For example: lazy loading, infinite scroll, etc.
}

// ===== WATCHERS =====
watch(searchQuery, () => {
  // Debounce search to avoid too many updates
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  searchTimeout.value = setTimeout(() => {
    handleSearch()
  }, 300)
})

// ===== CLEANUP =====
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})
</script>

<style scoped>
/* Import external CSS file */
@import '@/assets/css/berita.css';

/* Component-specific styles */
.news-page {
  min-height: 100vh;
}

/* Transition animations for Vue transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Loading state styles */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>