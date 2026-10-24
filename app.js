
/*
  AntarDesa v0.2.0
  File JavaScript Utama
*/

const APP = {
  name: "AntarDesa",
  version: "0.2.0",
  environment: "development"
};

function initApp() {
  console.log(
    APP.name + " v" + APP.version
  );

  console.log(
    "Sistem AntarDesa siap dikembangkan."
  );
}

document.addEventListener(
  "DOMContentLoaded",
  initApp
);
