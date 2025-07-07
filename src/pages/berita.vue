<template>
  <section class="umkm-section">
    <h2>Seputar Rumah BUMN</h2>
  </section>

  <main class="tentang-main">
    <img :src="fotoUtama" alt="Rumah BUMN di Labuan Bajo" class="tentang-image" />
    <p class="caption">Keterangan Foto: Rumah BUMN di Labuan Bajo</p>
    <p class="tentang-text">
      Saat ini, jumlah pelaku UKM di Indonesia telah mencapai 57 juta, dimana sebagian besar merupakan para pelaku usaha mikro. Hal ini menunjukkan potensi UKM sebagai salah satu penggerak ekonomi Indonesia untuk meningkatkan kemakmuran negeri.
      <br /><br />
      BUMN sebagai agent of development telah mengembangkan beberapa inisiatif untuk meningkatkan kualitas UKM, antara lain Bank Mandiri dengan program Wirausaha Muda Mandiri, Bank BNI dengan Kampoeng BNI Nusantara, Bank BRI dengan program Teras BRI, dan Telkom Indonesia dengan 2 juta UKM terdaftar melalui program Kampung UKM Digital.
      <br /><br />
      Latar belakang didirikannya Rumah BUMN: pertumbuhan pasar global telah menggeser paradigma bisnis nasional, dimana UKM memegang peranan penting dalam memakmurkan ekonomi negara melalui penciptaan lapangan kerja, kesejahteraan masyarakat, serta inovasi.
      <br /><br />
      Sebagai upaya pemberdayaan ekonomi kerakyatan, khususnya bagi para pelaku usaha mikro kecil dan menengah, Kementerian BUMN bersama perusahaan milik negara membangun Rumah BUMN sebagai rumah bersama untuk berkumpul, belajar, dan membina UKM menjadi UKM Indonesia yang berkualitas.
    </p>
  </main>

  <section class="program-info-section">
    <div class="program-info-container">
      <h2>
        Informasi Pembinaan <strong>Rumah BUMN Riau</strong>
      </h2>
      <div class="program-stats">
        <div class="stat-item">
          <div class="stat-number">1,027</div>
          <div class="stat-label">Peserta Kegiatan</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">186</div>
          <div class="stat-label">Agenda Kegiatan</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">661,057</div>
          <div class="stat-label">Go Modern</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">112,776</div>
          <div class="stat-label">Go Digital</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">30,111</div>
          <div class="stat-label">Go Online</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const fotoUtama = new URL('@/assets/galeri/foto3.jpg', import.meta.url).href
</script>

<style scoped src="../assets/css/berita.css"></style>
