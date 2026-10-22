# Sunrise Bakehouse

A responsive bakery landing page built from the Sunrise Bakehouse PRD. It uses a warm orange palette, product-led storytelling, a working store finder, and a validated newsletter form.

## Preview

From this folder, run:

```powershell
python -m http.server 4174
```

Then open `http://localhost:4174`.

There is no build step. `index.html`, `styles.css`, `script.js`, and the files in `assets/` are the complete site.

## Included

- Sticky header with mobile menu and keyboard focus handling
- Dismissible promotion announcement
- Responsive hero with product-led photography
- Scrolling signature bake shelf with reduced-motion fallback
- Four product cards with prices, allergen notes, and order links
- Two promotion modules
- Brand story with proof points
- Postal-code and geolocation store finder with nearest-outlet sorting and directions links
- Newsletter form with inline validation, consent, and success state
- SEO metadata, Bakery JSON-LD, favicon, lazy-loaded images, and image dimensions
- WCAG checks pass in axe with no reported violations in the tested desktop state

## Before launch

- Replace the working brand name, logo, outlet data, prices, and copy with approved content.
- Connect the order CTAs to the real ordering platform. They currently route to the store finder so the visitor selects an outlet first.
- Connect the newsletter form to the email platform. The current form validates in the browser only and does not transmit or store the address.
- Replace the placeholder Unsplash photography with commissioned product and outlet images. Keep the supplied alt text accurate.
- Confirm opening hours, holiday hours, allergen data, and every claim with operations.
- Re-run accessibility, performance, analytics, and consent checks after integrations are added.

## Where to edit

- Outlet data and postal-sector approximations: `outlets`, `postalOverrides`, and `postalSectors` in `script.js`
- Newsletter validation and states: the newsletter section at the bottom of `script.js`
- Brand tokens, type, and responsive rules: `:root` and media queries in `styles.css`
- Copy and content: `index.html`

## Notes

This is a concept prototype. Sunrise Bakehouse is a fictional working brand, and the photography in `assets/` is placeholder imagery from Unsplash.
