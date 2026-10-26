# AntarDesa v0.3.0 — Tahap 9.4 Matriks Validasi UI dan Skenario Pengujian

Tanggal: 26 Oktober 2026  
Status: DRAFT UNTUK PERSETUJUAN — DOCUMENTATION ONLY  
Dasar: Tahap 9.1 (spesifikasi), 9.2 (22 item inventaris), dan 9.3 (wireframe serta UI-01 s.d. UI-16), disetujui dan dilaporkan tersimpan di `dev`.  
Baseline: v0.2.9 QA Passed on Dev berdasarkan laporan pengguna. Ini adalah **rencana uji**, bukan hasil eksekusi uji.

## 1. Batas mutlak
- `CHECKOUT_V4_ENABLED = false`; checkout tidak aktif dalam semua kondisi.
- Quote adalah estimasi, bukan pesanan, tidak menjamin stok; masa berlaku berasal dari server (baseline 10 menit).
- Jangan menjalankan transaksi nyata, submit order, mutasi stok, verifikasi, penugasan, status antar, pembayaran, atau manipulasi quote nyata untuk keperluan dokumen ini.
- Tidak mengubah kode, SQL/RLS, Edge Functions, Auth, secrets, konfigurasi, deployment, atau `main`.
- Validasi di bawah ini adalah **skenario rancangan**. Pelaksanaan di Preview memerlukan persetujuan dan rencana terpisah. Jangan menyatakan PASS sebelum ada bukti.
- Item konseptual bukan klaim bahwa halaman atau fitur telah diimplementasikan; inventaris tidak berarti 22 HTML baru.

## 2. Cara membaca matriks
Kolom ID = ID inventaris 9.2; skenario = kondisi yang nantinya diperiksa; kriteria penerimaan = hasil yang harus terlihat. Status seluruh baris: **NOT RUN (rencana)**. Skenario yang menyangkut usulan diuji terhadap rancangan terlebih dahulu; uji runtime hanya jika kelak diimplementasikan dan diotorisasi. Bukti kelak: tanggal, versi/commit, peran akun uji, perangkat/browser, langkah, hasil aktual, tangkapan layar yang disamarkan, PASS/FAIL/BLOCKED, catatan tindak lanjut. Jangan mencatat token, kata sandi, koordinat pribadi, atau data pengguna lain.

## 3. Matriks 22 item
| ID | Skenario rancangan | Kriteria penerimaan |
|---|---|---|
| U-01 | Halaman awal normal dan konten tambahan gagal dimuat | Identitas dan navigasi Login/Daftar tetap jelas; gagal muat tidak mengarahkan ke area terlindungi. |
| U-02 | Registrasi kosong/tidak valid, proses, konfirmasi, gagal | Validasi terlihat; aksi ganda dicegah; pesan konfirmasi email aman; tidak membocorkan status akun secara berlebihan. |
| U-03 | Login memproses, gagal, berhasil, sesi aktif | Status jelas; arah dashboard hanya sesuai peran/verifikasi sah; gagal tidak menampilkan detail rahasia. |
| U-04 | Callback email berhasil, invalid, kedaluwarsa, offline | Hasil dan jalan kembali jelas; token tautan tidak dirender. |
| U-05 | Akses halaman di luar peran | UI-08; data terlindungi tidak muncul; tersedia navigasi aman. |
| U-06 | Sesi habis ketika membuka area terlindungi | UI-07; aksi terlindungi dihentikan dan login ulang diminta, tanpa klaim keberhasilan. |
| P-01 | Dashboard loading, normal, gagal | Indikator dan umpan balik sesuai kondisi; tidak memuat data peran lain. |
| P-02 | Katalog terisi, kosong, loading, gagal | Nama, harga/satuan, ketersediaan, Mitra konsisten; kosong memakai UI-02 bukan error; tanpa mutasi stok. |
| P-03 | Informasi produk lengkap, parsial, gagal (usulan) | Informasi tidak tersedia ditandai, tidak dikarang; tidak ada order aktif. |
| P-04 | Estimasi belum diisi, memproses, berhasil, gagal | Input relevan divalidasi, aksi ganda dicegah, estimasi dinyatakan bukan pesanan. |
| P-05 | Quote valid, hampir habis, kedaluwarsa, gagal | UI-10/11/12 sesuai keadaan; waktu dari server; quote lama tidak ditampilkan sebagai valid; checkout tetap terkunci. |
| P-06 | Riwayat terisi, kosong, loading, gagal | Hanya data yang berwenang, kosong UI-03, baca-saja, tanpa operasi pesanan baru. |
| P-07 | Checkout dalam seluruh keadaan, termasuk quote valid | UI-13, kontrol nonaktif; tidak ada submit atau pemanggilan pembuatan pesanan. |
| M-01 | Dashboard Mitra loading, normal, gagal | Hanya peran yang sah dan terverifikasi; identitas/status sesuai data berwenang. |
| M-02 | Profil lengkap, parsial, pending, approved/rejected (rancangan) | Status tidak direka; pending UI-16; tidak ada persetujuan diri sendiri. |
| M-03 | Produk terisi, kosong, loading, gagal | Informasi sesuai data Mitra; dokumentasi tidak menghapus kemampuan baseline atau mengotorisasi mutasi baru. |
| M-04 | Informasi produk lengkap/parsial | Nama, harga/satuan, ketersediaan, deskripsi konsisten; nilai hilang ditandai; skema tidak berubah. |
| M-05 | Akun tanpa hak mencoba area Mitra | UI-08; tidak menampilkan data usaha lain dan tidak menaikkan role. |
| K-01 | Dashboard Kurir loading, normal, gagal | Akses hanya peran terverifikasi; informasi sesuai hak akses. |
| K-02 | Penugasan ada, kosong, gagal (konseptual) | UI-04 saat kosong; tidak menawarkan membuat/mengambil tugas. |
| K-03 | Status antar terbaca, tidak tersedia, gagal (konseptual) | Hanya status yang diizinkan, baca-saja, tanpa mutasi status. |
| K-04 | Akun tanpa hak mencoba area Kurir | UI-08; data pelanggan/Mitra lain tidak bocor. |

