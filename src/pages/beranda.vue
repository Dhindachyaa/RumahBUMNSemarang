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
    <section class="fitur-cards scroll-anim" id="hero">
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

    <!-- FITUR CARDS SECTION -->
    <section class="fitur-cards scroll-anim" id="fitur">
      <div 
        class="card" 
        v-for="(fitur, index) in fiturList" 
        :key="index"
        :style="{ '--animation-delay': `${index * 0.2}s` }"
      >
        <div class="card-icon">
          <img :src="fitur.icon" :alt="fitur.alt" />
        </div>
        <h3>{{ fitur.title }}</h3>
        <p>{{ fitur.desc }}</p>
        <a href="#" class="btn" @click.prevent="handleButtonClick(fitur.action)">
          {{ fitur.btn }}
        </a>
      </div>
    </section>

    <!-- TIM SECTION -->
    <section class="tim-section scroll-anim">
      <h2>Kreativitas di Balik Rumah BUMN</h2>
      <div class="tim-container">
        <!-- Abim - Bottom Left -->
        <div class="tim-member abim">
          <div class="member-photo">
            <img 
              :src="timList[0].foto || generateAvatar(timList[0].nama)" 
              :alt="timList[0].nama"
              @error="handleImageError"
            />
          </div>
          <div class="member-info">
            <div class="member-quote">
              {{ timList[0].quote }}
            </div>
            <h3 class="member-name">{{ timList[0].nama }}</h3>
            <p class="member-position">{{ timList[0].jabatan }}</p>
          </div>
        </div>

        <!-- Endang - Top Right -->
        <div class="tim-member endang">
          <div class="member-photo">
            <img 
              :src="timList[1].foto || generateAvatar(timList[1].nama)" 
              :alt="timList[1].nama"
              @error="handleImageError"
            />
          </div>
          <div class="member-info">
            <div class="member-quote">
              {{ timList[1].quote }}
            </div>
            <h3 class="member-name">{{ timList[1].nama }}</h3>
            <p class="member-position">{{ timList[1].jabatan }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONI SECTION -->
    <section class="testimoni-section scroll-anim">
      <div class="testimoni-header">
        <h2>Suara UMKM Binaan</h2>
        <p>Setiap UMKM memiliki cerita dan tantangan tersendiri dalam perjalanan bisnisnya. Berikut ini adalah kisah mereka yang telah bergabung dan tumbuh bersama Rumah BUMN Semarang.</p>
      </div>
      <div class="testimoni-card">
        <button class="testimoni-nav-btn left-btn" @click="prevTestimoni" :disabled="currentTestimoni === 0">
          &#10094;
        </button>
        <div class="testimoni-content">
          <p class="quote">
            <span class="quote-icon">❝</span>
            {{ testimoniList[currentTestimoni].quote }}
          </p>
          <p class="author">
            <span class="user-icon">👤</span>
            <strong>{{ testimoniList[currentTestimoni].name }}</strong> | 
            <em>{{ testimoniList[currentTestimoni].business }}</em>
          </p>
        </div>
        <button class="testimoni-nav-btn right-btn" @click="nextTestimoni" :disabled="currentTestimoni === testimoniList.length - 1">
          &#10095;
        </button>
      </div>
      <div class="testimoni-dots">
        <span 
          v-for="(_, index) in testimoniList" 
          :key="index"
          class="dot"
          :class="{ active: index === currentTestimoni }"
          @click="currentTestimoni = index"
        ></span>
      </div>
    </section>

    <!-- LOKASI SECTION -->
    <section class="lokasi-section scroll-anim">
      <h2 class="lokasi-title">Lokasi Kami</h2>
      <div class="lokasi-container">
        <div class="lokasi-info">
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Alamat</h4>
              <p>Jl. Sultan Syarif Qasim No.138, Semarang, Jawa Tengah</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Telepon</h4>
              <p>0853-6388-0228</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Email</h4>
              <p>rkbsemarang@gmail.com</p>
            </div>
          </div>
          <a href="https://maps.app.goo.gl/92ckVf8ZgBdzY5PH8" target="_blank" class="btn-maps">
            Lihat di Google Maps
          </a>
        </div>
        <div class="lokasi-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.961436420567!2d110.4180817!3d-7.0138183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b78e2b060ad%3A0xec2b3d8d498a5ece!2sRumah%20Kreatif%20Semarang%20BUMN%20BRI!5e0!3m2!1sid!2sid!4v1752221750761!5m2!1sid!2sid" 
            width="100%" 
            height="400" 
            style="border:0; border-radius: 16px;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            tabindex="-1"
            >
          </iframe>
        </div>
      </div>
    </section>

    <!-- FLOATING ACTION BUTTON -->
    <div class="floating-actions">
      <button class="fab main-fab" @click="toggleFab" :class="{ active: fabOpen }">
        <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
      <div class="fab-menu" :class="{ active: fabOpen }">
        <a href="https://wa.me/6285363880228" target="_blank" class="fab-item whatsapp">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
          </svg>
          <span class="fab-text">WhatsApp</span>
        </a>
        <a href="mailto:rkbsemarang@gmail.com" class="fab-item email">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <span class="fab-text">Email</span>
        </a>
        <button @click="scrollToTop" class="fab-item scroll-top">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
          <span class="fab-text">Top</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Import assets
import foto1 from '@/assets/beranda/foto1.jpg'
import foto2 from '@/assets/beranda/foto2.jpg'
import iconUmkm from '@/assets/beranda/icon-umkm.png'
import iconEvent from '@/assets/beranda/icon-event.png'
import iconBooking from '@/assets/beranda/icon-booking.png'
import orang1 from '@/assets/beranda/orang1.png'
import iconLinkedin from '@/assets/beranda/icon-linkedin.png'
import iconEmail from '@/assets/beranda/icon-email.jpg'
import tuguMuda from '@/assets/beranda/tugu muda.jpg'

// Reactive data
const fabOpen = ref(false)
const currentTestimoni = ref(0)

// Enhanced fitur list with actions
const fiturList = ref([
  {
    icon: iconUmkm,
    alt: 'Ikon UMKM',
    title: 'Daftar Sekarang',
    desc: 'Gabung program pembinaan UMKM Rumah BUMN Semarang dan kembangkan bisnis Anda bersama kami!',
    btn: 'Daftar Disini',
    action: 'register'
  },
  {
    icon: iconEvent,
    alt: 'Ikon Event',
    title: 'Ikuti Kami!',
    desc: 'Jangan lewatkan kegiatan seru dan inspiratif! Ikuti update lengkap melalui sosial media kami.',
    btn: 'Cek Disini',
    action: 'social'
  },
  {
    icon: iconBooking,
    alt: 'Ikon Booking',
    title: 'Booking Ruangan',
    desc: 'Butuh tempat untuk event komunitas atau meeting bisnis? Reservasi ruangan kami sekarang!',
    btn: 'Hubungi Kami',
    action: 'contact'
  }
])

// Enhanced tim list
const timList = ref([
  {
    id: 1,
    nama: 'Abim',
    jabatan: 'Fasilitator Rumah BUMN Semarang',
    foto: orang1,
    quote: 'Membangun ekosistem digital yang berkelanjutan untuk UMKM adalah misi kami. Setiap langkah kecil yang kita ambil hari ini akan menjadi fondasi kesuksesan masa depan.',
    linkedin: iconLinkedin,
    email: iconEmail
  },
  {
    id: 2,
    nama: 'Endang',
    jabatan: 'Fasilitator Rumah BUMN Semarang',
    foto: orang1,
    quote: 'Kreativitas dan inovasi adalah kunci utama dalam memberdayakan UMKM. Kami hadir sebagai partner yang siap mendampingi perjalanan transformasi digital mereka.',
    linkedin: iconLinkedin,
    email: iconEmail
  }
])

// Testimoni list
const testimoniList = ref([
  {
    name: 'Trias Wulandari',
    business: 'Onty Cake',
    quote: 'Sejak ikut program pembinaan di Rumah BUMN Semarang, usaha saya berkembang pesat. Ilmu digital marketing dan jejaring yang saya dapat sangat membantu meningkatkan penjualan.'
  },
  {
    name: 'Ahmad Fauzi',
    business: 'Kerajinan Bambu Semarang',
    quote: 'Program mentoring dan workshop yang diberikan benar-benar applicable di bisnis saya. Sekarang produk kerajinan bambu saya sudah go digital dan jangkauan pasar makin luas.'
  },
  {
    name: 'Sri Wahyuni',
    business: 'Warung Tegal Asri',
    quote: 'Dari yang tidak tahu tentang online marketing, sekarang saya bisa jualan melalui berbagai platform digital. Terima kasih Rumah BUMN Semarang!'
  }
])

// Methods
const toggleFab = () => {
  fabOpen.value = !fabOpen.value
}

const handleButtonClick = (action) => {
  switch (action) {
    case 'register':
      window.open('https://wa.me/6285363880228?text=Halo%2C%20saya%20ingin%20mendaftar%20program%20UMKM', '_blank')
      break
    case 'social':
      // Redirect to social media or news page
      window.open('https://instagram.com/rumahbumnsemarang', '_blank')
      break
    case 'contact':
      window.open('https://wa.me/6285363880228?text=Halo%2C%20saya%20ingin%20booking%20ruangan', '_blank')
      break
  }
}

const generateAvatar = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=400`
}

const handleImageError = (event) => {
  const img = event.target
  const name = img.alt
  img.src = generateAvatar(name)
}

const nextTestimoni = () => {
  if (currentTestimoni.value < testimoniList.value.length - 1) {
    currentTestimoni.value++
  }
}

const prevTestimoni = () => {
  if (currentTestimoni.value > 0) {
    currentTestimoni.value--
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Auto-rotate testimoni
let testimoniInterval

onMounted(() => {
  // Scroll animations
  const animatedSections = document.querySelectorAll('.scroll-anim')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  }, { threshold: 0.1 })

  animatedSections.forEach(section => observer.observe(section))

  // Auto-rotate testimoni every 5 seconds
  testimoniInterval = setInterval(() => {
    currentTestimoni.value = (currentTestimoni.value + 1) % testimoniList.value.length
  }, 5000)
})

onUnmounted(() => {
  if (testimoniInterval) {
    clearInterval(testimoniInterval)
  }
})
</script>

<style scoped>
@import '@/assets/css/beranda.css';

/* Background section styles */
.background-image-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  color: black;
  text-align: center;
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

.background-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
}

/* FAB Styling */
.floating-actions {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.main-fab {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
}

.fab-icon {
  width: 20px;
  height: 20px;
  min-width: 20px;
  transition: transform 0.3s ease;
}

.main-fab .fab-icon {
  width: 24px;
  height: 24px;
}

.main-fab.active .fab-icon {
  transform: rotate(45deg);
}

.fab-menu {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(-80px);
}

.fab-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: none;
  border-radius: 50px;
  color: #1a202c;
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
}

.fab-item:hover {
  transform: translateX(-10px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.fab-item.whatsapp:hover {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
}

.fab-item.email:hover {
  background: linear-gradient(135deg, #ea4335, #d93025);
  color: white;
}

.fab-item.scroll-top:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.fab-text {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>