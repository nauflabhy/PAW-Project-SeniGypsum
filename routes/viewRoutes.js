const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Mengarahkan root path ke halaman utama
router.get('/', viewController.renderHome);
router.get('/bantuan', viewController.renderHelp);

module.exports = router;
