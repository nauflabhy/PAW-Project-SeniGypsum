const ProductModel = require('../models/productModel');

const viewController = {
  renderHome: (req, res) => {
    const dataProduk = ProductModel.getAll();
    // Merender views/index.ejs dan mengirimkan data produk ke dalamnya
    res.render('index', { produkList: dataProduk });
  }
};

module.exports = viewController;
