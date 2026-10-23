# Washy Moshy – Aplikasi Pengelolaan Laundry Kiloan (PBLIF1-PB04)

PHP native + MySQL (PDO) + HTML/CSS/JS vanilla. Tanpa framework dan tanpa library eksternal.

## Persyaratan
Laragon atau XAMPP (PHP 8.0+, MySQL/MariaDB 10.4+), browser modern, Visual Studio Code.

## Instalasi
1. **Letakkan folder** `washy-moshy` di `C:\laragon\www\` (Laragon) atau `C:\xampp\htdocs\` (XAMPP).
2. **Jalankan** Apache/Nginx dan MySQL (Laragon: *Start All*; XAMPP: Start Apache & MySQL).
3. **Impor database** lewat phpMyAdmin (`http://localhost/phpmyadmin`) tab *Import*:
   - pertama `database/schema.sql` (membuat database `washy_moshy` + tabel),
   - opsional `database/seed_demo.sql` (data contoh; harga/estimasi hanya contoh dan bisa diubah).
4. **Cek koneksi** di `config/config.php` (default: host `127.0.0.1`, user `root`, password kosong).
5. **Buat akun** (tidak ada registrasi publik dan tidak ada password di source code). Buka terminal
   (Laragon: *Terminal*; XAMPP: Shell) di folder proyek:
   ```
   php database/buat_akun.php petugas1 petugas "Nama Petugas"
   php database/buat_akun.php pemilik1 pemilik "Nama Pemilik"
   ```
   Masukkan password (min. 8 karakter) saat diminta. Ganti kapan saja di menu **Pengaturan**.
6. **Buka**: `http://localhost/washy-moshy/` (Laragon: juga `http://washy-moshy.test/`).

Menghapus data demo: jalankan di phpMyAdmin `DELETE FROM payments; DELETE FROM orders; DELETE FROM customers; DELETE FROM services;`

## Hak akses
| Fitur | Petugas | Pemilik |
|---|---|---|
| Dashboard, Laporan, ganti password | ✔ | ✔ |
| Pelanggan, Layanan, Transaksi, Pembayaran, Nota | ✔ | ✘ (403) |
| Ubah informasi usaha | ✘ | ✔ |

## Aturan penting (asumsi)
- Total = berat × harga/kg **saat order dibuat** (snapshot), dihitung di server.
- Status hanya maju satu langkah: Diterima → Dicuci → Selesai → Diambil (Diambil mencatat tanggal).
- Order hanya bisa diubah/dihapus saat **Diterima** dan **belum ada pembayaran**.
- Pelanggan/layanan yang dipakai transaksi tidak bisa dihapus (foreign key); nonaktifkan layanan.
- Status pembayaran (Belum Bayar/Sebagian/Lunas) terpisah dari status laundry dan dihitung dari tabel `payments`.
- Laporan: *pendapatan* = pembayaran yang tanggal bayarnya dalam periode; *nilai order* = total order dengan tanggal masuk dalam periode.
- Setelah 5 kali login gagal, login dikunci 1 menit (per sesi browser).

## Urutan pengujian manual
1. Login salah → pesan gagal; login benar → dashboard. Buka `/dashboard.php` setelah logout → diarahkan ke login.
2. Login Pemilik, buka `/pelanggan/index.php` → 403; Dashboard & Laporan terbuka.
3. Pelanggan: tambah, kosongkan field (ditolak), ubah, cari, hapus (konfirmasi), hapus pelanggan yang punya order (ditolak).
4. Layanan: tambah, harga negatif/estimasi 0 (ditolak), nonaktifkan → tidak muncul di form order.
5. Order: buat dengan berat 2,5 → cek total; berat 0/-1 (ditolak); ubah harga layanan → total order lama tetap.
6. Status: naikkan sampai Diambil; cek tanggal diambil terisi.
7. Pembayaran: bayar sebagian → *Sebagian*; lebih dari sisa (ditolak); lunasi → *Lunas*.
8. Cari/filter order: kode, nama, status, rentang tanggal, kata tak ada → "Data tidak ditemukan".
9. Laporan: ubah periode, cocokkan angka dengan daftar transaksi.
10. CSRF: hapus input `csrf` lewat DevTools lalu kirim form → ditolak (419).

## Kendala umum
- *CSS/gambar tidak muncul*: isi `BASE_URL_MANUAL` di `config/config.php` (mis. `/washy-moshy`).
- *Koneksi database gagal*: MySQL belum jalan / kredensial salah / schema belum diimpor.
- *`php` tidak dikenali*: gunakan Terminal bawaan Laragon, atau tambahkan folder php XAMPP ke PATH.

## Status
Selesai (ditulis): semua fitur pada daftar kebutuhan. **Belum diverifikasi dengan eksekusi**: kode ini ditulis tanpa PHP/MySQL di lingkungan pembuatnya, sehingga belum pernah dijalankan. Lakukan checklist di atas dan laporkan galat bila ada.
Batasan: tanpa pagination (maks. 200 order di daftar), tanpa audit log, tanpa manajemen pengguna lewat web (akun dibuat via terminal).
