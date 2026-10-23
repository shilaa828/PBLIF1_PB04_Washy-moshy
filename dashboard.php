<?php
require_once __DIR__ . '/includes/bootstrap.php';
$u = require_role('petugas', 'pemilik');
$pdo = db();
$hari = date('Y-m-d'); $awal = date('Y-m-01');
function scalar(PDO $pdo, string $sql, array $p = []) { $st = $pdo->prepare($sql); $st->execute($p); return $st->fetchColumn(); }
$hariIni   = (int)scalar($pdo, 'SELECT COUNT(*) FROM orders WHERE tanggal_masuk = ?', [$hari]);
$diproses  = (int)scalar($pdo, "SELECT COUNT(*) FROM orders WHERE status IN ('Diterima','Dicuci')");
$selesai   = (int)scalar($pdo, "SELECT COUNT(*) FROM orders WHERE status = 'Selesai'");
$diterima  = (float)scalar($pdo, 'SELECT COALESCE(SUM(jumlah),0) FROM payments WHERE DATE(tanggal_bayar) BETWEEN ? AND ?', [$awal, $hari]);
$piutang   = (float)scalar($pdo, 'SELECT COALESCE(SUM(o.total),0) - COALESCE((SELECT SUM(jumlah) FROM payments),0) FROM orders o');
$perStatus = array_fill_keys(STATUS_ALUR, 0);
foreach ($pdo->query('SELECT status, COUNT(*) n FROM orders GROUP BY status') as $r) $perStatus[$r['status']] = (int)$r['n'];
$terbaru = $pdo->query(order_sql() . ' ORDER BY o.id DESC LIMIT 5')->fetchAll();
$judul = 'Dashboard'; $aktif = 'dashboard';
require __DIR__ . '/includes/header.php';
?>
<p class="muted">Selamat datang, <strong><?= e($u['nama']) ?></strong>. Periode pendapatan: <?= e(tgl($awal)) ?> – <?= e(tgl($hari)) ?>.</p>
<div class="stats">
  <div class="stat"><small>Order hari ini</small><b><?= $hariIni ?></b></div>
  <div class="stat"><small>Sedang diproses</small><b><?= $diproses ?></b></div>
  <div class="stat"><small>Selesai, belum diambil</small><b><?= $selesai ?></b></div>
  <div class="stat"><small>Pembayaran diterima (bulan ini)</small><b><?= e(rupiah($diterima)) ?></b></div>
  <div class="stat"><small>Total sisa tagihan (semua order)</small><b><?= e(rupiah($piutang)) ?></b></div>
</div>
<div class="actions">
<?php if ($u['role'] === 'petugas'): ?>
  <a class="btn btn-primary" href="<?= e(url('transaksi/form.php')) ?>">+ Buat Order</a>
  <a class="btn" href="<?= e(url('pelanggan/index.php')) ?>">Kelola Pelanggan</a>
  <a class="btn" href="<?= e(url('layanan/index.php')) ?>">Lihat Layanan</a>
<?php endif; ?>
  <a class="btn" href="<?= e(url('laporan/index.php')) ?>">Lihat Laporan</a>
</div>
<div class="grid2">
  <section class="panel"><h2>Ringkasan Status</h2>
    <?php foreach ($perStatus as $s => $n): ?><div class="row-between"><?= badge_status($s) ?><b><?= $n ?></b></div><?php endforeach; ?>
  </section>
  <section class="panel"><h2>Order Terbaru</h2>
    <?php if (!$terbaru): ?><p class="muted">Belum ada order.</p><?php else: ?>
    <div class="table-wrap"><table><thead><tr><th>Kode</th><th>Pelanggan</th><th>Total</th><th>Status</th></tr></thead><tbody>
    <?php foreach ($terbaru as $o): ?><tr>
      <td><?php if ($u['role'] === 'petugas'): ?><a href="<?= e(url('transaksi/detail.php?id=' . $o['id'])) ?>"><?= e($o['kode_order']) ?></a><?php else: echo e($o['kode_order']); endif; ?></td>
      <td><?= e($o['pelanggan']) ?></td><td><?= e(rupiah($o['total'])) ?></td><td><?= badge_status($o['status']) ?></td></tr>
    <?php endforeach; ?></tbody></table></div><?php endif; ?>
  </section>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>
