# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Product data

The product catalog, categories, product details, and product images use the
free public [DummyJSON Products API](https://dummyjson.com/docs/products).
Product images are served from DummyJSON's public CDN. The catalog is sample
data and does not represent live inventory or real checkout.

## Demo accounts

Sign-up and sign-in are browser-only demo features. Accounts and sign-in state
are stored in the browser's local storage; passwords are stored as salted
PBKDF2 hashes. This is not server-backed authentication and can be modified or
cleared by the browser user. Do not use real or reused passwords.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