## 4. Skenario lintas layar
| Kode | Kondisi | Hasil yang diharapkan |
|---|---|---|
| X-01 | Koneksi lambat/loading | UI-01, indikator terlihat; aksi ganda dicegah. |
| X-02 | Data benar-benar kosong | Pesan kosong kontekstual, bukan UI-06. |
| X-03 | Offline | UI-05; tidak ada klaim operasi berhasil. |
| X-04 | Gagal memuat/server | UI-06; tanpa stack trace, token, query internal. |
| X-05 | Sesi kedaluwarsa | UI-07; data terlindungi tidak dapat diakses. |
| X-06 | Role salah/verifikasi belum sah | UI-08 atau UI-16; frontend bukan satu-satunya batas, otorisasi server/RLS tetap diperlukan. |
| X-07 | Data parsial | UI-09; tampilkan “Belum tersedia” pada nilai yang hilang, bukan angka tebakan. |
| X-08 | Input tidak valid | UI-14 dan penanda bidang yang perlu diperbaiki. |
| X-09 | Konfirmasi email | UI-15; tidak menampilkan token. |
| X-10 | Quote valid hingga kedaluwarsa | UI-10 → UI-11 jika ambang UI kelak disetujui → UI-12; waktu server menjadi sumber kebenaran. |
| X-11 | Quote valid sekalipun | UI-13; checkout tetap nonaktif. |
| X-12 | Android kecil, keyboard terbuka, teks panjang | Satu kolom, label tetap jelas, tidak ada tombol penting tertutup/terpotong, pesan tak bergantung pada warna saja. |
| X-13 | Navigasi kembali/refresh | Tidak menaikkan peran, menghidupkan quote kedaluwarsa, atau membuka checkout. |
| X-14 | Data pengguna berbeda | Tidak ada data lintas akun/peran; bukti pengujian disamarkan. |

## 5. Pemetaan standar pesan UI-01 sampai UI-16
- UI-01: X-01; UI-02: P-02; UI-03: P-06; UI-04: K-02.
- UI-05: X-03; UI-06: X-04; UI-07: U-06/X-05; UI-08: U-05/M-05/K-04/X-06.
- UI-09: P-03/M-04/X-07; UI-10: P-05/X-10; UI-11: P-05/X-10; UI-12: P-05/X-10.
- UI-13: P-07/X-11; UI-14: U-02/P-04/X-08; UI-15: U-02/U-04/X-09; UI-16: M-02/X-06.

## 6. Prioritas dan gerbang penerimaan
**P0, wajib tanpa pengecualian:** checkout terkunci, tanpa order/stok/status/role mutasi baru; pemisahan data dan akses; quote kedaluwarsa tidak dianggap valid; tidak bocor token atau data sensitif. **P1:** semua 22 ID memiliki skenario dan hasil harapan; seluruh 16 pesan UI dipetakan; loading/kosong/error/offline/sesi dibedakan. **P2:** keterbacaan Android kecil dan konsistensi label.

Persetujuan Tahap 9.4 berarti **rencana pengujian disetujui**, bukan aplikasi telah lulus pengujian v0.3.0. Status PASS baru dapat diberikan setelah eksekusi yang diotorisasi, hasil aktual, dan bukti yang memadai. Jika implementasi belum ada, catat NOT IMPLEMENTED/BLOCKED, bukan FAIL atau PASS.

## 7. Templat pencatatan hasil untuk tahap kelak
| ID kasus | Versi/commit | Peran uji | Lingkungan/perangkat | Hasil aktual | Bukti aman | Status | Tindak lanjut |
|---|---|---|---|---|---|---|---|
| [ID] | [diisi saat eksekusi] | [akun uji] | [Preview/browser] | [diisi] | [tautan/screenshot disamarkan] | NOT RUN/PASS/FAIL/BLOCKED | [diisi] |

## 8. Penyimpanan setelah persetujuan
Cabang: `dev`  
Path: `docs/ANTARDESA_v0.3.0_TAHAP_9.4_MATRIKS_VALIDASI_UI.md`  
Commit: `docs: add v0.3.0 UI validation matrix`  
Periksa Files changed: hanya dokumen ini; jangan merge ke `main`.

**CHECKOUT LOCKED. DOCUMENTATION ONLY. NO IMPLEMENTATION OR TEST EXECUTION AUTHORIZED.**
