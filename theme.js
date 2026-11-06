/* AntarDesa shared theme controller.
   Shared across same-origin pages through localStorage. */
(function () {
  "use strict";
  var STORAGE_KEY = "antardesa_theme";
  var DEFAULT_THEME = "dark";

  function normalizeTheme(value) {
    return value === "light" || value === "dark" ? value : DEFAULT_THEME;
  }

  function applyTheme(value) {
    var theme = normalizeTheme(value);
    var root = document.documentElement;
    root.classList.toggle("dark-theme", theme === "dark");
    root.setAttribute("data-theme", theme);
    return theme;
  }

  function readTheme() {
    var theme = DEFAULT_THEME;
    try {
      theme = normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Theme still applies for this page when storage is unavailable. */
    }
    return applyTheme(theme);
  }

  function saveTheme(value) {
    var theme = applyTheme(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Keep the selected theme active for the current page. */
    }
    return theme;
  }

  readTheme();
  window.AntarDesaTheme = {
    apply: applyTheme,
    get: readTheme,
    set: saveTheme,
    storageKey: STORAGE_KEY
  };
}());
