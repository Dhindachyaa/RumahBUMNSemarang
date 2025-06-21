<template>
  <div>
    <!-- HERO -->
    <section class="hero scroll-anim" id="beranda">
      <div class="hero-container">
        <div class="hero-left">
          <img src="/rumahbumn.png" alt="Logo Rumah BUMN" class="hero-logo" />
          <p>
            Rumah BUMN Semarang adalah pusat pelatihan dan pendampingan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di wilayah Semarang...
          </p>
        </div>
        <div class="hero-right">
          <div class="image-scroll">
            <img :src="foto1" alt="Foto 1" />
            <img :src="foto2" alt="Foto 2" />
            <img :src="foto1" alt="Foto 3" />
            <img :src="foto2" alt="Foto 4" />
          </div>
        </div>
      </div>
    </section>

    <!-- FITUR -->
    <section class="fitur-cards scroll-anim" id="fitur">
      <div class="card" v-for="(fitur, index) in fiturList" :key="index">
        <div class="card-icon">
          <img :src="fitur.icon" :alt="fitur.alt" />
        </div>
        <h3>{{ fitur.title }}</h3>
        <p>{{ fitur.desc }}</p>
        <a href="#" class="btn">{{ fitur.btn }}</a>
      </div>
    </section>

    <!-- TESTIMONI -->
    <section class="testimoni-section scroll-anim">
      <div class="testimoni-header">
        <h2>Testimoni</h2>
        <a href="#" class="testimoni-btn">Tulis Disini!</a>
      </div>
      <div class="testimoni-card">
        <button class="testimoni-nav-btn left-btn">&#10094;</button>
        <div class="testimoni-content">
          <p class="quote">
            <span class="quote-icon">❝</span>
            Rumah BUMN ruang bagi UMKM untuk tumbuh dan berkembang...
          </p>
          <p class="author">
            <span class="user-icon">👤</span>
            <strong>Trias</strong> | <em>Onty Cake</em>
          </p>
        </div>
        <button class="testimoni-nav-btn right-btn">&#10095;</button>
      </div>
    </section>

    <!-- TIM -->
    <section class="tim-section scroll-anim">
      <h2>Awesome people behind us.</h2>
      <p>Di balik kesuksesan Rumah BUMN Pekalongan, terdapat tim...</p>
      <div class="tim-container">
        <div class="tim-card" v-for="(tim, i) in timList" :key="i">
          <img :src="tim.foto" :alt="tim.nama" />
          <h3>{{ tim.nama }}</h3>
          <p>{{ tim.jabatan }}</p>
          <div class="socials">
            <a href="#"><img :src="tim.linkedin" alt="LinkedIn" /></a>
            <a href="#"><img :src="tim.email" alt="Email" /></a>
          </div>
        </div>
      </div>
    </section>

    <!-- LOKASI -->
    <section class="lokasi-section scroll-anim">
      <h2 class="lokasi-title">Lokasi Kami</h2>
      <div class="lokasi-container">
        <div class="lokasi-info">
          <p><strong>Alamat:</strong><br />Jl. Sultan Syarif Qasim No.138...</p>
          <p><strong>Telepon:</strong><br />0853-6388-0228</p>
          <p><strong>Email:</strong><br />rkbpekanbaru@gmail.com</p>
          <a href="https://maps.app.goo.gl/92ckVf8ZgBdzY5PH8" target="_blank" class="btn-maps">Lihat di Google Maps</a>
        </div>
        <div class="lokasi-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="100%" height="300" style="border: 0"
            allowfullscreen loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Import dari src/assets/beranda
import foto1 from '@/assets/beranda/foto1.jpg'
import foto2 from '@/assets/beranda/foto2.jpg'
import iconUmkm from '@/assets/beranda/icon-umkm.jpg'
import iconEvent from '@/assets/beranda/icon-event.png'
import iconBooking from '@/assets/beranda/icon-booking.png'
import orang1 from '@/assets/beranda/orang1.png'
import iconLinkedin from '@/assets/beranda/icon-linkedin.png'
import iconEmail from '@/assets/beranda/icon-email.jpg'

const fiturList = [
  {
    icon: iconUmkm,
    alt: 'Ikon UMKM',
    title: 'Ingin menjadi UMKM Binaan Rumah BUMN Pekalongan?',
    desc: 'Bimbingan intensif bagi UMKM untuk pengembangan usaha dan peningkatan kualitas produk.',
    btn: 'Daftar Disini'
  },
  {
    icon: iconEvent,
    alt: 'Ikon Event',
    title: 'Ingin Ikut Event Yang Diselenggarakan Rumah BUMN Pekalongan?',
    desc: 'Kesempatan mengikuti pelatihan dan workshop bisnis eksklusif dari Rumah BUMN.',
    btn: 'Daftar Disini'
  },
  {
    icon: iconBooking,
    alt: 'Ikon Booking',
    title: 'Ingin Booking Tempat Untuk Aktivitas Produktif Anda?',
    desc: 'Manfaatkan fasilitas ruang publik yang nyaman untuk mendukung kreativitas dan pekerjaan Anda.',
    btn: 'Booking Disini'
  }
]

const timList = [
  {
    foto: orang1,
    nama: 'M. Riza Prawira',
    jabatan: 'CEO Rumah BUMN Riau',
    linkedin: iconLinkedin,
    email: iconEmail
  },
  {
    foto: orang1,
    nama: 'Irawan Setiyono',
    jabatan: 'CFO Rumah BUMN Riau',
    linkedin: iconLinkedin,
    email: iconEmail
  }
]

onMounted(() => {
  const animatedSections = document.querySelectorAll('.scroll-anim')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  }, { threshold: 0.1 })

  animatedSections.forEach(section => observer.observe(section))
})
</script>

<style scoped>
@import '@/assets/css/beranda.css';
</style>
