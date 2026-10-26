# AntarDesa v0.3.0 — Tahap 9.3 Wireframe Tekstual dan Standar Pesan UI

Tanggal: 26 Oktober 2026  
Status: DRAFT UNTUK PERSETUJUAN — DOCUMENTATION ONLY  
Dasar: Tahap 9.1 Spesifikasi Perencanaan; Tahap 9.2 Inventaris Layar (disetujui, tersimpan di `dev`).  
Baseline: v0.2.9 QA Passed on Dev (berdasarkan laporan pengguna).

## 1. Aturan utama
- 22 ID berikut adalah komponen/keadaan konseptual, bukan instruksi membuat 22 file HTML.
- Usulan wireframe tidak membuktikan bahwa komponen sudah terimplementasi; path aktual diverifikasi sebelum tahap implementasi yang disetujui terpisah.
- `CHECKOUT_V4_ENABLED = false` tetap berlaku. Quote bukan pesanan dan tidak menjamin stok. Riwayat hanya-baca pada cakupan rancangan ini.
- Tidak ada mutasi pesanan, stok, verifikasi, penugasan, status antar, pembayaran, atau perubahan sistem.
- Kontrol akses ditentukan server/RLS dan verifikasi peran yang berlaku, bukan sekadar menyembunyikan tombol.
- Semua contoh nominal dan teks placeholder bukan nilai transaksi nyata.

## 2. Pola layout mobile-first
Urutan umum: judul/identitas layar → status/keterangan → konten utama → aksi yang diizinkan → bantuan/umpan balik. Gunakan satu kolom untuk Android kecil; label selalu tampak, target sentuh memadai, pesan tidak hanya bergantung warna. Jangan tampilkan token, koordinat pribadi yang tidak diperlukan, atau detail internal error.

## 3. Wireframe bersama (6)
| ID | Struktur tekstual | Keadaan dan interaksi |
|---|---|---|
| U-01 Halaman awal | Logo/nama → ringkasan layanan → Login / Daftar | Normal; jika gagal memuat konten tambahan, navigasi aman tetap jelas. |
| U-02 Registrasi | Judul → email → kata sandi → petunjuk validasi → Daftar → petunjuk konfirmasi email | Input, validasi, memproses (cegah klik ganda), konfirmasi email, gagal; jangan mengungkap keberadaan akun secara berlebihan. |
| U-03 Login | Judul → email/kata sandi → Masuk → status | Proses, berhasil, gagal, sesi aktif; arahkan sesuai peran dan verifikasi yang sah. |
| U-04 Callback konfirmasi | Judul → memeriksa tautan → hasil → kembali login | Berhasil, tidak valid, kedaluwarsa, offline; jangan tampilkan token tautan. |
| U-05 Akses ditolak | Judul → penjelasan singkat → Kembali ke halaman yang diizinkan | Jangan render data yang terlindungi atau menaikkan peran. |
| U-06 Sesi kedaluwarsa | Judul → penjelasan → Login kembali | Hentikan aksi terlindungi; jangan mengklaim operasi sebelumnya berhasil. |

## 4. Wireframe Pelanggan (7)
| ID | Struktur tekstual | Keadaan dan interaksi |
|---|---|---|
| P-01 Dashboard | Sapaan → navigasi katalog/riwayat → status ringkas | Loading, normal, gagal; jangan menampilkan data peran lain. |
| P-02 Katalog | Judul → daftar kartu [nama, harga/satuan, ketersediaan, Mitra] → detail | Terisi, kosong, loading, gagal; tidak memutasi stok. |
| P-03 Informasi produk (usulan) | Kembali → nama → identitas Mitra → harga/satuan → ketersediaan → keterangan | Lengkap, parsial, gagal; nilai yang hilang ditandai “Belum tersedia”, bukan direka. |
| P-04 Estimasi ongkir | Produk terpilih → tujuan sesuai input yang diizinkan → informasi estimasi → Hitung estimasi | Belum input, proses, berhasil, gagal; bukan pesanan. |
| P-05 Shipping Quote | Ringkasan produk/jumlah → jarak/ongkir jika tersedia → batas waktu → status quote | Valid, hampir habis, kedaluwarsa, gagal; masa berlaku mengikuti data server (baseline 10 menit), bukan janji harga/stok. |
| P-06 Riwayat pesanan | Judul → daftar ringkas yang berwenang → detail baca-saja | Terisi, kosong, loading, gagal; tidak membuat atau mengubah pesanan. |
| P-07 Checkout terkunci | Ringkasan informasi → penjelasan “Checkout belum tersedia” → kontrol checkout nonaktif | Selalu nonaktif; jangan hubungkan ke submit/RPC pesanan. |

### Contoh tekstual P-05/P-07
```
[AntarDesa]        [Kembali]
Informasi Pengiriman
Produk: [nama dari data]
Jumlah: [jumlah yang diperbolehkan]
Estimasi ongkir: [nilai jika tersedia]
Status quote: [Valid / Hampir habis / Kedaluwarsa]
Berlaku sampai: [waktu dari data server]
Catatan: Estimasi bukan pesanan dan tidak menjamin stok.
[ Checkout belum tersedia ] (NONAKTIF)
```
Jika quote kedaluwarsa, jangan menyajikan angka lama sebagai quote valid. Perbarui estimasi hanya melalui alur yang sudah diizinkan, tanpa membuka checkout.

