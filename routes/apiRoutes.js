const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const chatController = require('../controllers/chatController');

// Integrasi endpoint dengan controllernya masing-masing
router.get('/status', apiController.getStatus);
router.get('/produk', apiController.getProduk);
router.post('/chat', chatController.kirimPesan);

module.exports = router;
