// Translations for multilingual support
const translations = {
    id: {
        'nav.home': 'Beranda',
        'nav.products': 'Produk',
        'nav.cart': 'Keranjang',
        'nav.login': 'Masuk',
        'nav.register': 'Daftar',
        'nav.profile': 'Profil',
        'nav.sell': 'Jual Barang',
        'hero.title': 'Beri Kesempatan Kedua untuk Barang Anda',
        'hero.subtitle': 'Pasar preloved ramah lingkungan untuk bumi yang lebih hijau.',
        'hero.cta': 'Mulai Belanja',
        'categories.title': 'Kategori Pilihan',
        'products.featured': 'Produk Terbaru',
        'products.search': 'Cari produk...',
        'products.reason': 'Alasan dijual',
        'products.usage': 'Lama pemakaian',
        'products.buy': 'Beli Sekarang',
        'products.chat': 'Chat Penjual',
        'cart.empty': 'Keranjang Anda kosong',
        'cart.checkout': 'Checkout',
        'auth.email': 'Alamat Email',
        'auth.password': 'Kata Sandi',
        'common.save': 'Simpan',
        'common.cancel': 'Batal',
        'common.loading': 'Memuat...',
        'common.error': 'Terjadi kesalahan',
        'common.success': 'Berhasil',
        'filter.all': 'Semua Kategori',
        'filter.newest': 'Terbaru',
        'filter.price-low': 'Harga Terendah',
        'filter.price-high': 'Harga Tertinggi',
        'filter.reset': 'Reset',
        'product.condition': 'Kondisi',
        'product.seller': 'Penjual',
        'product.description': 'Deskripsi',
        'product.details': 'Detail Produk',
        'chat.placeholder': 'Ketik pesan Anda...',
        'chat.send': 'Kirim',
        'chat.online': 'Online',
        'chat.offline': 'Offline',
        'notification.added-to-cart': 'Produk berhasil ditambahkan ke keranjang',
        'notification.removed-from-cart': 'Produk dihapus dari keranjang',
        'notification.login-required': 'Silakan login terlebih dahulu',
        'notification.register-success': 'Pendaftaran berhasil! Silakan login.',
        'notification.login-success': 'Login berhasil!',
        'notification.logout-success': 'Logout berhasil!',
        'validation.email-required': 'Email harus diisi',
        'validation.email-invalid': 'Format email tidak valid',
        'validation.password-required': 'Password harus diisi',
        'validation.password-min': 'Password minimal 6 karakter',
        'validation.name-required': 'Nama harus diisi',
        'validation.username-required': 'Username harus diisi',
        'validation.password-confirm': 'Konfirmasi password tidak cocok',

        // --- TAMBAHAN UNTUK CHATBOT (INDONESIA) ---
        'chatbot.system_instruction': 'Kamu adalah EcoBot, asisten belanja cerdas dan ramah lingkungan untuk EcoPreloved Marketplace. \n\nMisi kita: Mendukung ekonomi sirkular dengan memberi kesempatan kedua pada barang berkualitas.\nKepribadianmu: Ramah, informatif, sangat peduli lingkungan, dan membantu.\n\nTugas Utamamu:\n1. Membantu pengguna menemukan produk preloved yang tepat dari DATA PRODUK di bawah.\n2. Memberikan edukasi singkat tentang manfaat belanja preloved (mengurangi limbah, hemat energi).\n3. Menjawab pertanyaan tentang layanan: cara belanja, pembayaran, dan pengiriman.\n\nAturan Format:\n- JIKA kamu merekomendasikan produk spesifik dari data, KAMU WAJIB menyertakan tag [RECOMMEND: id_produk] di akhir kalimatmu.\n- JIKA user ingin melihat kategori, gunakan tag [CATEGORY: fashion/books/electronics/hobby].\n- JIKA kamu ingin menampilkan gambar produk secara eksplisit, gunakan tag [IMAGE: url_gambar_dari_data].\n- Gunakan emoji 🌿, 🌍, atau 🛍️ sesekali agar tetap ramah.\n\nDATA PRODUK TERSEDIA:\n{{PRODUCT_CTX}}',
        'chatbot.typing': 'EcoBot sedang berpikir...',
        'chatbot.error_connection': 'Aduh, sepertinya saya sedang kehilangan koneksi ke pusat pengetahuan saya. Coba tanya lagi sebentar lagi ya! 🌿',
        'chatbot.error_understanding': 'Maaf, saya kurang paham maksud Anda. Bisa coba tanyakan tentang produk fashion, cara belanja, atau tips ramah lingkungan? 🌍',
        'chatbot.greeting_default': 'Halo! Saya EcoBot. Siap membantu Anda menemukan harta karun preloved hari ini! 🛍️'
    },
    en: {
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.cart': 'Cart',
        'nav.login': 'Login',
        'nav.register': 'Register',
        'nav.profile': 'Profile',
        'nav.sell': 'Sell Item',
        'hero.title': 'Give Your Items a Second Chance',
        'hero.subtitle': 'Eco-friendly preloved marketplace for a greener earth.',
        'hero.cta': 'Start Shopping',
        'categories.title': 'Featured Categories',
        'products.featured': 'New Arrivals',
        'products.search': 'Search products...',
        'products.reason': 'Reason for selling',
        'products.usage': 'Usage duration',
        'products.buy': 'Buy Now',
        'products.chat': 'Chat Seller',
        'cart.empty': 'Your cart is empty',
        'cart.checkout': 'Checkout',
        'auth.email': 'Email Address',
        'auth.password': 'Password',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.loading': 'Loading...',
        'common.error': 'An error occurred',
        'common.success': 'Success',
        'filter.all': 'All Categories',
        'filter.newest': 'Newest',
        'filter.price-low': 'Lowest Price',
        'filter.price-high': 'Highest Price',
        'filter.reset': 'Reset',
        'product.condition': 'Condition',
        'product.seller': 'Seller',
        'product.description': 'Description',
        'product.details': 'Product Details',
        'chat.placeholder': 'Type your message...',
        'chat.send': 'Send',
        'chat.online': 'Online',
        'chat.offline': 'Offline',
        'notification.added-to-cart': 'Product added to cart successfully',
        'notification.removed-from-cart': 'Product removed from cart',
        'notification.login-required': 'Please login first',
        'notification.register-success': 'Registration successful! Please login.',
        'notification.login-success': 'Login successful!',
        'notification.logout-success': 'Logout successful!',
        'validation.email-required': 'Email is required',
        'validation.email-invalid': 'Invalid email format',
        'validation.password-required': 'Password is required',
        'validation.password-min': 'Password must be at least 6 characters',
        'validation.name-required': 'Name is required',
        'validation.username-required': 'Username is required',
        'validation.password-confirm': 'Password confirmation does not match',

        // --- TAMBAHAN UNTUK CHATBOT (ENGLISH) ---
        'chatbot.system_instruction': 'You are EcoBot. You have access to PRODUCT DATA. IF user searches for specific items, MATCH with this data. IF matched, DO NOT ONLY SAY THE NAME, but USE FORMAT: [RECOMMEND: product_id] at the end to show the product card. IF you want to show a product image explicitly, use [IMAGE: product_image_url_from_data]. Be polite & persuasive.\n\nPRODUCT DATA:\n{{PRODUCT_CTX}}',
        'chatbot.typing': 'Typing...',
        'chatbot.error_connection': 'Sorry, connection to AI brain lost. Please try again.',
        'chatbot.error_understanding': 'Sorry, I did not understand. Can you repeat?',
        'chatbot.greeting_default': 'Hello! How can I help you today?'
    }
};

