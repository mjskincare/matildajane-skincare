# Matilda Jane Skincare — Site Files

A static HTML/CSS site you fully own. No subscriptions, no platform lock-in.

## File Structure

```
matildajane/
├── index.html                    Homepage with brand story + 7 collections
├── README.md                     This file
├── assets/
│   └── product.css              Shared styles for all product pages
└── products/
    ├── calming-barrier.html      Calm collection product
    ├── clarifying-bha.html       Clarify collection product
    ├── neuro-restore.html        Renew collection (flagship)
    ├── brightening-vitamin-c.html  Brighten collection product
    └── daily-defence.html        Men's collection product
```

## How to Deploy

Three free options. All work with any custom domain you already own.

### Option A — Cloudflare Pages (recommended)
1. Create a free Cloudflare account.
2. Drag the entire `matildajane/` folder onto Cloudflare Pages.
3. Point your domain at the Pages URL via Cloudflare's DNS.
   Done. Free SSL, fast CDN, no monthly cost.

### Option B — Netlify
1. Sign up for Netlify (free tier).
2. Drag-and-drop the `matildajane/` folder onto the Netlify dashboard.
3. Connect your domain in Site Settings → Domain management.

### Option C — Traditional web host
If you already pay for shared hosting (e.g. SiteGround, GoDaddy, Crazy Domains), upload everything inside `matildajane/` to your `public_html/` folder via FTP or cPanel File Manager.

## How to Add a New Product

1. Copy any file in `products/` (e.g. `calming-barrier.html`).
2. Rename it (e.g. `your-new-product.html`).
3. In the new file, change the `<body class="theme-X">` to match the collection:
   - `theme-hydrate` · `theme-calm` · `theme-clarify` · `theme-renew`
   - `theme-brighten` · `theme-mens` · `theme-targeted`
4. Update the text content inside each section.
5. Add the product to `index.html` collection cards.

## How to Add Real Product Photos

The product cards currently show a styled placeholder bottle drawn in CSS. To use real photos:

1. Create an `images/` folder.
2. Drop your product photos in.
3. In each product page, replace the `<div class="product-bottle">` block with:
   ```html
   <img src="../images/your-photo.jpg" alt="Product name" style="max-width:100%; height:auto;">
   ```

## Theme Colors

Edit `assets/product.css` to tweak any collection's color scheme. Each theme is defined by 8 CSS variables — you can change them all at once.

## Brand Fonts

Loaded from Google Fonts (free, fast, no setup):
- **Outfit** — bold headings
- **Cormorant Garamond** — italic accents and product names
- **Jost** — body and UI

## Contact for Custom Formulation

Email links throughout point to `laura@matildajanenz.com`.
Update this in every HTML file if you want a different contact address.

---

*Site built to match the existing detailed Neuro-Restore page style. All pages are fully responsive and work without JavaScript dependencies.*
