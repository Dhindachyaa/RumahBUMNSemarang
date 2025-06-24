<template>
  <section class="umkm-section">
    <h2>DOKUMENTASI</h2>
  </section>

  <div class="gallery">
    <div
      v-for="(item, index) in galleryItems"
      :key="index"
      class="gallery-item"
      @click="openModal(item)"
      :style="{ '--animation-delay': `${index * 0.1}s` }"
    >
      <img :src="item.src" :alt="item.alt" class="gallery-img" />
      <div class="caption">
        <strong>{{ item.title }}</strong><br />
        {{ item.caption }}
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal" @click.self="closeModal">
    <span class="close" @click="closeModal">&times;</span>
    <div class="modal-content-wrapper">
      <img class="modal-content" :src="modalImage" />
      <div class="modal-caption">{{ modalCaption }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Modal state
const showModal = ref(false)
const modalImage = ref('')
const modalCaption = ref('')

// Gallery items
const galleryItems = [
  {
    src: new URL('@/assets/galeri/foto1.jpg', import.meta.url).href,
    alt: 'Gallery Image 1',
    title: 'RKB Kab. Nunukan',
    caption:
      'Des 2024 Kegiatan gerakan Nasional Cerdas Keuangan bersama Bank BNI Nunukan yang dihadiri 21 UMKM Binaan Rumah BUMN Nunukan',
  },
  {
    src: new URL('@/assets/galeri/foto2.jpg', import.meta.url).href,
    alt: 'Gallery Image 2',
    title: 'RKB Kab. Nunukan',
    caption:
      'Des 2024 Kunjungan Bank BNI Nunukan ke Rumah BUMN Nunukan Membahas Terkait kegiatan Pelatihan untuk UMKM',
  },
  {
    src: new URL('@/assets/galeri/foto3.jpg', import.meta.url).href,
    alt: 'Foto 3',
    title: 'Foto 3',
    caption: 'Cooking Class hantaran menyambut Hari Raya Idul Fitri',
  },
  {
    src: new URL('@/assets/galeri/foto4.webp', import.meta.url).href,
    alt: 'Foto 4',
    title: 'Foto 4',
    caption:
      'Pelatihan Pengelolaan Inventory untuk Mendukung Pertumbuhan UMKM',
  },
  {
    src: new URL('@/assets/galeri/foto5.webp', import.meta.url).href,
    alt: 'Foto 5',
    title: 'Foto 5',
    caption:
      'Pendampingan Digital Marketing bersama Binaan Dinas Kehutanan Provinsi Jawa Tengah',
  },
  {
    src: new URL('@/assets/galeri/foto6.jpg', import.meta.url).href,
    alt: 'Foto 6',
    title: 'Foto 6',
    caption:
      'Pembuatan foto produk dan desain bawang goreng bu nur owner @sambalaku_smg',
  },
  {
    src: new URL('@/assets/galeri/foto7.webp', import.meta.url).href,
    alt: 'Foto 7',
    title: 'Foto 7',
    caption:
      'Program Immersion Pitch Deck Wirausaha Merdeka bersama @promotein.yuk dan @unissula_semarang @udinusofficial',
  },
  {
    src: new URL('@/assets/galeri/foto8.webp', import.meta.url).href,
    alt: 'Foto 8',
    title: 'Foto 8',
    caption:
      'Program Immersion Pitch deck Wirausaha Merdeka bersama @promotein.yuk dan @universitasaki @udinusofficial',
  },
  {
    src: new URL('@/assets/galeri/foto9.webp', import.meta.url).href,
    alt: 'Foto 9',
    title: 'Foto 9',
    caption: 'Partnership bersama Karagen Indonesia',
  },
]

// Modal open/close functions
const openModal = (item) => {
  modalImage.value = item.src
  modalCaption.value = item.caption
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped src="../assets/css/galeri.css"></style>

<!-- Caption styling (global) -->
<style>
.modal-caption {
  margin: 10px auto 20px auto;
  display: block;
  width: 100%;
  max-width: 90vw;
  color: #fff;
  padding: 12px 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0 0 8px 8px;
  box-shadow: none;
  text-shadow: none;
  word-wrap: break-word;
  word-break: break-word;
}
</style>
