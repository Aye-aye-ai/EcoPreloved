// Mock Data for Preloved Marketplace
const mockData = {
    // Product categories
    categories: [
        {
            id: 'fashion',
            name: 'Fashion',
            icon: 'fas fa-tshirt',
            count: 156
        },
        {
            id: 'books',
            name: 'Buku',
            icon: 'fas fa-book',
            count: 89
        },
        {
            id: 'electronics',
            name: 'Elektronik',
            icon: 'fas fa-mobile-alt',
            count: 67
        },
        {
            id: 'hobby',
            name: 'Hobi & Koleksi',
            icon: 'fas fa-gamepad',
            count: 43
        }
    ],

    // Mock products
    products: [
        {
            id: 'prod-1',
            sellerId: 'user-1',
            name: 'Knitwear Beige',
            description: 'Knitwear dengan kondisi sangat terawat. Warna masih pekat dan tidak ada robek. Bisa dipakai untuk sehari-hari',
            reasonForSelling: 'Sudah tidak muat lagi karena berat badan bertambah.',
            usageDuration: '1 tahun',
            price: 40000,
            category: 'fashion',
            tags: ['nyaman', 'hangat', 'kasual', 'earth tone'],
            images: [
                'images/knitwear beige.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-01T09:00:00Z',
            seller: {
                id: 'user-1',
                name: 'Budi Santoso',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
                rating: 4.8,
                totalSales: 23
            }
        },
        {
            id: 'prod-2',
            sellerId: 'user-2',
            name: 'Broken white mini skirt',
            description: 'Rok mini putih dengan desain robek di beberapa bagian yang memberikan kesan edgy. Kondisi masih bagus dan nyaman dipakai.',
            reasonForSelling: 'Ingin mengganti model lain.',
            usageDuration: '6 bulan',
            price: 32000,
            category: 'fashion',
            tags: ['edgy', 'putih', 'rok', 'fashionable'],
            images: [
                'images/Broken white mini skirt.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-05T11:00:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-3',
            sellerId: 'user-1',
            name: 'Chess second',
            description: ' Papan catur kayu dengan potongan kayu ukiran tangan. Kondisi sangat baik, cocok untuk pecinta catur dan kolektor.',
            reasonForSelling: 'Sudah tidak digunakan lagi.',
            usageDuration: '1 tahun',
            price: 30000,
            category: 'hobby',
            tags: ['kayu', 'strategi', 'koleksi', 'tradisional'],
            images: [
                'images/Chess Second.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-10T08:30:00Z',
            seller: {
                id: 'user-1',
                name: 'Budi Santoso',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
                rating: 4.8,
                totalSales: 23
            }
        },
        {
            id: 'prod-4',
            sellerId: 'user-3',
            name: 'Ensiklopedia Sains Modern',
            description: 'Buku ensiklopedia lengkap dengan gambar berwarna yang sangat informatif untuk pelajar atau kolektor.',
            reasonForSelling: 'Pindah rumah, mengurangi beban barang bawaan.',
            usageDuration: '3 tahun',
            price: 75000,
            category: 'books',
            images: [
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=80'
            ],
            status: 'available',
            createdAt: '2024-03-12T14:00:00Z',
            seller: {
                id: 'user-3',
                name: 'Andi Wijaya',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi',
                rating: 4.7,
                totalSales: 12
            }
        },
        {
            id: 'prod-5',
            sellerId: 'user-2',
            name: 'Headphone - Green',
            description: 'Headphone premium dengan fitur peredam bising yang sangat efektif. Suara bass mantap dan jernih.',
            reasonForSelling: 'Sudah beli seri terbaru.',
            usageDuration: '1.5 tahun',
            price: 125000,
            category: 'electronics',
            images: [
                'images/Headphones - green.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-15T16:45:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-6',
            sellerId: 'user-3',
            name: 'Instax mini 25 Camera',
            description: 'Sensor bersih, lensa kit berfungsi normal. Cocok untuk pemula.',
            reasonForSelling: 'Jarang dipakai, lebih sering pakai smartphone.',
            usageDuration: '1 tahun',
            price: 480000,
            category: 'electronics',
            images: [
                'images/Instax mini 25 Camera.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-18T10:20:00Z',
            seller: {
                id: 'user-3',
                name: 'Andi Wijaya',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi',
                rating: 4.7,
                totalSales: 12
            }
        },
        {
            id: 'prod-7',
            sellerId: 'user-1',
            name: 'Flanel skirt retro',
            description: 'Rok flanel dengan motif retro yang unik. Kondisi masih sangat baik, cocok untuk gaya kasual atau semi-formal.',
            reasonForSelling: 'Sudah tidak sesuai dengan gaya saya saat ini.',
            usageDuration: '2 tahun',
            price: 50000,
            category: 'fashion',
            images: [
                'images/Flanel skirt.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-20T13:10:00Z',
            seller: {
                id: 'user-1',
                name: 'Budi Santoso',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
                rating: 4.8,
                totalSales: 23
            }
        },
        {
            id: 'prod-8',
            sellerId: 'user-2',
            name: 'Instax mini 8 camera - pink',
            description: 'Kamera instan dengan desain compact dan warna pink yang ceria. Kondisi lensa dan mekanisme cetak masih berfungsi dengan baik.',
            reasonForSelling: ' Ingin upgrade ke model yang lebih baru.',
            usageDuration: '1 tahun',
            price: 60000,
            category: 'electronics',
            images: [
                'images/Instax mini 8 camera - pink.jpeg',
                // images/Instax mini 8 camera - pink 2.jpeg not in directory listing, keep safe or remove? keeping assumed existing or acceptable broken link for now, but fixing primary image
            ],
            status: 'available',
            createdAt: '2024-03-22T15:30:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-9',
            sellerId: 'user-2',
            name: 'Joger Pants - white',
            description: 'Celana jogger putih dengan bahan katun yang nyaman. Kondisi masih sangat baik, cocok untuk aktivitas santai atau olahraga ringan.',
            reasonForSelling: 'Sudah tidak muat lagi karena perubahan ukuran tubuh.',
            usageDuration: '1 tahun',
            price: 40000,
            category: 'fashion',
            images: [
                'images/Joger Pants - white.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-22T15:30:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-10',
            sellerId: 'user-2',
            name: 'Long pants - Light Brown',
            description: 'Celana panjang dengan warna coklat muda yang nyaman. Kondisi masih sangat baik, cocok untuk aktivitas santai atau olahraga ringan.',
            reasonForSelling: 'Sudah tidak muat lagi karena perubahan ukuran tubuh.',
            usageDuration: '1 tahun',
            price: 30000,
            category: 'fashion',
            images: [
                'images/Long pants - Light Brown.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-22T15:30:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-11',
            sellerId: 'user-2',
            name: 'Li-ning Racket',
            description: 'Raket bulu tangkis merk Li-ning dengan kondisi sangat baik. Grip masih nyaman dan senar dalam kondisi prima.',
            reasonForSelling: 'Sudah jarang bermain bulu tangkis.',
            usageDuration: '2 tahun',
            price: 150000,
            category: 'hobby',
            images: [
                'images/Li-ning Racket.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-22T15:30:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-12',
            sellerId: 'user-2',
            name: 'White wool sweater',
            description: 'Sweater wol putih dengan desain klasik. Kondisi masih sangat baik, cocok untuk cuaca dingin.',
            reasonForSelling: 'Sudah tidak sesuai dengan gaya saya saat ini.',
            usageDuration: '1 tahun',
            price: 80000,
            category: 'fashion',
            images: [
                'images/White wool sweater.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-22T15:30:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        },
        {
            id: 'prod-13',
            sellerId: 'user-2',
            name: 'Yonex Racket',
            description: 'Raket bulu tangkis merk Yonex dengan kondisi sangat baik. Grip masih nyaman dan senar dalam kondisi prima.',
            reasonForSelling: 'Sudah jarang bermain bulu tangkis.',
            usageDuration: '2 tahun',
            price: 200000,
            category: 'hobby',
            images: [
                'images/Yonex Racket.jpeg',
            ],
            status: 'available',
            createdAt: '2024-03-22T15:30:00Z',
            seller: {
                id: 'user-2',
                name: 'Siti Aminah',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
                rating: 4.9,
                totalSales: 45
            }
        }
    ],

    // Mock users
    users: [
        {
            id: 'user-1',
            email: 'budi.santoso@example.com',
            username: 'budisantoso',
            fullName: 'Budi Santoso',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
            createdAt: '2023-10-01T08:00:00Z',
            rating: 4.8,
            totalSales: 23,
            isOnline: true
        },
        {
            id: 'user-2',
            email: 'siti.aminah@example.com',
            username: 'sitiaminah',
            fullName: 'Siti Aminah',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
            createdAt: '2023-11-15T10:30:00Z',
            rating: 4.9,
            totalSales: 45,
            isOnline: true
        },
        {
            id: 'user-3',
            email: 'andi.wijaya@example.com',
            username: 'andiwijaya',
            fullName: 'Andi Wijaya',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi',
            createdAt: '2024-01-20T14:20:00Z',
            rating: 4.7,
            totalSales: 12,
            isOnline: false
        }
    ],

    // Chatbot responses
    chatbotResponses: {
        greeting: [
            'Halo! Saya EcoBot, asisten virtual Anda. Ada yang bisa saya bantu?',
            'Selamat datang di EcoPreloved! Bagaimana saya bisa membantu Anda hari ini?',
            'Hai! Saya di sini untuk membantu Anda menemukan barang preloved terbaik. Ada yang bisa saya bantu?'
        ],
        help: [
            'Saya bisa membantu Anda dengan:\n• Mencari produk\n• Informasi tentang penjual\n• Cara berbelanja\n• Kebijakan pengembalian\n• Tips ramah lingkungan',
            'Berikut yang bisa saya bantu:\n• Rekomendasi produk\n• Status pesanan\n• Cara chat dengan penjual\n• Informasi pengiriman\n• Panduan jual beli'
        ],
        search: [
            'Apa yang Anda cari? Saya bisa membantu menemukan produk berdasarkan kategori atau kata kunci.',
            'Silakan beri tahu saya jenis barang yang Anda cari, saya akan membantu menemukan yang terbaik!'
        ],
        eco: [
            'Dengan berbelanja preloved, Anda membantu mengurangi limbah dan mendukung ekonomi sirkular! 🌱',
            'Setiap pembelian barang bekas berkualitas membantu mengurangi jejak karbon kita. Terima kasih sudah peduli lingkungan! 🌍'
        ],
        default: [
            'Maaf, saya tidak mengerti pertanyaan Anda. Bisa dijelaskan lebih detail?',
            'Hmm, saya kurang paham. Coba tanyakan tentang produk, cara berbelanja, atau bantuan lainnya.',
            'Saya masih belajar! Bisa tanya hal lain tentang marketplace kami?'
        ]
    },

    // Quick replies for chatbot
    quickReplies: [
        'Cari produk fashion',
        'Cara chat penjual',
        'Status pesanan',
        'Kebijakan return',
        'Tips eco-friendly'
    ]
};

// Utility functions
const utils = {
    // Format price to Indonesian Rupiah
    formatPrice: (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    },

    // Format date to Indonesian format
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    },

    // Format relative time
    formatRelativeTime: (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Baru saja';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;

        return utils.formatDate(dateString);
    },

    // Truncate text
    truncateText: (text, length) => {
        if (text.length <= length) return text;
        return text.slice(0, length) + '...';
    },

    // Generate random ID
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Get random item from array
    getRandomItem: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${type === 'success' ? 'Berhasil' : type === 'error' ? 'Error' : 'Info'}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-message">${message}</div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockData, utils };
}