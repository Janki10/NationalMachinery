// Admin Panel JavaScript

let currentEditingCategory = null;
let currentEditingProduct = null;
let productImages = [];
let categoryImage = null;

// Tab management
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    // Load data for the tab
    if (tabName === 'categories') {
        loadCategories();
    } else if (tabName === 'products') {
        loadProducts();
        loadCategoryFilter();
    }
}

// Category Management
function loadCategories() {
    const categories = CMS_DATA.getAllCategories();
    const listContainer = document.getElementById('categories-list');
    
    if (categories.length === 0) {
        listContainer.innerHTML = '<p>No categories found. Add your first category!</p>';
        return;
    }
    
    listContainer.innerHTML = categories.map(category => `
        <div class="list-item">
            <div class="list-item-info">
                <h3>${category.name}</h3>
                <p>Items: ${category.itemCount || 0} | Link: ${category.link || 'N/A'}</p>
                <span class="status-badge ${category.visible !== false ? 'visible' : 'hidden'}">
                    ${category.visible !== false ? 'Visible' : 'Hidden'}
                </span>
            </div>
            <div class="list-item-actions">
                <button class="btn" onclick="editCategory('${category.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteCategory('${category.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function openCategoryModal(categoryId = null) {
    currentEditingCategory = categoryId;
    categoryImage = null;
    document.getElementById('category-image-preview').innerHTML = '';
    document.getElementById('category-form').reset();
    document.getElementById('category-id').value = '';
    document.getElementById('category-modal-title').textContent = categoryId ? 'Edit Category' : 'Add Category';
    
    if (categoryId) {
        const category = CMS_DATA.getCategory(categoryId);
        if (category) {
            document.getElementById('category-id').value = category.id;
            document.getElementById('category-name').value = category.name;
            document.getElementById('category-link').value = category.link || '';
            document.getElementById('category-visible').checked = category.visible !== false;
            
            // Load existing image
            if (category.image) {
                if (category.image.startsWith('data:')) {
                    categoryImage = category.image;
                    showCategoryImagePreview(category.image);
                } else {
                    // It's a file reference, show it
                    showCategoryImagePreview(category.image, true);
                }
            }
        }
    }
    
    document.getElementById('category-modal').classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('category-modal').classList.remove('active');
    currentEditingCategory = null;
    categoryImage = null;
}

function handleCategoryImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        CMS_DATA.imageToBase64(file, function(base64) {
            categoryImage = base64;
            showCategoryImagePreview(base64);
        });
    }
}

function showCategoryImagePreview(imageSrc, isFileRef = false) {
    const preview = document.getElementById('category-image-preview');
    if (isFileRef) {
        preview.innerHTML = `
            <div class="image-preview-item">
                <img src="${imageSrc}" alt="Preview">
                <button type="button" class="remove-img" onclick="removeCategoryImage()">×</button>
            </div>
        `;
    } else {
        preview.innerHTML = `
            <div class="image-preview-item">
                <img src="${imageSrc}" alt="Preview">
                <button type="button" class="remove-img" onclick="removeCategoryImage()">×</button>
            </div>
        `;
    }
}

function removeCategoryImage() {
    categoryImage = null;
    document.getElementById('category-image-preview').innerHTML = '';
}

document.getElementById('category-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const categoryId = document.getElementById('category-id').value || CMS_DATA.generateId();
    const category = {
        id: categoryId,
        name: document.getElementById('category-name').value,
        image: categoryImage || '',
        link: document.getElementById('category-link').value || categoryId + '.html',
        visible: document.getElementById('category-visible').checked,
        itemCount: 0
    };
    
    CMS_DATA.saveCategory(category);
    loadCategories();
    closeCategoryModal();
    alert('Category saved successfully!');
});

function editCategory(id) {
    openCategoryModal(id);
}

function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category? All products in this category will also be deleted.')) {
        CMS_DATA.deleteCategory(id);
        loadCategories();
    }
}

// Product Management
function loadCategoryFilter() {
    const categories = CMS_DATA.getAllCategories();
    const filter = document.getElementById('category-filter');
    filter.innerHTML = '<option value="">All Categories</option>' + 
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
}

function filterProducts() {
    loadProducts();
}

function loadProducts() {
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    const products = CMS_DATA.getProducts(categoryFilter);
    const listContainer = document.getElementById('products-list');
    
    if (products.length === 0) {
        listContainer.innerHTML = '<p>No products found. Add your first product!</p>';
        return;
    }
    
    const categories = CMS_DATA.getAllCategories();
    listContainer.innerHTML = products.map(product => {
        const category = categories.find(c => c.id === product.categoryId);
        return `
            <div class="list-item">
                <div class="list-item-info">
                    <h3>${product.title}</h3>
                    <p>Category: ${category ? category.name : 'Unknown'} | Images: ${product.images?.length || 0}</p>
                    <span class="status-badge ${product.visible !== false ? 'visible' : 'hidden'}">
                        ${product.visible !== false ? 'Visible' : 'Hidden'}
                    </span>
                </div>
                <div class="list-item-actions">
                    <button class="btn" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function openProductModal(productId = null) {
    currentEditingProduct = productId;
    productImages = [];
    document.getElementById('product-images-preview').innerHTML = '';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal-title').textContent = productId ? 'Edit Product' : 'Add Product';
    
    // Load categories for dropdown
    const categories = CMS_DATA.getAllCategories();
    const categorySelect = document.getElementById('product-category');
    categorySelect.innerHTML = categories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
    
    if (productId) {
        const product = CMS_DATA.getProduct(productId);
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-title').value = product.title;
            document.getElementById('product-category').value = product.categoryId;
            document.getElementById('product-visible').checked = product.visible !== false;
            
            // Load existing images
            if (product.images && product.images.length > 0) {
                productImages = [...product.images];
                productImages.forEach((img, index) => {
                    showProductImagePreview(img, index);
                });
            }
        }
    }
    
    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    currentEditingProduct = null;
    productImages = [];
}

function handleProductImagesUpload(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        CMS_DATA.imageToBase64(file, function(base64) {
            productImages.push(base64);
            showProductImagePreview(base64, productImages.length - 1);
        });
    });
}

