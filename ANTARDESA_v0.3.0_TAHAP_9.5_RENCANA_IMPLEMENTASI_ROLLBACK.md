# AntarDesa v0.3.0 — Tahap 9.5 Rencana Implementasi Bertahap dan Strategi Rollback

Tanggal: 26 Oktober 2026  
Status: DRAFT UNTUK PERSETUJUAN — DOCUMENTATION ONLY  
Dasar: Tahap 9.1–9.4 disetujui dan disimpan di `dev` menurut konfirmasi pengguna.  
Baseline: v0.2.9 QA Passed on Dev (berdasarkan laporan pengguna).  

> CHECKOUT LOCKED. NO REAL TRANSACTIONS. NO IMPLEMENTATION OR PRODUCTION RELEASE AUTHORIZED.

## 1. Tujuan dan batas keputusan
Dokumen ini menentukan urutan, gerbang persetujuan, kriteria pemeriksaan, serta pemulihan sebelum implementasi v0.3.0 dipertimbangkan. Menyetujui dokumen **tidak** mengizinkan pengeditan kode, SQL/RLS, Edge Function, Supabase Auth, secrets, Cloudflare, merge, deployment produksi, transaksi, mutasi stok, penugasan, maupun status pengantaran.

Baseline yang wajib dipertahankan: dashboard dan kontrol akses tiga peran; katalog dan riwayat; estimasi ongkir dan Shipping Quote dengan masa berlaku dari server (baseline 10 menit); `CHECKOUT_V4_ENABLED = false`; pemisahan `dev` (Preview) dan `main` (Production). Quote bukan pesanan dan tidak menjamin stok. Site URL Supabase saat ini menunjuk ke `https://dev.antardesa.pages.dev`; keputusan produksi ditunda.

## 2. Prasyarat sebelum izin implementasi terpisah
1. Persetujuan eksplisit tertulis untuk gelombang tertentu, beserta file yang boleh diubah dan perubahan yang dilarang.
2. Catat commit baseline `dev` yang benar-benar aktif saat pekerjaan dimulai, serta commit `main` saat itu. Jangan mengandalkan hash historis tanpa verifikasi.
3. Periksa daftar file dan dependensi aktual di GitHub; 22 ID Tahap 9.2 bukan 22 file HTML. Tandai komponen yang masih konseptual.
4. Pastikan dokumen 9.1–9.5 tersedia dan matriks 9.4 dipakai sebagai acuan penerimaan.
5. Tentukan pemeriksaan non-transaksional yang aman dan cara mencatat bukti tanpa token, data pribadi, atau secrets.
6. Siapkan rencana pemulihan commit dan otoritas persetujuan sebelum perubahan dimulai.

## 3. Gelombang implementasi yang diusulkan (belum diotorisasi)
| Gelombang | Cakupan | Kriteria penerimaan / gerbang |
|---|---|---|
| G1 | Standar pesan UI-01–UI-16, loading/empty/error/offline/sesi habis/akses ditolak pada komponen yang ada | Pesan Indonesia konsisten, tidak bocor data; akses server/RLS tetap berlaku; uji Preview dan persetujuan lanjut |
| G2 | Tampilan Pelanggan P-01–P-07, termasuk katalog, informasi produk, estimasi, quote, riwayat baca-saja, checkout terkunci | Quote memakai kedaluwarsa server; quote habis tidak dianggap valid; checkout tetap nonaktif dan tanpa submit/RPC pesanan |
| G3 | Tampilan Mitra M-01–M-05, status verifikasi dan informasi produk | Tidak memberi hak prematur; fitur pengelolaan produk baseline tidak terhapus; tidak mengubah skema/kebijakan |
| G4 | Tampilan Kurir K-01–K-04, penugasan dan status sebagai informasi sesuai hak | Tidak membuat/mengambil tugas atau mengubah status; tidak mengungkap data pihak lain |
| G5 | Regresi lintas layar memakai 22 skenario dasar + 14 lintas layar Tahap 9.4 | Seluruh P0 lulus; P1/P2 dicatat dan diputuskan; tidak ada transaksi nyata |
| G6 | Evaluasi kesiapan rilis non-transaksional dan prosedur rollback | Laporan QA, risiko tersisa, dan keputusan rilis tertulis terpisah; tidak otomatis merge/deploy |

Gelombang berikutnya tidak dimulai otomatis setelah gelombang sebelumnya. Setiap gelombang memerlukan izin, pemeriksaan perubahan, hasil Preview, dan persetujuan lanjut.

## 4. Inventaris file dan ruang perubahan
File yang **mungkin** relevan berdasarkan komponen: halaman awal, registrasi, login/callback, `pelanggan.html`, `mitra.html`, `kurir.html`, serta aset JS/CSS terkait. Ini bukan daftar path terverifikasi atau izin mengedit. Periksa nama dan lokasi aktual di cabang `dev` sebelum menyusun patch. Dokumentasi disimpan dalam `docs/`.