// Translation manager
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('app_language') || 'id';
        this.init();
    }

    init() {
        this.updateLanguageSelect();
        this.translatePage();
        this.setupLanguageListener();
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('app_language', lang);
        this.updateLanguageSelect();
        this.translatePage();

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    translate(key) {
        const translation = translations[this.currentLanguage];
        return translation && translation[key] ? translation[key] : key;
    }

    translatePage() {
        // Translate elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);

            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Translate placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.translate(key);
            element.placeholder = translation;
        });

        // Translate title attributes
        const titleElements = document.querySelectorAll('[data-translate-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-translate-title');
            const translation = this.translate(key);
            element.title = translation;
        });

        // Update page title
        const titleKey = document.documentElement.getAttribute('data-translate-title');
        if (titleKey) {
            document.title = this.translate(titleKey);
        }
    }

    updateLanguageSelect() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
        }
    }

    setupLanguageListener() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    // Format numbers based on language
    formatNumber(number) {
        const locale = this.currentLanguage === 'id' ? 'id-ID' : 'en-US';
        return new Intl.NumberFormat(locale).format(number);
    }

    // Format currency based on language
    formatCurrency(amount) {
        if (this.currentLanguage === 'id') {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
        } else {
            // Convert to USD for English (example rate)
            const usdAmount = amount / 15000; // Rough conversion rate
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(usdAmount);
        }
    }

    // Format date based on language
    formatDate(dateString) {
        const date = new Date(dateString);
        const locale = this.currentLanguage === 'id' ? 'id-ID' : 'en-US';

        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }

    // Format relative time based on language
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (this.currentLanguage === 'id') {
            if (diffInSeconds < 60) return 'Baru saja';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
        } else {
            if (diffInSeconds < 60) return 'Just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        }

        return this.formatDate(dateString);
    }

    // Get localized category names
    getCategoryName(categoryId) {
        const categoryNames = {
            id: {
                fashion: 'Fashion',
                books: 'Buku',
                electronics: 'Elektronik',
                hobby: 'Hobi & Koleksi'
            },
            en: {
                fashion: 'Fashion',
                books: 'Books',
                electronics: 'Electronics',
                hobby: 'Hobby & Collectibles'
            }
        };

        return categoryNames[this.currentLanguage][categoryId] || categoryId;
    }

    // Get localized status names
    getStatusName(status) {
        const statusNames = {
            id: {
                available: 'Tersedia',
                sold: 'Terjual',
                reserved: 'Dipesan'
            },
            en: {
                available: 'Available',
                sold: 'Sold',
                reserved: 'Reserved'
            }
        };

        return statusNames[this.currentLanguage][status] || status;
    }
}

// Initialize translation manager
let translationManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    translationManager = new TranslationManager();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, TranslationManager };
}