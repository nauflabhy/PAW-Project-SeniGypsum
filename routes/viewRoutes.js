const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Mengarahkan root path ke halaman utama
router.get('/', viewController.renderHome);
<<<<<<< HEAD
router.get('/bantuan', viewController.renderHelp);
=======
// Halaman chatbot / bantuan
router.get('/bantuan', viewController.renderBantuan);
>>>>>>> 57fc1475172f514ee00b2d4ba748007723ca8d62

module.exports = router;
