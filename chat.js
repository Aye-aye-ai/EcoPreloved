// --- VERSI FIXED: STRUCTURED FLOW SUPPORT ---
console.log(">>> SISTEM CHAT GEMINI (STRUCTURED) TELAH DIMUAT <<<");

// State Chat
let chatState = {
    isOpen: false,
    activeTab: 'bot',
    currentSeller: null,
    isTyping: false
};

// 1. Inisialisasi Event Listener
document.addEventListener('DOMContentLoaded', function () {
    initializeChatListeners();
    updateChatUI();

    // Pesan sapaan otomatis dengan MENU
    setTimeout(() => {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer && messagesContainer.children.length <= 1) {
            showOpeningOptions();
        }
    }, 1000);
});

window.addEventListener('languageChanged', (e) => {
    updateChatUI();
});

function updateChatUI() {
    const currentLang = localStorage.getItem('app_language') || 'id';
    if (typeof translations === 'undefined') return;
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.placeholder = translations[currentLang]['chat.placeholder'];
    }
}

function initializeChatListeners() {
    const botInput = document.getElementById('chatbotInput');
    if (botInput) {
        botInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
    }

    const sellerInput = document.getElementById('sellerChatInput');
    if (sellerInput) {
        sellerInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendSellerMessage();
            }
        });
    }
}

// --- LOGIKA FLOW CHATBOT ---

function showOpeningOptions() {
    const currentLang = localStorage.getItem('app_language') || 'id';
    const greeting = currentLang === 'id'
        ? "Halo! Selamat datang di EcoPreloved. Mau cari barang kategori apa?"
        : "Hello! Welcome to EcoPreloved. What category are you looking for?";

    addMessageToUI(greeting, 'bot');

    // Ambil kategori dari mockData
    const categories = mockData.categories.map(cat => ({
        label: `<i class="${cat.icon}"></i> ${cat.name}`,
        action: `CAT_${cat.id}`
    }));

    renderChatOptions(categories);
}

function renderChatOptions(options) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'chat-options';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.innerHTML = opt.label;
        btn.onclick = () => handleOptionClick(opt.action, opt.label);
        optionsDiv.appendChild(btn);
    });

    messagesContainer.appendChild(optionsDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleOptionClick(action, label) {
    // 1. Tampilkan pilihan user sebagai pesan user
    addMessageToUI(label, 'user');

    // 2. Hapus pilihan sebelumnya agar rapi (Opsional, tapi bagus UX)
    const lastOptions = document.querySelector('.chat-options:last-child');
    if (lastOptions) lastOptions.remove();

    // 3. Proses Logic
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();

        switch (action) {
            case "FLOW_GALLERY":
                showProductGallery();
                break;
            case "FLOW_PROBLEM":
                addMessageToUI("Mohon maaf atas ketidaknyamanan Anda. Ceritakan detail masalahnya, atau hubungi support@ecopreloved.id", 'bot');
                break;
            case "FLOW_MAIN_MENU":
                showOpeningOptions();
                break;
            default:
                // Jika kategori dipilih
                if (action.startsWith("CAT_")) {
                    const categoryId = action.replace("CAT_", "");
                    showProductsByCategory(categoryId);
                } else if (action.startsWith("PROD_")) {
                    const productId = action.replace("PROD_", "");
                    showProductImage(productId);
                } else {
                    // Fallback ke AI
                    processGeminiMessage(label);
                }
                break;
        }
    }, 800);
}

function showProductGallery() {
    addMessageToUI("Berikut adalah beberapa produk kami. Klik untuk melihat gambar detailnya:", 'bot');

    const productOptions = mockData.products.slice(0, 10).map(p => ({
        label: p.name,
        action: `PROD_${p.id}`
    }));

    renderChatOptions(productOptions);
}

