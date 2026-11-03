// project/config/appConfig.js

const appConfig = {
  // Menggunakan port 5173 sesuai instruksi tugas frontend local
  port: process.env.PORT || 5173,
  
  // Informasi profil bisnis dari PRD Gypsum
  shopMetaData: {
    name: 'Toko Seni Gypsum',
    version: '2.0.0',
    address: 'Jl. Palagan Tentara Pelajar No. 91',
    operatingHours: 'Senin - Sabtu, 08.00 - 16.00',
    baseInstallationPrice: 45000
  }
};

module.exports = appConfig;
