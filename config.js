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
  ikhwan: "6285270927388",
  akhwat: "6282325640565"
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
      intro: "Pilihan pakaian dewasa yang nyaman untuk aktivitas sehari-hari.",
      image: "images/kategori-fashion.webp"
    },
    {
      id: "anak",
      page: "ibu-anak.html",
      label: "Ibu & Anak",
      short: "Pakaian bayi & anak",
      intro: "Pilihan kebutuhan untuk ibu dan si kecil.",
      image: "images/kategori-ibu-anak.webp"
    },
    {
      id: "buku",
      page: "buku-islami.html",
      label: "Buku Islami",
      short: "Buku anak & dewasa",
      intro: "Pilihan buku Islami untuk menambah ilmu dan wawasan.",
      image: "images/kategori-buku-islami.webp"
    },
    {
      id: "kreatif",
      page: "kreasi.html",
      label: "Kreasi & Stationery",
      short: "Bookmark & kalender",
      intro: "Produk kreasi dan stationery untuk melengkapi hari-harimu.",
      image: "images/kategori-kreasi.webp"
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
  image: "images/kings-standar-3.webp",
  images: [
    "images/kings-standar-10.webp",
    "images/kings-standar-11.webp",
    "images/kings-standar-12.webp",
  ],
  variants: [
    {
      name: "Biru Tua",
      image: "images/kings-standar-1.webp",
      available: true
    },
    {
      name: "Tosca",
      image: "images/kings-standar-2.webp",
      available: false
    },
    {
      name: "Merah",
      image: "images/kings-standar-3.webp",
      available: true
    },
    {
      name: "Hitam",
      image: "images/kings-standar-4.webp",
      available: false
    },
    {
      name: "Navy Bunga Pink",
      image: "images/kings-standar-5.webp",
      available: true
    },
    {
      name: "Mocca Taupe",
      image: "images/kings-standar-6.webp",
      available: true
    },
    {
      name: "Hitam Bunga Biru",
      image: "images/kings-standar-7.webp",
      available: true
    },
    {
      name: "Mustard",
      image: "images/kings-standar-8.webp",
      available: true
    },
    {
      name: "Tosca Tua",
      image: "images/kings-standar-9.webp",
      available: true
    }
  ],
  featured: true,
  available: true
},
    
