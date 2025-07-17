<template>
  <div class="berita-detail">
    <!-- Hero Section -->
    <section class="hero-section" v-if="article">
      <div class="hero-content">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">Beranda</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/berita" class="breadcrumb-link">Berita</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ article.title }}</span>
        </nav>

        <!-- Article Meta -->
        <div class="article-meta">
          <span class="article-date">{{ article.date }}</span>
        </div>

        <!-- Article Title -->
        <h1 class="article-title">{{ article.title }}</h1>
      </div>
    </section>

    <!-- Article Section -->
    <section class="article-section" v-if="article">
      <div class="container">
        <div class="article-layout">
          <!-- Main Content -->
          <main class="article-main">
            <!-- Article Image -->
            <div class="article-image">
              <img 
                :src="article.imageUrl || getPlaceholderImage()" 
                :alt="article.title"
                @error="handleImageError"
              />
            </div>

            <!-- Article Content -->
            <div class="article-content">
              <!-- Article Body -->
              <div class="article-body" v-html="articleContent"></div>

              <!-- Share Buttons -->
              <div class="article-share">
                <h4>Bagikan Artikel:</h4>
                <div class="share-buttons">
                  <button @click="shareToFacebook" class="share-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                    Facebook
                  </button>
                  <button @click="shareToTwitter" class="share-btn twitter">
                    <i class="fab fa-twitter"></i>
                    Twitter
                  </button>
                  <button @click="shareToWhatsApp" class="share-btn whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                  </button>
                  <button @click="copyLink" class="share-btn copy">
                    <i class="fas fa-link"></i>
                    Salin Link
                  </button>
                </div>
              </div>
            </div>
          </main>

          <!-- Sidebar -->
          <aside class="article-sidebar">
            <!-- Latest Articles Widget -->
            <div class="sidebar-widget">
              <h3>Berita Terbaru</h3>
              <div class="latest-articles">
                <router-link
                  v-for="latest in latestArticles"
                  :key="latest.id"
                  :to="{ name: 'BeritaDetail', params: { id: latest.id } }"
                  class="latest-article"
                >
                  <img 
                    :src="latest.imageUrl || getPlaceholderImage()" 
                    :alt="latest.title"
                    @error="handleImageError"
                  />
                  <div class="latest-content">
                    <h4>{{ latest.title }}</h4>
                    <div class="latest-date">{{ latest.date }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Article Not Found -->
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

    <!-- Back to Top Button -->
    <button 
      class="back-to-top" 
      v-show="showScrollTop"
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ===== ROUTER =====
const route = useRoute()
const router = useRouter()

// ===== PROPS =====
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// ===== REACTIVE DATA =====
const article = ref(null)
const showScrollTop = ref(false)

// ===== SAMPLE DATA =====
const allNews = ref([
  {
    id: 'kunjungan-menteri-semarang',
    title: 'Kunjungan Menteri ke UMKM di Semarang Perkuat Ekonomi Lokal',
    excerpt: 'Menteri Koperasi dan UKM melakukan kunjungan kerja ke Semarang untuk melihat langsung perkembangan UMKM lokal dan memberikan dukungan kebijakan yang mendorong pertumbuhan ekonomi kerakyatan.',
    imageUrl: 'https://picsum.photos/1000/400?random=1',
    category: 'ekonomi',
    date: '05 Juli 2025',
    author: 'Admin Ekonomi',
    views: '1.234',
    content: `
      <p>Kunjungan Menteri Koperasi dan Usaha Kecil Menengah (UKM) ke Semarang menandai komitmen pemerintah dalam mendukung pertumbuhan ekonomi kerakyatan. Dalam kunjungan ini, Menteri secara langsung meninjau berbagai unit usaha UMKM yang tersebar di wilayah Semarang dan sekitarnya.</p>

      <h2>Dukungan Langsung untuk UMKM</h2>
      <p>Selama kunjungan, Menteri memberikan bantuan modal kerja kepada puluhan pelaku UMKM. Program ini merupakan bagian dari inisiatif pemerintah untuk memperkuat fondasi ekonomi nasional melalui pemberdayaan usaha mikro, kecil, dan menengah.</p>

      <blockquote>
        "UMKM adalah tulang punggung ekonomi Indonesia. Dukungan pemerintah terhadap sektor ini akan terus ditingkatkan untuk menciptakan lapangan kerja dan meningkatkan kesejahteraan masyarakat."
      </blockquote>

      <h3>Program Pelatihan dan Pendampingan</h3>
      <p>Tidak hanya bantuan modal, pemerintah juga meluncurkan program pelatihan komprehensif yang meliputi:</p>
      <ul>
        <li>Manajemen keuangan untuk UMKM</li>
        <li>Pemasaran digital dan e-commerce</li>
        <li>Peningkatan kualitas produk</li>
        <li>Akses ke pasar yang lebih luas</li>
      </ul>

      <p>Program ini diharapkan dapat memberikan dampak jangka panjang bagi sustainability dan growth UMKM di Semarang khususnya dan Indonesia pada umumnya.</p>

      <h2>Dampak Positif bagi Ekonomi Lokal</h2>
      <p>Kehadiran program ini telah menunjukkan dampak positif yang signifikan. Banyak pelaku UMKM melaporkan peningkatan omzet hingga 40% dalam kurun waktu 6 bulan terakhir setelah mengikuti program pembinaan.</p>

      <p>Selain itu, tercatat juga peningkatan dalam hal:</p>
      <ol>
        <li>Kualitas produk yang dihasilkan</li>
        <li>Jangkauan pasar yang lebih luas</li>
        <li>Pemanfaatan teknologi dalam operasional</li>
        <li>Pencatatan keuangan yang lebih baik</li>
      </ol>

      <p>Dengan dukungan berkelanjutan dari pemerintah dan partisipasi aktif masyarakat, diharapkan sektor UMKM dapat terus berkembang dan memberikan kontribusi yang semakin besar bagi perekonomian nasional.</p>
    `
  },
  {
    id: 'inovasi-teknologi-kampus',
    title: 'Inovasi Teknologi Terbaru dari Mahasiswa Kampus Lokal',
    excerpt: 'Mahasiswa dari universitas lokal berhasil menciptakan aplikasi inovatif yang dapat membantu UMKM dalam mengelola bisnis mereka dengan lebih efisien.',
    imageUrl: 'https://picsum.photos/1000/400?random=2',
    category: 'teknologi',
    date: '03 Juli 2025',
    author: 'Tim Teknologi',
    views: '987',
    content: `
      <p>Sebuah terobosan baru dalam dunia teknologi lokal telah lahir dari kreativitas mahasiswa universitas di Semarang. Aplikasi bernama "UMKM Helper" ini dirancang khusus untuk membantu para pelaku usaha mikro, kecil, dan menengah dalam mengelola bisnis mereka secara lebih efisien dan modern.</p>

      <h2>Fitur Unggulan Aplikasi</h2>
      <p>Aplikasi ini dilengkapi dengan berbagai fitur canggih yang dirancang berdasarkan kebutuhan riil para pelaku UMKM:</p>
      <ul>
        <li>Sistem manajemen inventori otomatis</li>
        <li>Pencatatan keuangan digital</li>
        <li>Platform pemasaran online terintegrasi</li>
        <li>Analisis penjualan berbasis AI</li>
        <li>Sistem notifikasi untuk stok barang</li>
      </ul>

      <h3>Dampak Positif untuk UMKM</h3>
      <p>Sejak diluncurkan dalam versi beta, aplikasi ini telah digunakan oleh lebih dari 100 UMKM di wilayah Semarang dengan hasil yang menggembirakan. Para pengguna melaporkan peningkatan efisiensi operasional hingga 60% dan peningkatan penjualan rata-rata 35%.</p>
    `
  },
  {
    id: 'sosialisasi-daur-ulang',
    title: 'Pentingnya Daur Ulang: Sosialisasi di Tingkat Komunitas',
    excerpt: 'Kegiatan sosialisasi tentang pentingnya daur ulang sampah dilakukan di berbagai komunitas untuk meningkatkan kesadaran masyarakat terhadap lingkungan.',
    imageUrl: 'https://picsum.photos/1000/400?random=3',
    category: 'lingkungan',
    date: '01 Juli 2025',
    author: 'Tim Lingkungan',
    views: '756',
    content: `
      <p>Program sosialisasi daur ulang sampah tingkat komunitas telah berhasil menjangkau lebih dari 50 komunitas di Semarang. Inisiatif ini bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya pengelolaan sampah yang bertanggung jawab.</p>

      <h2>Metode Daur Ulang yang Diajarkan</h2>
      <p>Dalam setiap sesi sosialisasi, peserta diajari berbagai teknik daur ulang praktis:</p>
      <ul>
        <li>Pemilahan sampah organik dan anorganik</li>
        <li>Pembuatan kompos dari sampah organik</li>
        <li>Kreasi produk berguna dari sampah plastik</li>
        <li>Teknik 3R: Reduce, Reuse, Recycle</li>
      </ul>

      <p>Program ini tidak hanya memberikan edukasi, tetapi juga menciptakan peluang ekonomi baru bagi masyarakat melalui industri daur ulang rumahan.</p>
    `
  },
  {
    id: 'workshop-pemasaran-digital',
    title: 'Workshop Pemasaran Digital Sukses Digelar untuk Pengusaha Muda',
    excerpt: 'Workshop pemasaran digital yang diselenggarakan untuk pengusaha muda mendapat respons positif dan membantu mengembangkan strategi bisnis digital.',
    imageUrl: 'https://picsum.photos/1000/400?random=4',
    category: 'pendidikan',
    date: '28 Juni 2025',
    author: 'Tim Pendidikan',
    views: '643',
    content: `
      <p>Workshop pemasaran digital yang diselenggarakan khusus untuk para pengusaha muda telah berhasil menarik perhatian lebih dari 200 peserta dari berbagai sektor usaha. Acara ini bertujuan untuk memberikan pemahaman mendalam tentang strategi pemasaran di era digital.</p>

      <h2>Materi Workshop</h2>
      <p>Workshop ini mencakup berbagai topik penting dalam pemasaran digital:</p>
      <ul>
        <li>Strategi media sosial untuk bisnis</li>
        <li>Search Engine Optimization (SEO)</li>
        <li>Content marketing yang efektif</li>
        <li>Analisis performa digital</li>
      </ul>
    `
  },
  {
    id: 'pusat-kreatif-baru',
    title: 'Pusat Kreatif Baru Diresmikan, Dorong Talenta Lokal',
    excerpt: 'Peresmian pusat kreatif baru diharapkan dapat menjadi wadah bagi talenta lokal untuk mengembangkan kreativitas dan inovasi di berbagai bidang.',
    imageUrl: 'https://picsum.photos/1000/400?random=5',
    category: 'umum',
    date: '25 Juni 2025',
    author: 'Admin',
    views: '521',
    content: `
      <p>Peresmian pusat kreatif baru di Semarang menandai tonggak penting dalam pengembangan talenta lokal. Fasilitas ini dirancang untuk menjadi wadah bagi para kreator, seniman, dan inovator dalam mengembangkan karya-karya terbaik mereka.</p>

      <h2>Fasilitas yang Tersedia</h2>
      <p>Pusat kreatif ini dilengkapi dengan berbagai fasilitas modern:</p>
      <ul>
        <li>Studio rekaman profesional</li>
        <li>Ruang workshop dan pelatihan</li>
        <li>Galeri untuk pameran karya</li>
        <li>Co-working space</li>
      </ul>
    `
  }
])

// ===== COMPUTED PROPERTIES =====
const articleContent = computed(() => {
  return article.value?.content || ''
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return allNews.value
    .filter(news => news.id !== article.value.id)
    .slice(0, 3)
})

const latestArticles = computed(() => {
  if (!article.value) return []
  return allNews.value
    .filter(news => news.id !== article.value.id)
    .slice(0, 4)
})

// ===== METHODS =====
const loadArticle = () => {
  const foundArticle = allNews.value.find(news => news.id === props.id)
  if (foundArticle) {
    article.value = foundArticle
    // Update page title
    document.title = `${foundArticle.title} - UMKM Semarang`
  } else {
    article.value = null
  }
}

const toggleScrollTopButton = () => {
  showScrollTop.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleImageError = (event) => {
  event.target.src = getPlaceholderImage()
}

const getPlaceholderImage = () => {
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1000" height="400" viewBox="0 0 1000 400"%3E%3Crect width="1000" height="400" fill="%23f8f9fa"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236c757d" font-family="Arial, sans-serif" font-size="24"%3ENo Image Available%3C/text%3E%3C/svg%3E'
}

// Share Functions
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value?.title || '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value?.title || '')
  window.open(`https://wa.me/?text=${text} ${url}`, '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link berhasil disalin!')
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Link berhasil disalin!')
  }
}

// ===== WATCHERS =====
watch(() => props.id, () => {
  loadArticle()
}, { immediate: true })

// ===== LIFECYCLE HOOKS =====
onMounted(() => {
  loadArticle()
  window.addEventListener('scroll', toggleScrollTopButton)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleScrollTopButton)
})
</script>

<style scoped>
/* Import external CSS file */
@import '@/assets/css/berita-detail.css';

/* Additional component-specific styles */
.latest-date {
  font-size: 0.75rem;
  color: #666;
}
.article-not-found {
  padding: 4rem 0;
  text-align: center;
}

.not-found-content {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 0 auto;
}

.not-found-content i {
  font-size: 1rem;
  color: #dee2e6;
  margin-bottom: 1rem;
  color: #0E3B4F;
}

.not-found-content h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1c1c1c;
}

.not-found-content p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.not-found-content .breadcrumb-link {
  color: #0E3B4F;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #0E3B4F;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.not-found-content .breadcrumb-link:hover {
  background: #0E3B4F;
  color: white;
}
</style>