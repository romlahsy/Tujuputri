
(function () {
  "use strict";

  const header = document.getElementById("site-header");

  if (!header) return;

  header.innerHTML = `
    <header class="site-header">

      <a class="brand" href="index.html" aria-label="Tujuputri - Beranda">
        <img
          class="brand-logo"
          src="logo-tujuputri.webp"
          alt="Logo Tujuputri"
        >
        <span class="brand-name">Tujuputri</span>
      </a>

      <nav class="main-nav" aria-label="Navigasi utama">

        <a href="index.html">Beranda</a>

        <a href="index.html#kategori">Kategori</a>

        <a href="produk.html">Produk</a>

      </nav>

      <button
        class="menu-toggle"
        id="menu-toggle"
        type="button"
        aria-label="Buka menu"
        aria-expanded="false"
      >
        ☰
      </button>

    </header>
  `;
})();
