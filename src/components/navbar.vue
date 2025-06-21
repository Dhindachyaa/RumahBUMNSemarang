<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-content">
      <div class="logo-group">
        <img src="/logobumn.png" alt="Logo BUMN" />
        <img src="/rumahbumn.png" alt="Logo Rumah BUMN" />
        <img src="/logobri.png" alt="Logo BRI" />
      </div>

      <button class="menu-toggle" @click="toggleMenu">☰</button>

      <ul class="nav-links" :class="{ show: menuOpen }">
        <li><a href="#" class="active">Beranda</a></li>
        <li><a href="#">UMKM</a></li>
        <li><a href="#">Galeri</a></li>
        <li><a href="#">Tentang Kami</a></li>
        <li><a href="#">Hubungi Kami</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})
</script>

<style scoped>
@import '../assets/css/navbar.css';
</style>
