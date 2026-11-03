const products = [
  { id: 1, name: 'List C1 / Bambu', price: 25000, category: 'List Gypsum', spec: 'Panjang 4m, motif bambu klasik' },
  { id: 2, name: 'Board Gypsum Elephant 9mm', price: 65000, category: 'Board Gypsum', spec: 'Ketebalan 9mm, tahan lendut' },
  { id: 3, name: 'Jayaboard Sheetrock', price: 72000, category: 'Board Gypsum', spec: 'Teknologi inti gipsum lebih ringan' },
  { id: 4, name: 'Cat Plafon Jota防 (Putih)', price: 145000, category: 'Cat', spec: 'Isi 5kg, khusus interior plafon anti-jamur' },
  { id: 5, name: 'Baja Ringan Hollow 4x4', price: 32000, category: 'Hollow', spec: 'Ketebalan 0.3mm, galvalum anti-karat' }
];

const Product = {
  getAll: () => {
    return products;
  },

  getById: (id) => {
    return products.find((p) => p.id === Number(id)) || null;
  }
};

module.exports = Product;
