# AntarDesa v0.2.9 — Finalisasi Aman

## Status berdasarkan hasil yang dilaporkan
- Dashboard pelanggan: LULUS
- Akses Mitra/Kurir terverifikasi: LULUS
- Penolakan akses yang tidak berwenang: LULUS
- Estimasi ongkir: LULUS
- Penerbitan dan tampilan Shipping Quote: LULUS
- Kedaluwarsa quote diperbarui tanpa membuat pesanan: LULUS
- Checkout tetap terkunci: LULUS
- Katalog: LULUS
- Riwayat pesanan: LULUS
- Catatan tambahan: tidak ada

Catatan: hasil di atas adalah laporan pengujian pengguna. Pemeriksaan statis kode tidak menggantikan pengujian browser penuh atau validasi langsung backend.

## Keputusan finalisasi
**v0.2.9 dapat ditandai sebagai lulus QA pada lingkungan dev, dengan checkout tetap dinonaktifkan.**
Ini bukan persetujuan untuk rilis produksi atau membuka transaksi.

## Daftar finalisasi aman
1. Pastikan seluruh perubahan berada di cabang `dev`.
2. Pastikan file dashboard yang diuji benar-benar `pelanggan_v0.2.9.html`.
3. Simpan catatan QA ini di dokumentasi proyek.
4. Periksa Cloudflare Pages preview setelah deployment selesai.
5. Pastikan katalog dan riwayat pesanan tetap terbaca.
6. Pastikan quote kedaluwarsa tidak bisa dipakai untuk checkout.
7. Pastikan tombol checkout tetap tidak aktif.
8. Jangan memanggil RPC pembuatan pesanan untuk pengujian.
9. Jangan mengubah stok atau membuat pesanan nyata.
10. Jangan gabungkan `dev` ke `main` tanpa persetujuan eksplisit dan pemeriksaan rilis terpisah.

## Kriteria sebelum rilis publik
- Seluruh file yang akan dirilis ditinjau ulang dan versi konsisten.
- Tidak ada rahasia/service-role key di HTML atau JavaScript sisi klien.
- Konfigurasi URL/auth redirect produksi diperiksa terpisah dari preview.
- Akses data diuji dengan akun dan peran yang sesuai.
- Kebijakan privasi, syarat layanan, kontak bantuan, dan penanganan laporan tersedia.
- Prosedur pemulihan/rollback diketahui.
- Checkout tetap terkunci sampai alur pembayaran/pesanan disetujui dan diuji terpisah secara eksplisit.

## Status rilis
**Belum dirilis ke produksi.** Cabang `main` tidak diubah. Checkout tetap terkunci. Tidak ada pesanan atau perubahan stok yang dibuat oleh langkah finalisasi ini.

## Langkah berikutnya
Lakukan pemeriksaan dokumentasi dan kesiapan produksi di `dev`. Jika semua item non-transaksional selesai, tandai v0.2.9 sebagai *QA passed on dev*, bukan *production released*. Perubahan kode baru hanya dibuat bila ditemukan masalah nyata atau kebutuhan yang sudah disepakati.
