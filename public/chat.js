(function () {
  var panel = document.querySelector('.help-panel');
  if (!panel) return;

  var log = document.getElementById('chat-log');
  var chips = document.getElementById('chat-chips');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('pesan');
  var sibuk = false;

  function tambahBubble(teks, arah) {
    var el = document.createElement('div');
    el.className = 'bubble bubble-' + arah;
    el.textContent = teks; // textContent: aman dari injeksi HTML
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function isiSaran(daftar) {
    chips.textContent = '';
    daftar.forEach(function (teks) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.dataset.pesan = teks;
      b.textContent = teks;
      chips.appendChild(b);
    });
  }

  function kirim(teks) {
    teks = teks.trim();
    if (!teks || sibuk) return;
    sibuk = true;
    tambahBubble(teks, 'out');
    var mengetik = tambahBubble('Mengetik...', 'in');
    mengetik.classList.add('bubble-typing');

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: teks })
    })
      .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
      .then(function (r) {
        mengetik.remove();
        if (!r.ok) throw new Error(r.data.message || 'Terjadi kesalahan.');
        tambahBubble(r.data.reply, 'in');
        if (r.data.suggestions) isiSaran(r.data.suggestions);
      })
      .catch(function () {
        mengetik.remove();
        tambahBubble('Pesan belum terkirim. Periksa koneksi Anda lalu coba lagi.', 'in');
      })
      .then(function () { sibuk = false; input.focus(); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var teks = input.value;
    input.value = '';
    kirim(teks);
  });

  chips.addEventListener('click', function (e) {
    var tombol = e.target.closest('button[data-pesan]');
    if (tombol) kirim(tombol.dataset.pesan);
  });

  // Sapaan awal; jika datang dari "Tanya produk ini", langsung bahas produk itu
  tambahBubble('Halo! Saya asisten Toko Seni Gypsum. Pilih topik di bawah atau tulis pertanyaan Anda.', 'in');
  var produk = panel.dataset.produk;
  if (produk) kirim(produk);
})();
