import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "./data/products.js";
import {
  createOrderMessage,
  getCartItems,
  getDeliveryFee,
  loadCart,
} from "./utils/store.js";
import CartDrawer from "./components/CartDrawer.jsx";
import CartConfirmation from "./components/CartConfirmation.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import MobileBottomNav from "./components/MobileBottomNav.jsx";
import ProductModal from "./components/ProductModal.jsx";
import PromiseSection from "./components/PromiseSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  // Shared state lives here so the cart and dialogs survive page navigation.
  const [cart, setCart] = useState(loadCart);
  const [deliveryState, setDeliveryState] = useState(() => localStorage.getItem("toucanzy-delivery-state") || "");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedComboFruits, setSelectedComboFruits] = useState([]);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All fruits");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [notice, setNotice] = useState(null);
  const noticeId = useRef(0);

  // Keep the cart and delivery selection available between browser visits.
  useEffect(() => {
    localStorage.setItem("toucanzy-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("toucanzy-delivery-state", deliveryState);
  }, [deliveryState]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeoutId = window.setTimeout(() => setNotice(null), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  // Derive the numbers shown in the cart and checkout from its saved items.
  const cartItems = useMemo(() => getCartItems(cart), [cart]);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = getDeliveryFee(deliveryState);
  const orderTotal = subtotal + (deliveryFee || 0);

  // Cart changes are always applied by this function, including drawer buttons.
  const updateQuantity = (cartKey, amount) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[cartKey] || 0) + amount;
      if (quantity <= 0) delete next[cartKey];
      else next[cartKey] = quantity;
      return next;
    });
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]);
    setSelectedComboFruits([]);
    setDetailQuantity(1);
  };

  const addToCart = (product, variant, quantity = 1, fruitIds = []) => {
    const selection = product.isCombo
      ? `:${products.filter((fruit) => fruitIds.includes(fruit.id)).map((fruit) => fruit.id).join(",")}`
      : "";
    updateQuantity(`${product.id}:${variant.id}${selection}`, quantity);
    setNotice({ id: ++noticeId.current, message: `${product.name} added to your cart` });
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(formData.entries());
    const message = createOrderMessage({ cartItems, subtotal, customer });
    window.location.href = `https://wa.me/918688326611?text=${encodeURIComponent(message)}`;
  };

  // Escape closes any currently open modal or drawer.
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

  const handleShopClick = () => setActiveCategory("All fruits");
  const closeDialogs = () => {
    setCartOpen(false);
    setCheckoutOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <SiteHeader
        itemCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        onShopClick={handleShopClick}
      />
      <main className="app-main">
        <AppRoutes
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          favorites={favorites}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchQuery}
          onToggleFavorite={(productId) => setFavorites((current) =>
            current.includes(productId)
              ? current.filter((id) => id !== productId)
              : [...current, productId],
          )}
          onOpenProduct={openProduct}
        />
        <PromiseSection />
      </main>
      <SiteFooter />
      <MobileBottomNav
        itemCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        onShopClick={handleShopClick}
      />

      {notice && <CartConfirmation key={notice.id} message={notice.message} />}
      {(cartOpen || checkoutOpen || selectedProduct) && (
        <button className="overlay" aria-label="Close dialog" onClick={closeDialogs} />
      )}
      {selectedProduct && selectedVariant && (
        <ProductModal
          product={selectedProduct}
          variant={selectedVariant}
          selectedComboFruits={selectedComboFruits}
          quantity={detailQuantity}
          onClose={() => setSelectedProduct(null)}
          onVariantChange={setSelectedVariant}
          onComboFruitsChange={setSelectedComboFruits}
          onQuantityChange={setDetailQuantity}
          onAddToCart={() => {
            addToCart(selectedProduct, selectedVariant, detailQuantity, selectedComboFruits);
            setSelectedProduct(null);
          }}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          itemCount={itemCount}
          deliveryState={deliveryState}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          orderTotal={orderTotal}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onDeliveryStateChange={setDeliveryState}
          onContinueCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}
      {checkoutOpen && (
        <CheckoutModal
          deliveryState={deliveryState}
          itemCount={itemCount}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          orderTotal={orderTotal}
          onClose={() => setCheckoutOpen(false)}
          onDeliveryStateChange={setDeliveryState}
          onSubmit={placeOrder}
        />
      )}
    </>
  );
}

export default App;
