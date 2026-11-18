import { Link } from "react-router-dom";
import { deliveryStates } from "../data/products.js";
import { formatPrice } from "../utils/store.js";
import Icon from "./Icon.jsx";
import ProductVisual from "./ProductVisual.jsx";

export default function CartDrawer({
  cartItems,
  itemCount,
  deliveryState,
  subtotal,
  deliveryFee,
  orderTotal,
  onClose,
  onUpdateQuantity,
  onDeliveryStateChange,
  onContinueCheckout,
}) {
  return (
    <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-header">
        <div><span className="section-kicker">YOUR GOODIES</span><h2 id="cart-title">Your cart <span>({itemCount})</span></h2></div>
        <button className="icon-button dialog-close" onClick={onClose} aria-label="Close bag"><Icon name="close" /></button>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon">🍓</span>
          <h3>Your cart is ready for a little crunch.</h3>
          <p>Pick your favourite fruits and they’ll show up here.</p>
          <Link className="button button-dark" to="/shop" onClick={onClose}>Explore the fruits <Icon name="arrow" size={16} /></Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.cartKey}>
                <div className="cart-item-thumb"><ProductVisual product={item} /></div>
                <div className="cart-item-copy">
                  <h3>{item.name}</h3>
                  <p>{item.label} · {formatPrice(item.price)} each</p>
                  {item.selectedFruitNames.length > 0 && <p className="cart-combo-fruits">{item.selectedFruitNames.join(", ")}</p>}
                  <div className="quantity-control">
                    <button onClick={() => onUpdateQuantity(item.cartKey, -1)} aria-label={`Remove one ${item.name} (${item.label})`}><Icon name="minus" size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.cartKey, 1)} aria-label={`Add one ${item.name} (${item.label})`}><Icon name="plus" size={14} /></button>
                  </div>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="delivery-note"><span className="delivery-note-icon">✳</span><div><strong>Delivery, made simple</strong><p>₹75 to Telangana and Andhra Pradesh · ₹85 to other states and UTs.</p></div></div>
          <div className="cart-summary">
            <label className="delivery-state-field">Delivery state or union territory
              <select value={deliveryState} onChange={(event) => onDeliveryStateChange(event.target.value)} required>
                <option value="">Choose your state / UT</option>
                {deliveryStates.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </label>
            <div><span>Items subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Delivery</span><strong>{deliveryFee === null ? "Choose state" : formatPrice(deliveryFee)}</strong></div>
            <div className="cart-total-row"><span>Order total</span><strong>{deliveryFee === null ? "—" : formatPrice(orderTotal)}</strong></div>
            <button className="button button-dark checkout-button" onClick={onContinueCheckout}>Continue to checkout <Icon name="arrow" size={17} /></button>
          </div>
        </>
      )}
    </aside>
  );
}
