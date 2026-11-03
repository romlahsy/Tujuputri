/*
  ============================================================
  PENGATURAN WEBSITE TUJUPUTRI  (config.js)
  ============================================================
  File ini adalah "pusat kendali" website. Hampir semua yang
  perlu kamu ubah ada di sini, jadi tidak perlu membuka file HTML.

  CARA MENGISI (PENTING):
  - Teks selalu ditulis di dalam tanda kutip, contoh: "teks"
  - Jangan hapus tanda koma (,) di akhir baris.
  - Biarkan "" (kosong) jika belum ada datanya. Website tetap aman.

  1. NOMOR WHATSAPP
     Format internasional, tanpa +, spasi, atau tanda minus.
     Nomor 0812-3456-7890 ditulis: "6281234567890"
     (angka 0 di depan diganti 62)

  2. MENAMBAH PRODUK BARU
     Salin satu blok produk (dari tanda { sampai }, + koma),
     tempel di bawah produk terakhir, lalu ganti isinya.
     Tidak perlu membuat halaman HTML baru.

  3. FOTO PRODUK
     Buat folder "images", masukkan foto, lalu tulis di kolom image,
     contoh: "images/daster-kings.jpg"
     Kosongkan jika belum ada foto (akan tampil kotak sementara).

  4. HARGA
     Tulis angka saja, tanpa titik dan "Rp", contoh: 85000
     Isi null jika belum ada harga (akan tampil "Hubungi untuk harga").
*/

