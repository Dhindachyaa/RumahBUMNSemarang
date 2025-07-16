<template>
  <div :class="pageClass">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'

const route = useRoute()
const pageClass = computed(() => {
  return route.path === '/' ? 'homepage' : ''
})
</script>

<style scoped>
/* Optional global styles */
</style>
