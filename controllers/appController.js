// project/controllers/appController.js

const Product = require('../models/productModel');
const config = require('../config/appConfig');
const { formatRupiah } = require('../utils/formatter');

// Controller untuk halaman Frontend (EJS View)
exports.renderHome = (req, res) => {
  const products = Product.getAll();
  
  // Memformat harga estimasi pemasangan menggunakan fungsi dari utils
  const formattedInstallationPrice = `${formatRupiah(config.shopMetaData.baseInstallationPrice)} / m²`;

  res.render('index', { 
    products, 
    // Mengirimkan helper formatRupiah langsung ke view EJS agar bisa digunakan di HTML
    formatRupiah,
    title: `Sistem Portal - ${config.shopMetaData.name}`,
    shopInfo: {
      address: config.shopMetaData.address,
      hours: config.shopMetaData.operatingHours,
      installationPrice: `Mulai dari ${formattedInstallationPrice} (Bahan Gypsum, Kalsi, PVC, Partisi)`
    }
  });
};

// Controller untuk API GET /api/status
exports.getStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Backend server for ${config.shopMetaData.name} is running smoothly`,
    version: config.shopMetaData.version,
    timestamp: new Date().toISOString()
  });
};

// Controller untuk API GET /api/produk
exports.getProductsApi = (req, res) => {
  const products = Product.getAll();
  res.status(200).json({
    status: 'success',
    count: products.length,
    data: products
  });
};
