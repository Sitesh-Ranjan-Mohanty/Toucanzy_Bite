import React, { useEffect, useMemo, useState } from "react";

const products = [
  {
    id: "strawberry",
    name: "Strawberry Pop",
    description: "Sweet, sunny strawberry slices",
    weight: "20 g",
    price: 149,
    category: "Berries",
    tag: "BESTSELLER",
    color: "#f6e5df",
    image: "photo-1464965911861-746a04b4bca6",
    alt: "Fresh ripe strawberries",
  },
  {
    id: "mango",
    name: "Mango Masti",
    description: "A little taste of tropical sunshine",
    weight: "25 g",
    price: 169,
    category: "Tropical",
    tag: "TROPICAL FAVE",
    color: "#f7e9c9",
    image: "photo-1553279768-865429fa0078",
    alt: "Golden ripe mango",
  },
  {
    id: "banana",
    name: "Banana Bites",
    description: "Light, lovely, naturally sweet",
    weight: "25 g",
    price: 129,
    category: "Orchard",
    tag: "",
    color: "#f2edce",
    image: "photo-1571771894821-ce9b6c11b08e",
    alt: "Fresh yellow bananas",
  },
  {
    id: "pineapple",
    name: "Pineapple Party",
    description: "A tangy crunch with island energy",
    weight: "25 g",
    price: 159,
    category: "Tropical",
    tag: "TANGY & FUN",
    color: "#f4e9bd",
    image: "photo-1550258987-190a2d41a8ba",
    alt: "Fresh golden pineapple",
  },
  {
    id: "blueberry",
    name: "Blueberry Bliss",
    description: "Tiny berries, big happy crunch",
    weight: "20 g",
    price: 189,
    category: "Berries",
    tag: "",
    color: "#e5e3ef",
    image: "photo-1498557850523-fd3d118b962e",
    alt: "Fresh blueberries",
  },
  {
    id: "apple",
    name: "Apple Crumbles",
    description: "Crispy little bites of orchard goodness",
    weight: "25 g",
    price: 139,
    category: "Orchard",
    tag: "",
    color: "#e8eddc",
    image: "photo-1560806887-1e4cd0b6cbd6",
    alt: "Fresh red and green apples",
  },
];

const imageUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=85`;
const formatPrice = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

function Icon({ name, size = 20 }) {
  const paths = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z" /><path d="M4 20c3-4 6-6 11-9" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#home" aria-label="Toucanzy Bite home">
      <img className="brand-logo" src="/toucanzy-bite-logo.png" alt="" />
    </a>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("toucanzy-cart") || "{}");
    } catch {
      return {};
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All fruits");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("toucanzy-cart", JSON.stringify(cart));
  }, [cart]);

  const cartItems = useMemo(
    () => products.filter((product) => cart[product.id]).map((product) => ({
      ...product,
      quantity: cart[product.id],
    })),
    [cart],
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All fruits" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateQuantity = (id, amount) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  };

  const addToCart = (product, quantity = 1) => {
    updateQuantity(product.id, quantity);
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(formData.entries());
    const lines = cartItems.map(
      (item) => `• ${item.name} (${item.weight}) × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
    );
    const address = [
      customer.address,
      customer.landmark,
      [customer.city, customer.state, customer.pincode].filter(Boolean).join(", "),
    ].filter(Boolean).join(", ");
    const message = [
      "Hi Toucanzy Bite! I'd like to place an order 🍓",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(subtotal)}`,
      "",
      "Customer details",
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Delivery address: ${address}`,
      customer.note ? `Note: ${customer.note}` : "",
    ].filter((line) => line !== "").join("\n");
    window.location.href = `https://wa.me/918688326611?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    if (!cartOpen && !checkoutOpen && !selectedProduct) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setCheckoutOpen(false);
        setSelectedProduct(null);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [cartOpen, checkoutOpen, selectedProduct]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-active" href="#home">Discover</a>
            <a href="#shop">Shop fruits</a>
            <a href="#story">Our story</a>
          </nav>
          <div className="header-actions">
            <a className="instagram-link" href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer" aria-label="Toucanzy Bite on Instagram">
              <Icon name="instagram" size={19} />
            </a>
            <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}>
              <Icon name="bag" size={20} />
              <span className="bag-count">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="app-main" id="home">
        <section className="welcome-row">
          <div>
            <p className="welcome-kicker">A LITTLE CRUNCH GOES A LONG WAY</p>
            <h1>Good things,<br className="mobile-only" /> <span>good mood.</span></h1>
          </div>
          <div className="welcome-note"><Icon name="leaf" size={17} /><span>Real fruit, ready to crunch</span></div>
        </section>

        <section className="promo-card" aria-label="Toucanzy Bite introduction">
          <div className="promo-copy">
            <span className="promo-label"><span /> LITTLE BITES, BIG JOY</span>
            <h2>Snack happy.<br />Stay <span>fruity.</span></h2>
            <p>Freeze-dried fruit that brings a little crunch to your day.</p>
            <a className="button button-dark" href="#shop">Explore the good stuff <Icon name="arrow" size={16} /></a>
            <span className="promo-footnote">100% FRUIT · ZERO FUSS</span>
          </div>
          <div className="promo-art">
            <span className="promo-orbit promo-orbit-one" />
            <span className="promo-orbit promo-orbit-two" />
            <img src={imageUrl("photo-1464965911861-746a04b4bca6")} alt="Fresh strawberries, the inspiration for Strawberry Pop" />
            <span className="promo-badge">BERRY<br />GOOD!</span>
            <span className="promo-sparkle promo-sparkle-one">✳</span>
            <span className="promo-sparkle promo-sparkle-two">✳</span>
          </div>
          <span className="promo-decoration" aria-hidden="true">✳</span>
        </section>

        <section className="shop-section" id="shop">
          <div className="shop-toolbar">
            <div className="shop-heading">
              <span className="section-kicker">PICK YOUR HAPPY</span>
              <h2>Recommended <span>for you</span></h2>
            </div>
            <label className="search-field">
              <Icon name="search" size={18} />
              <input aria-label="Search fruit snacks" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Find your favourite..." />
              {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search"><Icon name="close" size={15} /></button>}
            </label>
          </div>

          <div className="category-row" aria-label="Filter products by category">
            {["All fruits", "Berries", "Tropical", "Orchard"].map((category, index) => (
              <button className={`category-pill${activeCategory === category ? " category-active" : ""}`} key={category} onClick={() => setActiveCategory(category)}>
                {index === 0 && <Icon name="grid" size={15} />}
                {category}
                {index === 0 && <span className="category-count">{products.length}</span>}
              </button>
            ))}
            <span className="category-caption">Small-batch, big-crunch energy <span>✳</span></span>
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-photo" style={{ backgroundColor: product.color }}>
                    <button className="product-image-button" onClick={() => { setSelectedProduct(product); setDetailQuantity(1); }} aria-label={`View ${product.name} details`}>
                      <img src={imageUrl(product.image)} alt={product.alt} loading="lazy" />
                      {product.tag && <span className="product-tag">{product.tag}</span>}
                    </button>
                    <button className={`favorite-button${favorites.includes(product.id) ? " favorite-active" : ""}`} aria-label={`${favorites.includes(product.id) ? "Remove" : "Add"} ${product.name} ${favorites.includes(product.id) ? "from" : "to"} favorites`} onClick={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}>
                      <Icon name="heart" size={17} />
                    </button>
                    <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>
                      <Icon name="plus" size={18} />
                    </button>
                  </div>
                  <div className="product-info">
                    <div className="product-title-row">
                      <button className="product-name" onClick={() => { setSelectedProduct(product); setDetailQuantity(1); }}>{product.name}</button>
                      <span className="product-price">{formatPrice(product.price)}</span>
                    </div>
                    <p>{product.description}</p>
                    <div className="product-meta"><span>{product.weight} <i /> {product.category}</span><button onClick={() => addToCart(product)}>Add to cart <Icon name="arrow" size={14} /></button></div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results"><span>🍊</span><h3>No snacks found just yet.</h3><p>Try another search or pick a different fruit family.</p><button className="text-link" onClick={() => { setSearchQuery(""); setActiveCategory("All fruits"); }}>Show all fruits <Icon name="arrow" size={15} /></button></div>
          )}
        </section>

        <section className="promise-row" id="story">
          <div className="promise-icon"><Icon name="leaf" size={21} /></div>
          <div><strong>Fruit first. Always.</strong><p>Real-fruit goodness with a satisfying little crunch.</p></div>
          <span className="promise-separator" />
          <div className="promise-icon promise-icon-sun">✳</div>
          <div><strong>Made for happy snacking</strong><p>Pick a pack, add to your bag, and order on WhatsApp.</p></div>
          <a className="promise-instagram" href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer"><Icon name="instagram" size={18} /><span>Follow our fruity days</span><Icon name="arrow" size={14} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <Brand />
        <span className="copyright">Real fruit. Real good. · © {new Date().getFullYear()} Toucanzy Bite</span>
        <a href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer">Instagram <Icon name="arrow" size={14} /></a>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        <a className="bottom-nav-active" href="#home"><Icon name="home" size={19} /><span>Home</span></a>
        <a href="#shop" onClick={() => setActiveCategory("All fruits")}><Icon name="grid" size={19} /><span>Discover</span></a>
        <button onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}><span className="bottom-bag-icon"><Icon name="bag" size={20} />{itemCount > 0 && <i>{itemCount}</i>}</span><span>My bag</span></button>
        <a href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer"><Icon name="instagram" size={19} /><span>Instagram</span></a>
      </nav>

      {notice && <div className="toast" role="status">{notice}</div>}

      {(cartOpen || checkoutOpen || selectedProduct) && <button className="overlay" aria-label="Close dialog" onClick={() => { setCartOpen(false); setCheckoutOpen(false); setSelectedProduct(null); }} />}

      {selectedProduct && (
        <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <button className="icon-button modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><Icon name="close" /></button>
          <div className="detail-image" style={{ backgroundColor: selectedProduct.color }}>
            <img src={imageUrl(selectedProduct.image)} alt={selectedProduct.alt} />
            {selectedProduct.tag && <span className="product-tag">{selectedProduct.tag}</span>}
          </div>
          <div className="detail-copy">
            <span className="section-kicker">{selectedProduct.category.toUpperCase()} · FREEZE-DRIED</span>
            <h2 id="product-modal-title">{selectedProduct.name}</h2>
            <p className="detail-description">{selectedProduct.description}. Light, crunchy, and ready for whenever snack o'clock hits.</p>
            <div className="detail-perks"><span><Icon name="leaf" size={16} /> Real fruit</span><span><Icon name="heart" size={15} /> Made for sharing</span></div>
            <div className="detail-weight"><span>Pack size</span><strong>{selectedProduct.weight}</strong></div>
            <div className="detail-bottom">
              <div className="detail-price">{formatPrice(selectedProduct.price)}<span> / pack</span></div>
              <div className="quantity-control"><button onClick={() => setDetailQuantity((quantity) => Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Icon name="minus" size={14} /></button><span>{detailQuantity}</span><button onClick={() => setDetailQuantity((quantity) => quantity + 1)} aria-label="Increase quantity"><Icon name="plus" size={14} /></button></div>
            </div>
            <button className="button button-dark checkout-button" onClick={() => { addToCart(selectedProduct, detailQuantity); setSelectedProduct(null); }}>Add to cart · {formatPrice(selectedProduct.price * detailQuantity)} <Icon name="arrow" size={17} /></button>
          </div>
        </section>
      )}

      {cartOpen && (
        <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-header">
            <div><span className="section-kicker">YOUR GOODIES</span><h2 id="cart-title">Your cart <span>({itemCount})</span></h2></div>
            <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><Icon name="close" /></button>
          </div>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">🍓</span>
              <h3>Your cart is ready for a little crunch.</h3>
              <p>Pick your favourite fruits and they’ll show up here.</p>
              <button className="button button-dark" onClick={() => { setCartOpen(false); document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the fruits <Icon name="arrow" size={16} /></button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={imageUrl(item.image)} alt={item.alt} />
                    <div className="cart-item-copy"><h3>{item.name}</h3><p>{item.weight} · {formatPrice(item.price)}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Icon name="plus" size={14} /></button></div></div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>
              <div className="delivery-note"><span className="delivery-note-icon">✳</span><div><strong>Delivery, made simple</strong><p>We’ll confirm delivery details with you on WhatsApp.</p></div></div>
              <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Shipping, if applicable, will be confirmed when you place your order.</p><button className="button button-dark checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to checkout <Icon name="arrow" size={17} /></button></div>
            </>
          )}
        </aside>
      )}

      {checkoutOpen && (
        <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="checkout-header"><div><span className="section-kicker">ONE LAST THING</span><h2 id="checkout-title">Where should we<br />send the good stuff?</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><Icon name="close" /></button></div>
          <form onSubmit={placeOrder}>
            <div className="form-grid">
              <label className="field field-full">Your name<input name="name" autoComplete="name" placeholder="How should we address you?" required /></label>
              <label className="field field-full">Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9]{10,15}" placeholder="Digits only, include country code if needed" required /></label>
              <label className="field field-full">Full delivery address<textarea name="address" autoComplete="street-address" rows="2" placeholder="House / flat, street, area" required /></label>
              <label className="field field-full">Landmark <span className="optional">(optional)</span><input name="landmark" placeholder="A nearby landmark" /></label>
              <label className="field">City<input name="city" autoComplete="address-level2" placeholder="Your city" required /></label>
              <label className="field">State<input name="state" autoComplete="address-level1" placeholder="Your state" required /></label>
              <label className="field field-full">PIN code<input name="pincode" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" placeholder="6-digit PIN code" required /></label>
              <label className="field field-full">Anything else? <span className="optional">(optional)</span><textarea name="note" rows="2" placeholder="Order notes or delivery instructions" /></label>
            </div>
            <div className="checkout-total"><span>{itemCount} {itemCount === 1 ? "item" : "items"} · Order total</span><strong>{formatPrice(subtotal)}</strong></div>
            <button className="button button-dark checkout-button" type="submit">Order now on WhatsApp <Icon name="arrow" size={17} /></button>
            <p className="checkout-disclaimer">Your order details will open in WhatsApp, ready to send to Toucanzy Bite.</p>
          </form>
        </section>
      )}
    </>
  );
}

export default App;
