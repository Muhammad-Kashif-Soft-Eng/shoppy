# Shoppy

Shoppy is a responsive e-commerce demo built with React, JavaScript, Tailwind
CSS, and React Router. It includes a product catalog and a complete local
shopping flow from discovery through order history.

## Features

- Browse dynamically loaded products and categories.
- Search, filter by category and price, sort, and paginate product results.
- View product details and manage a persistent wishlist.
- Add products to the cart, change quantities, remove items, and review totals.
- Register and sign in to a local demo account.
- Validate checkout details, place a sample order, and review its summary and
  order history.
- Responsive navigation, catalog filters, loading/error/empty states, and
  accessible focus and interaction states.

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Product API

Products and categories are fetched from the public
[DummyJSON Products API](https://dummyjson.com/docs/products). The catalog
requires an internet connection. The API provides sample product data; stock
and purchasing are not connected to a live store.

## Local demo data

Authentication, cart contents, wishlist contents, and orders are persisted in
the current browser's local storage. Authentication is not backed by a server,
and checkout does not collect payment or create a shipment. Browser storage is
local to that browser and can be changed or cleared by its user. Do not use a
real or reused password for a demo account.
