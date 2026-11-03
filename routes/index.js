const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.renderHome);
router.get('/api/status', appController.getStatus);
router.get('/api/produk', appController.getProductsApi);

module.exports = router;
