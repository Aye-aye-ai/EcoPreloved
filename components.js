// Component functions for the marketplace

// Category Grid Component
function renderCategoryGrid() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    if (typeof mockData === 'undefined') return; // Safety check

    categoriesGrid.innerHTML = mockData.categories.map(category => `
        <a href="#products" class="card category-card" onclick="filterByCategory('${category.id}')">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <div>
                <h3 class="category-title">${translationManager ? translationManager.getCategoryName(category.id) : category.name}</h3>
                <p class="category-subtitle">${category.count} Barang Preloved</p>
            </div>
        </a>
    `).join('');
}

// Product Card Component
function createProductCard(product) {
    const statusColors = {
        available: 'badge-available',
        sold: 'badge-sold',
        reserved: 'badge-reserved'
    };

    return `
        <div class="card product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    <span class="badge ${statusColors[product.status]}">${translationManager ? translationManager.getStatusName(product.status) : product.status}</span>
                    <span class="badge badge-category">${translationManager ? translationManager.getCategoryName(product.category) : product.category}</span>
                </div>
                <div class="product-actions">
                    <button class="action-btn" onclick="viewProductDetails('${product.id}')" title="Lihat Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${translationManager ? translationManager.formatCurrency(product.price) : utils.formatPrice(product.price)}</p>
                </div>
                <div class="product-details">
                    <div class="product-detail">
                        <i class="fas fa-clock"></i>
                        <span>${translationManager ? translationManager.translate('products.usage') : 'Lama pemakaian'}: ${product.usageDuration}</span>
                    </div>
                    <div class="product-detail">
                        <i class="fas fa-info-circle"></i>
                        <span>${translationManager ? translationManager.translate('products.reason') : 'Alasan dijual'}: ${utils.truncateText(product.reasonForSelling, 30)}</span>
                    </div>
                </div>
            </div>
            <div class="product-footer">
                <button class="btn btn-primary w-full" onclick="addToCart('${product.id}')" ${product.status !== 'available' ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${translationManager ? translationManager.translate('products.buy') : 'Beli Sekarang'}
                </button>
            </div>
        </div>
    `;
}

// Products Grid Component
function renderProductsGrid(products) {
    // Jika products tidak diisi, pakai default mockData
    if (!products && typeof mockData !== 'undefined') {
        products = mockData.products;
    }
    
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (!products || products.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3 class="empty-title">Tidak Ada Produk Ditemukan</h3>
                <p class="empty-description">Coba ubah filter atau kata kunci pencarian Anda.</p>
                <button class="btn btn-primary" onclick="resetFilters()">Lihat Semua Produk</button>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Product Detail Modal
function viewProductDetails(productId) {
    if (typeof mockData === 'undefined') return;
    
    const product = mockData.products.find(p => p.id === productId);
    if (!product) return;

    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');

    if (modalTitle) modalTitle.textContent = product.name;
    
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="product-detail-content">
                <div class="product-images">
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.name}" id="mainProductImage">
                    </div>
                    ${product.images.length > 1 ? `
                        <div class="image-thumbnails">
                            ${product.images.map((img, index) => `
                                <img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                                     onclick="changeMainImage('${img}', this)">
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="product-info">
                    <div class="product-price-section">
                        <span class="product-price">${translationManager ? translationManager.formatCurrency(product.price) : utils.formatPrice(product.price)}</span>
                        <span class="badge ${product.status === 'available' ? 'badge-available' : product.status === 'sold' ? 'badge-sold' : 'badge-reserved'}">${translationManager ? translationManager.getStatusName(product.status) : product.status}</span>
                    </div>
                    
                    <div class="product-meta">
                        <div class="meta-item">
                            <strong>${translationManager ? translationManager.translate('product.condition') : 'Kondisi'}:</strong>
                            <span>Sangat Baik</span>
                        </div>
                        <div class="meta-item">
                            <strong>${translationManager ? translationManager.translate('products.usage') : 'Lama pemakaian'}:</strong>
                            <span>${product.usageDuration}</span>
                        </div>
                        <div class="meta-item">
                            <strong>Kategori:</strong>
                            <span>${translationManager ? translationManager.getCategoryName(product.category) : product.category}</span>
                        </div>
                    </div>

                    <div class="product-description">
                        <h4>${translationManager ? translationManager.translate('product.description') : 'Deskripsi'}</h4>
                        <p>${product.description}</p>
                    </div>

                    <div class="product-reason">
                        <h4>${translationManager ? translationManager.translate('products.reason') : 'Alasan dijual'}</h4>
                        <p>${product.reasonForSelling}</p>
                    </div>

                    <div class="seller-info">
                        <h4>${translationManager ? translationManager.translate('product.seller') : 'Penjual'}</h4>
                        <div class="seller-card">
                            <img src="${product.seller.avatar}" alt="${product.seller.name}" class="seller-avatar">
                            <div class="seller-details">
                                <h5>${product.seller.name}</h5>
                                <div class="seller-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${product.seller.rating}</span>
                                    <span class="seller-sales">(${product.seller.totalSales} penjualan)</span>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="openSellerChat('${product.sellerId}', '${product.seller.name}')">
                                <i class="fas fa-comment"></i>
                                ${translationManager ? translationManager.translate('products.chat') : 'Chat Penjual'}
                            </button>
                        </div>
                    </div>

                    <div class="product-actions">
                        <button class="btn btn-primary btn-large" onclick="addToCart('${product.id}')" ${product.status !== 'available' ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${translationManager ? translationManager.translate('products.buy') : 'Beli Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showModal('productModal');
}

// Change main product image
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    if (thumbnails) {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
    }
    
    if (thumbnail) {
        thumbnail.classList.add('active');
    }
}

// Filter products by category
function filterByCategory(categoryId) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = categoryId;
    }
    
    filterProducts();
    
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Filter and search products
function filterProducts() {
    if (typeof mockData === 'undefined') return;

    const searchQuery = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const sortFilter = document.getElementById('sortFilter')?.value || 'newest';

    let filteredProducts = [...mockData.products];

    // Apply search filter
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery)
        );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    // Apply sorting
    switch (sortFilter) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }

    renderProductsGrid(filteredProducts);
}

