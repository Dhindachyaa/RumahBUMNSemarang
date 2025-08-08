<template>
  <div class="umkm-detail-page">
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-link">Beranda</router-link>&gt;
        <span class="breadcrumb-separator">/</span>
        <router-link to="/umkm" class="breadcrumb-link">UMKM</router-link>&gt;
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ umkm.nama || '...' }}</span>
      </nav>

    <section v-if="umkm.nama" class="umkm-detail">
      <div class="detail-container fade-in" :class="{ show: showContent }">
        <div class="detail-left">
          <img
            v-if="umkm.image_path"
            :src="umkm.image_path"
            :alt="umkm.nama"
            class="detail-img"
          />
        </div>
        <div class="detail-right">
          <div class="field" v-if="umkm.nama">
            <label>Nama Usaha</label>
            <p>{{ umkm.nama }}</p>
          </div>
          <div class="field" v-if="umkm.pemilik">
            <label>Nama Pemilik</label>
            <p>{{ umkm.pemilik }}</p>
          </div>
          <div class="field" v-if="umkm.kategori">
            <label>Kategori</label>
            <p>{{ umkm.kategori }}</p>
          </div>
          <div class="field" v-if="umkm.deskripsi">
            <label>Deskripsi</label>
            <p class="justify-text">{{ umkm.deskripsi }}</p>
          </div>
          <div class="field" v-if="umkm.varian">
            <label>Varian</label>
            <ul class="variant-list">
              <li
                v-for="(item, index) in umkm.varian.split(',')"
                :key="index"
              >
                {{ item.trim() }}
              </li>
            </ul>
          </div>
          <div class="field">
            <label>Instagram</label>
            <p>
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
          </div>

          <a class="whatsapp-button" :href="whatsappLink" target="_blank">
            Klik untuk Order
          </a>
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

const whatsappNumber = '085190084481'
const whatsappLink = `https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo,%20saya%20tertarik%20dengan%20produk%20UMKM`

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/umkm/${route.params.id}`)
    if (!res.ok) throw new Error('Data tidak ditemukan')
    const data = await res.json()
    umkm.value = {
      ...data,
      image_path: data.image_path
        ? `http://localhost:3000/images/${data.image_path}`
        : ''
    }
    setTimeout(() => (showContent.value = true), 100)
  } catch (e) {
    console.error('Gagal mengambil detail UMKM:', e)
  }
})
</script>

<style scoped src="../assets/css/umkm-detail.css"></style>



