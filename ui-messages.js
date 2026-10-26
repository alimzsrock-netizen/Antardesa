
/*
 * AntarDesa v0.3.0
 * Gelombang 1 - Standar Pesan UI
 *
 * Modul tampilan non-transaksional.
 * Tidak mengubah autentikasi, database, ongkir,
 * stok, pesanan, ataupun status checkout.
 */

(function () {
  "use strict";

  const messages = Object.freeze({
    "UI-01": "Sedang memuat data…",

    "UI-02": "Belum ada produk yang tersedia.",

    "UI-03": "Belum ada riwayat pesanan.",

    "UI-04": "Belum ada penugasan yang dapat ditampilkan.",

    "UI-05": "Koneksi internet terputus. Periksa jaringan dan coba lagi.",

    "UI-06": "Data belum dapat dimuat. Silakan coba lagi.",

    "UI-07": "Sesi Anda berakhir. Silakan login kembali.",

    "UI-08": "Anda tidak memiliki akses ke halaman ini.",

    "UI-09": "Sebagian informasi belum tersedia.",

    "UI-10": "Estimasi ini bukan pesanan dan tidak menjamin ketersediaan stok.",

    "UI-11": "Masa berlaku estimasi hampir berakhir.",

    "UI-12": "Estimasi telah kedaluwarsa. Perbarui estimasi untuk melihat informasi terbaru.",

    "UI-13": "Checkout belum tersedia.",

    "UI-14": "Periksa kembali data yang dimasukkan.",

    "UI-15": "Periksa email Anda untuk melanjutkan konfirmasi akun.",

    "UI-16": "Permintaan verifikasi sedang ditinjau."
  });

  const types = Object.freeze({
    "UI-01": "loading",
    "UI-02": "empty",
    "UI-03": "empty",
    "UI-04": "empty",
    "UI-05": "error",
    "UI-06": "error",
    "UI-07": "warning",
    "UI-08": "warning",
    "UI-09": "warning",
    "UI-10": "info",
    "UI-11": "warning",
    "UI-12": "warning",
    "UI-13": "warning",
    "UI-14": "error",
    "UI-15": "info",
    "UI-16": "info"
  });

  function getMessage(code) {
    return Object.prototype.hasOwnProperty.call(messages, code)
      ? messages[code]
      : messages["UI-06"];
  }

  function getType(code) {
    return Object.prototype.hasOwnProperty.call(types, code)
      ? types[code]
      : "error";
  }

  function createMessage(code) {
    const element = document.createElement("div");
    const type = getType(code);

    element.className = "ad-ui-message ad-ui-" + type;
    element.textContent = getMessage(code);
    element.setAttribute("data-ui-code", code);

    if (type === "error" || type === "warning") {
      element.setAttribute("role", "alert");
    } else {
      element.setAttribute("role", "status");
      element.setAttribute("aria-live", "polite");
    }

    return element;
  }

  function showMessage(target, code) {
    const container =
      typeof target === "string"
        ? document.querySelector(target)
        : target;

    if (!container || typeof container.replaceChildren !== "function") {
      return false;
    }

    container.replaceChildren(createMessage(code));
    return true;
  }

  function clearMessage(target) {
    const container =
      typeof target === "string"
        ? document.querySelector(target)
        : target;

    if (!container || typeof container.replaceChildren !== "function") {
      return false;
    }

    container.replaceChildren();
    return true;
  }

  const api = Object.freeze({
    messages: messages,
    getMessage: getMessage,
    getType: getType,
    createMessage: createMessage,
    showMessage: showMessage,
    clearMessage: clearMessage
  });

  Object.defineProperty(window, "AntarDesaUI", {
    value: api,
    writable: false,
    configurable: false
  });
})();
