const ProductModel = require('../models/productModel');

const viewController = {
  renderHome: (req, res) => {
    const dataProduk = ProductModel.getAll();
    // Merender views/index.ejs dan mengirimkan data produk ke dalamnya
    res.render('index', { produkList: dataProduk });
  },

  renderBantuan: (req, res) => {
    // Jika datang dari tombol "Tanya produk ini", chatbot langsung membahas produk tersebut
    const produkDipilih = ProductModel.getById(req.query.produk);
    res.render('bantuan', { produkDipilih });
  }
};

module.exports = viewController;