Jangan mengubah SQL, RLS, RPC pembuatan pesanan, Edge Function shipping, kunci/secret, Supabase Auth/Site URL, atau Cloudflare dalam gelombang UI tanpa proposal dan persetujuan baru yang eksplisit. Jangan menghapus fitur baseline yang sudah ada. Kode panjang kelak disediakan sebagai file pengganti lengkap untuk alur kerja Android setelah izin diberikan.

## 5. Matriks pemeriksaan sebelum dan sesudah tiap gelombang
- Sebelum: catat branch, commit awal, file sasaran, tujuan, larangan, kondisi checkout, dan hasil QA relevan yang sudah ada (jangan ulang audit tanpa sebab).
- Saat review diff: hanya file yang diizinkan; tidak ada perubahan diam-diam pada auth, kebijakan akses, fungsi transaksi, konfigurasi, atau secrets.
- Preview: layar Android kecil; keadaan normal/loading/kosong/gagal/offline; sesi kedaluwarsa; akses antarperan; data parsial; quote valid/hampir habis/kedaluwarsa; checkout terkunci.
- Keamanan: tombol tersembunyi bukan kontrol akses; data terlindungi harus ditolak di server/RLS; jangan tampilkan token, stack trace, atau koordinat pribadi yang tak diperlukan.
- Setelah: isi status Pass/Fail/Blocked/Not Run, bukti aman, commit yang diperiksa, dan keputusan lanjut/tahan/pulihkan.
- Skenario yang dapat menyebabkan mutasi transaksi nyata **tidak dieksekusi**. Gunakan review statis atau simulasi terisolasi hanya jika kelak disetujui secara terpisah.

## 6. Gerbang keputusan
**GO:** ruang perubahan sesuai izin, semua P0 lulus, checkout tetap terkunci, tidak ada regresi kritis, dan penanggung jawab menyetujui gelombang berikutnya.  
**HOLD:** bukti kurang, skenario belum dijalankan, perbedaan file, atau kegagalan P1/P2 yang belum diputuskan.  
**STOP / ROLLBACK:** kebocoran akses/data, checkout aktif, panggilan pembuatan pesanan, mutasi tak diizinkan, perubahan konfigurasi di luar cakupan, atau regresi kritis.

## 7. Strategi rollback (rencana, belum diuji)
1. Hentikan pekerjaan dan jangan merge ke `main`.
2. Catat gejala, waktu, branch, commit bermasalah, dan cakupan; jangan menyalin secrets atau data pribadi ke laporan.
3. Bandingkan dengan commit baseline `dev` yang telah dicatat pada awal gelombang.
4. Usulkan pemulihan terarah atas commit/file gelombang yang bermasalah, dengan review diff. Hindari reset paksa atau menghapus commit orang lain.
5. Jika Preview telah berubah, pulihkan melalui commit koreksi/revert yang disetujui di `dev`, tunggu build Preview, lalu periksa kembali skenario P0 dan baseline relevan.
6. Jika masalah melibatkan database, Auth, Edge Function, atau produksi, **jangan** mencoba rollback otomatis dari dokumen ini; hentikan dan buat rencana pemulihan khusus beserta persetujuan.
7. Dokumentasikan commit sebelum/sesudah, hasil pemeriksaan, penyebab, dan keputusan lanjut. Riwayat deployment bukan bukti rollback sudah diuji.

## 8. Template catatan per gelombang
- Gelombang / tanggal / penanggung jawab:
- Izin eksplisit dan ruang file:
- Branch dan commit baseline:
- Commit kandidat / ringkasan diff:
- Matriks 9.4: P0 Pass/Fail/Blocked/Not Run; P1/P2 dan catatan:
- Checkout flag dan bukti non-transaksional:
- Hasil Preview Android / temuan:
- Risiko tersisa:
- Keputusan GO / HOLD / STOP / ROLLBACK:
- Persetujuan tindak lanjut:

## 9. Kriteria penerimaan Tahap 9.5 (dokumentasi)
- [ ] Enam gelombang, batas file, dan gerbang persetujuan tertulis jelas.
- [ ] Kriteria P0 dan kontrol checkout/quote/peran dapat ditelusuri ke Tahap 9.2–9.4.
- [ ] Rencana rollback tidak mengklaim sudah diuji.
- [ ] Tidak ada perintah implementasi, transaksi, perubahan database/konfigurasi, merge, atau rilis.
- [ ] File ini saja yang ditambahkan ke `docs/` pada `dev` setelah disetujui.

## 10. Penyimpanan yang disarankan setelah persetujuan
Branch: `dev`  
Path: `docs/ANTARDESA_v0.3.0_TAHAP_9.5_RENCANA_IMPLEMENTASI_ROLLBACK.md`  
Commit: `docs: add v0.3.0 implementation and rollback plan`  
Periksa **Files changed**: hanya dokumen ini. Jangan merge ke `main`.

**Tahap berikutnya hanya setelah persetujuan terpisah: penetapan izin implementasi terbatas, dimulai dari G1 jika disetujui.**
