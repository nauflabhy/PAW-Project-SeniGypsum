const express = require('express');
const path = require('path');
const appConfig = require('./config/appConfig');
const { formatRupiah } = require('./utils/formatter');
const loggerMiddleware = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const PORT = appConfig.port; // Port dibaca dari config/appConfig.js (bisa diubah lewat env PORT)

// 1. Konfigurasi View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Data bersama yang bisa dipakai langsung di semua template EJS
app.locals.shop = appConfig.shopMetaData;
app.locals.formatRupiah = formatRupiah;

// 2. Memasang Global Middleware Logger
app.use(loggerMiddleware);

// Middleware bawaan untuk memparsing data JSON & URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Registrasi Routing / Endpoint
app.use('/', viewRoutes);         // Route halaman (frontend)
app.use('/api', apiRoutes);       // Route khusus API

// 4. Menjalankan Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Server berhasil dijalankan!`);
    console.log(`💻 Frontend URL : http://localhost:${PORT}`);
    console.log(`💬 Halaman Chat : http://localhost:${PORT}/bantuan`);
    console.log(`🌐 API Status   : http://localhost:${PORT}/api/status`);
    console.log(`📦 API Produk   : http://localhost:${PORT}/api/produk`);
    console.log(`====================================================`);
});
