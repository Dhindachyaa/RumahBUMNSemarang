<template>
  <div>
    <!-- NEW BACKGROUND IMAGE SECTION -->
<section class="background-image-section" :style="{ backgroundImage: `url(${tuguMuda})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
  <div class="overlay">
<div class="logo-sequence">
<img src="/logobumnsemarang.png" alt="Logo BUMN Semarang" class="background-logo-seq" />
</div>
    <p class="background-text">
      Merupakan wadah bagi langkah kolaborasi BUMN dalam membentuk digital ekonomi ekosistem melalui pembinaan bagi UKM untuk meningkatkan kapasitas dan kapabilitas UKM itu sendiri.
    </p>
  </div>
</section>

    <!-- HERO -->
<section class="hero scroll-anim" id="beranda">
  <div class="hero-container">
    <div class="hero-left hero-heading" style="color:#0E3B4F; font-family: 'Inter', sans-serif; font-weight: 900; font-size: 96px;">
      <h1>
        <span class="bold-line" style="font-family: 'Inter', sans-serif; font-weight: 900; font-size: 96px;">RUMAH</span><br />
        <span class="bold-line" style="font-family: 'Inter', sans-serif; font-weight: 900; font-size: 96px;">BUMN</span><br />
        <span class="italic-line" style="font-family: 'Bona Nova', serif; font-size: 96px; font-style: italic;">Semarang</span>
      </h1>
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

// Import tugu muda background image
import tuguMuda from '@/assets/beranda/tugu muda.jpg'
import logobri from '/logobri.png'

const fiturList = [
  {
    icon: iconUmkm,
    alt: 'Ikon UMKM',
    title: 'Daftar Sekarang',
    desc: 'Gabung program pembinaan UMKM Rumah BUMN Semarang, yuk!',
    btn: 'Daftar Disini'
  },
  {
    icon: iconEvent,
    alt: 'Ikon Event',
    title: 'Ikuti Kami!',
    desc: 'Banyak kegiatan seru menanti! ikuti update lengkapnya lewat sosial media kami.',
    btn: 'Cek Disini'
  },
  {
    icon: iconBooking,
    alt: 'Ikon Booking',
    title: 'Booking Sekarang',
    desc: 'Butuh tempat buat kumpul atau event komunitas? Bisa banget booking di sini!.',
    btn: 'Hubungi Kami'
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


+// Removed heroBackgroundStyle as it's no longer needed

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

.background-image-section {
  position: relative;
  width: 100%;
  height: 100vh;
  /* Removed static background image to use dynamic binding */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  color: black;
  text-align: center;
}

.pink-shading {
  background: radial-gradient(circle at left top, rgba(255,192,203,0.4), rgba(255,255,255,0) 70%);
  padding: 2rem;
  border-radius: 50% / 100%;
  align-self: flex-start;
  margin-left: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 40%;
  max-width: 400px;
  z-index: -1;
  transform: translateX(-20%);
  margin-top: 0;
  clip-path: circle(50% at 0 0);
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 150% 150%;
  box-shadow: inset 20px 0 30px rgba(255,192,203,0.5);
  border-top-left-radius: 100% 100%;
  border-bottom-left-radius: 100% 100%;
  left: -20px;
}

.background-image-section .overlay {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0;
  border-radius: 0;
  max-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-sequence {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}

.background-logo-seq {
  height: 180px;
  width: auto;
  object-fit: contain;
}

.background-logo {
  width: 200px;
  margin-bottom: 1rem;
}

.logo-sequence-hero {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
  align-items: center;
}

.hero-logo-seq {
  height: 60px;
  object-fit: contain;
}

.background-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
}

.background-logo {
  width: 200px;
  margin-bottom: 1rem;
}

.background-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 500;
}
</style>