window.TUJUPUTRI_CONFIG = {

  /* ---------- NOMOR WHATSAPP ---------- */
  whatsapp: {
    bapak: "6285270927388", // Nomor WhatsApp Bapak, contoh: "6281234567890"
    kamu: "6282325640565"   // Nomor WhatsApp kamu,  contoh: "6289876543210"
  },

  /* ---------- TAUTAN WEBSITE LUAR ----------
     Dipakai oleh produk yang punya  external: "nama"
     SAFA: isi dengan alamat website SAFA di GitHub Pages,
     contoh: "https://namakamu.github.io/safa/"
  */
  links: {
    safa: "https://safabookmark.getspace.workers.dev/"
  },

  /* ---------- MEDIA SOSIAL ----------
     Isi dengan alamat lengkap akun (diawali https://).
     Yang dikosongkan tidak akan tampil di footer.
  */
  social: {
    instagram: "", // contoh: "https://www.instagram.com/namaakun"
    threads: "",   // contoh: "https://www.threads.net/@namaakun"
    facebook: ""   // contoh: "https://www.facebook.com/namaakun"
  },

  /* ---------- KATEGORI ----------
     id     : kode singkat (dipakai oleh produk di kolom category)
     page   : nama halaman kategori
     label  : nama yang tampil di website
     short  : keterangan kecil di kartu kategori beranda
     intro  : deskripsi singkat di halaman kategori
  */
  categories: [
    {
      id: "fashion",
      page: "fashion.html",
      label: "Fashion Dewasa",
      short: "Daster, sirwal, & pakaian dalam",
      intro: "Pilihan pakaian dewasa yang nyaman untuk aktivitas sehari-hari."
    },
    {
      id: "anak",
      page: "ibu-anak.html",
      label: "Ibu & Anak",
      short: "Pakaian bayi & anak",
      intro: "Pilihan kebutuhan untuk ibu dan si kecil."
    },
    {
      id: "buku",
      page: "buku-islami.html",
      label: "Buku Islami",
      short: "Buku anak & dewasa",
      intro: "Pilihan buku Islami untuk menambah ilmu dan wawasan."
    },
    {
      id: "kreatif",
      page: "kreasi.html",
      label: "Kreasi & Stationery",
      short: "Bookmark & kalender",
      intro: "Produk kreasi dan stationery untuk melengkapi hari-harimu."
    }
  ],

  /* ---------- PRODUK ----------
     id         : kode unik, huruf kecil, tanpa spasi (pakai tanda -)
     name       : nama produk
     category   : id kategori (fashion / anak / buku / kreatif)
     label      : nama kategori yang tampil di kartu produk
     description: deskripsi singkat
     price      : angka, atau null jika belum ada
     image      : alamat foto, atau "" jika belum ada
     owner      : "bapak" atau "kamu" (menentukan nomor WhatsApp tujuan)
     featured   : true = tampil di beranda, false = hanya di katalog
     available  : true = tampil, false = disembunyikan sementara
     external   : (opsional) nama tautan luar di bagian links di atas
     details    : (opsional) deskripsi LENGKAP, tampil di halaman detail saja.
                  Tulis di antara tanda ` ` (backtick) agar boleh banyak baris.
                  Baris kosong = paragraf baru. Baris berawalan "- " = daftar poin.
     specs      : (opsional) spesifikasi, tampil sebagai tabel di halaman detail.
                  Contoh: [["Bahan", "Katun"], ["Ukuran", "Jumbo"]]

     CATATAN: "description" cukup 1-2 kalimat pendek (tampil di kartu produk,
     maksimal 3 baris). Teks panjang taruh di "details".
  */
  products: [
{
  id: "daster-kings-standar",
  name: "Daster KING'S Standar",
  category: "fashion",
  label: "Fashion Dewasa",
  description: "",
  details: `
Daster dengan model longgar yang nyaman untuk menemani aktivitas sehari-hari.

**Fitur Produk:**
- 1 saku samping tersembunyi di bagian kanan.
- Bukaan depan dengan 2 kancing.
- Model longgar.
- Bahan adem dan ringan.
  `,
  specs: [
    ["Lebar dada", "±57 cm"],
    ["Panjang baju", "±110 cm"],
    ["Panjang lengan", "±14 cm"]
  ],
  price: 60000,
  image: "images/daster-kings-standar-1.webp",
  images: [
    "images/daster-kings-standar-2.webp",
    "images/daster-kings-standar-3.webp",
    "images/daster-kings-standar-4.webp"
  ],
  owner: "bapak",
  featured: true,
  available: true
},
    {
      id: "pakaian-dalam-dewasa",
      name: "Pakaian Dalam Dewasa",
      category: "fashion",
      label: "Fashion Dewasa",
      description: "Pilihan pakaian dalam untuk kebutuhan sehari-hari.",
      details: "",
      specs: [],
      price: null,
      image: "",
      owner: "bapak",
      featured: false,
      available: true
    },
    {
      id: "pakaian-bayi",
      name: "Pakaian Bayi",
      category: "anak",
      label: "Ibu & Anak",
      description: "Pilihan pakaian untuk kebutuhan si kecil.",
      details: "",
      specs: [],
      price: null,
      image: "",
      owner: "bapak",
      featured: true,
      available: true
    },
    {
      id: "pakaian-dalam-anak",
      name: "Pakaian Dalam Anak",
      category: "anak",
      label: "Ibu & Anak",
      description: "Pilihan pakaian dalam untuk anak.",
      details: "",
      specs: [],
      price: null,
      image: "",
      owner: "bapak",
      featured: false,
      available: true
    },
    {
      id: "buku-islami",
      name: "Buku Islami",
      category: "buku",
      label: "Buku Islami",
      description: "Bacaan islami untuk menemani waktu belajar dan membaca.",
      details: "",
      specs: [],
      price: null,
      image: "",
      owner: "bapak",
      featured: true,
      available: true
    },
    {
      id: "safa-bookmark",
      name: "SAFA Magnetic Bookmark",
      category: "kreatif",
      label: "Kreasi & Stationery",
      description: "Bookmark magnetis untuk menemani halaman bacaan favorit.",
      details: "",
      specs: [],
      price: null,
      image: "",
      owner: "kamu",
      featured: true,
      available: true,
      external: "safa" // klik produk ini langsung ke website SAFA (lihat links.safa)
    },
    {
      id: "kalender-meja",
      name: "Kalender Meja",
      category: "kreatif",
      label: "Kreasi & Stationery",
      description: "Kalender meja edisi percobaan Tujuputri.",
      details: "",
      specs: [],
      price: null,
      image: "",
      owner: "kamu",
      featured: true,
      available: true
    }
  ]
};
