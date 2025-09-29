<template>
  <div class="news-page">
    <header class="gallery-header">
      <div class="container">
        <h1 class="animate-fade-in">GALERI</h1>
      </div>
    </header>

    <section class="gallery-content">
      <!-- Data galeri -->
      <div class="right-gallery full-width no-left-text" v-if="galleryItems.length">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="gallery-item animate-on-scroll"
          @click="openModal(item)"
          :style="{ '--animation-delay': `${index * 0.1}s` }"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="gallery-img"
            style="height: 100%; width: 100%; object-fit: cover"
            @error="onImageError($event)"
          />
          <div class="caption">
            <strong>{{ item.title }}</strong>
            <div class="caption-desc">{{ item.caption }}</div>
          </div>
        </div>
      </div>

      <!-- Jika kosong -->
      <div v-else class="no-data-msg">Galeri kosong.</div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
        <button
          v-for="page in totalPages"
          :key="`page-${page}`"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>

      <!-- Modal tampilan gambar -->
      <div v-if="showModal" class="galeri-modal" @click.self="closeModal">
        <div class="galeri-modal-content-wrapper">
          <img class="galeri-modal-content" :src="modalImage" />
          <div class="galeri-modal-caption">{{ modalCaption }}</div>
        </div>
        <span class="galeri-close" @click="closeModal">&times;</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { supabase } from '../supabase.js' // pastikan path sesuai

const galleryItems = ref([])
const showModal = ref(false)
const modalImage = ref('')
const modalCaption = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 20

const SUPABASE_GALERI_URL = 'https://hzpaqqpcjxoseaaiivaj.supabase.co/storage/v1/object/public/galeri/'

// helper untuk menangani URL gambar
const getImageUrl = (path) => {
  if (!path) return SUPABASE_GALERI_URL + 'rumah-bumn.png' // default
  if (path.startsWith('http')) return path // full URL dari admin
  return SUPABASE_GALERI_URL + path // path relatif
}

const fetchGallery = async () => {
  try {
    const from = (currentPage.value - 1) * itemsPerPage
    const to = from + itemsPerPage - 1

    const { data, error, count } = await supabase
      .from('galeri')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .range(from, to)

    if (error) throw error

    totalPages.value = Math.ceil(count / itemsPerPage) || 1

    galleryItems.value = data.map(item => ({
      src: getImageUrl(item.gambar),
      alt: item.judul || 'Gambar Galeri',
      title: item.judul || 'Tanpa Judul',
      caption: item.deskripsi || ''
    }))

    await nextTick()
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el))
  } catch (err) {
    console.error('Gagal mengambil galeri:', err)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(currentPage, fetchGallery)

const openModal = (item) => {
  modalImage.value = item.src
  modalCaption.value = `${item.title} - ${item.caption}`
  showModal.value = true
}

const closeModal = () => (showModal.value = false)

const onImageError = (e) => {
  e.target.src = SUPABASE_GALERI_URL + 'rumah-bumn.png'
}

onMounted(fetchGallery)
</script>

<style src="../assets/css/galeri.css"></style>
