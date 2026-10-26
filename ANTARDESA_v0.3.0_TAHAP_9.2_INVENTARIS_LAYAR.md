# AntarDesa v0.3.0: Tahap 9.2 Inventaris Layar dan Alur

Status: DRAFT, dokumentasi saja. Baseline v0.2.9 QA Passed on Dev berdasarkan laporan pengguna. Persetujuan spesifikasi 9.1 tidak mengizinkan implementasi.

## Prinsip
- Bedakan layar yang telah dilaporkan tersedia dengan komponen usulan; path aktual diverifikasi sebelum implementasi.
- Pertahankan akses berdasarkan peran dan verifikasi yang sudah diuji.
- Checkout tetap terkunci. Quote bukan pesanan. Riwayat pesanan dibaca saja dalam cakupan ini.
- Tidak mengubah kode, konfigurasi, database, deployment, stok, atau pesanan.

## Layar bersama
| ID | Layar atau keadaan | Tujuan | Keadaan yang dirancang |
|---|---|---|---|
| U-01 | Halaman awal | Navigasi | Normal, gagal muat |
| U-02 | Registrasi | Membuat akun | Input, validasi, proses, konfirmasi email, gagal |
| U-03 | Login | Autentikasi dan arah sesuai peran | Proses, berhasil, gagal, sesi aktif |
| U-04 | Callback konfirmasi | Menangani tautan email | Berhasil, tidak valid, kedaluwarsa, offline |
| U-05 | Akses ditolak | Menjaga batas peran | Pesan aman, kembali |
| U-06 | Sesi kedaluwarsa | Login ulang | Pemberitahuan, navigasi |

Item tidak selalu berarti file HTML terpisah.

## Pelanggan
| ID | Komponen | Keadaan | Batas aman |
|---|---|---|---|
| P-01 | Dashboard | Loading, normal, gagal | Akses sesuai kebijakan yang diuji |
| P-02 | Katalog | Terisi, kosong, loading, gagal | Tidak mengubah stok |
| P-03 | Informasi produk (usulan) | Lengkap, parsial, gagal | Tanpa order aktif |
| P-04 | Estimasi ongkir | Belum input, proses, berhasil, gagal | Estimasi bukan pesanan |
| P-05 | Shipping Quote | Valid, hampir habis, kedaluwarsa, gagal | Tidak bisa checkout |
| P-06 | Riwayat pesanan | Terisi, kosong, loading, gagal | Baca saja |
| P-07 | Checkout terkunci | Selalu nonaktif | CHECKOUT_V4_ENABLED=false |

## Mitra
| ID | Komponen | Keadaan | Batas aman |
|---|---|---|---|
| M-01 | Dashboard Mitra | Loading, normal, gagal | Sesuai peran terverifikasi |
| M-02 | Profil dan verifikasi (rancangan) | Lengkap, parsial, pending, disetujui/ditolak | Tidak mengubah verifikasi |
| M-03 | Daftar produk | Terisi, kosong, loading, gagal | Tahap dokumentasi tidak memutasi produk |
| M-04 | Standar informasi produk | Lengkap, parsial | Tidak mengubah skema |
| M-05 | Akses ditolak | Pesan aman | Tidak menaikkan peran otomatis |

Fitur pengelolaan produk baseline tidak dihapus oleh dokumen ini.

## Kurir
| ID | Komponen | Keadaan | Batas aman |
|---|---|---|---|
| K-01 | Dashboard Kurir | Loading, normal, gagal | Sesuai peran terverifikasi |
| K-02 | Daftar penugasan (inventaris konseptual) | Ada, kosong, gagal | Tidak membuat atau mengambil tugas |
| K-03 | Informasi status antar (inventaris konseptual) | Terbaca, tidak tersedia, gagal | Tidak mengubah status |
| K-04 | Akses ditolak | Pesan aman | Tidak membocorkan data pihak lain |

## Alur konseptual
- Pengunjung: awal → registrasi → konfirmasi email → login → cek peran → dashboard berwenang.
- Pelanggan: dashboard → katalog → informasi produk; atau estimasi → quote → masa berlaku → **berhenti, checkout terkunci**; atau riwayat (baca saja).
- Mitra: login → cek peran/verifikasi → dashboard → informasi profil/produk.
- Kurir: login → cek peran/verifikasi → dashboard → informasi penugasan/status yang diizinkan.

## Keadaan lintas layar
Loading: indikator jelas dan cegah aksi ganda. Data kosong: jangan disamakan dengan error. Offline: pesan aman tanpa token. Sesi habis: minta login ulang. Akses ditolak: jangan tampilkan data terlindungi. Quote habis: tampilkan kedaluwarsa dan jangan buka checkout. Data parsial: jangan mengarang nilai.

## Kriteria selesai Tahap 9.2
1. Tiga peran dan autentikasi tercakup.
2. Tiap komponen memiliki tujuan, keadaan, dan batas akses.
3. Usulan dibedakan dari fitur yang sudah tersedia.
4. Semua alur berhenti sebelum transaksi baru.
5. Tidak diperlukan perubahan sistem untuk menyetujui dokumen.

Tahap berikutnya yang diusulkan: 9.3 wireframe tekstual dan standar pesan UI, setelah persetujuan terpisah.

**CHECKOUT LOCKED. NO IMPLEMENTATION AUTHORIZED.**
