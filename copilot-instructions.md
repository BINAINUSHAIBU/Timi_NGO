# Copilot Instructions for TAPIIN Website

## Project Overview

This is a multi-project NGO website built with **HTML5, Bootstrap, jQuery, and PHP**. Two main projects exist:

- **citreloxproducts-main**: TAPIIN NGO website (primary focus) - HTML/CSS/JS with Bootstrap 4/5
- **TIMI-PROJECT**: Educational institution website with similar structure

## Architecture & Structure

### Frontend Stack

- **Framework**: Bootstrap 4/5 (multiple versions loaded - consolidation recommended)
- **DOM Manipulation**: jQuery 3.2.1
- **CSS**: Bootstrap utilities + custom stylesheets in `css/` and `assets/vendor/`
- **Plugins**:
  - Superslides (image carousel)
  - Owl Carousel (thumbnail slider)
  - AOS (Animate On Scroll)
  - BaguetteBox (lightbox)

### Key Directories

- `index-DEMO.html` - Main landing page (primary work file)
- `css/` - Local CSS files (multiple versions with redundancy)
- `js/` - jQuery plugins and custom scripts (`custom.js` is core)
- `assets/` - CDN-fallback resources (bootstrap, icons, AOS, vendor files)
- `php/form-process.php` - Contact form backend
- `images/` - NGO content images in `assets/NGO/` subdirectory

## Critical Patterns & Conventions

### HTML Structure Pattern

```html
<!-- Multiple <title> tags exist - consolidate to single tag -->
<!-- Dual CSS loading: local paths (css/) AND CDN paths (assets/vendor/) -->
<link rel="stylesheet" href="css/bootstrap.min.css" />
<link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css" />

<!-- All scripts at document end with jQuery dependency -->
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/custom.js"></script>
```

**Issues to Know**:

- Duplicate head metadata and multiple `<title>` tags
- Multiple Bootstrap versions loaded (4.4.1, 5.1.3, 5.2.3, 5.3.0-alpha1)
- Both local and CDN stylesheets for same frameworks

### CSS Organization

- **Don't modify** `bootstrap*.min.css`, `vendor/*.css` (external libraries)
- Add changes to `css/custom.css` (currently empty placeholder)
- Local `css/style.css` and `css/style2.css` contain base styles
- Inline styles exist throughout HTML - consolidate during refactoring

### JavaScript Patterns

1. **jQuery IIFE Pattern** (in `custom.js`):

```javascript
(function($) {
    "use strict";
    // Window load: fade preloader
    $(window).on('load', function() { ... });
    // Scroll events: fixed menu, back-to-top button
    $(window).on('scroll', function() { ... });
})
```

2. **Event handlers**: All event listeners use jQuery on-handlers
3. **No ES6 modules** - Pure jQuery dependency

### Navigation Menu

Bootstrap dropdowns with `data-bs-toggle="dropdown"` in navbar:

```html
<li class="nav-item dropdown">
  <a class="nav-link" href="#" data-bs-toggle="dropdown">Menu Item</a>
  <ul class="dropdown-menu fade-up">
    <li><a class="dropdown-item" href="page.html">Link</a></li>
  </ul>
</li>
```

**Convention**: All internal links point to `.html` files in root or subfolders.

### Content Sections

Pages use semantic article-based layout:

```html
<section class="features-grid">
  <article class="features-group">
    <div class="features-text">...</div>
    <div class="features-image">...</div>
  </article>
</section>
```

### Image Organization

- **Product/NGO images**: `assets/NGO/` (PIC2.jpg, PIC3.jpg, PIC4.jpg, etc.)
- **Department/staff images**: `images/` subdirectories
- **Favicon**: Points to both `images/citrolex_logo copy 2.png` and `assets/images/favicon.jpg`

## Backend (PHP)

### Form Processing Pattern

Location: `php/form-process.php`

- Basic form validation with `$_POST` checks
- No sanitization visible - **add input validation before production**
- Email destination hardcoded: `armanmia7@gmail.com`
- **Known issue**: References undefined `$guest`, `$event` variables

**When modifying forms**:

1. Update HTML form fields with `name` attributes
2. Sync names in `php/form-process.php` validation block
3. Verify `$EmailTo` recipient is correct

## Critical Developer Workflows

### Adding New Pages

1. Copy existing `.html` template (e.g., `service.html`)
2. Update `<title>`, meta tags, page content
3. Add navbar link in navigation dropdown menu (index-DEMO.html)
4. Ensure asset paths work: `assets/images/`, `css/`, `js/` relative to root

### Updating Navigation

All menu items in `index-DEMO.html` navbar point to:

- Root-level pages: `about_college.html`, `CS_IT.html`
- External URLs: `https://citreloxpproduct.netlify.app/cart`
- Internal pages follow pattern: `href="page-name.html"`

### Image Path Conventions

- Relative paths from HTML file location
- NGO images: `assets/NGO/PIC*.jpg`
- Generic assets: `assets/images/` for icons/logos
- Local: `images/` directory at root

## Known Issues & Technical Debt

1. **Duplicate CSS Framework Versions**: Multiple Bootstrap versions loaded - consolidate to v5.3+
2. **Multiple Title Tags**: Head section has 3 `<title>` definitions
3. **CSS File Redundancy**: `css/` and `css4/` directories with duplicate stylesheets
4. **No Input Validation**: PHP form-process.php lacks sanitization
5. **jQuery-Only**: No modern ES6, no build tools
6. **Hardcoded Email**: Form recipient email hardcoded in PHP
7. **Inline Styles**: Extensive inline CSS throughout HTML (should move to stylesheets)

## For AI Agents: Immediate Tasks

When working on this codebase:

1. **Preserve jQuery patterns** - Don't refactor to vanilla JS without explicit request
2. **Keep Bootstrap utilities** - Use existing classes before adding custom CSS
3. **Check both paths** - CSS loads from both `css/` and `assets/vendor/` directories
4. **Test responsive design** - Pages use Bootstrap grid extensively
5. **Validate form fields** - If modifying PHP forms, add input validation
6. **Image paths matter** - Use relative paths; NGO content in `assets/NGO/`

## References

- [Bootstrap 5.3 Docs](https://getbootstrap.com/docs/5.3/)
- jQuery pattern file: [js/custom.js](js/custom.js)
- Form backend: [php/form-process.php](php/form-process.php)
- Main HTML: [index-DEMO.html](index-DEMO.html)