// Reset all filters
function resetFilters() {
    const productSearch = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (productSearch) productSearch.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'newest';

    renderProductsGrid();
}

// Show all products
function showAllProducts() {
    resetFilters();
    scrollToProducts();
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    
    if (modal) modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Pembersihan konten khusus untuk product modal
    if (modalId === 'productModal') {
        setTimeout(() => {
            const modalBody = document.getElementById('productModalBody');
            if (modalBody) modalBody.innerHTML = '';
        }, 300); // Tunggu animasi selesai
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        
        if (menuBtn) {
            menuBtn.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search input with debounce
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        // Gunakan utils.debounce jika ada, atau fallback
        const debounceFn = (typeof utils !== 'undefined' && utils.debounce) ? utils.debounce(filterProducts, 300) : filterProducts;
        productSearch.addEventListener('input', debounceFn);
    }

    // Filter selects
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }

    // Close modal when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav links on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof renderCategoryGrid === 'function') renderCategoryGrid();
        if (typeof renderProductsGrid === 'function') renderProductsGrid();
        setupEventListeners();
    }, 100);
});

// Re-render components when language changes
window.addEventListener('languageChanged', () => {
    if (typeof renderCategoryGrid === 'function') renderCategoryGrid();
    if (typeof renderProductsGrid === 'function') renderProductsGrid();
});

// --- PENTING: DAFTARKAN FUNGSI KE WINDOW AGAR BISA DIPANGGIL HTML (ONCLICK) ---
window.showModal = showModal;
window.closeModal = closeModal;
window.viewProductDetails = viewProductDetails;
window.changeMainImage = changeMainImage;
window.filterByCategory = filterByCategory;
window.resetFilters = resetFilters;
window.showAllProducts = showAllProducts;
window.scrollToProducts = scrollToProducts;
window.toggleMobileMenu = toggleMobileMenu;

// Export functions for use in other files (Keep this for modularity)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderCategoryGrid,
        createProductCard,
        renderProductsGrid,
        viewProductDetails,
        filterByCategory,
        filterProducts,
        resetFilters,
        showAllProducts,
        scrollToProducts,
        showModal,
        closeModal,
        toggleMobileMenu,
        setupEventListeners
    };
}