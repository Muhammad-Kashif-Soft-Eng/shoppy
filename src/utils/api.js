const BASE_URL = 'https://fakestoreapi.com'

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `Request failed: ${res.status}`)
  }
  return res.json()
}

// Products
export const getProducts       = (limit)    => request(`/products${limit ? `?limit=${limit}` : ''}`)
export const getProduct        = (id)        => request(`/products/${id}`)
export const getCategories     = ()          => request('/products/categories')
export const getProductsByCategory = (cat)  => request(`/products/category/${encodeURIComponent(cat)}`)
export const getSortedProducts = (sort)     => request(`/products?sort=${sort}`)

// Carts (for order simulation)
export const getUserCart = (userId) => request(`/carts/user/${userId}`)

export default {
  getProducts,
  getProduct,
  getCategories,
  getProductsByCategory,
  getSortedProducts,
  getUserCart,
}
