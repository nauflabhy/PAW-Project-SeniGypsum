const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Integrasi endpoint dengan controllernya masing-masing
router.get('/status', apiController.getStatus);
router.get('/produk', apiController.getProduk);

module.exports = router;
