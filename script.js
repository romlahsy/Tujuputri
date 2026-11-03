/*
  ============================================================
  SCRIPT WEBSITE TUJUPUTRI  (script.js)  -  Versi 2
  ============================================================
  Satu file ini dipakai oleh SEMUA halaman. Setiap halaman memberi
  tahu jenisnya lewat tag <body>, contoh:
     <body data-page="home">
     <body data-page="catalog">
     <body data-page="category" data-category="fashion">
     <body data-page="detail">

  Data produk, nomor WhatsApp, dan media sosial diambil dari config.js.
  Biasanya kamu TIDAK perlu mengubah file ini.
*/
(function () {
  "use strict";

  /* ---------- DATA DARI config.js ---------- */
  const config = window.TUJUPUTRI_CONFIG || {};
  const categories = Array.isArray(config.categories) ? config.categories : [];
  const products = (Array.isArray(config.products) ? config.products : [])
    .filter(function (p) { return p && p.available !== false; });

  /* ---------- ALAT BANTU KECIL ---------- */
  function $(selector) { return document.querySelector(selector); }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Hanya menerima alamat yang diawali http:// atau https://
  function safeUrl(url) {
    const text = String(url == null ? "" : url).trim();
    return /^https?:\/\//i.test(text) ? text : "";
  }

  // Nomor dibersihkan otomatis: 0812... menjadi 62812...
  function cleanPhone(value) {
    let digits = String(value == null ? "" : value).replace(/\D/g, "");
    if (digits.indexOf("0") === 0) digits = "62" + digits.slice(1);
    return digits.length >= 8 ? digits : "";
  }

  function rupiah(value) {
    const number = value === "" || value == null ? NaN : Number(value);
    if (!isFinite(number)) return "Hubungi untuk harga";
    return new Intl.NumberFormat("id-ID", {
      style: "currency", currency: "IDR", maximumFractionDigits: 0
    }).format(number);
  }

  function getCategory(id) {
    return categories.find(function (c) { return c.id === id; }) || null;
  }

  function getProduct(id) {
    return products.find(function (p) { return p.id === id; }) || null;
  }

  function categoryLabel(product) {
    const category = getCategory(product.category);
    return product.label || (category && category.label) || "Produk";
  }

  function detailHref(product) {
    return "detail.html?id=" + encodeURIComponent(product.id);
  }

  // Alamat website luar (contoh: SAFA). "" jika produk tidak punya / belum diisi.
  function externalUrl(product) {
    if (!product.external) return "";
    return safeUrl(config.links && config.links[product.external]);
  }

  function whatsappUrl(product) {
    const phone = cleanPhone(config.whatsapp && config.whatsapp[product.owner]);
    if (!phone) return "";
    const message = "Assalamu'alaikum, saya tertarik dengan " + product.name +
      " di Tujuputri. Boleh minta info lebih lanjut?";
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  }

  function hasPrice(value) {
    return value !== "" && value != null && isFinite(Number(value));
  }

  /* ---------- DAFTAR FOTO PRODUK ----------
     Foto utama = kolom image. Foto tambahan = kolom images (daftar).
     Foto pertama dipakai sebagai sampul di kartu produk. */
  function galleryImages(product) {
    const list = [];
    [product.image].concat(Array.isArray(product.images) ? product.images : []).forEach(function (src) {
      const text = String(src == null ? "" : src).trim();
      if (text && list.indexOf(text) === -1) list.push(text);
    });
    return list;
  }
  function coverImage(product) { return galleryImages(product)[0] || ""; }

  /* ---------- TAMPILAN FOTO / PLACEHOLDER ---------- */
  const placeholderColors = {
    fashion: "#e9e2d6",
    anak: "#e9e9df",
    buku: "#eee7dc",
    kreatif: "#e6e7dc"
  };

  function placeholderInner(product) {
    return '<div class="product-placeholder">' + escapeHtml(product.name) +
      "<small>Foto segera hadir</small></div>";
  }

  function productVisual(product) {
    const cover = coverImage(product);
    if (cover) {
      return '<div class="product-visual"><img class="product-img" src="' +
        escapeHtml(cover) + '" alt="' + escapeHtml(product.name) +
        '" loading="lazy" data-product-id="' + escapeHtml(product.id) + '"></div>';
    }
    const bg = placeholderColors[product.category] || "#e9e2d6";
    return '<div class="product-visual" style="background:' + bg + '">' +
      placeholderInner(product) + "</div>";
  }


  // Mengubah teks panjang dari config.js menjadi paragraf,
// daftar poin, dan teks tebal.
function formatInline(value) {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function formatText(value) {
  const source = Array.isArray(value)
    ? value.map(function (item) {
        return String(item == null ? "" : item);
      }).join("\n\n")
    : String(value == null ? "" : value);

  const lines = source.split(/\r?\n/);
  const output = [];
  let paragraph = [];
  let list = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    output.push("<p>" + paragraph.map(formatInline).join("<br>") + "</p>");
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    output.push(
      "<ul>" +
      list.map(function (item) {
        return "<li>" + formatInline(item) + "</li>";
      }).join("") +
      "</ul>"
    );
    list = [];
  }

  lines.forEach(function (rawLine) {
    const line = rawLine.trim();
    const match = line.match(/^[-•*]\s+(.+)$/);

    if (!line) {
      flushParagraph();
      flushList();
    } else if (match) {
      flushParagraph();
      list.push(match[1]);
    } else {
      flushList();
      paragraph.push(line);
    }
  });

  flushParagraph();
  flushList();

  return output.join("");
}

  // Spesifikasi: [["Bahan", "Katun"], ["Ukuran", "Jumbo"]]
  function specsList(specs) {
    if (!Array.isArray(specs)) return "";
    const rows = specs.filter(function (r) {
      return Array.isArray(r) && r.length >= 2 && String(r[0]).trim() && String(r[1]).trim();
    });
    if (rows.length === 0) return "";
    return '<dl class="spec-list">' + rows.map(function (r) {
      return '<div class="spec-row"><dt>' + escapeHtml(r[0]) + "</dt><dd>" + escapeHtml(r[1]) + "</dd></div>";
    }).join("") + "</dl>";
  }

  // Bagian di bawah foto/harga: deskripsi lengkap + spesifikasi (hanya jika diisi)
  function detailExtras(product) {
    const text = formatText(product.details);
    const specs = specsList(product.specs);
    if (!text && !specs) return "";
    return '<div class="detail-more">' +
      (text ? '<h2>Deskripsi produk</h2><div class="detail-text">' + text + "</div>" : "") +
      (specs ? "<h2>Spesifikasi</h2>" + specs : "") +
      "</div>";
  }

      /* ---------- GALERI FOTO (halaman detail) ---------- */
  function galleryHtml(product) {
    const list = galleryImages(product);
    let visual;

    if (list.length < 2) {
      visual = productVisual(product);
    } else {
      const slides = list.map(function (src, i) {
        return '<div class="product-visual gallery-slide"><img class="product-img" src="' + escapeHtml(src) +
          '" alt="' + escapeHtml(product.name + ", foto " + (i + 1)) + '"' + (i === 0 ? "" : ' loading="lazy"') +
          ' data-product-id="' + escapeHtml(product.id) + '"></div>';
      }).join("");

      const dots = list.map(function (src, i) {
        return '<button class="gallery-dot' + (i === 0 ? " active" : "") + '" type="button" data-index="' + i +
          '" aria-label="Lihat foto ' + (i + 1) + '"></button>';
      }).join("");

      visual = '<div class="gallery">' +
        '<div class="gallery-track" tabindex="0" aria-label="Foto produk, geser ke samping untuk melihat foto lainnya">' +
        slides + '</div>' +
        '<div class="gallery-dots">' + dots + '</div>' +
        '</div>';
    }

    return '<div class="detail-visual">' +
      visual +
      '<div class="detail-photo-caption">' +
        '<p class="product-category">' + escapeHtml(categoryLabel(product)) + '</p>' +
        '<h1 class="detail-name">' + escapeHtml(product.name) + '</h1>' +
      '</div>' +
      '</div>';
  }

  function initGallery(root) {
    const track = root.querySelector(".gallery-track");
    if (!track) return;

    const dots = Array.prototype.slice.call(root.querySelectorAll(".gallery-dot"));

    function mark(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        const index = Number(dot.dataset.index);
        const left = index * track.clientWidth;

        if (track.scrollTo) track.scrollTo({ left: left, behavior: "smooth" });
        else track.scrollLeft = left;

        mark(index);
      });
    });

    let waiting = false;

    track.addEventListener("scroll", function () {
      if (waiting) return;
      waiting = true;

      window.requestAnimationFrame(function () {
        waiting = false;
        if (track.clientWidth) {
          mark(Math.round(track.scrollLeft / track.clientWidth));
        }
      });
    });
  }

  /* ---------- KARTU PRODUK ---------- */
  function productCard(product) {
    const external = product.external;
    const extUrl = externalUrl(product);
    let attrs;
    let cta = "";

    if (external && extUrl) {
      attrs = 'href="' + escapeHtml(extUrl) + '" target="_blank" rel="noopener noreferrer"';
      cta = "Kunjungi website";
    } else if (external) {
      attrs = 'href="#" data-toast="Tautan produk ini belum tersedia."';
      cta = "Kunjungi website";
    } else {
      attrs = 'href="' + escapeHtml(detailHref(product)) + '"';
    }

    // Kartu sengaja ringkas: foto, kategori, nama, harga. Selebihnya ada di halaman detail.
    return '<a class="product-card" ' + attrs + ">" +
      productVisual(product) +
      '<p class="product-category">' + escapeHtml(categoryLabel(product)) + "</p>" +
      '<h3 class="product-name">' + escapeHtml(product.name) + "</h3>" +
      '<div class="product-bottom"><span class="product-price' + (hasPrice(product.price) ? "" : " price-ask") +
      '">' + rupiah(product.price) + "</span>" +
      (cta ? '<span class="card-cta">' + cta + "</span>" : "") + "</div>" +
      "</a>";
  }

  function renderGrid(grid, emptyState, list) {
    grid.innerHTML = list.map(productCard).join("");
    if (emptyState) emptyState.hidden = list.length > 0;
  }

  /* ---------- BREADCRUMB (jejak halaman) ---------- */
  function renderBreadcrumb(items) {
    const box = $("#breadcrumb");
    if (!box) return;
    box.innerHTML = items.map(function (item, index) {
      const last = index === items.length - 1;
      return last
        ? '<span aria-current="page">' + escapeHtml(item.label) + "</span>"
        : '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + "</a>";
    }).join('<span class="crumb-sep" aria-hidden="true">/</span>');
  }

  /* ============================================================
     HALAMAN: BERANDA (data-page="home")
     ============================================================ */
  const categoryArt = {
    fashion: { cls: "art-fashion", html: '<span class="art-fabric"></span>' },
    anak: { cls: "art-baby", html: '<span class="art-baby-body"></span><span class="art-baby-sleeve"></span>' },
    buku: { cls: "art-books", html: '<span class="book book-a"></span><span class="book book-b"></span><span class="book book-c"></span>' },
    kreatif: { cls: "art-creative", html: '<span class="creative-calendar"></span><span class="creative-bookmark"></span>' }
  };

  function initHome() {
    const categoryGrid = $("#category-grid");
    if (categoryGrid) {
      categoryGrid.innerHTML = categories.map(function (cat) {
        const art = categoryArt[cat.id] || { cls: "art-generic", html: "" };
        return '<a class="category-card" href="' + escapeHtml(cat.page) + '">' +
          '<span class="category-art ' + art.cls + '">' + art.html + "</span>" +
          '<span class="category-meta"><b>' + escapeHtml(cat.label) + "</b><small>" +
          escapeHtml(cat.short || "") + "</small></span>" +
          "</a>";
      }).join("");
    }

    const featuredGrid = $("#featured-grid");
    if (featuredGrid) {
      const featured = products.filter(function (p) { return p.featured === true; });
      if (featured.length === 0) {
        const section = featuredGrid.closest("section");
        if (section) section.hidden = true;
      } else {
        renderGrid(featuredGrid, null, featured);
      }
    }
  }

  /* ============================================================
     HALAMAN: KATALOG SEMUA PRODUK (data-page="catalog")
     ============================================================ */
  function initCatalog() {
    const grid = $("#product-grid");
    if (!grid) return;
    const emptyState = $("#empty-state");
    const search = $("#product-search");
    const chipBox = $("#filter-row");
    const counter = $("#result-count");

    let activeFilter = "semua";
    let term = "";

    // Mendukung alamat seperti produk.html?kategori=buku
    const fromUrl = new URLSearchParams(window.location.search).get("kategori");
    if (fromUrl && getCategory(fromUrl)) activeFilter = fromUrl;

    function drawChips() {
      if (!chipBox) return;
      const chips = [{ id: "semua", label: "Semua" }].concat(categories);
      chipBox.innerHTML = chips.map(function (chip) {
        const active = chip.id === activeFilter;
        return '<button class="filter-chip' + (active ? " active" : "") +
          '" type="button" data-filter="' + escapeHtml(chip.id) + '" aria-pressed="' +
          active + '">' + escapeHtml(chip.label) + "</button>";
      }).join("");
    }

    function draw() {
      const list = products.filter(function (p) {
        const inCategory = activeFilter === "semua" || p.category === activeFilter;
        const text = (p.name + " " + (p.description || "") + " " + categoryLabel(p)).toLowerCase();
        return inCategory && text.indexOf(term) !== -1;
      });
      renderGrid(grid, emptyState, list);
      if (counter) counter.textContent = list.length + " produk";
    }

    if (chipBox) {
      chipBox.addEventListener("click", function (event) {
        const button = event.target.closest("[data-filter]");
        if (!button) return;
        activeFilter = button.dataset.filter;
        drawChips();
        draw();
        try {
          const url = activeFilter === "semua"
            ? window.location.pathname
            : "?kategori=" + encodeURIComponent(activeFilter);
          window.history.replaceState(null, "", url);
        } catch (error) { /* tidak masalah jika gagal */ }
      });
    }

    if (search) {
      search.addEventListener("input", function () {
        term = search.value.trim().toLowerCase();
        draw();
      });
    }

    drawChips();
    draw();
  }

  /* ============================================================
     HALAMAN: KATEGORI (data-page="category" data-category="...")
     ============================================================ */
  function initCategory() {
    const grid = $("#product-grid");
    if (!grid) return;
    const emptyState = $("#empty-state");
    const title = $("#category-title");
    const intro = $("#category-intro");
    const category = getCategory(document.body.dataset.category);

    if (!category) {
      if (title) title.textContent = "Kategori tidak ditemukan";
      if (intro) intro.textContent = "Silakan kembali ke beranda atau lihat semua produk.";
      renderBreadcrumb([{ label: "Beranda", href: "index.html" }, { label: "Kategori" }]);
      return;
    }

    document.title = category.label + " | Tujuputri";
    if (title) title.textContent = category.label;
    if (intro) intro.textContent = category.intro || "";
    renderBreadcrumb([{ label: "Beranda", href: "index.html" }, { label: category.label }]);

    renderGrid(grid, emptyState, products.filter(function (p) {
      return p.category === category.id;
    }));
  }

  /* ============================================================
     HALAMAN: DETAIL PRODUK (data-page="detail")  ->  detail.html?id=...
     ============================================================ */
  function initDetail() {
    const root = $("#detail");
    if (!root) return;

    const id = new URLSearchParams(window.location.search).get("id");
    const product = id ? getProduct(id) : null;

    if (!product) {
      document.title = "Produk tidak ditemukan | Tujuputri";
      renderBreadcrumb([{ label: "Beranda", href: "index.html" }, { label: "Produk tidak ditemukan" }]);
      root.innerHTML = '<div class="detail-empty"><h1 class="detail-name">Produk tidak ditemukan</h1>' +
        "<p>Produk yang kamu cari mungkin sudah tidak tersedia.</p>" +
        '<a class="button button-dark" href="produk.html">Lihat semua produk</a></div>';
      return;
    }

    const category = getCategory(product.category);
    document.title = product.name + " | Tujuputri";

    const crumbs = [{ label: "Beranda", href: "index.html" }];
    if (category) crumbs.push({ label: category.label, href: category.page });
    crumbs.push({ label: product.name });
    renderBreadcrumb(crumbs);

    let action;
    const extUrl = externalUrl(product);
    if (product.external && extUrl) {
      action = '<a class="button button-dark" href="' + escapeHtml(extUrl) +
        '" target="_blank" rel="noopener noreferrer">Kunjungi website</a>';
    } else if (product.external) {
      action = '<button class="button button-dark" type="button" data-toast="Tautan produk ini belum tersedia.">Kunjungi website</button>';
    } else {
      const wa = whatsappUrl(product);
      if (wa) {
        action = '<a class="button button-wa" href="' + escapeHtml(wa) +
          '" target="_blank" rel="noopener noreferrer">Tanya / pesan via WhatsApp</a>';
      } else {
        console.warn("Tujuputri: nomor WhatsApp untuk '" + product.owner + "' belum diisi di config.js");
        action = '<button class="button button-wa" type="button" data-toast="Nomor WhatsApp belum tersedia. Silakan coba lagi nanti.">Tanya / pesan via WhatsApp</button>';
      }
    }

    root.innerHTML =
      '<div class="detail-layout">' +
        galleryHtml(product) +
        '<div class="detail-info">' +
          '<p class="product-category">' + escapeHtml(categoryLabel(product)) + "</p>" +
          '<h1 class="detail-name">' + escapeHtml(product.name) + "</h1>" +
          '<p class="detail-price' + (hasPrice(product.price) ? "" : " price-ask") + '">' + rupiah(product.price) + "</p>" +
          '<div class="detail-desc">' + formatText(product.description) + "</div>" +
          '<div class="detail-actions">' + action + "</div>" +
        "</div>" +
      "</div>" +
      detailExtras(product);
    initGallery(root);
  }

  /* ============================================================
     BAGIAN UMUM (semua halaman)
     ============================================================ */
  const socialIcons = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    threads: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 10C16.9 7.3 15 5.5 12.2 5.5 8.8 5.5 6.5 8 6.5 12s2.3 6.5 5.7 6.5c2.6 0 4.4-1.3 4.4-3.3 0-2.1-1.9-3.2-4.2-3.2-1.7 0-2.8.8-2.8 2 0 1.1.9 1.8 2.1 1.8 1.9 0 2.9-1.4 2.9-3.9V10"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5c0-.3.2-.5.5-.5H15z"/></svg>'
  };
  const socialNames = { instagram: "Instagram", threads: "Threads", facebook: "Facebook" };

  function initSocial() {
    const box = $("#social-links");
    if (!box) return;
    const social = config.social || {};
    const html = ["instagram", "threads", "facebook"].map(function (key) {
      const url = safeUrl(social[key]);
      if (!url) return "";
      return '<a class="social-link" href="' + escapeHtml(url) +
        '" target="_blank" rel="noopener noreferrer" aria-label="' + socialNames[key] +
        ' Tujuputri">' + socialIcons[key] + "</a>";
    }).join("");
    box.innerHTML = html;
    box.hidden = html === ""; // tidak ada alamat = ikon tidak tampil
  }

  // Menu "Kategori" berubah menjadi drop-down yang berisi tautan ke tiap kategori
  function initCategoryMenu() {
    const nav = $(".main-nav");
    if (!nav || categories.length === 0) return;
    const link = nav.querySelector('a[href="index.html#kategori"]');
    if (!link) return;

    const wrap = document.createElement("div");
    wrap.className = "nav-dropdown";
    wrap.innerHTML =
      '<button class="nav-drop-toggle" type="button" aria-expanded="false" aria-controls="nav-categories">' +
      'Kategori<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>' +
      '<div class="nav-drop-menu" id="nav-categories" hidden>' +
      categories.map(function (c) {
        return '<a href="' + escapeHtml(c.page) + '">' + escapeHtml(c.label) + "</a>";
      }).join("") + "</div>";
    link.replaceWith(wrap);

    const toggle = wrap.querySelector(".nav-drop-toggle");
    const menu = wrap.querySelector(".nav-drop-menu");
    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", function () { setOpen(menu.hidden); });
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function initMenu() {
    const toggle = $("#menu-toggle");
    const nav = $(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Menandai menu halaman yang sedang dibuka
  function markActiveNav() {
    const nav = $(".main-nav");
    if (!nav) return;
    const page = document.body.dataset.page;
    let current = window.location.pathname.split("/").pop() || "index.html";
    if (page === "category" || page === "detail") current = "produk.html";
    nav.querySelectorAll("a").forEach(function (link) {
      const href = link.getAttribute("href") || "";
      if (href.indexOf("#") !== -1) return; // tautan ke bagian halaman tidak ditandai
      if (href === current) link.setAttribute("aria-current", "page");
    });
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { toast.classList.remove("show"); }, 2800);
  }

  function initGlobalEvents() {
    // Klik elemen yang punya data-toast: tampilkan pesan, jangan pindah halaman
    document.addEventListener("click", function (event) {
      const el = event.target.closest("[data-toast]");
      if (!el) return;
      event.preventDefault();
      showToast(el.dataset.toast);
    });

    // Jika foto produk gagal dimuat (nama file salah), tampilkan placeholder
    document.addEventListener("error", function (event) {
      const img = event.target;
      if (img && img.tagName === "IMG" && img.dataset.thumb && img.parentElement) { img.parentElement.hidden = true; return; }
      if (!img || img.tagName !== "IMG" || !img.dataset.productId) return;
      const product = getProduct(img.dataset.productId);
      const box = img.parentElement;
      if (!product || !box) return;
      box.style.background = placeholderColors[product.category] || "#e9e2d6";
      box.innerHTML = placeholderInner(product);
    }, true);
  }

  /* ---------- JALANKAN ---------- */
  initCategoryMenu();
  initMenu();
  markActiveNav();
  initSocial();
  initGlobalEvents();

  switch (document.body.dataset.page) {
    case "home": initHome(); break;
    case "catalog": initCatalog(); break;
    case "category": initCategory(); break;
    case "detail": initDetail(); break;
  }
})();
