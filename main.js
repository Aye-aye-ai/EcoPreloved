// Main application logic

// Application state
const app = {
    initialized: false,
    currentPage: 'home',
    filters: {
        search: '',
        category: 'all',
        sort: 'newest'
    }
};

// Initialize the application
function initApp() {
    if (app.initialized) return;

    console.log('🌱 EcoPreloved Marketplace - Initializing...');

    // Wait for all dependencies to load
    setTimeout(() => {
        try {
            // Initialize all modules
            initializeModules();

            // Setup global event listeners
            setupGlobalListeners();

            // Initialize page content
            initializePageContent();

            // Mark as initialized
            app.initialized = true;

            console.log('✅ EcoPreloved Marketplace - Ready!');

            // Show welcome message for first-time visitors
            showWelcomeMessage();

        } catch (error) {
            console.error('❌ Error initializing app:', error);
            utils.showNotification('Terjadi kesalahan saat memuat aplikasi', 'error');
        }
    }, 200);
}

// Initialize all modules
function initializeModules() {
    // Translation manager should already be initialized
    if (!translationManager) {
        console.warn('Translation manager not found');
    }

    // Initialize auth state
    if (typeof initAuthState === 'function') {
        initAuthState();
    }

    // Initialize chatbot
    //initializeChatbot();

    // Initialize cart
    if (typeof initCart === 'function') {
        initCart();
    }

    // Sync sold items from persistence
    syncSoldStatus();

    // Initialize service worker for offline support
    initializeServiceWorker();
}

// Function to sync sold status from localStorage
function syncSoldStatus() {
    const soldItems = JSON.parse(localStorage.getItem('soldItems') || '[]');
    if (soldItems.length > 0 && typeof mockData !== 'undefined') {
        mockData.products.forEach(p => {
            if (soldItems.includes(p.id)) {
                p.status = 'sold';
            }
        });
        console.log("Synced sold items:", soldItems);
    }
}

// Setup global event listeners
function setupGlobalListeners() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handlePopState);

    // Handle online/offline status
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Handle window resize
    window.addEventListener('resize', utils.debounce(handleWindowResize, 250));

    // Handle scroll for performance optimizations
    window.addEventListener('scroll', utils.debounce(handleScroll, 100));

    // Global keyboard shortcuts
    document.addEventListener('keydown', handleGlobalKeyboard);

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Initialize page content
function initializePageContent() {
    // Render initial content
    if (typeof renderCategoryGrid === 'function') {
        renderCategoryGrid();
    }

    if (typeof renderProductsGrid === 'function') {
        renderProductsGrid();
    }

    // Setup component event listeners
    if (typeof setupEventListeners === 'function') {
        setupEventListeners();
    }

    if (typeof setupAuthListeners === 'function') {
        setupAuthListeners();
    }

    if (typeof setupCartListeners === 'function') {
        setupCartListeners();
    }

    // Initialize lazy loading for images
    initializeLazyLoading();

    // Initialize intersection observer for animations
    initializeAnimations();
}

// Handle browser navigation
function handlePopState(event) {
    // Handle browser back/forward navigation
    const currentHash = window.location.hash;
    if (currentHash) {
        const element = document.querySelector(currentHash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Handle online status
function handleOnlineStatus() {
    utils.showNotification('Koneksi internet tersambung kembali', 'success');
    // Sync any pending data
    syncPendingData();
}

// Handle offline status
function handleOfflineStatus() {
    utils.showNotification('Anda sedang offline. Beberapa fitur mungkin tidak tersedia.', 'warning');
}

// Handle window resize
function handleWindowResize() {
    // Close mobile menu if window becomes large
    if (window.innerWidth >= 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    // Close user dropdown on resize
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown && userDropdown.classList.contains('active')) {
        userDropdown.classList.remove('active');
    }
}

// Handle scroll events
function handleScroll() {
    const scrollTop = window.pageYOffset;

    // Add shadow to header when scrolled
    const header = document.querySelector('.header');
    if (header) {
        if (scrollTop > 10) {
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.boxShadow = 'none';
        }
    }

    // Show/hide scroll to top button
    toggleScrollToTopButton(scrollTop);
}

// Handle global keyboard shortcuts
function handleGlobalKeyboard(event) {
    // Escape key - close modals, dropdowns, etc.
    if (event.key === 'Escape') {
        closeAllOverlays();
    }

    // Ctrl/Cmd + K - focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        focusSearch();
    }

    // Ctrl/Cmd + / - show keyboard shortcuts
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        showKeyboardShortcuts();
    }
}

// Handle visibility change (tab switching)
function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden (user switched tabs)
        pauseAnimations();
    } else {
        // Page is visible again
        resumeAnimations();

        // Refresh data if needed
        refreshDataIfNeeded();
    }
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize animations with intersection observer
function initializeAnimations() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate on scroll
        document.querySelectorAll('.card, .feature-card, .hero-card').forEach(el => {
            animationObserver.observe(el);
        });
    }
}

