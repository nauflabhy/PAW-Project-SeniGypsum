const express = require('express');
const path = require('path');
const loggerMiddleware = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const PORT = 3000; // Menggunakan port lokal default 3000

// 1. Konfigurasi View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Memasang Global Middleware Logger
app.use(loggerMiddleware);

// Middleware bawaan untuk memparsing data JSON & URL-encoded jika diperlukan nanti
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mengirim file CSS dari folder views saat browser meminta /style.css
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'style.css'));
});

// File statis (JavaScript klien chatbot) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// 3. Registrasi Routing / Endpoint
app.use('/', viewRoutes);         // Route halaman utama (frontend)
app.use('/api', apiRoutes);       // Route khusus API

// 4. Menjalankan Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Server berhasil dijalankan!`);
    console.log(`💻 Frontend URL : http://localhost:${PORT}`);
    console.log(`🌐 API Status   : http://localhost:${PORT}/api/status`);
    console.log(`📦 API Produk   : http://localhost:${PORT}/api/produk`);
    console.log(`====================================================`);
});