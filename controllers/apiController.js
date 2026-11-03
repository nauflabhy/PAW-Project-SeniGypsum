const ProductModel = require('../models/productModel');

const apiController = {
  getStatus: (req, res) => {
    res.json({
      status: "success",
      message: "Server berjalan dengan baik",
      uptime: process.uptime()
    });
  },

  getProduk: (req, res) => {
    const dataProduk = ProductModel.getAll();
    res.json(dataProduk);
  }
};

module.exports = apiController;
