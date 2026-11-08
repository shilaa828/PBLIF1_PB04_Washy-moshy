# Washy Moshy – Aplikasi Pengelolaan Laundry Kiloan (PBLIF1-PB04)

Aplikasi web untuk membantu usaha laundry kiloan mencatat pelanggan, layanan, order, status cucian, dan pembayaran, serta melihat rekap pendapatan.

Proyek PBL Teknik Informatika, Politeknik Negeri Batam (PBLIF1-PB04). Versi ini adalah **front-end**: HTML, CSS, dan JavaScript murni, tanpa server dan tanpa database.

## Tim
| Peran | Nama | NIM |
|---|---|---|
| Ketua | Abyaqsa Ramadan Alimin | 3312601039 |
| Anggota | Ashila Fayyaza Ghafur | 3312601038 |

Manajer proyek: Yeni Rokhayati, S.Si., M.Sc

## Fitur
| Menu | Fungsi |
|---|---|
| Dashboard | Ringkasan order dan pendapatan |
| Order Laundry | Tambah, lihat, ubah, hapus, dan cari order; tombol lanjutkan status (Diterima → Dicuci → Selesai → Diambil) |
| Pelanggan | Tambah, lihat, ubah, dan hapus pelanggan; pelanggan yang masih punya order tidak bisa dihapus |
| Layanan | Kelola jenis layanan, harga per kg, dan estimasi hari; layanan yang dipakai order tidak bisa dihapus |
| Pembayaran | Tandai order lunas atau belum lunas, dengan filter status pembayaran |
| Laporan | Total order, pendapatan, total berat, rata-rata per order, grafik pendapatan harian, rekap order, dan ekspor CSV |
| Pengaturan | Informasi usaha dan profil pengguna |

Total biaya order dihitung otomatis dari berat × harga layanan.

## Akun Demo dan Hak Akses
| Akun | Username | Password | Menu yang bisa dibuka |
|---|---|---|---|
| Owner (Pemilik) | `owner` | `owner123` | Semua menu, termasuk Laporan |
| Admin (Petugas) | `admin` | `admin123` | Semua menu kecuali Laporan |

Login juga bisa memakai `owner@washymoshy.id` atau `admin@washymoshy.id`.

> Autentikasi di sini hanya simulasi front-end, jadi akun tertulis di `script.js` (bagian `ACC`). Ini cukup untuk demo, tetapi bukan keamanan produksi.

## Cara Menjalankan
1. Unduh atau clone repository ini.
2. Buka `index.html` di browser (Chrome, Edge, atau Firefox).
   Alternatif: di Visual Studio Code, klik kanan `index.html` lalu pilih **Open with Live Server**.
3. Login dengan salah satu akun demo di atas.

Tidak perlu memasang Laragon, XAMPP, PHP, atau MySQL.

## Struktur File
```
├── index.html            # Halaman utama (landing, login, dan aplikasi)
├── script.js             # Logika aplikasi, data, login, dan hak akses
├── style.css             # Tampilan
├── logo_washy_moshy.png  # Logo
└── README.md
```

## Penyimpanan Data
Data disimpan di **localStorage browser**, bukan di server. Artinya:
- Data hanya ada di browser dan perangkat yang dipakai; browser atau komputer lain akan menampilkan data awal (demo).
- Menghapus data situs (cache/cookies) di browser juga menghapus data aplikasi.
- Untuk mengembalikan ke data awal: tekan **F12** → tab **Application** → **Local Storage** → hapus `wm_data` dan `wm_auth`, lalu muat ulang halaman.

## Teknologi
HTML5, CSS3, JavaScript (vanilla). Tidak memakai framework maupun library eksternal.
