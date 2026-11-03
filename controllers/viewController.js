const ProductModel = require('../models/productModel');

const viewController = {
  renderHome: (req, res) => {
    const dataProduk = ProductModel.getAll();
    // Merender views/index.ejs dan mengirimkan data produk ke dalamnya
    res.render('index', { produkList: dataProduk });
  },
<<<<<<< HEAD
  renderHelp: (req, res) => {
    const productId = Number(req.query.produk);
    const produkDipilih = ProductModel.getAll().find((produk) => produk.id === productId) || null;
=======

  renderBantuan: (req, res) => {
    // Jika datang dari tombol "Tanya produk ini", chatbot langsung membahas produk tersebut
    const produkDipilih = ProductModel.getById(req.query.produk);
>>>>>>> 57fc1475172f514ee00b2d4ba748007723ca8d62
    res.render('bantuan', { produkDipilih });
  }
};

module.exports = viewController;
