import React, { useEffect, useMemo, useState } from "react";

const products = [
  {
    id: "strawberry",
    name: "Strawberry Pop",
    description: "Sweet, sunny strawberry slices",
    weight: "20 g",
    price: 149,
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

  const updateQuantity = (id, amount) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  };

  const addToCart = (product) => {
    updateQuantity(product.id, 1);
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
    if (!cartOpen && !checkoutOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setCheckoutOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [cartOpen, checkoutOpen]);

  return (
    <>
      <div className="announcement">
        <span>REAL FRUIT. REAL GOOD.</span>
        <span className="announcement-divider">✳</span>
        <span>A whole lot of crunch in every bite</span>
        <span className="announcement-right">Small-batch goodness, made with love <span>♡</span></span>
      </div>

      <header className="site-header">
        <a className="mobile-menu" href="#shop" aria-label="Skip to shop">Shop</a>
        <nav className="nav-left" aria-label="Main navigation">
          <a href="#shop">Shop all</a>
          <a href="#story">Our story</a>
        </nav>
        <Brand />
        <div className="header-right">
          <a className="instagram-link" href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer">
            <Icon name="instagram" size={18} />
            <span>Instagram</span>
          </a>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${itemCount} items`}>
            <Icon name="bag" size={19} />
            <span>Bag</span>
            <span className="bag-count">{itemCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE FRUIT. A LOT OF JOY.</div>
            <h1>Fruit, with<br />a little <em>crunch.</em></h1>
            <p className="hero-description">Your favourite fruits, freeze-dried to crispy, pop-in-your-mouth perfection. Just the good stuff, always.</p>
            <a className="button button-dark hero-cta" href="#shop">Find your crunch <Icon name="arrow" size={17} /></a>
            <div className="hero-proof"><span className="proof-stars">★★★★★</span><span>Fruit that makes snack time happy</span></div>
          </div>
          <div className="hero-art">
            <div className="hero-photo">
              <img src={imageUrl("photo-1490474418585-ba9bad8fd0ea")} alt="A colourful bowl of fresh fruit" />
            </div>
            <span className="hero-sticker">100%<br /><span>fruit joy</span></span>
            <div className="hero-caption"><span className="caption-dot" /> GOOD MOOD, GREAT SNACK</div>
            <div className="hero-doodle" aria-hidden="true">✳</div>
          </div>
          <div className="hero-bottom-note">NATURE DID THE HARD PART. WE JUST ADDED THE CRUNCH.</div>
        </section>

        <div className="benefit-strip">
          <div><Icon name="leaf" size={20} /><span>100% real fruit</span></div>
          <span className="benefit-separator" />
          <div><span className="benefit-sparkle">✳</span><span>Nothing weird added</span></div>
          <span className="benefit-separator" />
          <div><Icon name="heart" size={18} /><span>Made for happy snacking</span></div>
        </div>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</div>
              <h2>Meet your new<br className="mobile-break" /> snack <em>crush.</em></h2>
            </div>
            <p>Big fruit energy. Beautifully crunchy.<br />Pick your favourite and snack happy.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-photo" style={{ backgroundColor: product.color }}>
                  <img src={imageUrl(product.image)} alt={product.alt} loading="lazy" />
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}>
                    <Icon name="plus" size={18} />
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-title-row"><h3>{product.name}</h3><span>{formatPrice(product.price)}</span></div>
                  <p>{product.description}</p>
                  <div className="product-meta"><span>{product.weight} · freeze-dried</span><button onClick={() => addToCart(product)}>Add to bag <Icon name="arrow" size={14} /></button></div>
                </div>
              </article>
            ))}
          </div>
          <div className="shop-footnote"><span>✳</span> A snack for your desk, your bag, and that 4 pm fruit craving.</div>
        </section>

        <section className="story-section" id="story">
          <div className="story-image">
            <img src={imageUrl("photo-1540420773420-3366772f4999")} alt="Fresh fruit and wholesome ingredients" loading="lazy" />
            <div className="story-image-note">GOOD FRUIT.<br />GOOD MOOD.</div>
          </div>
          <div className="story-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A NOTE FROM US</div>
            <h2>Fruit first.<br /><em>Always.</em></h2>
            <p>We think fruit deserves a little more fun. So we take the good stuff, gently freeze-dry it, and let nature do what it does best. No added sugar. No funny business. Just joyful, crispy fruit you’ll want to share (but totally don’t have to).</p>
            <div className="story-signoff">Made with love & a little crunch <span>♡</span></div>
            <a className="text-link" href="#shop">Find your favourite <Icon name="arrow" size={16} /></a>
          </div>
        </section>

        <section className="closing-banner">
          <div className="closing-sparkle">✳</div>
          <p>SNACK HAPPY. LIVE FRUITY.</p>
          <h2>Your next favourite<br /><em>is one bite away.</em></h2>
          <a className="button button-light" href="#shop">Shop the good stuff <Icon name="arrow" size={17} /></a>
          <div className="closing-sparkle closing-sparkle-right">✳</div>
        </section>
      </main>

      <footer className="site-footer">
        <Brand light />
        <span className="footer-note">Real fruit. Real good. Made with love.</span>
        <a href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer" aria-label="Toucanzy Bite on Instagram"><Icon name="instagram" size={19} /></a>
        <span className="copyright">© {new Date().getFullYear()} Toucanzy Bite</span>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}

      {(cartOpen || checkoutOpen) && <button className="overlay" aria-label="Close dialog" onClick={() => { setCartOpen(false); setCheckoutOpen(false); }} />}

      {cartOpen && (
        <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-header">
            <div><div className="eyebrow"><span className="eyebrow-line" /> YOUR GOODIES</div><h2 id="cart-title">Your bag <span>({itemCount})</span></h2></div>
            <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><Icon name="close" /></button>
          </div>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">✳</span>
              <h3>Your bag is taking a snack break.</h3>
              <p>Fill it with something fruity and fun.</p>
              <button className="button button-dark" onClick={() => { setCartOpen(false); document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the snacks <Icon name="arrow" size={16} /></button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={imageUrl(item.image)} alt="" />
                    <div className="cart-item-copy"><h3>{item.name}</h3><p>{item.weight} · {formatPrice(item.price)}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Icon name="plus" size={14} /></button></div></div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>
              <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Delivery details and any applicable shipping charges can be confirmed on WhatsApp.</p><button className="button button-dark checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to checkout <Icon name="arrow" size={17} /></button></div>
            </>
          )}
        </aside>
      )}

      {checkoutOpen && (
        <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="checkout-header"><div><div className="eyebrow"><span className="eyebrow-line" /> ONE LAST THING</div><h2 id="checkout-title">Where should we<br /><em>send the good stuff?</em></h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><Icon name="close" /></button></div>
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
