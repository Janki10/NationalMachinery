// Frontend CMS Integration - Renders content from localStorage

const CMSFrontend = {
    // Render categories on homepage
    renderCategories: function() {
        const categories = CMS_DATA.getCategories();
        const grid = document.querySelector('.product-grid') || document.getElementById('dynamic-categories');
        
        if (!grid) {
            console.error('Could not find product grid element');
            return;
        }
        
        if (!categories || categories.length === 0) {
            console.warn('No categories found. Make sure to initialize data in admin panel.');
            grid.innerHTML = '<p style="text-align: center; padding: 20px;">No categories found. Please add categories in the <a href="admin.html">Admin Panel</a>.</p>';
            return;
        }
        
        console.log('Rendering', categories.length, 'categories');
        
        grid.innerHTML = categories.map(category => {
            const imageSrc = category.image && category.image.startsWith('data:') 
                ? category.image 
                : category.image || 'logo.png';
            
            return `
                <a href="${category.link}" class="product-card">
                    <img src="${imageSrc}" alt="${category.name}">
                    <h3>${category.name}</h3>
                    <p>${category.itemCount || 0} items</p>
                </a>
            `;
        }).join('');
        
        // Update catalog count
        const catalogInfo = document.querySelector('.catalog-info');
        if (catalogInfo) {
            catalogInfo.textContent = `${categories.length} Catalogues`;
        }
    },

    // Render products on category page
    renderProducts: function(categoryId) {
        const products = CMS_DATA.getProductsByCategory(categoryId);
        const grid = document.getElementById('product-grid');
        
        if (!grid) return;
        
        grid.innerHTML = products.map((product, index) => {
            const productId = `product${index + 1}`;
            const images = product.images || [];
            const firstImage = images.length > 0 ? images[0] : 'logo.png';
            
            let imagesHtml = '';
            if (images.length > 0) {
                imagesHtml = images.map((img, imgIndex) => 
                    `<img src="${img}" alt="Image ${imgIndex + 1}" ${imgIndex === 0 ? 'class="active"' : ''}>`
                ).join('');
            } else {
                imagesHtml = `<img src="logo.png" alt="No image" class="active">`;
            }
            
            return `
                <div class="product-card">
                    <div class="product-images" id="${productId}-images">
                        ${imagesHtml}
                        <button class="carousel-btn prev" onclick="changeImage(this, -1)">&#10094;</button>
                        <button class="carousel-btn next" onclick="changeImage(this, 1)">&#10095;</button>
                    </div>
                    <div class="photo-count" id="${productId}-photo-count">${images.length} photos</div>
                    <div class="product-details">
                        <h3>${product.title}</h3>
                    </div>
                    <a href="#" class="add-to-cart">ADD TO CART</a>
                </div>
            `;
        }).join('');
        
        // Update photo counts dynamically
        this.updatePhotoCounts();
    },

    // Update photo counts
    updatePhotoCounts: function() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const images = card.querySelectorAll('.product-images img');
            const photoCount = card.querySelector('.photo-count');
            if (photoCount) {
                photoCount.textContent = `${images.length} photos`;
            }
        });
    },

    // Get category ID from current page
    getCategoryIdFromPage: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || window.location.href.split('/').pop();
        
        const categoryMap = {
            'extrusion.html': 'extrusion',
            'compression-moulding.html': 'compression-moulding',
            'blow-moulding.html': 'blow-moulding',
            'injection-moulding.html': 'injection-moulding',
            'moulds.html': 'moulds',
            'ancillaries.html': 'ancillaries',
            'cnc-machines.html': 'cnc-machines',
            'pet-blow-machines.html': 'pet-blow-machines',
            'ibm.html': 'ibm'
        };
        
        return categoryMap[filename] || filename.replace('.html', '');
    },

    // Initialize frontend
    init: function() {
        // Ensure CMS_DATA is initialized first
        if (typeof CMS_DATA === 'undefined') {
            console.error('CMS_DATA not loaded. Make sure cms-data.js is loaded before cms-frontend.js');
            return;
        }
        
        // Ensure data is initialized
        CMS_DATA.init();
        
        // Check if we're on homepage or category page
        const path = window.location.pathname;
        const href = window.location.href;
        
        // Better filename detection (handles both http:// and file:// protocols)
        let filename = '';
        if (path && path !== '/') {
            filename = path.split('/').pop();
        } else if (href) {
            const urlParts = href.split('/');
            filename = urlParts[urlParts.length - 1].split('?')[0];
        }
        
        // Check if it's the homepage
        const lowerFilename = (filename || '').toLowerCase();

        const isHomepage = !filename || 
                          filename === '' || 
                          lowerFilename === 'index.html' || 
                          lowerFilename === 'index.htm' ||
                          filename === 'First Page.html' ||
                          lowerFilename.includes('first') ||
                          lowerFilename.includes('index') ||
                          (document.getElementById('dynamic-categories') && !document.getElementById('product-grid'));
        
        if (isHomepage) {
            // Homepage - render categories
            console.log('Detected homepage, rendering categories...');
            this.renderCategories();
        } else {
            // Category page - render products
            const categoryId = this.getCategoryIdFromPage();
            if (categoryId) {
                console.log('Detected category page:', categoryId, 'rendering products...');
                this.renderProducts(categoryId);
            } else {
                console.warn('Could not determine category ID from page:', filename);
            }
        }
    }
};

// Initialize when DOM is ready and after a small delay to ensure all scripts are loaded
function initializeCMS() {
    // Wait a bit to ensure CMS_DATA is initialized
    if (typeof CMS_DATA !== 'undefined') {
        CMSFrontend.init();
    } else {
        // Retry after a short delay
        setTimeout(initializeCMS, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeCMS, 50);
    });
} else {
    setTimeout(initializeCMS, 50);
}

