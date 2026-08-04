import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Classic Sneakers',
    price: 79.99,
    description: 'Comfortable everyday shoes with clean styling.',
  },
  {
    id: 2,
    name: 'Leather Tote Bag',
    price: 129.95,
    description: 'Roomy carry-all with polished leather details.',
  },
  {
    id: 3,
    name: 'Minimalist Watch',
    price: 149.5,
    description: 'Modern analog watch with a metal mesh strap.',
  },
  {
    id: 4,
    name: 'Cozy Hoodie',
    price: 49.99,
    description: 'Soft fleece hoodie designed for weekend comfort.',
  },
]

function App() {
  const [cart, setCart] = useState({})

  const addToCart = (productId) => {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      if (!currentCart[productId]) return currentCart
      const nextCart = { ...currentCart }
      const nextQuantity = nextCart[productId] - 1
      if (nextQuantity <= 0) {
        delete nextCart[productId]
      } else {
        nextCart[productId] = nextQuantity
      }
      return nextCart
    })
  }

  const clearCart = () => setCart({})

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({
          ...product,
          quantity: cart[product.id],
          total: product.price * cart[product.id],
        })),
    [cart],
  )

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Product Catalog</h1>
          <p className="subtitle">
            Browse the collection and add items to your cart in one click.
          </p>
        </div>
        <div className="cart-status">
          <span className="cart-count">{itemCount}</span>
          <p>{itemCount ? 'items in your cart' : 'cart is empty'}</p>
        </div>
      </header>

      <main className="layout-grid">
        <section className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-thumb" aria-hidden="true">
                {product.name.split(' ').map((word) => word[0]).join('')}
              </div>
              <div className="product-copy">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="product-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-panel">
          <div className="cart-panel-header">
            <h2>Your Cart</h2>
            <button
              type="button"
              className="button button-link"
              onClick={clearCart}
              disabled={!itemCount}
            >
              Clear
            </button>
          </div>

          {cartItems.length ? (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-meta">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="cart-item-actions">
                      <span className="cart-item-total">
                        ${item.total.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => removeFromCart(item.id)}
                      >
                        −
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <p>Total</p>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
            </>
          ) : (
            <p className="empty-state">Add a product to start your order.</p>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App