{
  id: "daster-chibi-knaya",
  name: "Daster Chibi K-Naya",
  price: 50000,
  image: "images/daster-chibi-k-naya-2.webp",
  images: [
    "images/daster-chibi-k-naya-7.webp",
    "images/daster-chibi-k-naya-8.webp"
  ],
  category: "fashion",
  label: "Fashion Dewasa",
  details: `
    Daster Chibi K-Naya dengan pilihan 4 varian warna corak. Dilengkapi ritsleting pendek di bagian depan yang busui friendly serta tali di kedua sisi untuk menyesuaikan siluet pakaian.

    **Fitur Produk:**
    - 1 saku fungsional di sisi kanan.
    - Ritsleting depan pendek (busui friendly).
    - Tali di kedua sisi yang dapat diikat untuk menyesuaikan siluet.
  `,
  specs: [
    ["Lebar Dada", "52 cm"],
    ["Panjang Baju", "104 cm"],
    ["Panjang Lengan", "16 cm"]
  ],
  variants: [
    {
      name: "Bunga Merah",
      image: "images/daster-chibi-k-naya-1.webp",
      available: false
    },
    {
      name: "Bunga Oren",
      image: "images/daster-chibi-k-naya-2.webp",
      available: true
    },
    {
      name: "Bunga Kuning",
      image: "images/daster-chibi-k-naya-4.webp",
      available: true
    },
    {
      name: "Bunga Hijau",
      image: "images/daster-chibi-k-naya-3.webp",
      available: true
    },
    {
      name: "Bulu Oren Bata",
      image: "images/daster-chibi-k-naya-6.webp",
      available: true
    },
    {
      name: "Bulu Kuning Mustard-Gold",
      image: "images/daster-chibi-k-naya-5.webp",
      available: true
    }
  ],
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
  id: "celana-kacamata-pop-bayi",
  name: "Celana Kacamata/Pop Bayi",
  price: 20000,
  image: "images/celana-pop-1.webp",
  category: "anak",
  label: "Ibu & Anak",
  details: `
    Celana kacamata/pop bayi berbahan katun dengan model polos dan bordir karakter. Bersifat unisex, cocok untuk bayi laki-laki maupun perempuan. Bahannya adem dan nyaman untuk dipakai sehari-hari.

    **Catatan untuk Pembeli:**
    - Harga yang tertera adalah untuk 3 pcs.
    - Ukuran usia hanya perkiraan karena pertumbuhan setiap bayi berbeda.
    - Untuk ukuran yang lebih akurat, disarankan mencocokkan lingkar pinggang celana yang biasa dipakai si kecil dengan ukuran yang tertera.
  `,
  specs: [
    ["Ukuran", "All Size"],
    ["Lingkar Karet Pinggang", "±30–56 cm"],
    ["Panjang Celana", "±19–20 cm"],
    ["Perkiraan Usia", "1–12 bulan"]
  ],
  variants: [
    {
      name: "Biru",
      image: "images/celana-pop-1.webp",
      available: true
    },
    {
      name: "Pink",
      image: "images/celana-pop-2.webp",
      available: true
    },
    {
      name: "Kuning",
      image: "images/celana-pop-3.webp",
      available: true
    }
  ],
  featured: true,
  available: true
},
    {
  id: "cd-anak-perempuan-delvia-M",
  name: "Celana Dalam Anak Perempuan Delvia Size M",
  price: null,
  image: "images/cd-anak-delvia-m-1.webp",
  images: [
    "images/cd-anak-delvia-m-4.webp",
    "images/cd-anak-delvia-m-2.webp",
    "images/cd-anak-delvia-m-3.webp"
  ],
  label: "Ibu & Anak",
  category: "anak",
  details: `
    Celana dalam anak perempuan Delvia ukuran M dengan motif apel dan karakter yang lucu serta pilihan warna ceria. Cocok untuk menemani aktivitas harian buah hati Anda.

    **Catatan untuk Pembeli:**
    - Toleransi pengukuran mungkin terjadi.
    - Untuk mendapatkan ukuran yang sesuai, silakan bandingkan dengan celana dalam yang biasa dipakai si kecil.
    - Motif dan warna dikirim secara random sesuai ketersediaan stok.
  `,
  specs: [
    ["Merek/Art", "Delvia Kids 158"],
    ["Bahan", "Katun PE"],
    ["Ukuran", "M"],
    ["Lingkar Karet Pinggang (sebelum ditarik)", "±32 cm"],
    ["Lingkar Maksimal Saat Melar", "±64 cm"],
    ["Panjang Celana", "±20 cm"]
  ],
  variants: [
    {
      name: "Biru",
      image: "images/cd-anak-delvia-m-7.webp",
      available: true
    },
    {
      name: "Ungu",
      image: "images/cd-anak-delvia-m-4.webp",
      available: true
    },
    {
      name: "Kuning",
      image: "images/cd-anak-delvia-m-5.webp",
      available: true
    },
    {
      name: "Pink",
      image: "images/cd-anak-delvia-m-6.webp",
      available: true
    }
  ],
  featured: true,
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
      featured: false,
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
      price: 8000,
      image: "images/safa-1.webp",
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
      featured: false,
      available: false
    },
{
  id: "sirwal-hitam-SMOOTHEZ",
  name: "Sirwal SMOOTHEZ® by Aerie",
  price: 55000,
  image: "images/sirwal-smoothez-aerie-1.webp",
  images: [
    "images/sirwal-smoothez-aerie-2.webp",
    "images/sirwal-smoothez-aerie-3.webp",
    "images/sirwal-smoothez-aerie-4.webp"
  ],
  category: "fashion",
  label: "Fashion Dewasa",
  details: `
    Sirwal berwarna hitam dengan model longgar yang nyaman digunakan untuk aktivitas sehari-hari. Terbuat dari bahan kain tebal, nyaman, dan tidak menerawang.
    Dilengkapi beberapa jenis saku untuk menyimpan barang kecil agar lebih praktis.

    **Fitur Produk:**
    - Dilengkapi saku tersembunyi di kedua sisi.
    - Memiliki 2 saku dengan penutup ritsleting.
    - Terdapat 1 saku kecil dengan perekat untuk menyimpan barang kecil.
    - Karet pinggang elastis dan dapat menyesuaikan.
  `,
  specs: [
    ["Warna", "Hitam"],
    ["Ukuran", "XL (UK 15–16 tahun / US XL)"],
    ["Panjang Celana", "±82 cm"],
    ["Lingkar Karet Pinggang", "±65 cm, elastis"],
  ],
  featured: true,
  available: true
}
  ]
};
