// project/utils/formatter.js

const formatter = {
  /**
   * Mengubah angka menjadi format mata uang Rupiah secara rapi
   * @param {number} number - Jumlah nominal angka
   * @returns {string} - Teks terformat (Contoh: Rp 45.000)
   */
  formatRupiah: (number) => {
    if (typeof number !== 'number') return 'Rp 0';
    return 'Rp ' + number.toLocaleString('id-ID');
  }
};

module.exports = formatter;