## 5. Wireframe Mitra (5)
| ID | Struktur tekstual | Keadaan dan interaksi |
|---|---|---|
| M-01 Dashboard | Identitas usaha → status verifikasi → navigasi produk | Loading, normal, gagal; hanya peran yang berwenang. |
| M-02 Profil/verifikasi (rancangan) | Nama usaha → data profil yang diizinkan → status [pending/disetujui/ditolak] → keterangan | Lengkap, parsial, status terkait; tidak menyetujui verifikasi sendiri. |
| M-03 Daftar produk | Judul → daftar kartu produk → informasi ketersediaan | Terisi, kosong, loading, gagal; dokumen tidak meniadakan kemampuan pengelolaan produk baseline, tetapi tidak mengotorisasi mutasi baru. |
| M-04 Standar informasi produk | Nama → harga/satuan → ketersediaan → deskripsi → validasi tampilan | Lengkap/parsial; tidak mengubah skema atau kebijakan produk. |
| M-05 Akses ditolak | Judul → penjelasan → kembali ke halaman yang diizinkan | Tidak menampilkan data usaha lain atau mengubah peran. |

## 6. Wireframe Kurir (4)
| ID | Struktur tekstual | Keadaan dan interaksi |
|---|---|---|
| K-01 Dashboard | Identitas/peran → status ringkas → area informasi penugasan | Loading, normal, gagal; peran terverifikasi. |
| K-02 Daftar penugasan (konseptual) | Judul → daftar tugas yang diizinkan atau keadaan kosong | Ada, kosong, gagal; tidak membuat/mengambil penugasan. |
| K-03 Informasi status antar (konseptual) | Ringkasan tugas yang berwenang → status yang tersedia → keterangan | Terbaca, tidak tersedia, gagal; hanya baca, tidak mengubah status. |
| K-04 Akses ditolak | Judul → alasan umum → kembali | Tidak membocorkan data pelanggan/mitra lain. |

## 7. Standar pesan UI
| Kode | Kondisi | Teks yang disarankan | Perilaku |
|---|---|---|---|
| UI-01 | Loading | “Sedang memuat data…” | Indikator jelas; cegah aksi ganda. |
| UI-02 | Kosong katalog | “Belum ada produk yang tersedia.” | Bukan pesan error. |
| UI-03 | Kosong riwayat | “Belum ada riwayat pesanan.” | Baca-saja. |
| UI-04 | Kosong penugasan | “Belum ada penugasan yang dapat ditampilkan.” | Tidak menawarkan ambil tugas baru. |
| UI-05 | Offline | “Koneksi internet terputus. Periksa jaringan dan coba lagi.” | Jangan klaim operasi berhasil. |
| UI-06 | Gagal umum | “Data belum dapat dimuat. Silakan coba lagi.” | Jangan tampilkan stack trace/token. |
| UI-07 | Sesi habis | “Sesi Anda berakhir. Silakan login kembali.” | Batasi akses data. |
| UI-08 | Akses ditolak | “Anda tidak memiliki akses ke halaman ini.” | Jangan tampilkan data terlindungi. |
| UI-09 | Data parsial | “Sebagian informasi belum tersedia.” | Jangan mengarang nilai. |
| UI-10 | Quote valid | “Estimasi ini bukan pesanan dan tidak menjamin ketersediaan stok.” | Checkout tetap terkunci. |
| UI-11 | Quote hampir habis | “Masa berlaku estimasi hampir berakhir.” | Berdasarkan waktu server; ambang UI ditetapkan saat implementasi terpisah. |
| UI-12 | Quote kedaluwarsa | “Estimasi telah kedaluwarsa. Perbarui estimasi untuk melihat informasi terbaru.” | Jangan aktifkan checkout. |
| UI-13 | Checkout terkunci | “Checkout belum tersedia.” | Tombol nonaktif; tidak ada submit. |
| UI-14 | Input tidak valid | “Periksa kembali data yang dimasukkan.” | Tandai bidang yang relevan. |
| UI-15 | Konfirmasi email | “Periksa email Anda untuk melanjutkan konfirmasi akun.” | Jangan tampilkan tautan/token rahasia. |
| UI-16 | Verifikasi pending | “Permintaan verifikasi sedang ditinjau.” | Tidak memberi akses Mitra/Kurir prematur. |

## 8. Alur konseptual dan batas berhenti
- Pengunjung: awal → daftar → konfirmasi email → login → pemeriksaan peran → dashboard berwenang.
- Pelanggan: dashboard → katalog → informasi produk; atau estimasi → quote → valid/kedaluwarsa → **STOP: checkout terkunci**; atau riwayat baca-saja.
- Mitra: login → pemeriksaan peran/verifikasi → dashboard → profil/produk sesuai akses.
- Kurir: login → pemeriksaan peran/verifikasi → dashboard → penugasan/status baca-saja sesuai akses.
- Semua alur: offline/gagal/sesi habis/akses ditolak memiliki umpan balik tanpa kebocoran data.

## 9. Kriteria penerimaan dokumen
- [ ] Seluruh 22 ID Tahap 9.2 terpetakan tanpa menambah kemampuan transaksi.
- [ ] Normal/loading/kosong/gagal dan kondisi khusus dijelaskan sesuai kebutuhan layar.
- [ ] Pesan Indonesia konsisten dan tidak membocorkan data sensitif.
- [ ] Hak akses peran dan status verifikasi dipertahankan.
- [ ] Quote bukan pesanan, masa berlaku berasal dari server, checkout selalu terkunci.
- [ ] Usulan dibedakan dari fitur baseline; belum ada perubahan kode, database, konfigurasi, deployment, atau `main`.

## 10. Penyimpanan yang disarankan setelah disetujui
Cabang: `dev`  
Path: `docs/ANTARDESA_v0.3.0_TAHAP_9.3_WIREFRAME_UI.md`  
Commit: `docs: add v0.3.0 textual wireframes and UI messages`  
Periksa Files changed: hanya dokumen ini. Jangan merge ke `main`.

**CHECKOUT LOCKED. NO REAL TRANSACTIONS. NO IMPLEMENTATION AUTHORIZED.**
