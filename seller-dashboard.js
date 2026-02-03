// Seller Dashboard JavaScript

// Current seller ID (in production, this would come from authentication)
const CURRENT_SELLER_ID = 'user-2'; // Siti Aminah
let currentChatUserId = null;
let editingProductId = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function () {
    loadProductsFromStorage(); // Load products first
    initializeDashboard();
    setupEventListeners();
    loadDashboardData();
});

// Load products from localStorage and merge with mockData
function loadProductsFromStorage() {
    const storedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

    if (storedProducts.length > 0) {
        // Merge stored products with mockData, avoiding duplicates
        storedProducts.forEach(storedProduct => {
            const exists = mockData.products.find(p => p.id === storedProduct.id);
            if (!exists) {
                mockData.products.unshift(storedProduct);
            } else {
                // Update existing product with stored version (in case it was edited)
                const index = mockData.products.findIndex(p => p.id === storedProduct.id);
                if (index !== -1) {
                    mockData.products[index] = storedProduct;
                }
            }
        });
    }
}

// Initialize dashboard
function initializeDashboard() {
    // Set active section from hash or default to dashboard
    const hash = window.location.hash.substring(1) || 'dashboard';
    navigateToSection(hash);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            navigateToSection(section);
        });
    });

    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }

    // Message search
    const messageSearch = document.getElementById('messageSearch');
    if (messageSearch) {
        messageSearch.addEventListener('input', filterConversations);
    }

    // Product filters
    const statusFilter = document.getElementById('productStatusFilter');
    const categoryFilter = document.getElementById('productCategoryFilter');
    if (statusFilter) statusFilter.addEventListener('change', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

    // Chat input enter key
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Close modal on overlay click
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeProductModal);
    }
}

// Navigate to section
function navigateToSection(sectionId) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // Show active section
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update URL hash
    window.location.hash = sectionId;

    // Load section-specific data
    if (sectionId === 'messages') {
        loadConversations();
    } else if (sectionId === 'products') {
        loadSellerProducts();
    }
}

// Load dashboard data
function loadDashboardData() {
    updateDashboardStats();
    loadConversations();
    loadSellerProducts();
}

// Update dashboard statistics
function updateDashboardStats() {
    const sellerProducts = mockData.products.filter(p => p.sellerId === CURRENT_SELLER_ID);
    const soldProducts = sellerProducts.filter(p => p.status === 'sold');

    // Count messages from all conversations with this seller
    let totalMessages = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('chat_seller_' + CURRENT_SELLER_ID + '_buyer_')) {
            const history = JSON.parse(localStorage.getItem(key));
            totalMessages += history.length;
        }
    }

    // Get seller info
    const seller = mockData.users.find(u => u.id === CURRENT_SELLER_ID);

    // Update stats
    document.getElementById('totalProducts').textContent = sellerProducts.length;
    document.getElementById('soldProducts').textContent = soldProducts.length;
    document.getElementById('totalMessages').textContent = totalMessages;
    document.getElementById('sellerRating').textContent = seller ? seller.rating.toFixed(1) : '0.0';
}

