<?php
require_once __DIR__ . '/includes/bootstrap.php';
if (current_user()) redirect('dashboard.php');
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $username = trim($_POST['username'] ?? '');
    $password = (string)($_POST['password'] ?? '');
    if (($_SESSION['kunci_sampai'] ?? 0) > time()) {
        $error = 'Terlalu banyak percobaan gagal. Coba lagi dalam satu menit.';
    } elseif ($username === '' || $password === '') {
        $error = 'Username dan password wajib diisi.';
    } else {
        $st = db()->prepare('SELECT id, nama, username, password_hash, role FROM users WHERE username = ?');
        $st->execute([$username]);
        $row = $st->fetch();
        if ($row && password_verify($password, $row['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['user'] = ['id' => (int)$row['id'], 'nama' => $row['nama'], 'username' => $row['username'], 'role' => $row['role']];
            unset($_SESSION['gagal'], $_SESSION['kunci_sampai']);
            flash('sukses', 'Berhasil login. Selamat datang, ' . $row['nama'] . '!');
            redirect('dashboard.php');
        }
        $_SESSION['gagal'] = ($_SESSION['gagal'] ?? 0) + 1;
        if ($_SESSION['gagal'] >= 5) { $_SESSION['kunci_sampai'] = time() + 60; $_SESSION['gagal'] = 0; }
        $error = 'Username atau password salah.';
    }
}
$info = isset($_GET['keluar']) ? 'Anda telah keluar dari aplikasi.' : '';
?><!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login · Washy Moshy</title>
<link rel="icon" href="<?= e(url('assets/images/logo.svg')) ?>">
<link rel="stylesheet" href="<?= e(url('assets/css/style.css')) ?>"></head>
<body class="auth">
<div class="auth-card">
  <img src="<?= e(url('assets/images/logo.svg')) ?>" alt="Logo Washy Moshy" width="72" height="72">
  <h1>Washy Moshy</h1><p class="muted">Silakan login untuk melanjutkan.</p>
  <?php if ($error): ?><div class="alert alert-err" role="alert"><?= e($error) ?></div><?php endif; ?>
  <?php if ($info): ?><div class="alert alert-ok"><?= e($info) ?></div><?php endif; ?>
  <?php foreach (pull_flash() as [$t, $m]): ?><div class="alert alert-err"><?= e($m) ?></div><?php endforeach; ?>
  <form method="post" autocomplete="off">
    <?= csrf_field() ?>
    <label>Username<input name="username" required maxlength="50" value="<?= e($_POST['username'] ?? '') ?>" autofocus></label>
    <label>Password
      <span class="pw"><input type="password" name="password" id="pw" required><button type="button" class="btn btn-ghost btn-sm" data-toggle-pass="pw">Tampilkan</button></span>
    </label>
    <button class="btn btn-primary btn-block">Masuk</button>
  </form>
  <a class="muted" href="<?= e(url('index.php')) ?>">← Kembali ke beranda</a>
</div>
<script src="<?= e(url('assets/js/app.js')) ?>"></script>
</body></html>