// --- FITUR CHATBOT (MOVED TO chat.js) ---
// Inisialisasi chatbot sekarang ditangani secara otomatis oleh chat.js
// melalui listener DOMContentLoaded.

// --- FITUR JUAL BARANG ---
function toggleSellModal() {
    const modal = document.getElementById('sellModal');
    if (modal) {
        modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'flex' : 'none';

        // Reset form jika ditutup
        if (modal.style.display === 'none') {
            document.getElementById('sellForm').reset();
        }
    }
}

function handleSellSubmit(e) {
    e.preventDefault();
    const newProduct = {
        id: 'user-' + Date.now(),
        sellerId: 'current-user', // Asumsi user login
        seller: {
            id: 'current-user',
            name: 'Anda (Penjual)',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
            rating: 5.0,
            totalSales: 0
        },
        name: document.getElementById('prodName').value,
        category: document.getElementById('prodCategory').value,
        price: parseInt(document.getElementById('prodPrice').value),
        description: document.getElementById('prodDesc').value,
        reasonForSelling: 'Barang pribadi',
        usageDuration: '-',
        images: ['https://via.placeholder.com/300x300.png?text=' + document.getElementById('prodName').value],
        status: 'available',
        createdAt: new Date().toISOString()
    };

    // Simpan ke MockData (In-Memory) & LocalStorage agar persisten
    if (typeof mockData !== 'undefined') {
        mockData.products.unshift(newProduct); // Tambah ke awal
    }

    // Simpan ke LocalStorage khusus user products
    const existing = JSON.parse(localStorage.getItem('ecoUserProducts')) || [];
    existing.push(newProduct);
    localStorage.setItem('ecoUserProducts', JSON.stringify(existing));

    toggleSellModal();

    // Refresh Grid
    if (typeof renderProductsGrid === 'function') {
        renderProductsGrid(mockData.products); // Re-render semua
    }

    utils.showNotification("Berhasil! Produk Anda sudah tayang.", "success");
}

// --- FITUR SELLER CHAT (ENHANCED) ---
let currentChatSellerId = null;

