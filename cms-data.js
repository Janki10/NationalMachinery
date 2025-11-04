// CMS Data Management - LocalStorage based
// This file handles all data operations for the CMS

const CMS_DATA = {
    // Initialize data structure
    init: function() {
        if (!localStorage.getItem('cms_categories')) {
            this.loadDefaultData();
        }
    },

    // Load default data from existing HTML structure
    loadDefaultData: function() {
        const defaultCategories = [
            {
                id: 'extrusion',
                name: 'Extrusion',
                image: 'Extrusion.jpg',
                link: 'extrusion.html',
                visible: true,
                itemCount: 3
            },
            {
                id: 'compression-moulding',
                name: 'Compression Moulding',
                image: 'Compression Moulding.jpg',
                link: 'compression-moulding.html',
                visible: true,
                itemCount: 1
            },
            {
                id: 'blow-moulding',
                name: 'Blow Moulding',
                image: 'BlowMoulding.jpg',
                link: 'blow-moulding.html',
                visible: true,
                itemCount: 5
            },
            {
                id: 'injection-moulding',
                name: 'Injection Moulding',
                image: 'InjectionMoulding.jpg',
                link: 'injection-moulding.html',
                visible: true,
                itemCount: 11
            },
            {
                id: 'moulds',
                name: 'Moulds',
                image: 'Moulds.jpg',
                link: 'moulds.html',
                visible: true,
                itemCount: 11
            },
            {
                id: 'ancillaries',
                name: 'Ancillaries',
                image: 'Ancilliaries.jpg',
                link: 'ancillaries.html',
                visible: true,
                itemCount: 1
            },
            {
                id: 'cnc-machines',
                name: 'CNC Machines',
                image: 'cnc.jpg',
                link: 'cnc-machines.html',
                visible: true,
                itemCount: 1
            },
            {
                id: 'pet-blow-machines',
                name: 'Pet Blow Machines',
                image: 'PetBlowMachines.jpg',
                link: 'pet-blow-machines.html',
                visible: true,
                itemCount: 2
            },
            {
                id: 'ibm',
                name: 'IBM',
                image: 'ibm.jpg',
                link: 'ibm.html',
                visible: true,
                itemCount: 6
            }
        ];

        localStorage.setItem('cms_categories', JSON.stringify(defaultCategories));
        localStorage.setItem('cms_products', JSON.stringify([]));
    },

    // Category operations
    getCategories: function() {
        const categories = JSON.parse(localStorage.getItem('cms_categories') || '[]');
        return categories.filter(cat => cat.visible !== false);
    },

    getAllCategories: function() {
        return JSON.parse(localStorage.getItem('cms_categories') || '[]');
    },

    getCategory: function(id) {
        const categories = this.getAllCategories();
        return categories.find(cat => cat.id === id);
    },

    saveCategory: function(category) {
        const categories = this.getAllCategories();
        const index = categories.findIndex(cat => cat.id === category.id);
        
        if (index >= 0) {
            categories[index] = category;
        } else {
            // Update item count
            category.itemCount = this.getProductsByCategory(category.id).length;
            categories.push(category);
        }
        
        localStorage.setItem('cms_categories', JSON.stringify(categories));
        this.updateCategoryItemCount(category.id);
    },

    deleteCategory: function(id) {
        const categories = this.getAllCategories();
        const filtered = categories.filter(cat => cat.id !== id);
        localStorage.setItem('cms_categories', JSON.stringify(filtered));
        
        // Also delete all products in this category
        this.deleteProductsByCategory(id);
    },

    updateCategoryItemCount: function(categoryId) {
        const categories = this.getAllCategories();
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
            category.itemCount = this.getProductsByCategory(categoryId).length;
            localStorage.setItem('cms_categories', JSON.stringify(categories));
        }
    },

    // Product operations
    getProducts: function(categoryId = null) {
        const products = JSON.parse(localStorage.getItem('cms_products') || '[]');
        let filtered = products.filter(p => p.visible !== false);
        
        if (categoryId) {
            filtered = filtered.filter(p => p.categoryId === categoryId);
        }
        
        return filtered;
    },

    getAllProducts: function() {
        return JSON.parse(localStorage.getItem('cms_products') || '[]');
    },

    getProduct: function(id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === id);
    },

    getProductsByCategory: function(categoryId) {
        const products = this.getAllProducts();
        return products.filter(p => p.categoryId === categoryId && p.visible !== false);
    },

    saveProduct: function(product) {
        const products = this.getAllProducts();
        const index = products.findIndex(p => p.id === product.id);
        
        if (index >= 0) {
            products[index] = product;
        } else {
            products.push(product);
        }
        
        localStorage.setItem('cms_products', JSON.stringify(products));
        this.updateCategoryItemCount(product.categoryId);
    },

    deleteProduct: function(id) {
        const products = this.getAllProducts();
        const product = products.find(p => p.id === id);
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('cms_products', JSON.stringify(filtered));
        
        if (product) {
            this.updateCategoryItemCount(product.categoryId);
        }
    },

    deleteProductsByCategory: function(categoryId) {
        const products = this.getAllProducts();
        const filtered = products.filter(p => p.categoryId !== categoryId);
        localStorage.setItem('cms_products', JSON.stringify(filtered));
    },

    // Utility functions
    generateId: function() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // Image conversion
    imageToBase64: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    },

    // Export/Import
    exportData: function() {
        const data = {
            categories: this.getAllCategories(),
            products: this.getAllProducts(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cms-data-' + new Date().getTime() + '.json';
        a.click();
        URL.revokeObjectURL(url);
    },

    importData: function(data) {
        if (data.categories) {
            localStorage.setItem('cms_categories', JSON.stringify(data.categories));
        }
        if (data.products) {
            localStorage.setItem('cms_products', JSON.stringify(data.products));
        }
        
        // Update item counts
        data.categories?.forEach(cat => {
            this.updateCategoryItemCount(cat.id);
        });
    },

    resetData: function() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            localStorage.removeItem('cms_categories');
            localStorage.removeItem('cms_products');
            this.loadDefaultData();
            return true;
        }
        return false;
    }
};

// Initialize on load - ensure it runs immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        CMS_DATA.init();
    });
} else {
    CMS_DATA.init();
}

