# Toucanzy Bite

A responsive React storefront for Toucanzy Bite freeze-dried fruit, built with Vite.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The storefront includes a product catalog, a persistent shopping bag, and a
checkout form that prepares an order message for WhatsApp at `+91 86883 26611`.

## Source layout

- `src/main.jsx` starts React and enables browser URL routing.
- `src/App.jsx` is the shared site shell: it owns cart/checkout state and renders
  the header, current route, shared promo section, footer, and dialogs.
- `src/routes/AppRoutes.jsx` maps URLs to pages: `/` (home), `/shop`, and
  `/story`. Unknown paths redirect to `/`.
- `src/components/` contains the page content, shared UI,
  product details, cart, and checkout components.
- `src/data/products.js` contains the product catalog and delivery regions.
- `src/utils/store.js` contains cart, pricing, and order-message functions.

## How navigation works

The header and mobile navigation use React Router links, so changing pages
updates the URL without reloading the app. `AppRoutes` chooses which page to
render. Storefront state stays in `App.jsx`, so the cart remains available when
moving between routes; cart data and delivery state are saved in local storage.
