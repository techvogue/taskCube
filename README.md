# GTG Perfumes - HTML Developer Assignment

A pixel-perfect, fully responsive webpage converted from Figma design.

## Project Structure

```
/project-folder
   /assets  (contains images exported from Figma)
   /css     (contains stylesheets)
   /js      (contains scripts)
   index.html
   README.md
```

## Features Implemented

### ✅ Pixel Perfect Implementation
- Exact match to Figma design specifications
- Proper typography, spacing, and colors

### ✅ Responsive Design
- Desktop view (1200px+)
- Tablet view (640px - 968px)
- Mobile view (< 640px)
- Hamburger menu for mobile/tablet navigation

### ✅ Interactive Elements

1. **Product Gallery**
   - Clickable arrows for navigation
   - Dot indicators for current image
   - Thumbnail navigation
   - Keyboard arrow key support
   - Smooth transitions

2. **Radio Button Functionality**
   - Two radio groups: Fragrances (3 options) and Purchase Type (3 options)
   - 9 different add-to-cart link variations based on selection
   - Dynamic link updates on selection change

3. **Expandable Subscription Sections**
   - Single Subscription expands when selected
   - Double Subscription expands when selected
   - Smooth expand/collapse animations

4. **Counter Animation**
   - Statistics section (84%, 78%, 89%, 90%) count up from 0
   - Triggers when section comes into view
   - Smooth animation using requestAnimationFrame

5. **Collection Accordion**
   - Expandable/collapsible sections
   - Smooth transitions

6. **HTML Table**
   - Comparison table with proper HTML table structure
   - Responsive with horizontal scroll on mobile

### ✅ Performance Optimizations
- Lazy loading for images
- Debounced scroll events
- CSS animations for smooth UI
- Optimized CSS and JavaScript

### ✅ Cross-Browser Compatibility
- Tested and compatible with Chrome, Firefox, Edge, and Safari
- Fallbacks for older browsers

## Image Requirements

**IMPORTANT:** All images need to be exported directly from the Figma file and placed in the `/assets` folder with the following names:

### Required Images:
- `hero-perfume.png` - Hero section perfume bottle
- `product-main-1.png` through `product-main-8.png` - Main product gallery images (8 images)
- `product-thumb-1.png` through `product-thumb-8.png` - Product thumbnail images (8 images)
- `lifestyle-image.png` - Lifestyle section image

### Export Instructions from Figma:
1. Open the Figma design file
2. Select each image/frame
3. Right-click → Export → Choose PNG format
4. Export at 2x resolution for retina displays
5. Save with the exact names listed above in the `/assets` folder

## Setup Instructions

1. Export all images from Figma to the `/assets` folder
2. Open `index.html` in a web browser
3. For local development, use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
4. Navigate to `http://localhost:8000` in your browser

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## File Descriptions

### `index.html`
- Semantic HTML5 structure
- All sections: header, hero, product, collection, stats, comparison, footer
- Proper accessibility attributes

### `css/styles.css`
- Complete styling matching Figma design
- Responsive breakpoints
- CSS animations and transitions
- Mobile-first approach

### `js/scripts.js`
- Product gallery functionality
- Radio button and add-to-cart logic
- Counter animations
- Lazy loading
- Smooth scrolling
- Mobile menu toggle

## Testing Checklist

- [x] Hamburger menu works on mobile/tablet
- [x] Product gallery navigation (arrows, dots, thumbnails)
- [x] Radio buttons update add-to-cart link (9 variations)
- [x] Subscription sections expand/collapse
- [x] Statistics counter animation
- [x] Collection accordion functionality
- [x] Responsive design on all screen sizes
- [x] Cross-browser compatibility
- [x] Smooth animations and transitions

## Deployment

The project can be deployed to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

Simply upload the project folder or connect your Git repository.

## Notes

- All images should be optimized for web (compressed but maintaining quality)
- The add-to-cart links use placeholder URLs - replace with actual product URLs
- Newsletter form currently shows an alert - integrate with your backend API
- Chat widget is visual only - integrate with your chat service

## License

This project was created as part of an HTML Developer assignment.
