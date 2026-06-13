// 1. Konfigurasi Database Google Sheets API Baru
// Menggunakan SPREADSHEET_ID baru milikmu dan menembak langsung tab 'Database_App'
const SPREADSHEET_ID = '1YMxR6-SlP-TT0B3y6NScT4L0YH0GXZEId_PY0Jgp8fQ';
const SHEET_NAME = 'Database_App'; 
const GOOGLE_SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

let localProjectsData = [];

// DOM Elemen
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.cert-btn');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navOverlay = document.getElementById('nav-overlay');
const closeMenuBtn = document.getElementById('close-menu');
const navbar = document.getElementById('navbar');

// 2. Fungsi Mengambil Data dari Google Sheets (Asynchronous Fetch)
async function fetchProjectsData() {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);
    if (!response.ok) throw new Error('Gagal mengakses URL spreadsheet');
    
    const rawText = await response.text();
    const jsonString = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/)[1];
    const data = JSON.parse(jsonString);
    
    const rows = data.table.rows;
    
    // Mapping baris data disesuaikan dengan urutan kolom baru di tab Database_App
    localProjectsData = rows.map(row => {
      return {
        id: row.c[0] ? row.c[0].v : '',
        timestamp: row.c[1] ? row.c[1].v : '',
        judul: row.c[2] ? row.c[2].v : 'Tanpa Judul',
        kategori: row.c[3] ? row.c[3].v : 'Umum',
        link_dokumentasi: row.c[4] ? row.c[4].v : '#', // Kolom E
        deskripsi: row.c[5] ? row.c[5].v : 'Tidak ada deskripsi.', // Kolom F
        link_gambar: row.c[6] ? row.c[6].v : '' // Kolom G
      };
    });

    renderProjects(localProjectsData);

  } catch (error) {
    console.error('Error fetching data:', error);
    projectsGrid.innerHTML = `
      <div class="loading-status" style="color: #B22222; grid-column: 1/-1; text-align: center;">
        Gagal memuat API Google Sheets<br>silahkan refresh browser anda.
      </div>
    `;
  }
}


// 3. Logika Penentu Class Warna Badge Berdasarkan Kategori
function getBadgeClass(kategori) {
  const kat = kategori.toLowerCase().trim();
  if (kat === 'ai') return 'badge-ai';
  if (kat === 'cisco') return 'badge-cisco';
  if (kat === 'linux') return 'badge-linux';
  if (kat === 'mikrotik') return 'badge-mikrotik';
  if (kat === 'windows server') return 'badge-windows';
  if (kat === 'websiter') return 'badge-website';
  return 'badge-default';
}

// 4. Fungsi Menampilkan Kartu Proyek ke Layar
function renderProjects(projects) {
  projectsGrid.innerHTML = '';

  if (projects.length === 0) {
    projectsGrid.innerHTML = `
      <div class="loading-status" style="grid-column: 1/-1; text-align: center;">Tidak ada proyek dalam kategori ini.</div>
    `;
    return;
  }

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Solusi Gambar Retak: Jika kosong, gunakan gambar placeholder teknologi
    const imgUrl = project.link_gambar ? project.link_gambar : 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600';
    
    const badgeClass = getBadgeClass(project.kategori);
    
    card.innerHTML = `
      <div class="project-img-wrap">
        <img src="${imgUrl}" alt="Preview ${project.judul}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600';">
      </div>
      <div class="project-info">
        <div>
          <span class="project-badge ${badgeClass}">${project.kategori}</span>
          <h3 class="project-title">${project.judul}</h3>
          <p class="project-desc">${project.deskripsi}</p>
        </div>
        <a href="${project.link_dokumentasi}" target="_blank" rel="noopener noreferrer" class="project-link">
          Lihat Dokumentasi
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
      </div>
    `;
    
    projectsGrid.appendChild(card);
  });
}

// 5. Logika Penyaringan (Filter) Kategori Proyek
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active-filter'));
    button.classList.add('active-filter');

    const selectedCategory = button.getAttribute('data-category');

    if (selectedCategory === 'all') {
      renderProjects(localProjectsData);
    } else {
      const filtered = localProjectsData.filter(p => p.kategori.toLowerCase().trim() === selectedCategory.toLowerCase().trim());
      renderProjects(filtered);
    }
  });
});

// 6. Logika Menu Navigasi HP (Open/Close Overlay)
if (mobileMenuBtn && navOverlay && closeMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navOverlay.classList.add('open');
  });

  closeMenuBtn.addEventListener('click', () => {
    navOverlay.classList.remove('open');
  });

  const overlayLinks = document.querySelectorAll('.overlay-links a');
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('open');
    });
  });
}

// ==========================================
// 7. LOGIKA SMART HIDDEN NAVBAR (diubah sesuai kode dari script.js sebelumnya)
// ==========================================
let lastScrollTop = 0;

if (navbar) {
  window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    
    // Batas toleransi 100px sebelum navbar bisa sembunyi
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, false);
}

document.addEventListener('DOMContentLoaded', fetchProjectsData);