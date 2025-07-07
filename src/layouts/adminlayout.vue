<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <h3>Admin Panel</h3>
      <router-link
        to="/admin"
        :class="{ active: $route.path === '/admin' }"
      >Dashboard</router-link>
      <router-link
        to="/admin/umkm"
        :class="{ active: $route.path.startsWith('/admin/umkm') }"
      >Kelola UMKM</router-link>
      <router-link
        to="/admin/galeri"
        :class="{ active: $route.path.startsWith('/admin/galeri') }"
      >Kelola Galeri</router-link>
      <router-link
        to="/admin/berita"
        :class="{ active: $route.path.startsWith('/admin/berita') }"
      >Kelola Berita</router-link>
      <router-link
        to="/admin/login"
        @click.native="logout"
        class="logout-link"
      >Logout</router-link>
    </aside>

    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('isAdmin');
      this.$router.push('/admin/login');
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
}

.admin-sidebar {
  width: 160px;
  background: #343a40;
  color: white;
  padding: 80px 1rem 1rem;
  display: flex;
  flex-direction: column;
}

.admin-sidebar h3 {
  margin-bottom: 1.5rem;
  color: #fff;
  font-size: 16px;
}

.admin-sidebar a {
  display: block;
  color: #ccc;
  margin: 0.4rem 0;
  text-decoration: none;
  font-weight: normal;
  transition: color 0.2s, font-weight 0.2s;
  padding: 0.3rem 0;
  font-size: 14px;
}

.admin-sidebar a:hover {
  color: white;
}

.admin-sidebar a.active {
  font-weight: bold;
  color: #fff;
  border-left: 4px solid #007bff;
  padding-left: 0.5rem;
  background: none;
}

.logout-link {
  margin-top: auto;
  color: #f44336 !important;
}

.admin-main {
  flex: 1;
  background: #f8f9fa;
  padding: 2rem;
  margin-top: 30px;
  max-width: calc(100vw - 160px);
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