function openSellerChat(sellerId, sellerName) {
    const modal = document.getElementById('sellerChatModal');
    const sellerNameElement = document.getElementById('sellerName');
    const chatMessages = document.getElementById('sellerChatMessages');

    if (!modal || !sellerNameElement || !chatMessages) return;

    currentChatSellerId = sellerId; // Set current seller
    sellerNameElement.textContent = sellerName;
    chatMessages.innerHTML = '';

    // Generate or get buyer ID (in production, this would come from authentication)
    let buyerId = localStorage.getItem('currentBuyerId');
    if (!buyerId) {
        buyerId = 'buyer-' + Date.now();
        localStorage.setItem('currentBuyerId', buyerId);
    }

    // LOAD HISTORY DARI LOCAL STORAGE with new key format
    const historyKey = `chat_seller_${sellerId}_buyer_${buyerId}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];

    if (history.length === 0) {
        // Pesan otomatis dari penjual saat chat pertama kali dibuka
        addSellerMessage('Terimakasih sudah memesan silahkan lanjutkan ke pembayaran.', 'seller', true);
    } else {
        // Load existing chat history
        history.forEach(msg => {
            // Render manual agar tidak double save
            renderSellerMessage(msg.text, msg.sender, msg.time);
        });
    }

    showModal('sellerChatModal');

    setTimeout(() => {
        const chatInput = document.getElementById('sellerChatInput');
        if (chatInput) chatInput.focus();
    }, 300);
}

function closeSellerChat() {
    closeModal('sellerChatModal');
    currentChatSellerId = null;
}

function sendSellerMessage() {
    const chatInput = document.getElementById('sellerChatInput');
    if (!chatInput) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message & Save
    addSellerMessage(message, 'user', true);
    chatInput.value = '';

    // Chat sekarang berjalan manual - tidak ada auto-reply
    // Penjual harus membalas dari dashboard penjual
}

// Helper: Add & Save
function addSellerMessage(message, sender, saveToLS = true) {
    const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // 1. Render UI
    renderSellerMessage(message, sender, currentTime);

    // 2. Save to LocalStorage with new key format
    if (saveToLS && currentChatSellerId) {
        // Get buyer ID
        let buyerId = localStorage.getItem('currentBuyerId');
        if (!buyerId) {
            buyerId = 'buyer-' + Date.now();
            localStorage.setItem('currentBuyerId', buyerId);
        }

        const historyKey = `chat_seller_${currentChatSellerId}_buyer_${buyerId}`;
        const history = JSON.parse(localStorage.getItem(historyKey)) || [];
        history.push({
            text: message,
            sender: sender,
            time: currentTime,
            read: false  // Will be marked as read when seller opens the chat
        });
        localStorage.setItem(historyKey, JSON.stringify(history));
    }
}

// Helper: Render Only
function renderSellerMessage(message, sender, time) {
    const chatMessages = document.getElementById('sellerChatMessages');
    if (!chatMessages) return;

    // Get buyer ID for avatar
    let buyerId = localStorage.getItem('currentBuyerId') || 'buyer-default';

    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;

    messageElement.innerHTML = `
        <div class="message-avatar">
            ${sender === 'seller' ?
            '<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=seller">' :
            `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${buyerId}">`
        }
        </div>
        <div class="message-content">
            <p>${message}</p>
            <div class="message-time">${time}</div>
        </div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Setup seller chat listeners
function setupSellerChatListeners() {
    const sellerChatInput = document.getElementById('sellerChatInput');
    if (sellerChatInput) {
        sellerChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendSellerMessage();
            }
        });
    }
}

// ... Utility functions (keep existing) ...

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        toggleChatbot,
        sendChatbotMessage,
        openSellerChat,
        closeSellerChat,
        sendSellerMessage,
        toggleSellModal,
        handleSellSubmit,
        showMessagesInbox,
        app
    };
}

