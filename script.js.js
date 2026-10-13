// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'bengbeng', price: 2000, img: 'img/bengbeng.jpg' },
    { id: 2, name: 'biskuat', price: 1000, img: 'img/biskuat.jpg' },
    { id: 3, name: 'jagoan neon', price: 2000, img: 'img/jagoan neon.jpg' },
    { id: 4, name: 'phone', price: 2000, img: 'img/phone.jpg' },
    { id: 5, name: 'iphone', price: 2000, img: 'img/iphone.jpg' }
];

// Keranjang belanja
let cart = [];

// Fungsi menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    if (!productsContainer) {
        console.error('Elemen products tidak ditemukan di HTML!');
        return;
    }

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img
                src="${product.img}"
                alt="${product.name}"
                onerror="this.alt='Gambar tidak ditemukan'"
            >
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke Keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Fungsi menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Perbaikan: cartIem menjadi cartItem
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Fungsi memperbarui isi keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) {
        console.error('Elemen keranjang tidak ditemukan di HTML!');
        return;
    }

    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${
                (item.price * item.quantity).toLocaleString('id-ID')
            }`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent =
        totalPrice.toLocaleString('id-ID');
}

// Fungsi checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const input = prompt(
        `Total belanja Anda: Rp ${total.toLocaleString('id-ID')}\n` +
        'Masukkan jumlah pembayaran:'
    );

    // Jika pengguna menekan Cancel
    if (input === null) return;

    const payment = Number(input);

    if (
        input.trim() === '' ||
        !Number.isFinite(payment) ||
        payment < 0
    ) {
        alert('Masukkan jumlah pembayaran yang valid.');
        return;
    }

    if (payment >= total) {
        const change = payment - total;

        alert(
            `Pembayaran berhasil!\n` +
            `Kembalian Anda: Rp ${change.toLocaleString('id-ID')}`
        );

        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

// Jalankan setelah HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
    displayProducts();

    const checkoutButton = document.getElementById('checkout-btn');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    } else {
        console.error('Tombol checkout tidak ditemukan!');
    }
});