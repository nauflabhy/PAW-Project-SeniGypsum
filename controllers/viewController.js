const ProductModel = require('../models/productModel');

const viewController = {
  renderHome: (req, res) => {
    const dataProduk = ProductModel.getAll();
    // Merender views/index.ejs dan mengirimkan data produk ke dalamnya
    res.render('index', { produkList: dataProduk });
  },
  renderHelp: (req, res) => {
    const productId = Number(req.query.produk);
    const produkDipilih = ProductModel.getAll().find((produk) => produk.id === productId) || null;
    res.render('bantuan', { produkDipilih });
  }
};

module.exports = viewController;
