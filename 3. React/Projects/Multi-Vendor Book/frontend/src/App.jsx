import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    title: 'NeoShelf Novel',
    vendor: 'BookBarn',
    price: 379,
    rating: 4.8,
    stock: 12,
    description: 'A modern fantasy novel with adventure, friendship, and market-ready charm.',
  },
  {
    id: 2,
    title: 'Studio Sketchbook',
    vendor: 'PagePalette',
    price: 249,
    rating: 4.5,
    stock: 20,
    description: 'A premium sketchbook for writers and artists who love keeping ideas in one place.',
  },
  {
    id: 3,
    title: 'Cooking Canvas',
    vendor: 'KitchenReads',
    price: 459,
    rating: 4.7,
    stock: 8,
    description: 'A cookbook with vivid recipes from home chefs and easy step-by-step guides.',
  },
  {
    id: 4,
    title: 'Startup Stories',
    vendor: 'PagePalette',
    price: 529,
    rating: 4.9,
    stock: 6,
    description: 'Entrepreneurial stories and practical lessons for founders and dreamers.',
  },
  {
    id: 5,
    title: 'Wellness Journal',
    vendor: 'BookBarn',
    price: 199,
    rating: 4.4,
    stock: 16,
    description: 'Track habits, goals, and daily gratitude in a beautifully designed wellness journal.',
  },
]

const vendors = ['All', ...new Set(products.map((product) => product.vendor))]

function App() {
  const [cart, setCart] = useState({})
  const [vendorFilter, setVendorFilter] = useState('All')

  const visibleProducts = useMemo(
    () =>
      vendorFilter === 'All'
        ? products
        : products.filter((product) => product.vendor === vendorFilter),
    [vendorFilter]
  )

  const cartEntries = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = products.find((item) => item.id === Number(id))
          return product ? { ...product, qty } : null
        })
        .filter(Boolean),
    [cart]
  )

  const totalItems = cartEntries.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cartEntries.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const addToCart = (productId) => {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId) => {
    setCart((current) => {
      const existing = current[productId] || 0
      if (existing <= 1) {
        const next = { ...current }
        delete next[productId]
        return next
      }
      return {
        ...current,
        [productId]: existing - 1,
      }
    })
  }

  const deleteItem = (productId) => {
    setCart((current) => {
      const next = { ...current }
      delete next[productId]
      return next
    })
  }

  const clearCart = () => setCart({})

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Multi-Vendor Book Marketplace</p>
          <h1>Interactive shopping for books and products</h1>
          <p className="intro">
            Browse vendor collections, compare prices, and manage your cart in one
            friendly place.
          </p>
        </div>
        <div className="summary-card">
          <span className="summary-label">Your cart</span>
          <div className="summary-value">{totalItems} item{totalItems === 1 ? '' : 's'}</div>
          <div className="summary-note">Subtotal ₹{subtotal.toFixed(0)}</div>
          <button
            type="button"
            className="button-secondary"
            onClick={clearCart}
            disabled={totalItems === 0}
          >
            Clear cart
          </button>
        </div>
      </header>

      <section className="content-grid">
        <aside className="filters-panel">
          <div className="filter-group">
            <h2>Filter by vendor</h2>
            <div className="vendor-buttons">
              {vendors.map((vendor) => (
                <button
                  key={vendor}
                  type="button"
                  className={
                    vendor === vendorFilter ? 'vendor-button active' : 'vendor-button'
                  }
                  onClick={() => setVendorFilter(vendor)}
                >
                  {vendor}
                </button>
              ))}
            </div>
          </div>

          <div className="cart-panel">
            <h2>Shopping cart</h2>
            {cartEntries.length === 0 ? (
              <p className="empty-cart">Cart is empty — add a book to start shopping.</p>
            ) : (
              <ul className="cart-list">
                {cartEntries.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-vendor">{item.vendor}</div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-item-qty">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove one ${item.title}`}
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          aria-label={`Add one ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-price">
                        ₹{(item.price * item.qty).toFixed(0)}
                      </div>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => deleteItem(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <main className="products-panel">
          <div className="products-header">
            <div>
              <h2>Featured books</h2>
              <p>Shop bestsellers, cookbooks, journals and vendor collections.</p>
            </div>
            <span className="product-count">{visibleProducts.length} products</span>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-meta">
                  <span className="vendor-badge">{product.vendor}</span>
                  <span className="rating">★ {product.rating}</span>
                </div>
                <h3>{product.title}</h3>
                <p className="product-copy">{product.description}</p>
                <div className="product-footer">
                  <div>
                    <strong>₹{product.price.toFixed(0)}</strong>
                    <div className="product-stock">{product.stock} left</div>
                  </div>
                  <button
                    type="button"
                    className="button-primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </section>
    </div>
  )
}

export default App
