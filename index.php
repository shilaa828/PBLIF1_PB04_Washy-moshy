<?php
require_once __DIR__ . '/includes/bootstrap.php';
$s = get_settings();
try { $layanan = db()->query('SELECT nama, harga_per_kg, estimasi_hari FROM services WHERE aktif = 1 ORDER BY nama')->fetchAll(); }
catch (PDOException $e) { $layanan = []; }
$logo = e(url('assets/images/logo.svg'));
?><!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Washy Moshy · Pengelolaan Laundry Kiloan</title><link rel="icon" href="<?= $logo ?>">
<link rel="stylesheet" href="<?= e(url('assets/css/style.css')) ?>"></head>
<body class="landing">
<header class="l-nav"><a class="brand" href="#"><img src="<?= $logo ?>" alt="" width="40" height="40"><span>Washy Moshy</span></a>
  <a class="btn btn-primary" href="<?= e(url(current_user() ? 'dashboard.php' : 'login.php')) ?>"><?= current_user() ? 'Buka Dashboard' : 'Masuk' ?></a></header>
<section class="hero"><div>
  <h1>Bersihnya Pasti,<br>Pelayanannya Cepat</h1>
  <p>Aplikasi pengelolaan laundry kiloan untuk mencatat pelanggan, menghitung biaya otomatis, memantau status cucian, dan melihat rekap pendapatan.</p>
  <a class="btn btn-primary btn-lg" href="<?= e(url(current_user() ? 'dashboard.php' : 'login.php')) ?>">Masuk ke Aplikasi</a></div>
  <img src="<?= $logo ?>" alt="Ilustrasi mesin cuci" width="260" height="260"></section>
<section class="l-sec"><h2>Keunggulan</h2><div class="cards">
  <div class="card"><h3>🧾 Pencatatan rapi</h3><p>Data pelanggan dan order tersimpan di database, mudah dicari.</p></div>
  <div class="card"><h3>⚖️ Biaya otomatis</h3><p>Total dihitung dari berat × harga layanan, bebas salah hitung.</p></div>
  <div class="card"><h3>📍 Status jelas</h3><p>Diterima, Dicuci, Selesai, hingga Diambil terpantau setiap saat.</p></div>
  <div class="card"><h3>📊 Rekap pendapatan</h3><p>Laporan order dan pembayaran per periode untuk pemilik.</p></div></div></section>
<section class="l-sec"><h2>Jenis Layanan</h2>
<?php if ($layanan): ?><div class="cards"><?php foreach ($layanan as $l): ?>
  <div class="card"><h3><?= e($l['nama']) ?></h3><p class="price"><?= e(rupiah($l['harga_per_kg'])) ?> / kg</p><p class="muted">Estimasi <?= (int)$l['estimasi_hari'] ?> hari</p></div>
<?php endforeach; ?></div><?php else: ?><p class="muted center">Daftar layanan belum tersedia.</p><?php endif; ?></section>
<footer class="l-foot"><strong><?= e($s['nama_usaha']) ?></strong><span><?= e($s['alamat']) ?> · <?= e($s['telepon']) ?></span></footer>
</body></html>
