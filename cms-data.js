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

        const defaultProducts = [
            // Injection Moulding
            { id: 'injection-1', categoryId: 'injection-moulding', title: 'Ferromatik 200 ton pet series with 3 nos 48 cavity 3 star preform moulds', images: ['i1.jpg'], visible: true },
            { id: 'injection-2', categoryId: 'injection-moulding', title: 'Ferromatik Q ACCUPACK servo 280 tons tie bar less', images: ['i2.jpg'], visible: true },
            { id: 'injection-3', categoryId: 'injection-moulding', title: 'Ferromatik 660 ton ac drive', images: ['i3.jpg', 'i4.jpg'], visible: true },
            { id: 'injection-4', categoryId: 'injection-moulding', title: 'Windsor 350 ton servo', images: ['i5.jpg'], visible: true },
            { id: 'injection-5', categoryId: 'injection-moulding', title: 'Toshiba 150 ton', images: ['i6.jpg'], visible: true },
            { id: 'injection-6', categoryId: 'injection-moulding', title: 'Windsor Armour 150 ton servo', images: ['i7.jpg'], visible: true },
            { id: 'injection-7', categoryId: 'injection-moulding', title: 'Windsor Armour 100 ton', images: ['i8.jpg'], visible: true },
            { id: 'injection-8', categoryId: 'injection-moulding', title: 'Windsor 800 ton', images: ['i9.jpg', 'i10.jpg'], visible: true },
            { id: 'injection-9', categoryId: 'injection-moulding', title: 'Supermaster 250 ton', images: ['i11.jpg'], visible: true },
            { id: 'injection-10', categoryId: 'injection-moulding', title: 'Nigata 100 ton', images: ['i12.jpg', 'i13.jpg'], visible: true },
            { id: 'injection-11', categoryId: 'injection-moulding', title: 'Jsw 100 ton', images: ['i14.jpg'], visible: true },

            // Blow Moulding
            { id: 'blow-1', categoryId: 'blow-moulding', title: 'Aryan 30 lit with 100 point ultra parison prog', images: ['b1.jpg', 'b2.jpg'], visible: true },
            { id: 'blow-2', categoryId: 'blow-moulding', title: 'Jagmohan 5 lit single station', images: ['b3.jpg'], visible: true },
            { id: 'blow-3', categoryId: 'blow-moulding', title: 'Jagmohan 15lit with 30lit Clamping, 200 point parison prog', images: ['b4.jpg', 'b5.jpg', 'b6.jpg'], visible: true },
            { id: 'blow-4', categoryId: 'blow-moulding', title: 'Cmp 5 lit double station', images: ['b7.jpg'], visible: true },
            { id: 'blow-5', categoryId: 'blow-moulding', title: 'Smart Machine 2 lit double station', images: ['b8.jpg'], visible: true },

            // Pet Blow Machines
            { id: 'pet-1', categoryId: 'pet-blow-machines', title: 'SS PET PET PLOW Year 2015', images: ['p1.jpg'], visible: true },
            { id: 'pet-2', categoryId: 'pet-blow-machines', title: 'SS enterprise', images: ['p2.jpg', 'p3.jpg'], visible: true },

            // Compression Moulding
            { id: 'compression-1', categoryId: 'compression-moulding', title: 'Used Jobo (China) compression moulding machine', images: ['c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg'], visible: true },

            // Extrusion
            { id: 'extrusion-1', categoryId: 'extrusion', title: 'Innotech make conical twin screw', images: ['Extrusion.jpg', 'e2.jpg', 'e3.jpg', 'e4.jpg'], visible: true },
            { id: 'extrusion-2', categoryId: 'extrusion', title: '65mm plant groove feed Laser machine 100 watt Auto winder Auto punching 1 hp liner machine attached', images: ['e2_1.jpg', 'e2_2.jpg', 'e2_3.jpg', 'e2_4.jpg'], visible: true },
            { id: 'extrusion-3', categoryId: 'extrusion', title: 'Used Thermoforming line', images: ['e3_1.jpg'], visible: true },

            // CNC Machines
            { id: 'cnc-1', categoryId: 'cnc-machines', title: 'Ams vmc Year 2013 fanuc controls', images: ['cnc1.jpg'], visible: true },

            // Ancillaries
            { id: 'ancillary-1', categoryId: 'ancillaries', title: '5 head for cmp 2 lit machine', images: ['a1.jpg'], visible: true },

            // Moulds
            { id: 'moulds-1', categoryId: 'moulds', title: '20 ltr mould : 780 + 255 gms / 20 kg mould : 560 gms + 230 gms / 10 ltr (2 moulds) : 440 gms + 115 gms / 10 kg : 340 gms + 100 gms', images: ['m1.jpg'], visible: true },
            { id: 'moulds-2', categoryId: 'moulds', title: 'Grape crate mould', images: ['m2.jpg', 'm3.jpg'], visible: true },
            { id: 'moulds-3', categoryId: 'moulds', title: 'Bosen make, Weight of article 3.3 kgs with 10% filler, 4 years old, 3 inserts', images: ['m5.jpg', 'm6.jpg', 'm7.jpg'], visible: true },
            { id: 'moulds-4', categoryId: 'moulds', title: '20 lit and 10 lit paint container mould', images: ['m7.jpg'], visible: true },
            { id: 'moulds-5', categoryId: 'moulds', title: 'Milk crate mould', images: ['m8.jpg'], visible: true },
            { id: 'moulds-6', categoryId: 'moulds', title: 'Chair mould', images: ['m9.jpg'], visible: true },
            { id: 'moulds-7', categoryId: 'moulds', title: 'Various blow moulds from 5 lit to 20 lit', images: ['m10.jpg', 'm11.jpg', 'm12.jpg', 'm13.jpg', 'm14.jpg', 'm15.jpg', 'm16.jpg', 'm17.jpg'], visible: true },
            { id: 'moulds-8', categoryId: 'moulds', title: 'Crate mould 1.9kg for mango', images: ['m18.jpg'], visible: true },
            { id: 'moulds-9', categoryId: 'moulds', title: 'Chair mould 3 years old, 4 inserts, 2.4 kg in virgin', images: ['m19.jpg', 'm20.jpg', 'm21.jpg'], visible: true },
            { id: 'moulds-10', categoryId: 'moulds', title: 'Jumbo crate mould', images: ['m22.jpg', 'm23.jpg'], visible: true },
            { id: 'moulds-11', categoryId: 'moulds', title: 'Chair mould Weight in 70-20-10 is 3.2, 4-5 years old, 2 molds (chair + clip on insert back)', images: ['m24.jpg', 'm25.jpg', 'm26.jpg'], visible: true },

            // IBM
            { id: 'ibm-1', categoryId: 'ibm', title: 'Lianxing 80 ton machine Brand new only trial taken 2021 model with 3 MTC toshiba make', images: ['ibm1.jpg'], visible: true },
            { id: 'ibm-2', categoryId: 'ibm', title: 'Jasu 160 ton ibm Year 2015', images: ['ibm2.jpg', 'ibm3.jpg', 'ibm4.jpg'], visible: true },
            { id: 'ibm-3', categoryId: 'ibm', title: 'Lianxing ibm 80 servo', images: ['ibm5.jpg', 'ibm6.jpg', 'ibm7.jpg', 'ibm8.jpg'], visible: true },
            { id: 'ibm-4', categoryId: 'ibm', title: 'Victor msz 25', images: ['ibm9.jpg', 'ibm10.jpg'], visible: true },
            { id: 'ibm-5', categoryId: 'ibm', title: 'Zhongya ibm 45 Year 2007 in excellent condition with bnr plc', images: ['ibm11.jpg', 'ibm12.jpg'], visible: true },
            { id: 'ibm-6', categoryId: 'ibm', title: 'Zhongya ibm 25', images: ['ibm13.jpg'], visible: true }
        ];

        // Update category item counts based on default products
        defaultCategories.forEach(category => {
            category.itemCount = defaultProducts.filter(product => product.categoryId === category.id && product.visible !== false).length;
        });

        localStorage.setItem('cms_categories', JSON.stringify(defaultCategories));
        localStorage.setItem('cms_products', JSON.stringify(defaultProducts));
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

