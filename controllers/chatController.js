const ProductModel = require('../models/productModel');
const { shopMetaData } = require('../config/appConfig');
const { formatRupiah } = require('../utils/formatter');

const SARAN_AWAL = ['Informasi produk', 'Layanan pemasangan', 'Pertanyaan lainnya'];

// Mengubah teks menjadi huruf kecil tanpa tanda baca agar mudah dicocokkan
const normalisasi = (teks) =>
  String(teks).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

const adaKata = (teks, daftar) => daftar.some((k) => teks.includes(k));

const daftarProduk = () =>
  ProductModel.getAll()
    .map((p) => `• ${p.name} (${p.category}) - ${formatRupiah(p.price)}`)
    .join('\n');

const detailProduk = (p) =>
  `${p.name}\nKategori: ${p.category}\nHarga: ${formatRupiah(p.price)}\nSpesifikasi: ${p.spec}\n\nUntuk ketersediaan stok, silakan hubungi toko langsung.`;

// Mencari produk yang disebut pengguna (berdasarkan nama atau kata kunci)
const cariProduk = (teks) => {
  const semua = ProductModel.getAll();
  const langsung = semua.find((p) => teks.includes(normalisasi(p.name)));
  if (langsung) return langsung;

  const kataKunci = {
    1: ['list', 'c1', 'bambu'],
    2: ['elephant', 'gajah'],
    3: ['jayaboard', 'sheetrock'],
    4: ['cat', 'jota', 'jotun'],
    5: ['hollow', 'baja ringan', 'rangka']
  };
  const id = Object.keys(kataKunci).find((k) => adaKata(teks, kataKunci[k]));
  return id ? ProductModel.getById(id) : null;
};

const jawab = (pesan) => {
  const teks = normalisasi(pesan);

  if (!teks) {
    return { reply: 'Silakan tulis pertanyaan Anda atau pilih salah satu topik di bawah.', suggestions: SARAN_AWAL };
  }

  if (adaKata(teks, ['halo', 'hai', 'hello', 'selamat pagi', 'selamat siang', 'selamat sore'])) {
    return {
      reply: `Halo! Selamat datang di ${shopMetaData.name}. Ada yang bisa kami bantu?`,
      suggestions: SARAN_AWAL
    };
  }

  if (adaKata(teks, ['terima kasih', 'makasih', 'thanks'])) {
    return { reply: 'Sama-sama! Kabari kami jika ada pertanyaan lain.', suggestions: SARAN_AWAL };
  }

  if (adaKata(teks, ['jam', 'buka', 'tutup', 'alamat', 'lokasi', 'dimana', 'kontak'])) {
    return {
      reply: `${shopMetaData.name}\nAlamat: ${shopMetaData.address}\nJam operasional: ${shopMetaData.operatingHours}`,
      suggestions: ['Informasi produk', 'Layanan pemasangan']
    };
  }

  if (adaKata(teks, ['pasang', 'pemasangan', 'instalasi', 'tukang', 'jasa'])) {
    return {
      reply:
        `Layanan pemasangan plafon gypsum tersedia dengan biaya dasar ${formatRupiah(shopMetaData.baseInstallationPrice)}. ` +
        'Total biaya bergantung pada luas ruangan dan model plafon, jadi mohon konfirmasi ke toko untuk perhitungan pastinya.\n\n' +
        'Bahan yang umumnya dibutuhkan: papan gypsum, rangka hollow, sekrup, dan kompon.',
      suggestions: ['Informasi produk', 'Jam buka toko']
    };
  }

  const produk = cariProduk(teks);
  if (produk) {
    return { reply: detailProduk(produk), suggestions: ['Lihat semua produk', 'Layanan pemasangan'] };
  }

  if (adaKata(teks, ['produk', 'katalog', 'barang', 'harga', 'daftar', 'jual', 'tersedia', 'gypsum', 'gipsum'])) {
    return {
      reply: `Produk yang tersedia di toko kami:\n${daftarProduk()}\n\nTanyakan nama produknya untuk melihat detail.`,
      suggestions: ['Layanan pemasangan', 'Jam buka toko']
    };
  }

  if (adaKata(teks, ['lain', 'bantuan', 'tanya'])) {
    return {
      reply: 'Saya bisa membantu soal produk, harga, layanan pemasangan, serta alamat dan jam buka toko. Silakan pilih topik atau tulis pertanyaan Anda.',
      suggestions: SARAN_AWAL
    };
  }

  return {
    reply: 'Maaf, saya belum menemukan jawaban untuk pertanyaan itu. Coba tanyakan tentang produk, harga, pemasangan, atau jam buka toko.',
    suggestions: SARAN_AWAL
  };
};

const chatController = {
  kirimPesan: (req, res) => {
    const { message } = req.body || {};
    if (typeof message !== 'string' || message.length > 300) {
      return res.status(400).json({
        status: 'error',
        message: 'Pesan harus berupa teks dengan panjang maksimal 300 karakter.'
      });
    }
    res.json({ status: 'success', ...jawab(message) });
  }
};

module.exports = chatController;
