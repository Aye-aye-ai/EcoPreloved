// Authentication functions

// Current user state
let currentUser = null;
let isLoggedIn = false;

// Initialize auth state from localStorage
function initAuthState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateAuthUI();
    }
}

// Update UI based on auth state
function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const mobileRegister = document.querySelector('.mobile-register');

    if (isLoggedIn && currentUser) {
        // Update desktop auth buttons
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <img src="${currentUser.avatar}" alt="${currentUser.fullName}" class="user-avatar" onclick="toggleUserMenu()">
                    <div class="user-dropdown" id="userDropdown">
                        <div class="user-info">
                            <img src="${currentUser.avatar}" alt="${currentUser.fullName}">
                            <div>
                                <div class="user-name">${currentUser.fullName}</div>
                                <div class="user-email">${currentUser.email}</div>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" onclick="showProfile()">
                            <i class="fas fa-user"></i> ${translationManager ? translationManager.translate('nav.profile') : 'Profil'}
                        </a>
                        <a href="#" class="dropdown-item" onclick="showMyProducts()">
                            <i class="fas fa-box"></i> Produk Saya
                        </a>
                        <a href="#" class="dropdown-item" onclick="showOrders()">
                            <i class="fas fa-shopping-bag"></i> Pesanan
                        </a>
                        <a href="#" class="dropdown-item" onclick="showMessagesInbox()">
                            <i class="fas fa-comment-dots"></i> Pesan
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" onclick="logout()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </div>
                </div>
            `;
        }

        // Update mobile register button
        if (mobileRegister) {
            mobileRegister.innerHTML = `
                <i class="fas fa-user"></i> ${currentUser.fullName}
            `;
            mobileRegister.onclick = showProfile;
        }
    } else {
        // Show login/register buttons
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="btn btn-ghost" onclick="showLogin()" data-translate="nav.login">Masuk</button>
                <button class="btn btn-primary" onclick="showRegister()" data-translate="nav.register">Daftar</button>
            `;
        }

        if (mobileRegister) {
            mobileRegister.innerHTML = `<span data-translate="nav.register">Daftar</span>`;
            mobileRegister.onclick = showRegister;
        }

        // Re-translate after updating
        if (translationManager) {
            translationManager.translatePage();
        }
    }
}

// Show login modal
function showLogin() {
    showModal('loginModal');
}

// Show register modal
function showRegister() {
    showModal('registerModal');
}

// Switch between login and register modals
function switchToRegister() {
    closeModal('loginModal');
    showModal('registerModal');
}

function switchToLogin() {
    closeModal('registerModal');
    showModal('loginModal');
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validate inputs
    if (!email || !password) {
        utils.showNotification(
            translationManager ? translationManager.translate('validation.email-required') : 'Email dan password harus diisi',
            'error'
        );
        return;
    }

    if (!utils.validateEmail(email)) {
        utils.showNotification(
            translationManager ? translationManager.translate('validation.email-invalid') : 'Format email tidak valid',
            'error'
        );
        return;
    }

    // Simulate login process
    const loginBtn = event.target.querySelector('button[type="submit"]');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = `<div class="loading"><div class="spinner"></div> ${translationManager ? translationManager.translate('common.loading') : 'Memuat...'}</div>`;
    loginBtn.disabled = true;

    setTimeout(() => {
        // Find user in mock data or create a demo user
        let user = mockData.users.find(u => u.email === email);

        if (!user) {
            // Create demo user for any email
            user = {
                id: utils.generateId(),
                email: email,
                username: email.split('@')[0],
                fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                createdAt: new Date().toISOString(),
                rating: 5.0,
                totalSales: 0,
                isOnline: true
            };
        }

        // Set current user
        currentUser = user;
        isLoggedIn = true;

        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Update UI
        updateAuthUI();

        // Close modal
        closeModal('loginModal');

        // Reset form
        event.target.reset();

        // Show success notification
        utils.showNotification(
            translationManager ? translationManager.translate('notification.login-success') : 'Login berhasil!',
            'success'
        );

        // Reset button
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }, 1500);
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate inputs
    if (!fullName || !username || !email || !password || !confirmPassword) {
        utils.showNotification('Semua field harus diisi', 'error');
        return;
    }

    if (!utils.validateEmail(email)) {
        utils.showNotification(
            translationManager ? translationManager.translate('validation.email-invalid') : 'Format email tidak valid',
            'error'
        );
        return;
    }

    if (password.length < 6) {
        utils.showNotification(
            translationManager ? translationManager.translate('validation.password-min') : 'Password minimal 6 karakter',
            'error'
        );
        return;
    }

    if (password !== confirmPassword) {
        utils.showNotification(
            translationManager ? translationManager.translate('validation.password-confirm') : 'Konfirmasi password tidak cocok',
            'error'
        );
        return;
    }

    // Simulate register process
    const registerBtn = event.target.querySelector('button[type="submit"]');
    const originalText = registerBtn.innerHTML;
    registerBtn.innerHTML = `<div class="loading"><div class="spinner"></div> ${translationManager ? translationManager.translate('common.loading') : 'Memuat...'}</div>`;
    registerBtn.disabled = true;

    setTimeout(() => {
        // Create new user
        const newUser = {
            id: utils.generateId(),
            email: email,
            username: username,
            fullName: fullName,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            createdAt: new Date().toISOString(),
            rating: 5.0,
            totalSales: 0,
            isOnline: true
        };

        // Add to mock data
        mockData.users.push(newUser);

        // Close modal
        closeModal('registerModal');

        // Reset form
        event.target.reset();

        // Show success notification and redirect to login
        utils.showNotification(
            translationManager ? translationManager.translate('notification.register-success') : 'Pendaftaran berhasil! Silakan login.',
            'success'
        );

        // Auto-fill login form
        setTimeout(() => {
            document.getElementById('loginEmail').value = email;
            showLogin();
        }, 1000);

        // Reset button
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
    }, 1500);
}

