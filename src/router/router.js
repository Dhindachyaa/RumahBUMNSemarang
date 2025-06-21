import { createRouter, createWebHistory } from 'vue-router'
import Beranda from '@/pages/beranda.vue'
import Umkm from '@/pages/umkm.vue'
import Galeri from '@/pages/galeri.vue'
import Tentang from '@/pages/tentang.vue'
import Hubungi from '@/pages/hubungi.vue'

const routes = [
  { path: '/', name: 'Beranda', component: Beranda },
  { path: '/umkm', name: 'Umkm', component: Umkm },
  { path: '/galeri', name: 'Galeri', component: Galeri },
  { path: '/tentang', name: 'Tentang', component: Tentang },
  { path: '/hubungi', name: 'Hubungi', component: Hubungi }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
