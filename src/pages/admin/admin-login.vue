<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">Admin Login</div>
      <div class="login-body">
        <div class="input-group">
          <i class="fas fa-user icon-left"></i>
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <i class="fas fa-lock icon-left"></i>
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="remember-row">
          <input type="checkbox" id="remember" v-model="remember" />
          <label for="remember">Ingat saya</label>
        </div>
        <button @click="login">Login</button>
        <router-link class="back-link" to="/">← Kembali ke Halaman Utama</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase.js'
import '@/assets/css/admin-login.css'

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert('Silakan isi email dan password.')
        return
      }

      try {
        // 1️⃣ Login pakai Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password
        })
        if (error) throw error
        if (!data.user) throw new Error('Login gagal, periksa email dan password.')

        // 2️⃣ Cek apakah email ada di tabel admin_users
        const { data: adminData, error: adminError } = await supabase
          .from('admin')
          .select('email')
          .eq('email', this.email)
          .single()

        if (adminError || !adminData) {
          alert('Akses ditolak: Anda bukan admin.')
          await supabase.auth.signOut()
          return
        }

        // 3️⃣ Simpan session
        sessionStorage.setItem('isAdmin', 'true')
        sessionStorage.setItem('adminUser', JSON.stringify(data.user))
        if (this.remember) {
          localStorage.setItem('isAdmin', 'true')
          localStorage.setItem('adminUser', JSON.stringify(data.user))
        } else {
          localStorage.removeItem('isAdmin')
          localStorage.removeItem('adminUser')
        }

        // 4️⃣ Redirect ke dashboard
        this.$router.push('/admin/dashboard')

      } catch (err) {
        alert(err.message || 'Terjadi kesalahan saat login.')
      }
    }
  },
  mounted() {
    const isSession = sessionStorage.getItem('isAdmin') === 'true'
    const isRemembered = localStorage.getItem('isAdmin') === 'true'
    if (isSession || isRemembered) {
      this.$router.push('/admin/dashboard')
    }
  }
}
</script>
