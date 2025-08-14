<template>
  <section class="umkm-section">
    <header class="umkm-header">
      <div class="container">
        <h1 class="animate-fade-in">UMKM BINAAN <br>RUMAH BUMN SEMARANG</br></h1>
      </div>
    </header>

    <form @submit.prevent="submitSearch" class="umkm-search-wrapper animate-on-scroll">
      <div class="umkm-search">
        <input v-model="search" placeholder="Cari UMKM ..." class="search-input" />
        <select v-model="category" class="category-select">
          <option value="">Semua Kategori</option>
          <option value="Fashion">Fashion</option>
          <option value="Craft/Accessoris/Home Decor">Craft/Accessoris/Home Decor</option>
          <option value="Foods & Beverages">Foods and Beverages</option>
          <option value="Healthy & Beauty">Healthy & Beauty</option>
        </select>
        <button type="submit" class="search-btn">Cari</button>
      </div>
    </form>

    <div class="umkm-list">
      <router-link
        v-for="(umkm, i) in umkmList"
        :key="umkm.id"
        :to="`/umkm/${umkm.id}`"
        class="umkm-card-link"
      >
        <div
          class="umkm-card animate-on-scroll"
          :style="{ '--animation-delay': `${i * 0.1}s` }"
        >
          <img
            :src="umkm.img"
            :alt="umkm.nama"
            class="popup-image"
            @click.stop="openPopup(umkm.img)"
            @error="handleImageError"
          />
          <div class="umkm-info">
            <h3>{{ umkm.nama }}</h3>
            <p>{{ umkm.kategori }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <div v-if="umkmList.length === 0" class="no-data-msg">
      Tidak ada UMKM ditemukan.
    </div>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
      <button
        v-for="page in totalPages"
        :key="'page-' + page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages">Next</button>
    </div>

    <div :class="['image-popup-overlay', popupImage ? 'active' : '']" @click.self="closePopup">
      <img v-if="popupImage" :src="popupImage" alt="Popup" @error="handleImageError" />
      <span class="popup-close" v-if="popupImage" @click.stop="closePopup">&times;</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import '@/assets/css/umkm.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const search = ref('')
const category = ref('')
const umkmList = ref([])
const popupImage = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 20

const getImageUrl = (path) => {
  if (!path) return `${API_BASE_URL.replace('/api','')}/images/umkm/rumah-bumn.png`
  let cleanPath = path.replace(/^images\//, '')
  if (!cleanPath.startsWith('umkm/')) cleanPath = `umkm/${cleanPath}`
  return `${API_BASE_URL.replace('/api','')}/images/${cleanPath}`
}

const handleImageError = (event) => {
  event.target.src = `${API_BASE_URL.replace('/api','')}/images/umkm/rumah-bumn.png`
}

const openPopup = (img) => {
  popupImage.value = img
}

const closePopup = () => {
  popupImage.value = null
}

const fetchUMKM = async () => {
  try {
    const limit = itemsPerPage
    const offset = (currentPage.value - 1) * limit

    const res = await axios.get(`${API_BASE_URL}/umkm/paginate`, {
      params: {
        limit,
        offset,
        search: search.value,
        kategori: category.value
      }
    })

    umkmList.value = res.data.data.map((u) => ({
      ...u,
      img: getImageUrl(u.image_path)
    }))

    totalPages.value = res.data.pagination?.totalPages || 1
    await nextTick()

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach((el) => obs.observe(el))

  } catch (err) {
    console.error('Gagal fetch UMKM:', err)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const submitSearch = () => {
  currentPage.value = 1
  fetchUMKM()
}

watch(currentPage, fetchUMKM)
watch(category, () => {
  currentPage.value = 1
  fetchUMKM()
})

onMounted(() => {
  fetchUMKM()

  nextTick(() => {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach((el) => obs.observe(el))
  })
})
</script>