function showProductImagePreview(imageSrc, index) {
    const preview = document.getElementById('product-images-preview');
    const div = document.createElement('div');
    div.className = 'image-preview-item';
    div.innerHTML = `
        <img src="${imageSrc}" alt="Preview">
        <button type="button" class="remove-img" onclick="removeProductImage(${index})">×</button>
    `;
    preview.appendChild(div);
}

function removeProductImage(index) {
    productImages.splice(index, 1);
    // Reload preview
    document.getElementById('product-images-preview').innerHTML = '';
    productImages.forEach((img, idx) => {
        showProductImagePreview(img, idx);
    });
}

document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productId = document.getElementById('product-id').value || CMS_DATA.generateId();
    const product = {
        id: productId,
        title: document.getElementById('product-title').value,
        categoryId: document.getElementById('product-category').value,
        images: productImages,
        visible: document.getElementById('product-visible').checked
    };
    
    CMS_DATA.saveProduct(product);
    loadProducts();
    closeProductModal();
    alert('Product saved successfully!');
});

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        CMS_DATA.deleteProduct(id);
        loadProducts();
    }
}

// Settings
function exportData() {
    CMS_DATA.exportData();
}

function importData() {
    document.getElementById('import-file').click();
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                CMS_DATA.importData(data);
                alert('Data imported successfully!');
                loadCategories();
                loadProducts();
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
}

function resetData() {
    if (CMS_DATA.resetData()) {
        alert('Data reset to default!');
        loadCategories();
        loadProducts();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadCategoryFilter();
});

