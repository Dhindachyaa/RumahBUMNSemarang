<template>
  <section class="umkm-section">
    <h2 class="animate-on-scroll">UMKM BINAAN</h2>

    <form @submit.prevent class="umkm-search animate-on-scroll">
      <input v-model="search" placeholder="Cari UMKM ..." class="search-input" />
      <select v-model="category" class="category-select">
        <option value="">Semua Kategori</option>
        <option value="Perdagangan">Perdagangan</option>
        <option value="Craft/Kerajinan Tangan">Craft/Kerajinan Tangan</option>
        <option value="Fashion/Busana">Fashion/Busana</option>
        <option value="Makanan & Minuman">Makanan & Minuman</option>
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
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import '@/assets/css/umkm.css'

const search = ref('')
const category = ref('')
const umkmList = ref([])

const filteredUMKM = computed(() =>
  umkmList.value.filter(u =>
    u.nama.toLowerCase().includes(search.value.toLowerCase()) &&
    (category.value === '' || u.kategori.toLowerCase().includes(category.value.toLowerCase()))
  )
)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/umkm')
    console.log('Data dari backend:', res.data)
    umkmList.value = res.data.data.map(u => ({
      ...u,
      img: `http://localhost:3000/${u.image_path}`
    }))
  } catch (err) {
    console.error('Gagal load UMKM:', err)
  }

  await nextTick() // pastikan DOM siap sebelum observer

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el))
})
</script>
