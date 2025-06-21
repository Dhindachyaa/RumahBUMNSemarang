<template>
  <section class="umkm-section">
    <h2 class="animate-on-scroll">UMKM BINAAN</h2>

    <!-- Form Pencarian -->
    <form class="umkm-search animate-on-scroll" @submit.prevent>
      <input
        type="text"
        placeholder="Cari UMKM ..."
        class="search-input"
        v-model="search"
      />
      <select class="category-select" v-model="category">
        <option value="">Semua Kategori</option>
        <option value="perdagangan">Perdagangan</option>
        <option value="kerajinan">Craft/Kerajinan Tangan</option>
        <option value="fashion">Fashion/Busana</option>
        <option value="makanan">Makanan & Minuman</option>
      </select>
      <button class="search-btn" @click="filterUMKM">Cari</button>
    </form>

    <!-- Daftar UMKM -->
    <div class="umkm-list">
      <a
        v-for="(umkm, index) in filteredUMKM"
        :key="index"
        :href="`/umkm-detail.html?id=${umkm.id}`"
        class="umkm-card animate-on-scroll"
        :style="{ '--animation-delay': `${index * 0.1}s` }"
      >
        <img :src="umkm.img" :alt="umkm.nama" />
        <h3>{{ umkm.nama }}</h3>
        <p>{{ umkm.kategori }}</p>
      </a>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import '@/assets/css/umkm.css'

const search = ref('')
const category = ref('')
const umkmList = ref([
  {
    id: 'batik-amel',
    nama: 'Rumah Batik Amel',
    kategori: 'Perdagangan',
    img: '/rumahbumn.png',
  },
  {
    id: 'puzo-gallery',
    nama: 'Puzo’s Art Gallery',
    kategori: 'Craft/Kerajinan Tangan',
    img: '/rumahbumn.png',
  },
  {
    id: 'laudya-hijab',
    nama: 'Laudya Hijab',
    kategori: 'Fashion/Busana',
    img: '/rumahbumn.png',
  },
  {
    id: 'adjie-1',
    nama: 'Toko Oleh-Oleh ADJIE',
    kategori: 'Makanan & Minuman',
    img: '/rumahbumn.png',
  },
])

const filteredUMKM = computed(() =>
  umkmList.value.filter((umkm) => {
    const matchName = umkm.nama.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory =
      !category.value || umkm.kategori.toLowerCase().includes(category.value.toLowerCase())
    return matchName && matchCategory
  })
)

const filterUMKM = () => {
  // Tidak perlu isi, karena computed akan otomatis merespon perubahan
}

onMounted(() => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll')
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  animatedElements.forEach((el) => observer.observe(el))
})
</script>
