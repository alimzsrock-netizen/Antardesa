/*
  AntarDesa v0.3.0-RC
  Identitas dan inisialisasi aplikasi utama.

  Logika halaman beranda tetap berada di index.html
  pada Tahap A.
*/

"use strict";

const APP = Object.freeze({
  name: "AntarDesa",
  version: "0.3.0-RC",
  environment: "development"
});

function initApp() {
  console.info(
    APP.name + " v" + APP.version
  );

  console.info(
    "Beranda publik siap. Checkout dan transaksi nyata tetap nonaktif."
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initApp,
    { once: true }
  );
} else {
  initApp();
}
