<template>
  <div class="berita-detail">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">Beranda</router-link>
          <span class="breadcrumb-separator">›</span>
          <router-link to="/berita" class="breadcrumb-link">Berita</router-link>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">{{ berita?.title }}</span>
        </div>
        
        <div class="article-meta">
          <span class="article-category">{{ berita?.category }}</span>
          <span class="article-date">{{ berita?.date }}</span>
        </div>
        
        <h1 class="article-title">{{ berita?.title }}</h1>
      </div>
    </section>

    <!-- Article Content -->
    <section class="article-section">
      <div class="container">
        <div class="article-layout">
          <!-- Main Content -->
          <main class="article-main">
            <div class="article-image">
              <img :src="berita?.imageUrl" :alt="berita?.title" />
            </div>
            
            <div class="article-content">
              <div class="article-body" v-html="berita?.content"></div>
              
              <!-- Tags -->
              <div class="article-tags" v-if="berita?.tags && berita.tags.length > 0">
                <h4>Tags:</h4>
                <span v-for="tag in berita.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              
              <!-- Share Buttons -->
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
          
          <!-- Sidebar -->
          <aside class="article-sidebar">
            <!-- Latest News -->
            <div class="sidebar-widget">
              <h3>Berita Terbaru</h3>
              <div class="latest-articles">
                <router-link 
                  v-for="latest in latestNews" 
                  :key="latest.id"
                  :to="`/berita/${latest.id}`"
                  class="latest-article"
                >
                  <img :src="latest.imageUrl" :alt="latest.title" />
                  <div class="latest-content">
                    <h4>{{ latest.title }}</h4>
                    <span class="latest-category">{{ latest.category }}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    
    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop" 
      @click="scrollToTop" 
      class="back-to-top"
      aria-label="Kembali ke atas"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import '@/assets/css/berita-detail.css';

const route = useRoute();
const showBackToTop = ref(false);

// Sample data - replace with actual API call
const allNews = ref([
  {
    id: 'kunjungan-menteri-semarang',
    title: 'Kunjungan Menteri ke UMKM di Semarang Perkuat Ekonomi Lokal',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    category: 'Ekonomi',
    date: '05 Juli 2025',
    content: `
      <p>Menteri Koperasi dan UKM melakukan kunjungan kerja ke Kota Semarang untuk meninjau perkembangan UMKM lokal dan memberikan dukungan langsung kepada para pelaku usaha.</p>
      
      <p>Dalam kunjungannya, Menteri mengunjungi beberapa sentra UMKM di wilayah Semarang, termasuk industri batik, kerajinan tangan, dan kuliner khas daerah. "UMKM adalah tulang punggung ekonomi Indonesia, dan kami berkomitmen untuk terus mendukung pertumbuhan mereka," ujar Menteri.</p>
      
      <h3>Program Dukungan UMKM</h3>
      <p>Pemerintah telah menyiapkan berbagai program untuk mendukung UMKM, antara lain:</p>
      <ul>
        <li>Bantuan modal usaha dengan bunga rendah</li>
        <li>Pelatihan manajemen bisnis dan digital marketing</li>
        <li>Akses pasar yang lebih luas melalui platform digital</li>
        <li>Pendampingan teknis untuk meningkatkan kualitas produk</li>
      </ul>
      
      <p>Kunjungan ini diharapkan dapat memberikan dampak positif bagi UMKM di Semarang dan menjadi model untuk daerah lain di Indonesia.</p>
    `,
    tags: ['UMKM', 'Ekonomi', 'Semarang', 'Menteri'],
    author: 'Tim Redaksi'
  },
  {
    id: 'inovasi-teknologi-kampus',
    title: 'Inovasi Teknologi Terbaru dari Mahasiswa Kampus Lokal',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    category: 'Teknologi',
    date: '03 Juli 2025',
    content: `
      <p>Para mahasiswa dari universitas lokal berhasil menciptakan inovasi teknologi yang dapat membantu mengatasi berbagai permasalahan di masyarakat.</p>
      
      <p>Inovasi ini berupa aplikasi mobile yang mengintegrasikan Internet of Things (IoT) untuk monitoring lingkungan secara real-time.</p>
    `,
    tags: ['Teknologi', 'Mahasiswa', 'Inovasi', 'IoT'],
    author: 'Tim Redaksi'
  },
  {
    id: 'sosialisasi-daur-ulang',
    title: 'Pentingnya Daur Ulang: Sosialisasi di Tingkat Komunitas',
    imageUrl: 'https://picsum.photos/800/400?random=3',
    category: 'Lingkungan',
    date: '01 Juli 2025',
    content: `
      <p>Program sosialisasi daur ulang dilaksanakan di berbagai komunitas untuk meningkatkan kesadaran masyarakat terhadap pengelolaan sampah yang berkelanjutan.</p>
    `,
    tags: ['Lingkungan', 'Daur Ulang', 'Komunitas'],
    author: 'Tim Redaksi'
  },
  {
    id: 'workshop-pemasaran-digital',
    title: 'Workshop Pemasaran Digital Sukses Digelar untuk Pengusaha Muda',
    imageUrl: 'https://picsum.photos/800/400?random=4',
    category: 'Pendidikan',
    date: '28 Juni 2025',
    content: `
      <p>Workshop pemasaran digital yang dikhususkan untuk pengusaha muda berhasil diselenggarakan dengan antusias peserta yang tinggi.</p>
    `,
    tags: ['Pendidikan', 'Digital Marketing', 'Pengusaha'],
    author: 'Tim Redaksi'
  }
]);

// Get current article
const berita = computed(() => {
  return allNews.value.find(news => news.id === route.params.id);
});

// Get related articles (same category, excluding current)
const relatedNews = computed(() => {
  if (!berita.value) return [];
  return allNews.value
    .filter(news => 
      news.category === berita.value.category && 
      news.id !== berita.value.id
    )
    .slice(0, 3);
});

// Get latest articles (excluding current)
const latestNews = computed(() => {
  return allNews.value
    .filter(news => news.id !== berita.value?.id)
    .slice(0, 4);
});

// Share functions
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(berita.value?.title || '');
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
};

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${berita.value?.title} - ${url}`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('Link berhasil disalin!');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>