import { createRouter, createWebHistory } from 'vue-router'

// 👉 Halaman publik
import Beranda from '@/pages/beranda.vue'
import Umkm from '@/pages/umkm.vue'
import UmkmDetail from '@/pages/umkm-detail.vue'
import Galeri from '@/pages/galeri.vue'
import Berita from '@/pages/berita.vue'
import BeritaDetail from '@/pages/berita-detail.vue'
import Hubungi from '@/pages/hubungi.vue'


// 👉 Halaman admin
import AdminLogin from '@/pages/admin/admin-login.vue'
import AdminDashboard from '@/pages/admin/admin-dashboard.vue'
import AdminUmkm from '@/pages/admin/admin-umkm.vue'
import AdminGaleri from '@/pages/admin/admin-galeri.vue' // sudah aktif untuk kelola galeri
// import AdminBerita from '@/pages/admin/admin-berita.vue' // nanti aktifkan jika sudah ada

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
    path: '/berita',
    name: 'Berita',
    component: Berita
  },
  { path: '/berita/:id',
    name: 'BeritaDetail',
    component: BeritaDetail,
    props: true // Agar parameter :id bisa langsung diakses lewat props
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

// ✅ Navigation Guard: proteksi halaman admin
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin === 'true') {
      next()
    } else {
      next('/admin/login')
    }
  } else {
    next()
  }
})

export default router
