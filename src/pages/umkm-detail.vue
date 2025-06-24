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
        <!-- gambar yang berasal dari path backend -->
        <img :src="`http://localhost:3000/${umkm.image_path}`" :alt="umkm.nama" />
      </div>
      <div class="detail-right">
        <p><strong>Nama Usaha:</strong> {{ umkm.nama }}</p>
        <p><strong>Nama Pemilik:</strong> {{ umkm.pemilik }}</p>
        <p><strong>Kategori:</strong> {{ umkm.kategori }}</p>
        <p><strong>Telepon:</strong> {{ umkm.telepon }}</p>
        <p><strong>Instagram:</strong> {{ umkm.instagram }}</p>
        <p><strong>Facebook:</strong> {{ umkm.facebook }}</p>
      </div>
    </div>
  </section>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const umkm = ref({})
const showContent = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/umkm/${route.params.id}`)
    umkm.value = await res.json()
    setTimeout(() => (showContent.value = true), 100)
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped src="../assets/css/umkm-detail.css"></style>
