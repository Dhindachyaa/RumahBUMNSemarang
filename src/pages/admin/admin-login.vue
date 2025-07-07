<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">Admin Login</div>
      <div class="login-body">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <div class="remember-row">
          <input type="checkbox" id="remember" v-model="remember" />
          <label for="remember">Ingat saya</label>
        </div>
        <button @click="login">Login</button>
        <router-link class="back-link" to="/">Kembali ke Halaman Utama</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/admin-login.css';

export default {
  data() {
    return {
      username: '',
      password: '',
      remember: false
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        this.$router.push('/admin');
      } else {
        alert('Username atau password salah');
      }
    }
  }
};
</script>
