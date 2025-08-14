<template>
  <div :class="pageClass">
    <Navbar />
    <router-view />
    <Footer v-if="!isAdminPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'

const route = useRoute()
const isAdminPage = computed(() => route.path.startsWith('/admin'))
const pageClass = computed(() => {
  return route.path === '/' ? 'homepage' : ''
})
</script>