// Logout function
function logout() {
    currentUser = null;
    isLoggedIn = false;

    // Clear localStorage
    localStorage.removeItem('currentUser');

    // Clear cart
    localStorage.removeItem('cartItems');

    // Update UI
    updateAuthUI();
    updateCartUI();

    // Close user dropdown if open
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.classList.remove('active');
    }

    // Show success notification
    utils.showNotification(
        translationManager ? translationManager.translate('notification.logout-success') : 'Logout berhasil!',
        'success'
    );
}

// Toggle user menu dropdown
function toggleUserMenu() {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.classList.toggle('active');
    }
}

// Close user dropdown when clicking outside
document.addEventListener('click', (event) => {
    const userMenu = document.querySelector('.user-menu');
    const userDropdown = document.getElementById('userDropdown');

    if (userDropdown && userMenu && !userMenu.contains(event.target)) {
        userDropdown.classList.remove('active');
    }
});

// Show user profile
function showProfile() {
    if (!isLoggedIn) {
        utils.showNotification(
            translationManager ? translationManager.translate('notification.login-required') : 'Silakan login terlebih dahulu',
            'error'
        );
        showLogin();
        return;
    }

    utils.showNotification('Fitur profil akan segera hadir!', 'info');
}

// Show user's products
// Show user's products
function showMyProducts() {
    if (!requireAuth()) return;

    toggleUserMenu(); // Close menu

    // Filter products (support both 'current-user' from sell form and actual user ID)
    const myProducts = mockData.products.filter(p =>
        p.sellerId === 'current-user' || (currentUser && p.sellerId === currentUser.id)
    );

    // Update UI
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = "Produk Saya";
        // Tambahkan tombol kembali jika belum ada
        if (!document.getElementById('backToAllBtn')) {
            const btn = document.createElement('button');
            btn.id = 'backToAllBtn';
            btn.className = 'btn btn-outline btn-sm';
            btn.style.marginLeft = '1rem';
            btn.innerHTML = '<i class="fas fa-arrow-left"></i> Kembali';
            btn.onclick = () => {
                window.location.reload(); // Cara termudah reset state
            };
            sectionTitle.appendChild(btn);
        }
    }

    const sectionSubtitle = document.querySelector('.section-subtitle');
    if (sectionSubtitle) sectionSubtitle.textContent = `Menampilkan ${myProducts.length} produk Anda`;

    // Render
    if (typeof renderProductsGrid === 'function') {
        renderProductsGrid(myProducts);
    }

    // Scroll
    const productsSection = document.getElementById('products');
    if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show user's orders
function showOrders() {
    if (!isLoggedIn) {
        utils.showNotification(
            translationManager ? translationManager.translate('notification.login-required') : 'Silakan login terlebih dahulu',
            'error'
        );
        showLogin();
        return;
    }

    utils.showNotification('Fitur pesanan akan segera hadir!', 'info');
}

// Check if user is logged in (for other functions to use)
function requireAuth() {
    if (!isLoggedIn) {
        utils.showNotification(
            translationManager ? translationManager.translate('notification.login-required') : 'Silakan login terlebih dahulu',
            'error'
        );
        showLogin();
        return false;
    }
    return true;
}

// Setup auth event listeners
function setupAuthListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAuthState();
    setupAuthListeners();
});

// Add CSS for user menu (inject into head)
const userMenuCSS = `
<style>
.user-menu {
    position: relative;
}

.user-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: var(--transition);
}

.user-avatar:hover {
    border-color: var(--primary);
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--gray-200);
    min-width: 16rem;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-0.5rem);
    transition: var(--transition);
    margin-top: 0.5rem;
}

.user-dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.user-info {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
}

.user-info img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}

.user-name {
    font-weight: 600;
    color: var(--gray-900);
    font-size: var(--font-size-sm);
}

.user-email {
    font-size: var(--font-size-xs);
    color: var(--gray-500);
}

.dropdown-divider {
    height: 1px;
    background: var(--gray-200);
    margin: 0;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    color: var(--gray-700);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: var(--transition);
}

.dropdown-item:hover {
    background: var(--gray-50);
    color: var(--primary);
}

.dropdown-item i {
    width: 1rem;
    text-align: center;
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', userMenuCSS);

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAuthState,
        updateAuthUI,
        showLogin,
        showRegister,
        switchToRegister,
        switchToLogin,
        handleLogin,
        handleRegister,
        logout,
        toggleUserMenu,
        showProfile,
        showMyProducts,
        showOrders,
        requireAuth,
        setupAuthListeners,
        currentUser,
        isLoggedIn
    };
}