// Show Message Inbox
function showMessagesInbox() {
    // Close dropdown
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) userDropdown.classList.remove('active');

    // Reuse products section for Inbox UI
    const productsSection = document.getElementById('products');
    const productsGrid = document.getElementById('productsGrid');
    const sectionTitle = document.querySelector('#products .section-title');
    const sectionSubtitle = document.querySelector('#products .section-subtitle');

    if (!productsSection || !productsGrid) return;

    // Scroll to section
    productsSection.scrollIntoView({ behavior: 'smooth' });

    // Update Header
    if (sectionTitle) {
        sectionTitle.textContent = "Kotak Masuk Pesan";

        let backBtn = document.getElementById('backToAllBtn');
        if (!backBtn) {
            backBtn = document.createElement('button');
            backBtn.id = 'backToAllBtn';
            backBtn.className = 'btn btn-outline btn-sm';
            backBtn.style.marginLeft = '1rem';
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Kembali';
            backBtn.onclick = () => window.location.reload();
            sectionTitle.appendChild(backBtn);
        }
    }

    // Find all chat histories
    const chats = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('chat_history_')) {
            const sellerId = key.replace('chat_history_', '');
            const history = JSON.parse(localStorage.getItem(key));
            if (history.length > 0) {
                // Find seller name from Mock Data (or cache)
                let sellerName = "Unknown Seller";
                const productWithSeller = mockData.products.find(p => p.seller.id === sellerId);
                if (productWithSeller) {
                    sellerName = productWithSeller.seller.name;
                }

                chats.push({
                    sellerId: sellerId,
                    sellerName: sellerName,
                    lastMessage: history[history.length - 1]
                });
            }
        }
    }

    if (sectionSubtitle) sectionSubtitle.textContent = `Anda memiliki ${chats.length} percakapan aktif`;

    // Render Chat List
    if (chats.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon"><i class="fas fa-comment-slash"></i></div>
                <h3 class="empty-title">Belum ada pesan</h3>
                <p class="empty-description">Chat penjual untuk menanyakan produk.</p>
                <button class="btn btn-primary" onclick="window.location.reload()">Mulai Belanja</button>
            </div>
        `;
    } else {
        productsGrid.innerHTML = chats.map(chat => `
            <div class="card" onclick="openSellerChat('${chat.sellerId}', '${chat.sellerName}')" style="cursor: pointer; display: flex; align-items: center; padding: 1.5rem; gap: 1rem;">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.sellerName}" style="width: 50px; height: 50px; border-radius: 50%;">
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <h4 style="margin: 0; font-size: 1.1rem;">${chat.sellerName}</h4>
                        <span style="font-size: 0.8rem; color: #666;">${chat.lastMessage.time}</span>
                    </div>
                    <p style="margin: 0; color: #444; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 300px;">
                        ${chat.lastMessage.sender === 'user' ? 'Anda: ' : ''}${chat.lastMessage.text}
                    </p>
                </div>
                <div style="color: var(--primary);">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `).join('');
    }
}

// Pastikan fungsi Jual & Chat terekspos ke window
window.toggleSellModal = toggleSellModal;
window.handleSellSubmit = handleSellSubmit;
window.openSellerChat = openSellerChat;
window.closeSellerChat = closeSellerChat;
window.sendSellerMessage = sendSellerMessage;
window.showMessagesInbox = showMessagesInbox; // Expose new function

// Utility functions
function closeAllOverlays() {
    // Close modals
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });

    // Close cart
    if (isCartOpen) {
        toggleCart();
    }

    // Close chatbot
    const chatbotContainer = document.getElementById('chatbotContainer');
    if (chatbotContainer && chatbotContainer.classList.contains('active')) {
        toggleChatbot();
    }

    // Close dropdowns
    document.querySelectorAll('.user-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
    });

    // Close mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }

    // Remove overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }

    // Restore body scroll
    document.body.style.overflow = '';
}

function focusSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.focus();
        searchInput.select();
    }
}

function showKeyboardShortcuts() {
    utils.showNotification('Keyboard Shortcuts:\n• Esc: Close overlays\n• Ctrl+K: Focus search\n• Ctrl+/: Show shortcuts', 'info');
}

function toggleScrollToTopButton(scrollTop) {
    let scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollTop > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.id = 'scrollToTopBtn';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.onclick = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            document.body.appendChild(scrollToTopBtn);
        }
        scrollToTopBtn.style.display = 'flex';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.display = 'none';
    }
}

function pauseAnimations() {
    document.body.classList.add('animations-paused');
}

function resumeAnimations() {
    document.body.classList.remove('animations-paused');
}

function refreshDataIfNeeded() {
    // Check if data needs refreshing (e.g., if user was away for a long time)
    const lastRefresh = localStorage.getItem('lastDataRefresh');
    const now = Date.now();

    if (!lastRefresh || now - parseInt(lastRefresh) > 300000) { // 5 minutes
        // Refresh data here if needed
        localStorage.setItem('lastDataRefresh', now.toString());
    }
}

// Initialize service worker for offline support
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker: Registered successfully with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker: Registration failed:', error);
                });
        });
    }
}

function syncPendingData() {
    // Sync any data that was stored while offline
    console.log('Syncing pending data...');
}

function showWelcomeMessage() {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
        setTimeout(() => {
            utils.showNotification('Selamat datang di EcoPreloved! Marketplace ramah lingkungan untuk barang berkualitas.', 'success');
            localStorage.setItem('hasVisited', 'true');
        }, 2000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Setup seller chat listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', setupSellerChatListeners);

// Add scroll to top button styles
const scrollToTopCSS = `
<style>
.scroll-to-top {
    position: fixed;
    bottom: 6rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
    z-index: 998;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-sm);
}

.scroll-to-top:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

.animations-paused * {
    animation-play-state: paused !important;
    transition: none !important;
}

@media (max-width: 640px) {
    .scroll-to-top {
        bottom: 8rem;
        right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
    }
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', scrollToTopCSS);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        toggleChatbot,
        sendChatbotMessage,
        openSellerChat,
        closeSellerChat,
        sendSellerMessage,
        app
    };
}