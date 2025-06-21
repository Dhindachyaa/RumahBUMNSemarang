<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <div class="logo-group">
        <img src="/logobumn.png" alt="Logo BUMN" />
        <img src="/rumahbumn.png" alt="Logo Rumah BUMN" />
        <img src="/logobri.png" alt="Logo BRI" />
      </div>
      <div class="menu-toggle" @click="toggleMenu">☰</div>
      <ul class="nav-links" :class="{ show: menuOpen }">
        <li><router-link to="/" exact-active-class="active">Beranda</router-link></li>
        <li><router-link to="/umkm" exact-active-class="active">UMKM</router-link></li>
        <li><router-link to="/galeri" exact-active-class="active">Galeri</router-link></li>
        <li><router-link to="/tentang" exact-active-class="active">Tentang Kami</router-link></li>
        <li><router-link to="/hubungi" exact-active-class="active">Hubungi Kami</router-link></li>
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
