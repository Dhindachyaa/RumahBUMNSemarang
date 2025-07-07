<template>
  <div class="umkm-detail-page">
    <div class="breadcrumb">
      <router-link to="/">Beranda</router-link> &gt;
      <router-link to="/umkm">UMKM</router-link> &gt;
      <span>{{ umkm.nama || '...' }}</span>
    </div>

    <section v-if="umkm.nama" class="umkm-detail">
      <div class="detail-container fade-in" :class="{ show: showContent }">
        <div class="detail-left">
          <img :src="`http://localhost:3000/${umkm.image_path}`" :alt="umkm.nama" />
        </div>
        <div class="detail-right">
          <p><strong>Nama Usaha:</strong> {{ umkm.nama }}</p>
          <p><strong>Nama Pemilik:</strong> {{ umkm.pemilik }}</p>
          <p><strong>Kategori:</strong> {{ umkm.kategori }}</p>
          <p><strong>Deskripsi:</strong> {{ umkm.deskripsi }}</p>
          <p><strong>Varian:</strong> {{ umkm.varian }}</p>
          <p>
            <strong>Instagram:</strong>
            <a
              v-if="umkm.instagram"
              :href="`https://instagram.com/${umkm.instagram}`"
              target="_blank"
              class="instagram-link"
            >
              @{{ umkm.instagram }}
            </a>
            <span v-else>-</span>
          </p>
          <a class="whatsapp-button" :href="whatsappLink" target="_blank">Klik untuk Order</a>
        </div>
      </div>
    </section>

    <section v-else>
      <p style="text-align:center; padding:3rem 0;">Memuat data UMKM...</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const umkm = ref({})
const showContent = ref(false)

const whatsappNumber = '085876614915'
const whatsappLink = `https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo,%20saya%20tertarik%20dengan%20produk%20UMKM`

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/umkm/${route.params.id}`)
    if (!res.ok) throw new Error('Data tidak ditemukan')
    umkm.value = await res.json()
    setTimeout(() => (showContent.value = true), 100)
  } catch (e) {
    console.error('Gagal mengambil detail UMKM:', e)
  }
})
</script>

<style scoped src="../assets/css/umkm-detail.css"></style>
