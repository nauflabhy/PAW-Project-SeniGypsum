const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Mengarahkan root path ke halaman utama
router.get('/', viewController.renderHome);
// Halaman chatbot / bantuan
router.get('/bantuan', viewController.renderBantuan);

module.exports = router;
