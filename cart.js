// Shopping Cart functionality

// Cart state
let cartItems = [];
let isCartOpen = false;

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add product to cart
function addToCart(productId) {
    const product = mockData.products.find(p => p.id === productId);
    if (!product) return;

    if (product.status !== 'available') {
        utils.showNotification('Produk ini tidak tersedia', 'error');
        return;
    }

    // Check if item already in cart
    const existingItem = cartItems.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: utils.generateId(),
            productId: productId,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }

    saveCart();
    updateCartUI();

    // Show success notification
    utils.showNotification(
        translationManager ? translationManager.translate('notification.added-to-cart') : 'Produk berhasil ditambahkan ke keranjang',
        'success'
    );

    // Auto-open cart
    setTimeout(() => {
        toggleCart();
    }, 500);
}

// Remove product from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.productId !== productId);
    saveCart();
    updateCartUI();

    utils.showNotification(
        translationManager ? translationManager.translate('notification.removed-from-cart') : 'Produk dihapus dari keranjang',
        'success'
    );
}

// Update product quantity in cart
function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cartItems.find(item => item.productId === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// Get cart total
function getCartTotal() {
    return cartItems.reduce((total, item) => {
        const product = mockData.products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Get cart item count
function getCartItemCount() {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');

    if (!cartSidebar || !overlay) return;

    isCartOpen = !isCartOpen;

    if (isCartOpen) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    updateCartContent();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const itemCount = getCartItemCount();

    if (cartCount) {
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
    }
}

// Update cart content
function updateCartContent() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');

    if (!cartContent || !cartFooter) return;

    if (cartItems.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <h3>${translationManager ? translationManager.translate('cart.empty') : 'Keranjang Anda kosong'}</h3>
                <p>Mulai belanja dan temukan barang preloved berkualitas untuk bumi yang lebih baik.</p>
                <button class="btn btn-primary" onclick="toggleCart(); scrollToProducts();">
                    ${translationManager ? translationManager.translate('hero.cta') : 'Mulai Belanja'}
                </button>
            </div>
        `;
        cartFooter.innerHTML = '';
        return;
    }

    // Render cart items
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cartItems.map(item => createCartItemHTML(item)).join('')}
        </div>
    `;

    // Render cart footer
    const subtotal = getCartTotal();
    const shippingFee = cartItems.length > 0 ? 15000 : 0;
    const total = subtotal + shippingFee;

    cartFooter.innerHTML = `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal</span>
                <span class="price">${translationManager ? translationManager.formatCurrency(subtotal) : utils.formatPrice(subtotal)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Ongkos Kirim</span>
                <span class="price">${translationManager ? translationManager.formatCurrency(shippingFee) : utils.formatPrice(shippingFee)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Asuransi Eco-Friendly</span>
                <span class="price" style="color: var(--primary);">Gratis</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total</span>
                <span class="price">${translationManager ? translationManager.formatCurrency(total) : utils.formatPrice(total)}</span>
            </div>
        </div>
        <p class="cart-note">Pengiriman dan pajak dihitung saat checkout.</p>
        <button class="btn btn-primary btn-full btn-large" onclick="checkout()">
            <i class="fas fa-credit-card"></i>
            ${translationManager ? translationManager.translate('cart.checkout') : 'Checkout'}
        </button>
    `;
}

// Create cart item HTML
function createCartItemHTML(item) {
    const product = mockData.products.find(p => p.id === item.productId);
    if (!product) return '';

    return `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${product.name}</h4>
                <p class="cart-item-price">${translationManager ? translationManager.formatCurrency(product.price * item.quantity) : utils.formatPrice(product.price * item.quantity)}</p>
                <p class="cart-item-category">${translationManager ? translationManager.getCategoryName(product.category) : product.category}</p>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity('${product.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity('${product.id}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${product.id}')" title="Hapus item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Checkout function
function checkout() {
    if (!requireAuth()) return;

    if (cartItems.length === 0) {
        utils.showNotification('Keranjang Anda kosong', 'error');
        return;
    }

    // Simulate checkout process
    const checkoutBtn = event.target;
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = `<div class="loading"><div class="spinner"></div> Memproses...</div>`;
    checkoutBtn.disabled = true;

    setTimeout(() => {
        // Update product status to 'sold' AND persist it
        const soldItems = JSON.parse(localStorage.getItem('soldItems') || '[]');

        cartItems.forEach(item => {
            const product = mockData.products.find(p => p.id === item.productId);
            if (product) {
                product.status = 'sold';
                if (!soldItems.includes(product.id)) {
                    soldItems.push(product.id);
                }
            }
        });


        localStorage.setItem('soldItems', JSON.stringify(soldItems));

        // Send payment reminder from Seller(s)
        const uniqueSellers = {};
        cartItems.forEach(item => {
            const product = mockData.products.find(p => p.id === item.productId);
            if (product && product.seller) {
                uniqueSellers[product.seller.id] = product.seller.name;
            }
        });

        Object.keys(uniqueSellers).forEach((sellerId, index) => {
            const sellerName = uniqueSellers[sellerId];
            const historyKey = `chat_history_${sellerId}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');

            history.push({
                text: "Halo Kak! Terima kasih sudah checkout produk saya. Mohon segera diselesaikan pembayarannya ya, biar bisa langsung saya kirim. Terima kasih! 🙏",
                sender: 'seller',
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            });

            localStorage.setItem(historyKey, JSON.stringify(history));

            // Show notification for message with staggered delay
            setTimeout(() => {
                utils.showNotification(`💬 Pesan baru dari ${sellerName}`, 'info');
            }, 1000 * (index + 1));
        });

        // Clear cart
        cartItems = [];
        saveCart();
        updateCartUI();

        // Refresh product grid to show "Sold Out" status
        if (typeof filterProducts === 'function') {
            filterProducts();
        } else if (typeof renderProductsGrid === 'function') {
            renderProductsGrid();
        }

        // Close cart
        toggleCart();

        // Show success message
        utils.showNotification('Pesanan berhasil dibuat! Barang kini berstatus Sold Out.', 'success');

        // Reset button
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.disabled = false;
    }, 2000);
}

// Clear entire cart
function clearCart() {
    cartItems = [];
    saveCart();
    updateCartUI();

    utils.showNotification('Keranjang dikosongkan', 'success');
}

// Get cart summary for display
function getCartSummary() {
    const itemCount = getCartItemCount();
    const total = getCartTotal();

    return {
        itemCount,
        total,
        formattedTotal: translationManager ? translationManager.formatCurrency(total) : utils.formatPrice(total)
    };
}

// Setup cart event listeners
function setupCartListeners() {
    // Close cart when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (isCartOpen) {
                toggleCart();
            }
        });
    }

    // Close cart with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isCartOpen) {
            toggleCart();
        }
    });
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    setupCartListeners();
});

// Update cart UI when language changes
window.addEventListener('languageChanged', () => {
    updateCartUI();
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCart,
        saveCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartTotal,
        getCartItemCount,
        toggleCart,
        updateCartUI,
        updateCartCount,
        updateCartContent,
        createCartItemHTML,
        checkout,
        clearCart,
        getCartSummary,
        setupCartListeners,
        cartItems,
        isCartOpen
    };
}