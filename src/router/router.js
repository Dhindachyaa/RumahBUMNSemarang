import { createRouter, createWebHistory } from 'vue-router'

// Halaman biasa
import Beranda from '@/pages/beranda.vue'
import Umkm from '@/pages/umkm.vue'
import Galeri from '@/pages/galeri.vue'
import Tentang from '@/pages/tentang.vue'
import Hubungi from '@/pages/hubungi.vue'

// Halaman detail UMKM (dinamis)
import UmkmDetail from '@/pages/umkm-detail.vue'

const routes = [
  {
    path: '/',
    name: 'Beranda',
    component: Beranda
  },
  {
    path: '/umkm',
    name: 'Umkm',
    component: Umkm
  },
  {
    path: '/umkm/:id',
    name: 'UmkmDetail',
    component: UmkmDetail,
    props: true // Agar parameter :id bisa langsung diakses lewat props
  },
  {
    path: '/galeri',
    name: 'Galeri',
    component: Galeri
  },
  {
    path: '/tentang',
    name: 'Tentang',
    component: Tentang
  },
  {
    path: '/hubungi',
    name: 'Hubungi',
    component: Hubungi
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // Fallback: jika tidak ada route, redirect ke Beranda
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
