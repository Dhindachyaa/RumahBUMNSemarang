<template>
  <section class="umkm-section">
    <h2 class="animate-on-scroll">UMKM BINAAN</h2>
    <form @submit.prevent class="umkm-search animate-on-scroll">
      <input v-model="search" placeholder="Cari UMKM ..." class="search-input" />
      <select v-model="category" class="category-select">
        <option value="">Semua Kategori</option>
        <option value="perdagangan">Perdagangan</option>
        <option value="kerajinan">Craft/Kerajinan Tangan</option>
        <option value="fashion">Fashion/Busana</option>
        <option value="makanan">Makanan & Minuman</option>
      </select>
      <button class="search-btn">Cari</button>
    </form>
    <div class="umkm-list">
      <router-link
        v-for="(umkm, i) in filteredUMKM"
        :key="umkm.id"
        :to="`/umkm/${umkm.id}`"
        class="umkm-card animate-on-scroll"
        :style="{ '--animation-delay': `${i * 0.1}s` }"
      >
        <img :src="umkm.img" :alt="umkm.nama" />
        <h3>{{ umkm.nama }}</h3>
        <p>{{ umkm.kategori }}</p>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import '@/assets/css/umkm.css'

const search = ref('')
const category = ref('')
const umkmList = ref([
  { id: 'batik-amel', nama: 'Rumah Batik Amel', kategori: 'Perdagangan', img: '/rumahbumn.png' },
  { id: 'puzo-gallery', nama: "Puzo’s Art Gallery", kategori: 'Craft/Kerajinan Tangan', img: '/rumahbumn.png' },
  { id: 'laudya-hijab', nama: 'Laudya Hijab', kategori: 'Fashion/Busana', img: '/rumahbumn.png' },
  { id: 'adjie-1', nama: 'Toko Oleh-Oleh ADJIE', kategori: 'Makanan & Minuman', img: '/rumahbumn.png' },
])

const filteredUMKM = computed(() =>
  umkmList.value.filter(u => 
    u.nama.toLowerCase().includes(search.value.toLowerCase()) &&
    (!category.value || u.kategori.toLowerCase().includes(category.value))
  )
)

onMounted(() => {
  const obs = new IntersectionObserver((es, obs) => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show')
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el))
})
</script>
