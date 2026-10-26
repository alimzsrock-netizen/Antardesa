# AntarDesa v0.2.9 — Laporan Penutupan QA Final

Tanggal pencatatan: 26 Oktober 2026  
Status: **QA PASSED ON DEV**  
Cakupan: penutupan dokumentasi, bukan rilis produksi.  
Sumber hasil: pemeriksaan yang dilaporkan pengguna; bukan sertifikasi independen atas lingkungan live.

## 1. Hasil QA fungsional
Seluruh butir berikut dilaporkan **LULUS**:
- Dashboard terbuka untuk pelanggan yang sah.
- Dashboard dapat diakses Mitra/Kurir terverifikasi sesuai kebijakan yang diuji.
- Pengguna tidak berwenang ditolak.
- Estimasi ongkir berfungsi.
- Shipping Quote diterbitkan dan ditampilkan.
- Kedaluwarsa quote memperbarui tampilan tanpa membuat pesanan.
- Checkout tetap tidak aktif.
- Katalog tampil.
- Riwayat pesanan tampil.

Tidak ada kegagalan atau catatan tambahan yang dilaporkan.

## 2. Hasil finalisasi
1. Dokumen QA v0.2.9 telah disimpan pengguna ke GitHub cabang `dev`.
2. Cloudflare Production branch = `main`; deployment `dev` tercatat sebagai Preview.
3. Pengguna tidak menemukan nilai kredensial rahasia pada frontend; `CHECKOUT_V4_ENABLED = false`.
4. Supabase Site URL = `https://dev.antardesa.pages.dev`. Redirect URL `dev` dan produksi sama-sama tersedia.
5. `register.html` menggunakan `window.location.origin`; `login.html` menggunakan path relatif.
6. `emailRedirectTo` menggunakan `window.location.origin` dan halaman tujuan dilaporkan tersedia.
7. Riwayat deployment berhasil sebelumnya tersedia; Preview `dev` dapat dibuka normal.

## 3. Batas keputusan
- v0.2.9 **ditutup sebagai versi QA yang lulus pada dev**.
- Ini **bukan** persetujuan rilis ke `main`, bukan pernyataan siap transaksi publik, dan bukan bukti seluruh integrasi produksi telah diuji.
- Site URL Supabase masih mengarah ke `dev`; keputusan konfigurasi produksi ditunda hingga persiapan rilis terpisah.
- Checkout harus tetap terkunci. Jangan mengaktifkan flag checkout, memanggil RPC pembuatan pesanan, membuat pesanan nyata, atau mengubah stok.
- Jangan mengubah kode, konfigurasi, database, atau deployment tanpa persetujuan eksplisit.
- Riwayat deployment tersedia, tetapi prosedur rollback belum dinyatakan telah diuji.

## 4. Daftar pekerjaan berikutnya (belum diotorisasi untuk dieksekusi)
- Menyusun spesifikasi v0.3.0 secara dokumentatif.
- Menentukan cakupan rilis publik non-transaksional jika diinginkan.
- Meninjau Site URL dan callback produksi sebelum rilis, dengan rencana perubahan dan pemulihan.
- Menyusun pemeriksaan operasional dan rollback yang terpisah.
- Melakukan persetujuan rilis eksplisit sebelum perubahan ke `main`.

## 5. Instruksi penyimpanan
Simpan dokumen ini di GitHub cabang `dev`, misalnya `docs/ANTARDESA_v0.2.9_PENUTUPAN_QA_FINAL.md`, sebagai commit dokumentasi saja. Periksa tab *Files changed* agar hanya dokumen ini yang ditambahkan. Jangan merge ke `main`.

## 6. Pernyataan penutupan
**AntarDesa v0.2.9: QA Passed on Dev; checkout locked; production release not approved.**