// Load conversations
function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    if (!conversationsList) return;

    const conversations = [];

    // Get all chat histories where buyers contacted this seller
    // Key format: chat_seller_{sellerId}_buyer_{buyerId}
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Look for chats where this seller is involved
        if (key.startsWith('chat_seller_' + CURRENT_SELLER_ID + '_buyer_')) {
            const buyerId = key.replace('chat_seller_' + CURRENT_SELLER_ID + '_buyer_', '');
            const history = JSON.parse(localStorage.getItem(key));

            if (history.length > 0) {
                const lastMessage = history[history.length - 1];

                // Count unread messages (messages from buyer that seller hasn't seen)
                const unreadCount = history.filter(msg => msg.sender === 'user' && !msg.read).length;

                conversations.push({
                    buyerId: buyerId,
                    buyerName: `Pembeli ${buyerId.substring(0, 8)}`,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${buyerId}`,
                    lastMessage: lastMessage.text,
                    lastSender: lastMessage.sender,
                    time: lastMessage.time,
                    unread: unreadCount
                });
            }
        }
    }

    if (conversations.length === 0) {
        conversationsList.innerHTML = `
            <div style="padding: var(--space-8); text-align: center; color: var(--gray-400);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: var(--space-2);"></i>
                <p>Belum ada percakapan</p>
                <small style="display: block; margin-top: var(--space-2); color: var(--gray-500);">
                    Pesan dari pembeli akan muncul di sini
                </small>
            </div>
        `;
        return;
    }

    // Sort by most recent
    conversations.sort((a, b) => {
        // Simple time comparison (you might want to use actual timestamps in production)
        return 0; // Keep current order for now
    });

    conversationsList.innerHTML = conversations.map(conv => `
        <div class="conversation-item ${conv.unread > 0 ? 'has-unread' : ''}" onclick="openConversation('${conv.buyerId}', '${conv.buyerName}', '${conv.avatar}')">
            <img src="${conv.avatar}" alt="${conv.buyerName}" class="conversation-avatar">
            <div class="conversation-info">
                <div class="conversation-name">
                    <span>${conv.buyerName}</span>
                    <span class="conversation-time">${conv.time}</span>
                </div>
                <div class="conversation-preview">
                    ${conv.lastSender === 'user' ? '' : 'Anda: '}${conv.lastMessage}
                </div>
            </div>
            ${conv.unread > 0 ? `<div class="unread-badge">${conv.unread}</div>` : ''}
        </div>
    `).join('');
}

// Open conversation
function openConversation(buyerId, buyerName, avatar) {
    currentChatUserId = buyerId;

    // Update active conversation
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Show chat container
    document.getElementById('emptyMessageState').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'flex';

    // Update chat header
    document.getElementById('chatAvatar').src = avatar;
    document.getElementById('chatUserName').textContent = buyerName;

    // Load messages
    loadMessages(buyerId);

    // Mark messages as read
    markMessagesAsRead(buyerId);
}

// Load messages
function loadMessages(buyerId) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const historyKey = `chat_seller_${CURRENT_SELLER_ID}_buyer_${buyerId}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];

    if (history.length === 0) {
        chatMessages.innerHTML = `
            <div style="text-align: center; padding: var(--space-8); color: var(--gray-400);">
                <i class="fas fa-comment-slash" style="font-size: 2rem; margin-bottom: var(--space-2);"></i>
                <p>Belum ada pesan</p>
            </div>
        `;
        return;
    }

    chatMessages.innerHTML = history.map(msg => `
        <div class="message ${msg.sender}-message">
            <div class="message-avatar">
                ${msg.sender === 'seller' ?
            `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_SELLER_ID}">` :
            `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${buyerId}">`
        }
            </div>
            <div class="message-content">
                <p>${msg.text}</p>
                <div class="message-time">${msg.time}</div>
            </div>
        </div>
    `).join('');

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mark messages as read
function markMessagesAsRead(buyerId) {
    const historyKey = `chat_seller_${CURRENT_SELLER_ID}_buyer_${buyerId}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];

    // Mark all messages as read
    history.forEach(msg => {
        if (msg.sender === 'user') {
            msg.read = true;
        }
    });

    localStorage.setItem(historyKey, JSON.stringify(history));

    // Reload conversations to update unread count
    loadConversations();
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput || !currentChatUserId) return;

    const message = chatInput.value.trim();
    if (!message) return;

    const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Save to localStorage with new key format
    const historyKey = `chat_seller_${CURRENT_SELLER_ID}_buyer_${currentChatUserId}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history.push({
        text: message,
        sender: 'seller',
        time: currentTime,
        read: false
    });
    localStorage.setItem(historyKey, JSON.stringify(history));

    // Clear input
    chatInput.value = '';

    // Reload messages
    loadMessages(currentChatUserId);

    // Reload conversations to update preview
    loadConversations();

    // Show notification
    if (typeof utils !== 'undefined') {
        utils.showNotification('Pesan terkirim', 'success');
    }
}

// Filter conversations
function filterConversations() {
    const searchTerm = document.getElementById('messageSearch').value.toLowerCase();
    const conversations = document.querySelectorAll('.conversation-item');

    conversations.forEach(conv => {
        const userName = conv.querySelector('.conversation-name span').textContent.toLowerCase();
        const preview = conv.querySelector('.conversation-preview').textContent.toLowerCase();

        if (userName.includes(searchTerm) || preview.includes(searchTerm)) {
            conv.style.display = 'flex';
        } else {
            conv.style.display = 'none';
        }
    });
}

// Load seller products
function loadSellerProducts() {
    const productsGrid = document.getElementById('sellerProductsGrid');
    if (!productsGrid) return;

    let products = mockData.products.filter(p => p.sellerId === CURRENT_SELLER_ID);

    // Apply filters
    const statusFilter = document.getElementById('productStatusFilter')?.value;
    const categoryFilter = document.getElementById('productCategoryFilter')?.value;

    if (statusFilter && statusFilter !== 'all') {
        products = products.filter(p => p.status === statusFilter);
    }

    if (categoryFilter && categoryFilter !== 'all') {
        products = products.filter(p => p.category === categoryFilter);
    }

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-products-state">
                <div class="empty-icon">
                    <i class="fas fa-box-open"></i>
                </div>
                <h3>Belum ada produk</h3>
                <p>Mulai tambahkan produk preloved Anda untuk dijual</p>
                <button class="btn btn-primary" onclick="showAddProductModal()">
                    <i class="fas fa-plus"></i> Tambah Produk
                </button>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="seller-product-card">
            <div class="seller-product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="seller-product-status ${product.status}">${product.status}</div>
            </div>
            <div class="seller-product-content">
                <h3 class="seller-product-title">${product.name}</h3>
                <div class="seller-product-price">${utils.formatPrice(product.price)}</div>
                <div class="seller-product-actions">
                    <button class="btn-edit" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    loadSellerProducts();
}

// Show add product modal
function showAddProductModal() {
    editingProductId = null;
    document.getElementById('productModalTitle').textContent = 'Tambah Produk Baru';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';

    document.getElementById('productModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// Edit product
function editProduct(productId) {
    const product = mockData.products.find(p => p.id === productId);
    if (!product) return;

    editingProductId = productId;
    document.getElementById('productModalTitle').textContent = 'Edit Produk';

    // Fill form
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productReason').value = product.reasonForSelling || '';
    document.getElementById('productUsage').value = product.usageDuration || '';
    document.getElementById('productImage').value = product.images[0] || '';

    document.getElementById('productModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    const index = mockData.products.findIndex(p => p.id === productId);
    if (index !== -1) {
        mockData.products.splice(index, 1);

        // Remove from localStorage
        const storedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
        const storedIndex = storedProducts.findIndex(p => p.id === productId);
        if (storedIndex !== -1) {
            storedProducts.splice(storedIndex, 1);
            localStorage.setItem('allProducts', JSON.stringify(storedProducts));
        }

        loadSellerProducts();
        updateDashboardStats();

        if (typeof utils !== 'undefined') {
            utils.showNotification('Produk berhasil dihapus', 'success');
        }
    }
}

// Handle product form submit
function handleProductSubmit(e) {
    e.preventDefault();

    const productData = {
        id: editingProductId || 'prod-' + Date.now(),
        sellerId: CURRENT_SELLER_ID,
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        reasonForSelling: document.getElementById('productReason').value || 'Tidak disebutkan',
        usageDuration: document.getElementById('productUsage').value || 'Tidak disebutkan',
        images: [document.getElementById('productImage').value || 'https://via.placeholder.com/300x300.png?text=No+Image'],
        status: 'available',
        createdAt: new Date().toISOString(),
        seller: mockData.users.find(u => u.id === CURRENT_SELLER_ID)
    };

    if (editingProductId) {
        // Update existing product
        const index = mockData.products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            mockData.products[index] = { ...mockData.products[index], ...productData };

            // Update in localStorage
            const storedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
            const storedIndex = storedProducts.findIndex(p => p.id === editingProductId);
            if (storedIndex !== -1) {
                storedProducts[storedIndex] = mockData.products[index];
            }
            localStorage.setItem('allProducts', JSON.stringify(storedProducts));

            if (typeof utils !== 'undefined') {
                utils.showNotification('Produk berhasil diperbarui', 'success');
            }
        }
    } else {
        // Add new product
        mockData.products.unshift(productData);

        // Save to localStorage for persistence
        const storedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
        storedProducts.unshift(productData);
        localStorage.setItem('allProducts', JSON.stringify(storedProducts));

        if (typeof utils !== 'undefined') {
            utils.showNotification('Produk berhasil ditambahkan', 'success');
        }
    }

    closeProductModal();
    loadSellerProducts();
    updateDashboardStats();
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    editingProductId = null;
}

// Export functions for global access
window.navigateToSection = navigateToSection;
window.showAddProductModal = showAddProductModal;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.closeProductModal = closeProductModal;
window.openConversation = openConversation;
window.sendMessage = sendMessage;
