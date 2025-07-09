import { createRouter, createWebHistory } from 'vue-router'

// 👉 Halaman publik
import Beranda from '@/pages/beranda.vue'
import Umkm from '@/pages/umkm.vue'
import UmkmDetail from '@/pages/umkm-detail.vue'
import Galeri from '@/pages/galeri.vue'
import Berita from '@/pages/berita.vue'
 import Hubungi from '@/pages/hubungi.vue'

// 👉 Halaman admin
import AdminLogin from '@/pages/admin/admin-login.vue'
import AdminDashboard from '@/pages/admin/admin-dashboard.vue'
import AdminUmkm from '@/pages/admin/admin-umkm.vue'
import AdminGaleri from '@/pages/admin/admin-galeri.vue'
// import AdminBerita from '@/pages/admin/admin-berita.vue' // Aktifkan jika sudah siap

const routes = [
  // Public
  { path: '/', name: 'Beranda', component: Beranda },
  { path: '/umkm', name: 'Umkm', component: Umkm },
  { path: '/umkm/:id', name: 'UmkmDetail', component: UmkmDetail, props: true },
  { path: '/galeri', name: 'Galeri', component: Galeri },
  { path: '/berita', name: 'Berita', component: Berita },
  { path: '/hubungi', name: 'Hubungi', component: Hubungi },

  // Admin
  { path: '/admin/login',     name: 'AdminLogin',     component: AdminLogin },
  { path: '/admin',           name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/admin/umkm',      name: 'AdminUmkm',      component: AdminUmkm,      meta: { requiresAuth: true } },
  { path: '/admin/galeri',    name: 'AdminGaleri',    component: AdminGaleri,    meta: { requiresAuth: true } },
  // { path: '/admin/berita', name: 'AdminBerita', component: AdminBerita, meta: { requiresAuth: true } },

  // Catch‑all
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Proteksi halaman admin
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
