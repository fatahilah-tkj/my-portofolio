# 🌐 Lab Archive — Fatahilah Miftahul Rahman

Ini adalah repositori kode sumber (*source code*) untuk website **Lab Archive** saya. Website ini berfungsi sebagai laboratorium teknis digital untuk mendokumentasikan dan mengarsipkan seluruh hasil belajar, proyek lab, serta eksperimen yang saya lakukan di bidang IT Networking, System Administration, dan Kecerdasan Buatan (AI).

Website ini sudah live dan bisa diakses di: [fatahilah-lab.vercel.app](https://fatahilah-lab.vercel.app/)

---

## ✨ Apa Saja yang Menarik di Website Ini?

* **Koneksi Otomatis ke Google Sheets (Semi-Dinamis):** Website ini tidak perlu di-coding ulang setiap kali ada proyek baru. Data proyek ditarik secara *real-time* langsung dari tab `Database_App` di Google Sheets menggunakan Fetch API.
* **Filter Kategori Instan:** Pengunjung bisa menyaring proyek berdasarkan teknologi tertentu (AI, Cisco, Linux, MikroTik, Windows Server). Saat tombol diklik, JavaScript akan menyaring data secara instan tanpa perlu memuat ulang halaman (*reload*).
* **Warna Badge Dinamis:** Mengikuti gaya visual portofolio utama, setiap kartu proyek memiliki label kategori dengan warna khas tersendiri (misal: Emas untuk Cisco, Merah untuk MikroTik, Hijau untuk Linux) agar informasi lebih mudah dicerna.
* **Navbar Pintar Pejuang HP:** Navigasi atas dibuat peka terhadap gerakan *scroll*. Menu akan otomatis bergeser sembunyi ke atas saat layar digulir ke bawah (agar ruang baca di HP lebih luas) dan muncul kembali secara halus saat layar digulir ke atas.
* **Menu Tirai Responsif:** Jika dibuka lewat HP, menu navigasi akan berubah menjadi ikon hamburger yang jika diklik akan membuka menu tirai samping (*overlay menu*) yang ramping dan hemat tempat.

---

## 🛠️ Struktur Kode & Manajemen Aset

Proyek ini dibangun secara modular, bersih, dan dioptimalkan agar ringan saat diakses melalui perangkat *mobile*:

1. `index.html` — Berisi kerangka utama halaman, tombol filter kategori, kontainer grid proyek, dan teks lisensi.
2. `style.css` — Mengatur seluruh estetika visual, variabel warna (`:root`), Flexbox vertikal untuk *sticky footer*, hingga transisi animasi menu HP.
3. `app.js` — Otak dari website ini. Mengatur fungsi *asynchronous fetch* ke API Google Sheets, parsing data JSON, manipulasi DOM untuk merender kartu proyek, serta logika sembunyi-muncul navbar.

---

## ⚙️ Cara Kerja Sistem API Database

Aplikasi menggunakan URL endpoint Google Visualization API untuk mengambil data dari Spreadsheet ID milik saya:

    const SPREADSHEET_ID = '1YMxR6-SlP-TT0B3y6NScT4L0YH0GXZEId_PY0Jgp8fQ';
    const SHEET_NAME = 'Database_App';

Data dari *response text* kemudian dibersihkan menggunakan Regular Expression agar menjadi format JSON murni, lalu dipetakan ke dalam struktur kartu HTML. Jika link gambar di spreadsheet kosong atau rusak, JavaScript secara otomatis akan mengalihkan ke gambar *placeholder* teknologi cadangan agar tampilan website tidak pecah.

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Jika Anda tertarik untuk menguji atau melihat cara kerja sistem API Google Sheets ini di perangkat Anda sendiri:

1. Kloning repositori ini terlebih dahulu:
   git clone https://github.com/fatahilah-tkj/lab-archive.git

2. Masuk ke dalam folder proyeknya:
   cd lab-archive

3. Buka file `index.html` menggunakan browser atau ekstensi Live Server di aplikasi editor kode Anda (seperti VS Code atau Acode). Pastikan perangkat Anda terhubung ke internet agar Fetch API bisa menarik data dari Google Sheets.

---

## ✒️ Hak Cipta
© 2026 Fatahilah Miftahul Rahman. All rights reserved.
