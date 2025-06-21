<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script setup>
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'
</script>

<style scoped>
/* Optional global styles */
</style>
