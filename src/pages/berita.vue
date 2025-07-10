<template>
  <section class="news-section">
    <h2 class="animate-on-scroll">BERITA TERKINI</h2>

    <div class="news-list">
      <router-link
        v-for="(berita, i) in filteredNews"
        :key="berita.id"
        :to="`/berita/${berita.id}`"
        class="news-card animate-on-scroll"
        :style="{ '--animation-delay': `${i * 0.1}s` }"
      >
        <img :src="berita.imageUrl || '/placeholder-news.png'" :alt="berita.title" />
        <h3>{{ berita.title }}</h3>
        <p class="news-category">{{ berita.category }}</p>
        <p class="news-date">{{ berita.date }}</p>
      </router-link>
      
      <p v-if="filteredNews.length === 0" class="no-results animate-on-scroll">
        Tidak ada berita yang ditemukan.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import '@/assets/css/berita.css'

const allNews = ref([
  {
    id: 'kunjungan-menteri-semarang',
    title: 'Kunjungan Menteri ke UMKM di Semarang Perkuat Ekonomi Lokal',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    category: 'Ekonomi',
    date: '05 Juli 2025'
  },
  {
    id: 'inovasi-teknologi-kampus',
    title: 'Inovasi Teknologi Terbaru dari Mahasiswa Kampus Lokal',
    imageUrl: 'https://picsum.photos/300/200?random=2',
    category: 'Teknologi',
    date: '03 Juli 2025'
  },
  {
    id: 'sosialisasi-daur-ulang',
    title: 'Pentingnya Daur Ulang: Sosialisasi di Tingkat Komunitas',
    imageUrl: 'https://picsum.photos/300/200?random=3',
    category: 'Lingkungan',
    date: '01 Juli 2025'
  },
  {
    id: 'workshop-pemasaran-digital',
    title: 'Workshop Pemasaran Digital Sukses Digelar untuk Pengusaha Muda',
    imageUrl: 'https://picsum.photos/300/200?random=4',
    category: 'Pendidikan',
    date: '28 Juni 2025'
  },
  {
    id: 'peresmian-pusat-kreatif',
    title: 'Pusat Kreatif Baru Diresmikan, Dorong Talenta Lokal',
    imageUrl: 'https://picsum.photos/300/200?random=5',
    category: 'Umum',
    date: '25 Juni 2025'
  },
  {
    id: 'penghijauan-kota-semarang',
    title: 'Gerakan Penghijauan Kota Semarang Targetkan Ribuan Pohon',
    imageUrl: 'https://picsum.photos/300/200?random=6',
    category: 'Lingkungan',
    date: '20 Juni 2025'
  },
  {
    id: 'startup-lokal-raih-investasi',
    title: 'Startup Lokal Raih Pendanaan Besar dari Investor Asing',
    imageUrl: 'https://picsum.photos/300/200?random=7',
    category: 'Ekonomi',
    date: '18 Juni 2025'
  },
  {
    id: 'kurikulum-baru-sekolah',
    title: 'Implementasi Kurikulum Baru di Sekolah Dasar Berjalan Lancar',
    imageUrl: 'https://picsum.photos/300/200?random=8',
    category: 'Pendidikan',
    date: '15 Juni 2025'
  }
]);

const searchQuery = ref('');
const selectedCategory = ref('');

const filteredNews = computed(() =>
  allNews.value.filter(berita =>
    berita.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (selectedCategory.value === '' || berita.category === selectedCategory.value)
  )
);

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};

onMounted(() => {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
});
</script>