function showProductImage(productId) {
    const product = mockData.products.find(p => p.id === productId);
    if (!product) return;

    const imgUrl = (product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/300';

    // Tampilkan gambar sebagai pesan bot
    addMessageToUI(`Ini adalah gambar untuk **${product.name}**:\n\n[IMAGE:${imgUrl}]`, 'bot');

    setTimeout(() => {
        renderChatOptions([
            { label: "🔙 Kembali ke Menu", action: "FLOW_MAIN_MENU" }
        ]);
    }, 500);
}

function showCategoryOptions() {
    if (typeof mockData === 'undefined' || !mockData.categories) {
        console.error("mockData is missing!");
        addMessageToUI("Maaf, sedang memuat data...", 'bot');
        return;
    }

    // Ambil kategori dari mockData
    const categories = mockData.categories.map(cat => ({
        label: `<i class="${cat.icon}"></i> ${cat.name}`,
        action: `CAT_${cat.id}`
    }));

    renderChatOptions(categories);
}

function showProductsByCategory(categoryId) {
    // Filter produk
    const products = mockData.products.filter(p => p.category === categoryId);

    if (products.length === 0) {
        addMessageToUI("Maaf, belum ada item di kategori ini.", 'bot');
        showCategoryOptions(); // Putar balik
        return;
    }

    const firstProduct = products[0];
    const categoryName = mockData.categories.find(c => c.id === categoryId)?.name || categoryId;

    // Tampilkan gambar produk unggulan terlebih dahulu
    const featuredImgUrl = (firstProduct.images && firstProduct.images.length > 0) ? firstProduct.images[0] : 'https://via.placeholder.com/300';
    addMessageToUI(`Berikut adalah produk unggulan di kategori **${categoryName}**:\n\n[IMAGE:${featuredImgUrl}|${firstProduct.id}]`, 'bot');

    // Beri jeda sedikit sebelum menampilkan seluruh list
    setTimeout(() => {
        // Buat string recommendation tags untuk semua produk di kategori ini
        // const recommendations = products.map(p => `[RECOMMEND:${p.id}]`).join(' ');

        // addMessageToUI(`Lihat juga koleksi lengkap ${categoryName} lainnya:\n${recommendations}`, 'bot');

        // Tampilkan opsi navigasi
        setTimeout(() => {
            renderChatOptions([
                { label: "🔍 Cari Kategori Lain", action: "FLOW_MAIN_MENU" }
            ]);
        }, 800);
    }, 1200);
}

// 2. FUNGSI UTAMA: Mengirim Pesan Manual
async function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (!message) return;

    // Tampilkan pesan user
    addMessageToUI(message, 'user');
    input.value = '';

    showTypingIndicator();

    try {
        await processGeminiMessage(message);
    } catch (error) {
        console.error("Error Gemini:", error);
        hideTypingIndicator();
        addMessageToUI("Maaf, koneksi sedang gangguan.", 'bot');
    }
}

async function processGeminiMessage(message) {
    // --- PANGGIL OTAK GEMINI ---
    const response = await getGeminiResponse(message);
    hideTypingIndicator();
    addMessageToUI(response, 'bot');
}

// 3. API Call ke Google Gemini (Tetap ada untuk CS/Manual Chat)
async function getGeminiResponse(userMessage) {
    const API_KEY = "AIzaSyDneXFNPqpqdtiecUSF1B7KMo7zmE6GYeI";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const currentLang = localStorage.getItem('app_language') || 'id';
    let systemInstruction = translations[currentLang]['chatbot.system_instruction'];

    // Tetap inject context (barangkali user nanya spesifik meski di mode CS)
    const productContext = getProductContext();
    systemInstruction = systemInstruction.replace('{{PRODUCT_CTX}}', productContext);

    const requestBody = {
        contents: [{
            role: "user",
            parts: [{ text: systemInstruction + "\n\nUser: " + userMessage }]
        }]
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return translations[currentLang]['chatbot.error_understanding'];
        }
    } catch (error) { throw error; }
}

// Helper: Format Data Produk untuk AI (Enriched for better recommendations)
function getProductContext() {
    if (typeof mockData === 'undefined' || !mockData.products) return 'No products available.';
    // Ambil 20 produk terbaru dengan info lebih lengkap agar AI bisa mencocokkan lebih baik
    return mockData.products.slice(0, 20).map(p =>
        `- ID: ${p.id} | Nama: ${p.name} | Kategori: ${p.category} | Harga: Rp${p.price} | Kondisi: ${p.usageDuration} pakai`
    ).join('\n');
}

// Helper: Buat Kartu Produk Chat yang Premium
function generateProductCardHTML(product) {
    const imgUrl = (product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/150';
    const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);

    return `
    <div class="chat-product-card">
        <img src="${imgUrl}" alt="${product.name}" onclick="showProductDetailInChat('${product.id}')" style="cursor: pointer;">
        <div class="chat-product-info">
            <h4 onclick="showProductDetailInChat('${product.id}')" style="cursor: pointer;">${product.name}</h4>
            <p class="price">${priceFormatted}</p>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="showProductDetailInChat('${product.id}')" class="view-btn" style="flex: 1;">Detail</button>
                <button onclick="addToCartFromChat('${product.id}')" class="view-btn" style="flex: 1; background: var(--primary); color: white;">+ Keranjang</button>
            </div>
        </div>
    </div>
    `;
}

// Integrasi Keranjang dari Chat
window.addToCartFromChat = function (productId) {
    const product = mockData.products.find(p => p.id === productId);
    if (product) {
        // Cari fungsi addToCart global (biasanya di cart.js atau main.js)
        if (typeof addToCart === 'function') {
            addToCart(product.id);
            utils.showNotification(`"${product.name}" ditambahkan ke keranjang! 🛍️`, 'success');
        } else {
            console.error("Fungsi addToCart tidak ditemukan");
        }
    }
};

window.showProductDetailInChat = function (productId) {
    const product = mockData.products.find(p => p.id === productId);
    if (product && typeof viewProductDetails === 'function') {
        viewProductDetails(product.id);
    }
};

