# CMS Admin Panel - User Guide

## Overview
This is a client-side Content Management System (CMS) that allows you to manage your product catalog without needing a server. All data is stored in the browser's localStorage.

## Features
- ✅ **Manage Categories** - Add, edit, delete product categories
- ✅ **Manage Products** - Add, edit, delete products with multiple images
- ✅ **Image Upload** - Upload images directly from your computer (stored as base64)
- ✅ **Visibility Control** - Show/hide categories and products
- ✅ **Export/Import** - Backup and restore your data
- ✅ **No Server Required** - Everything runs in the browser

## Getting Started

### 1. Access the Admin Panel
Open `admin.html` in your browser to access the CMS admin panel.

### 2. Using the CMS

#### Managing Categories
1. Click on the **Categories** tab
2. Click **+ Add Category** to create a new category
3. Fill in:
   - **Category Name** (required)
   - **Category Image** (click to upload)
   - **Link** (e.g., `injection-moulding.html`)
   - **Visible** checkbox (to show/hide)
4. Click **Save Category**

#### Managing Products
1. Click on the **Products** tab
2. Click **+ Add Product** to create a new product
3. Fill in:
   - **Product Title** (required)
   - **Category** (select from dropdown)
   - **Product Images** (click to upload multiple images)
   - **Visible** checkbox (to show/hide)
4. Click **Save Product**

#### Image Management
- **Upload Images**: Click on the image upload area and select image files
- **Remove Images**: Click the × button on any image preview
- **Multiple Images**: Products support multiple images that will be shown in a carousel

### 3. Data Management

#### Export Data
- Click **Export Data** in the Settings tab
- This downloads a JSON file with all your categories and products
- Use this to backup your data

#### Import Data
- Click **Import Data** in the Settings tab
- Select a previously exported JSON file
- This will replace all current data

#### Reset to Default
- Click **Reset to Default** to restore the original default categories
- ⚠️ **Warning**: This will delete all your custom data!

## How It Works

### Data Storage
- All data is stored in `localStorage` (browser storage)
- Data persists between browser sessions
- Each browser has its own data (not shared)

### File Structure
- `admin.html` - CMS Admin Panel
- `cms-data.js` - Data management functions
- `admin.js` - Admin panel UI logic
- `cms-frontend.js` - Frontend rendering logic
- `First Page.html` - Homepage (dynamically loads categories)
- Category pages (e.g., `injection-moulding.html`) - Dynamically load products

### Adding Products to Existing Categories

The system comes with default categories. To add products:

1. Go to Admin Panel → Products tab
2. Click **+ Add Product**
3. Select the category (e.g., "Injection Moulding")
4. Enter product title and upload images
5. Save

The product will automatically appear on the category page!

## Tips

1. **Image Optimization**: Large images stored as base64 can take up localStorage space. Consider compressing images before uploading.

2. **Backup Regularly**: Use the Export feature to backup your data regularly.

3. **Browser Compatibility**: This CMS works in all modern browsers (Chrome, Firefox, Safari, Edge).

4. **Multiple Browsers**: Data is stored per browser. If you use multiple browsers, you'll need to import data in each.

## Troubleshooting

### Products not showing?
- Check that the product is set to "Visible"
- Check that the category ID matches the page filename
- Clear browser cache and reload

### Images not loading?
- Check that images were uploaded successfully
- Verify images are base64 format in localStorage
- Try re-uploading the images

### Data lost?
- Check if you accidentally reset data
- Try importing from a backup if you have one
- Check browser localStorage isn't cleared

## Next Steps

To convert existing products from HTML to CMS:
1. Use the admin panel to manually add products
2. Or, we can create a migration script to import from existing HTML (if needed)

---

**Note**: This is a client-side CMS. Data is stored locally in your browser. If you clear browser data, you'll lose your CMS data unless you've exported it first.

