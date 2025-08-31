// LUMIÈRE - Product Data and Management

// Product Data
const products = [
    {
        id: 1,
        name: "Midnight Essence",
        category: "oriental",
        price: "$185",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/60870910-e4cd-41ec-a0e0-f196f4cdad09.png",
        notes: "Top: Bergamot, Pink Pepper | Heart: Rose, Jasmine | Base: Oud, Sandalwood",
        description: "A captivating oriental fragrance that embodies the mystery and allure of midnight. Rich oud and sandalwood create a lasting impression of sophistication and elegance."
    },
    {
        id: 2,
        name: "Garden of Dreams",
        category: "floral",
        price: "$165",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3887dbce-d7ee-4c17-a674-752d31153e45.png",
        notes: "Top: Peony, Lily of the Valley | Heart: Rose Petals, Magnolia | Base: White Musk, Cedar",
        description: "A dreamy floral bouquet that captures the essence of a blooming garden at dawn. Delicate yet complex, perfect for the romantic at heart."
    },
    {
        id: 3,
        name: "Urban Legend",
        category: "fresh",
        price: "$155",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1b19454f-bd96-4a20-8bb0-0dbc88d16d33.png",
        notes: "Top: Grapefruit, Mint | Heart: Sea Salt, Juniper | Base: Ambergris, Driftwood",
        description: "A modern fresh fragrance inspired by city life and ocean breezes. Clean and invigorating with an unexpected depth that evolves throughout the day."
    },
    {
        id: 4,
        name: "Velvet Noir",
        category: "woody",
        price: "$195",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8424dc14-eb54-41db-af52-b08d19953a1c.png",
        notes: "Top: Black Pepper, Cardamom | Heart: Violet, Iris | Base: Black Vanilla, Ebony Wood",
        description: "A sophisticated woody fragrance with a dark, mysterious character. The interplay of spices and precious woods creates an unforgettable signature scent."
    },
    {
        id: 5,
        name: "Golden Hour",
        category: "oriental",
        price: "$175",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/059c5d8a-13e3-4d99-a227-d5513516fd11.png",
        notes: "Top: Saffron, Orange Blossom | Heart: Turkish Rose, Cinnamon | Base: Amber, Vanilla",
        description: "Inspired by the magical golden hour, this warm oriental fragrance captures the beauty of sunset with rich amber and precious saffron."
    },
    {
        id: 6,
        name: "Crystal Waters",
        category: "fresh",
        price: "$145",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/90360f5b-5806-4474-9c6c-f002f4b1ffdc.png",
        notes: "Top: Cucumber, Water Lily | Heart: Marine Accord, Green Leaves | Base: Transparent Musk, Crystalline",
        description: "A pure, crystalline fragrance that evokes pristine waters and morning dew. Light and refreshing with an ethereal quality that feels effortlessly elegant."
    },
    {
        id: 7,
        name: "Rose Imperial",
        category: "floral",
        price: "$205",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f657403-54ce-40d9-af12-07f36f517c90.png",
        notes: "Top: Damask Rose, Pink Pepper | Heart: Bulgarian Rose, Peony | Base: Sandalwood, Musk",
        description: "The crown jewel of our floral collection, featuring the finest Bulgarian roses. A regal and timeless fragrance that embodies pure luxury and femininity."
    },
    {
        id: 8,
        name: "Smoky Legends",
        category: "woody",
        price: "$185",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1bf6b8c7-5912-4e92-86c1-5e57f372dd19.png",
        notes: "Top: Incense, Black Tea | Heart: Tobacco Leaves, Leather | Base: Patchouli, Vetiver",
        description: "An intense woody fragrance with smoky, mysterious depths. Perfect for those who appreciate bold, distinctive scents that leave a lasting impression."
    }
];

// Product rendering and filtering functions
class ProductManager {
    constructor() {
        this.allProducts = products;
        this.filteredProducts = products;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupEventListeners();
    }

    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        this.filteredProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            productGrid.appendChild(productCard);
        });

        // Add animation delay for staggered effect
        const cards = productGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.productId = product.id;
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${this.formatCategory(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-notes">${this.truncateNotes(product.notes)}</div>
            </div>
        `;

        // Add click event for modal
        card.addEventListener('click', () => this.openProductModal(product));

        return card;
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    truncateNotes(notes) {
        const topNotes = notes.split('|')[0].trim();
        return topNotes.length > 40 ? topNotes.substring(0, 37) + '...' : topNotes;
    }

    filterProducts(category) {
        this.currentFilter = category;
        
        if (category === 'all') {
            this.filteredProducts = this.allProducts;
        } else {
            this.filteredProducts = this.allProducts.filter(product => 
                product.category === category
            );
        }

        this.renderProducts();
        this.updateFilterButtons();
    }

    updateFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === this.currentFilter) {
                btn.classList.add('active');
            }
        });
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterProducts(category);
            });
        });
    }

    openProductModal(product) {
        const modal = document.getElementById('productModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalPrice = document.getElementById('modalPrice');
        const modalNotes = document.getElementById('modalNotes');
        const modalDescription = document.getElementById('modalDescription');

        if (modal && modalImage && modalTitle && modalCategory && modalPrice && modalNotes && modalDescription) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
            modalTitle.textContent = product.name;
            modalCategory.textContent = this.formatCategory(product.category);
            modalPrice.textContent = product.price;
            modalNotes.innerHTML = `<strong>Fragrance Notes:</strong><br>${product.notes}`;
            modalDescription.textContent = product.description;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Analytics tracking (if implemented)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'product_view', {
                    'product_id': product.id,
                    'product_name': product.name,
                    'product_category': product.category
                });
            }
        }
    }

    closeProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    getProductById(id) {
        return this.allProducts.find(product => product.id === parseInt(id));
    }

    getProductsByCategory(category) {
        return this.allProducts.filter(product => product.category === category);
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.notes.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    getRandomProducts(count = 3) {
        const shuffled = [...this.allProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product manager
    window.productManager = new ProductManager();

    // Modal close functionality
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            window.productManager.closeProductModal();
        });
    }

    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.productManager.closeProductModal();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                window.productManager.closeProductModal();
            }
        });
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductManager, products };
}