// 4. Helper UI: Menampilkan Pesan dengan Dukungan Tag Baru
function addMessageToUI(content, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    const senderClass = sender === 'bot' ? 'bot-message' : 'user-message';
    messageDiv.className = `message ${senderClass}`;

    // 1. Bersihkan content dari tag spesial untuk teks utama
    let textContent = content
        .replace(/\[RECOMMEND:.*?\]/g, '')
        .replace(/\[CATEGORY:.*?\]/g, '')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br>')
        .trim();

    // 0. Deteksi Tag Gambar [IMAGE:url|productId]
    const imageMatch = textContent.match(/\[IMAGE:(.*?)(?:\|(.*?))?\]/);
    let imageHtml = '';
    if (imageMatch) {
        const imageUrl = imageMatch[1];
        const productId = imageMatch[2];
        if (productId) {
            imageHtml = `<div class="message-image clickable" onclick="showProductDetailInChat('${productId}')"><img src="${imageUrl}" alt="Product Image"></div>`;
        } else {
            imageHtml = `<div class="message-image"><img src="${imageUrl}" alt="Product Image"></div>`;
        }
        textContent = textContent.replace(/\[IMAGE:.*?\]/g, '');
    }

    const avatarIcon = sender === 'bot' ? 'fa-robot' : 'fa-user';
    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas ${avatarIcon}"></i></div>
        <div class="message-content">
            ${imageHtml}
            <p>${textContent || (imageMatch ? '' : '...')}</p>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);

    // 2. Render Rekomendasi Produk jika ada
    const recommendMatches = content.match(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/g);
    if (recommendMatches) {
        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'chat-carousel';

        recommendMatches.forEach(match => {
            const productId = match.match(/\[RECOMMEND:\s*([a-zA-Z0-9-]+)\]/)[1];
            const product = mockData.products.find(p => p.id === productId);
            if (product) {
                carouselDiv.innerHTML += generateProductCardHTML(product);
            }
        });

        if (carouselDiv.children.length > 0) {
            messagesContainer.appendChild(carouselDiv);
        }
    }

    // 3. Render Link Kategori jika ada
    const categoryMatches = content.match(/\[CATEGORY:\s*([a-zA-Z0-9-]+)\]/g);
    if (categoryMatches) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';

        categoryMatches.forEach(match => {
            const catId = match.match(/\[CATEGORY:\s*([a-zA-Z0-9-]+)\]/)[1];
            const cat = mockData.categories.find(c => c.id === catId);
            if (cat) {
                const btn = document.createElement('button');
                btn.className = 'chat-option-btn';
                btn.innerHTML = `<i class="${cat.icon}"></i> Lihat ${cat.name}`;
                btn.onclick = () => handleOptionClick(`CAT_${cat.id}`, `Lihat ${cat.name}`);
                optionsDiv.appendChild(btn);
            }
        });

        if (optionsDiv.children.length > 0) {
            messagesContainer.appendChild(optionsDiv);
        }
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 5. Typing Indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator-container';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content" style="padding: 10px;">
            <i class="fas fa-ellipsis-h fa-beat"></i> Mengetik...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.remove();
}

// 6. Fungsi Toggle
function toggleChatbot() {
    const container = document.getElementById('chatbotContainer');
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'flex';
        container.classList.add('active');
        // Auto scroll down
        const msgContainer = document.getElementById('chatbotMessages');
        if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
    } else {
        container.style.display = 'none';
        container.classList.remove('active');
    }
}

// 7. Fungsi Kirim Pesan Seller
function sendSellerMessage() {
    // ... (Logic seller chat sama seperti sebelumnya, aman)
    const input = document.getElementById('sellerChatInput');
    const container = document.getElementById('sellerChatMessages');
    if (!input || !input.value.trim()) return;

    const div = document.createElement('div');
    div.className = 'message user-message';
    div.innerHTML = `<div class="message-content"><p>${input.value}</p></div>`;
    container.appendChild(div);
    input.value = '';

    // Gunakan fungsi global simulasi jika ada, atau fallback sederhana
    if (typeof window.sendSellerMessage === 'function' && window.sendSellerMessage.name !== 'sendSellerMessage') {
        // Recursive guard: jika fungsi ini menimpa global main.js, panggil logic simulation disana
        // Tapi karena kita replace logic disini, kita buat mandiri saja.
    }

    setTimeout(() => {
        const divReply = document.createElement('div');
        divReply.className = 'message seller-message';
        divReply.innerHTML = `
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=seller-rep" class="chat-avatar">
            <div class="message-content"><p>Halo! Barang ready.</p></div>
        `;
        container.appendChild(divReply);
        container.scrollTop = container.scrollHeight;
    }, 1500);
}
// Ekspose ke global window agar HTML onclick bisa akses
window.toggleChatbot = toggleChatbot;
window.sendChatbotMessage = sendChatbotMessage;
window.sendSellerMessage = sendSellerMessage;