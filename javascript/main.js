document.addEventListener("DOMContentLoaded", function () {
  function tampilkanKeranjang() {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let keranjangList = document.getElementById("keranjangList");
    keranjangList.innerHTML = "";

    let totalHarga = 0;

    if (keranjang.length === 0) {
      keranjangList.innerHTML = "<p class='text-center'>Keranjang kosong.</p>";
      document.getElementById("totalHarga").textContent = "Total: Rp 0";
      return;
    }

    keranjang.forEach((tiket, index) => {
      let harga = parseInt(tiket.harga.replace(/\D/g, ""));
      totalHarga += harga;

      let listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      listItem.innerHTML = `
            <div>
              <img src="${tiket.img}" alt="${tiket.title}" width="50" class="me-2">
              <strong>${tiket.title}</strong> - ${tiket.kategori} - <span class="text-danger">${tiket.harga}</span>
            </div>
            <button class="btn btn-sm btn-danger btnHapus" data-index="${index}">Hapus</button>
          `;
      keranjangList.appendChild(listItem);
    });

    // Tampilkan total harga
    document.getElementById(
      "totalHarga"
    ).textContent = `Total: Rp ${totalHarga.toLocaleString("id-ID")}`;

    // Event listener untuk tombol hapus tiap item
    document.querySelectorAll(".btnHapus").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
        keranjang.splice(index, 1);
        localStorage.setItem("keranjang", JSON.stringify(keranjang));
        tampilkanKeranjang();
      });
    });
  }

  // Fungsi menambah tiket ke keranjang
  document.querySelector(".btnBeli").addEventListener("click", function () {
    let modal = document.getElementById("exampleModal");
    let title = modal.querySelector(".modalTitle").innerText;
    let harga = modal
      .querySelector(".modalHarga")
      .innerText.replace("Rp ", "")
      .replace(/\D/g, "");
    let imgSrc = modal.querySelector(".modalImage img").src;
    let kategori =
      modal.querySelector("#kategoriSelect").selectedOptions[0].text;

    let tiket = {
      title: title,
      harga: `Rp ${parseInt(harga).toLocaleString("id-ID")}`,
      kategori: kategori,
      img: imgSrc,
    };

    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang.push(tiket);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    tampilkanKeranjang();
  });

  // Fungsi checkout dengan metode pembayaran
  document.getElementById("checkoutBtn").addEventListener("click", function () {
    let metode = document.getElementById("metodePembayaran").value;
    let totalHarga = document.getElementById("totalHarga").textContent;

    if (!metode) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    if (totalHarga === "Total: Rp 0") {
      alert("Terima Kasih!");
      return;
    }

    alert(
      `Metode Pembayaran: ${metode}\n${totalHarga}\nSilakan lanjutkan pembayaran.`
    );
  });

  tampilkanKeranjang();
});
function tampilkanKeranjang() {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  let keranjangList = document.getElementById("keranjangList");
  let totalHargaElement = document.getElementById("totalHarga");
  keranjangList.innerHTML = "";

  let totalHarga = 0;

  if (keranjang.length === 0) {
    keranjangList.innerHTML = "<p class='text-center'>Keranjang kosong.</p>";
    totalHargaElement.textContent = ""; // Menghilangkan "Total: Rp 0" jika keranjang kosong
    return;
  }

  keranjang.forEach((tiket, index) => {
    let harga = parseInt(tiket.harga.replace(/\D/g, ""));
    totalHarga += harga;

    let listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
          <div>
            <img src="${tiket.img}" alt="${tiket.title}" width="50" class="me-2">
            <strong>${tiket.title}</strong> - ${tiket.kategori} - <span class="text-danger">${tiket.harga}</span>
          </div>
          <button class="btn btn-sm btn-danger btnHapus" data-index="${index}">Hapus</button>
        `;
    keranjangList.appendChild(listItem);
  });

  // Jika ada tiket, tampilkan total harga
  if (totalHarga > 0) {
    totalHargaElement.textContent = `Total: Rp ${totalHarga.toLocaleString(
      "id-ID"
    )}`;
  } else {
    totalHargaElement.textContent = ""; // Menghilangkan "Total: Rp 0" jika tidak ada tiket
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let jumlahSimpan = localStorage.getItem("jumlahKeranjang") || 0;
  updateKeranjang(jumlahSimpan);

  // Observer untuk mendeteksi perubahan dalam keranjang
  let targetNode = document.getElementById("keranjang");
  let observer = new MutationObserver(hitungProdukDalamKeranjang);

  observer.observe(targetNode, { childList: true, subtree: true });
});

// Fungsi untuk update jumlah keranjang
function updateKeranjang(jumlah) {
  document.getElementById("jumlahKeranjang").innerText = jumlah;
  localStorage.setItem("jumlahKeranjang", jumlah);
}

// Fungsi untuk menghitung jumlah produk dalam keranjang secara otomatis
function hitungProdukDalamKeranjang() {
  let jumlahProduk = document.querySelectorAll("#keranjang .produk").length;
  updateKeranjang(jumlahProduk);
}

// Fungsi simulasi untuk menambah produk ke dalam keranjang
function tambahProduk() {
  let keranjang = document.getElementById("keranjang");
  let produkBaru = document.createElement("div");
  produkBaru.classList.add("produk");
  produkBaru.innerText = "Produk " + (keranjang.children.length + 1);
  keranjang.appendChild(produkBaru);
}

// Fungsi simulasi untuk menghapus produk dari keranjang
function hapusProduk() {
  let keranjang = document.getElementById("keranjang");
  if (keranjang.children.length > 0) {
    keranjang.removeChild(keranjang.lastChild);
  }
}
document
  .getElementById("checkoutButton")
  .addEventListener("click", function () {
    // Simulasi proses checkout (bisa diganti dengan AJAX atau fungsi lain)
    setTimeout(function () {
      document.getElementById("thankYouMessage").innerText =
        "Terima kasih telah membeli tiket di Prime Ticket! 🎟️ Cek email untuk e-ticket.";
      document.getElementById("thankYouMessage").style.display = "block";
    }, 500); // Simulasi delay 0.5 detik
  });

document.getElementById("checkoutBtn").addEventListener("click", function () {
  let metode = document.getElementById("metodePembayaran").value;
  alert("Pembayaran berhasil menggunakan " + metode + "!");
  localStorage.removeItem("keranjang"); // Menghapus isi keranjang setelah pembayaran
  tampilkanKeranjang(); // Memperbarui tampilan
});

// Menangkap tombol beli dan menambahkan ke keranjang
document.querySelectorAll(".btnDetail").forEach((button) => {
  button.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const img = this.getAttribute("data-img");
    let harga = parseInt(this.getAttribute("data-harga"));

    // Ambil kategori yang dipilih
    const kategori = document.querySelector(
      'input[name="kategori"]:checked'
    ).value;

    // Terapkan diskon 50% untuk kategori TIMUR dan NORTH
    if (kategori === "TIMUR" || kategori === "NORTH") {
      harga = harga * 0.5; // Diskon 50%
    }

    tambahKeKeranjang(title, img, harga, kategori);
  });
});

// Fungsi untuk menambahkan item ke keranjang
function tambahKeKeranjang(title, img, harga, kategori) {
  const keranjang = document.getElementById("keranjang");

  // Buat elemen baru untuk item di keranjang
  const item = document.createElement("div");
  item.className = "item-keranjang";
  item.innerHTML = `
      <img src="${img}" alt="${title}" width="50">
      <span>${title} - ${kategori}</span>
      <span class="harga">Rp ${harga.toLocaleString("id-ID")}</span>
      <button class="hapus-item">Hapus</button>
  `;

  // Tambah ke dalam keranjang
  keranjang.appendChild(item);

  // Update total harga
  updateTotal();

  // Event listener untuk tombol hapus
  item.querySelector(".hapus-item").addEventListener("click", function () {
    item.remove();
    updateTotal();
  });
}

// Fungsi untuk menghitung total harga di keranjang
function updateTotal() {
  let total = 0;
  document.querySelectorAll(".item-keranjang .harga").forEach((item) => {
    total += parseInt(item.textContent.replace("Rp ", "").replace(".", ""));
  });

  document.getElementById(
    "totalHarga"
  ).textContent = `Total: Rp ${total.toLocaleString("id-ID")}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const btnBeli = document.querySelector(".btnBeli");

  btnBeli.addEventListener("click", function () {
    const modal = document.getElementById("exampleModal");
    let title = modal.querySelector(".modalTitle").innerText;
    let harga = modal.querySelector(".modalHarga").innerText;
    let imgSrc = modal.querySelector(".modalImage img").src;
    let kategori = modal.querySelector('input[name="kategori"]:checked').value;

    // Menghitung harga berdasarkan kategori (TIMUR dan NORTH diskon 50%)
    let hargaAsli = parseInt(harga.replace(/\D/g, ""));
    if (kategori === "TIMUR" || kategori === "NORTH") {
      hargaAsli *= 0.5; // Diskon 50%
    }

    // Simpan ke keranjang (bisa disesuaikan sesuai implementasi)
    tambahKeKeranjang(title, hargaAsli, imgSrc, kategori);
  });

  function tambahKeKeranjang(nama, harga, img, kategori) {
    const keranjangEl = document.getElementById("keranjang");
    const totalHargaEl = document.getElementById("totalHarga");

    // Tambahkan item ke keranjang
    keranjangEl.innerHTML += `
      <div class="item">
        <img src="${img}" alt="${nama}" width="50">
        <p>${nama} - ${kategori} - Rp ${harga.toLocaleString()}</p>
      </div>
    `;

    // Update total harga
    const totalHarga = Array.from(keranjangEl.querySelectorAll(".item")).reduce(
      (total, item) => {
        let hargaItem = parseInt(item.innerText.replace(/\D/g, ""));
        return total + hargaItem;
      },
      0
    );

    totalHargaEl.textContent = `Total: Rp ${totalHarga.toLocaleString()}`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const btnBeli = document.querySelector(".btnBeli");

  btnBeli.addEventListener("click", function () {
    const modal = document.getElementById("exampleModal");
    let title = modal.querySelector(".modalTitle").innerText;
    let harga = modal.querySelector(".modalHarga").innerText;
    let imgSrc = modal.querySelector(".modalImage img").src;
    let kategori = modal.querySelector('input[name="kategori"]:checked').value;

    // Ubah harga ke dalam bentuk angka (menghapus semua karakter non-digit)
    let hargaAsli = parseInt(harga.replace(/\D/g, ""));

    // Menambahkan biaya tambahan untuk kategori VIP
    if (kategori === "VIP") {
      hargaAsli += 200000; // Tambahan harga Rp 200.000 untuk kategori VIP
    }

    // Debug: Periksa di console
    console.log("Kategori yang dipilih:", kategori);
    console.log("Harga setelah kategori:", hargaAsli);

    // Tambahkan ke keranjang
    tambahKeKeranjang(title, hargaAsli, imgSrc, kategori);
  });

  function tambahKeKeranjang(nama, harga, img, kategori) {
    const keranjangEl = document.getElementById("keranjang");
    const totalHargaEl = document.getElementById("totalHarga");

    // Tambahkan item ke keranjang
    keranjangEl.innerHTML += `
      <div class="item">
        <img src="${img}" alt="${nama}" width="50">
        <p>${nama} - ${kategori} - Rp ${harga.toLocaleString()}</p>
      </div>
    `;

    // Hitung ulang total harga
    const totalHarga = Array.from(keranjangEl.querySelectorAll(".item")).reduce(
      (total, item) => {
        let hargaItem = parseInt(item.innerText.replace(/\D/g, ""));
        return total + hargaItem;
      },
      0
    );

    totalHargaEl.textContent = `Total: Rp ${totalHarga.toLocaleString()}`;
  }
});

if (kategori === "VIP") {
  hargaAsli += 200000;
}

document.addEventListener("DOMContentLoaded", function () {
  const btnBeli = document.querySelector(".btnBeli");

  btnBeli.addEventListener("click", function () {
    const modal = document.getElementById("exampleModal");
    const title = modal.querySelector(".modalTitle").innerText;
    const harga = modal.querySelector(".modalHarga").innerText;
    const imgSrc = modal.querySelector(".modalImage img").src;
    const kategori = modal.querySelector(
      'input[name="kategori"]:checked'
    ).value;

    // Ubah harga ke angka (hapus semua karakter selain angka)
    let hargaAsli = parseInt(harga.replace(/\D/g, ""), 10);

    // Debugging: Cek apakah kategori terbaca
    console.log("Kategori yang dipilih:", kategori);
    console.log("Harga awal:", hargaAsli);

    // Tambahkan biaya tambahan untuk kategori VIP
    if (kategori === "VIP") {
      hargaAsli += 200000; // Tambahan harga Rp 200.000 untuk VIP
      console.log("Harga setelah tambahan VIP:", hargaAsli);
    }

    // Tambahkan item ke keranjang
    tambahKeKeranjang(title, hargaAsli, imgSrc, kategori);
  });

  function tambahKeKeranjang(nama, harga, img, kategori) {
    const keranjangEl = document.getElementById("keranjang");
    const totalHargaEl = document.getElementById("totalHarga");

    // Tambah item ke keranjang
    keranjangEl.innerHTML += `
      <div class="item">
        <img src="${img}" alt="${nama}" width="50">
        <p>${nama} - ${kategori} - Rp ${harga.toLocaleString()}</p>
      </div>
    `;

    // Hitung total harga di keranjang
    const totalHarga = Array.from(keranjangEl.querySelectorAll(".item")).reduce(
      (total, item) => {
        const hargaItem = parseInt(item.innerText.replace(/\D/g, ""), 10);
        return total + hargaItem;
      },
      0
    );

    totalHargaEl.textContent = `Total: Rp ${totalHarga.toLocaleString()}`;
  }
});

cartLink.addEventListener("click", function (event) {
  event.preventDefault(); // Mencegah perilaku default link
  window.location.href = "keranjang.html";
});

document.querySelectorAll(".btnDetail").forEach((button) => {
  button.addEventListener("click", function () {
    // Ambil data produk dari atribut
    const produk = {
      title: this.getAttribute("data-title"),
      img: this.getAttribute("data-img"),
      harga: this.getAttribute("data-harga"),
      deskripsi: this.getAttribute("data-deskripsi"),
    };

    // Ambil data keranjang dari localStorage atau buat array kosong
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    // Tambah produk ke keranjang
    keranjang.push(produk);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    // Arahkan ke halaman keranjang di tab baru
    window.open("cart.html", "_blank");
  });
});
const tiket = {
  title: "Tiket Konser",
  kategori: "VIP",
  harga: "Rp 500.000",
  img: "gambar.jpg",
};
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
keranjang.push(tiket);
localStorage.setItem("keranjang", JSON.stringify(keranjang));
// Fungsi untuk menambahkan produk ke keranjang dan pindah ke halaman keranjang
function tambahKeKeranjang(title, img, harga, deskripsi) {
  const tiket = { title, img, harga, deskripsi };

  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.push(tiket);

  localStorage.setItem("keranjang", JSON.stringify(keranjang));

  // Buka halaman keranjang di tab baru
  window.open("keranjang.html", "_blank");
}

// Menambahkan event listener ke semua tombol 'Buy'
document.querySelectorAll(".btnDetail").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const title = button.getAttribute("data-title");
    const img = button.getAttribute("data-img");
    const harga = button.getAttribute("data-harga");
    const deskripsi = button.getAttribute("data-deskripsi");

    tambahKeKeranjang(title, img, harga, deskripsi);
  });
});
// Proses Checkout
document.getElementById("checkoutBtn").addEventListener("click", function () {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  if (keranjang.length === 0) {
    alert("Keranjang kosong, silakan tambahkan tiket terlebih dahulu.");
    return;
  }

  const metodePembayaran = document.getElementById("metodePembayaran").value;

  // Simpan metode pembayaran yang dipilih
  localStorage.setItem("metodePembayaran", metodePembayaran);

  // Redirect ke halaman pembayaran
  window.location.href = "pembayaran.html";
});
// Update harga in modal based on kategori and quantity
function updateModalHarga() {
  let hargaFinal = hargaAsli;
  const kategori = modal.querySelector('input[name="kategori"]:checked').value;

  // Apply discounts based on kategori
  if (
    kategori === "Timur" ||
    kategori === "Barat" ||
    kategori === "Selatan" ||
    kategori === "Utara"
  ) {
    hargaFinal = hargaAsli * 0.5; // Diskon 50% for all non-VIP categories
  }

  const jumlah = parseInt(jumlahTiket.value) || 1;
  modalHarga.innerText = "Rp " + (hargaFinal * jumlah).toLocaleString();
}

// Add to cart button
btnBeli.addEventListener("click", function () {
  const kategori = modal.querySelector('input[name="kategori"]:checked').value;
  const jumlah = parseInt(jumlahTiket.value) || 1;
  let hargaFinal = hargaAsli;

  if (
    kategori === "Timur" ||
    kategori === "Barat" ||
    kategori === "Selatan" ||
    kategori === "Utara"
  ) {
    hargaFinal = hargaAsli * 0.5; // 50% discount for all non-VIP categories
  }

  let tiket = {
    title: modalTitle.innerText,
    harga: "Rp " + hargaFinal.toLocaleString(),
    kategori: kategori,
    jumlah: jumlah,
    img: modalImage.querySelector("img").src,
  };

  // Rest of the code remains the same
  // ...
});
