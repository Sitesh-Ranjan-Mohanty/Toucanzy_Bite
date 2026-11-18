import { deliveryStates } from "../data/products.js";
import { formatPrice } from "../utils/store.js";
import Icon from "./Icon.jsx";

export default function CheckoutModal({
  deliveryState,
  itemCount,
  subtotal,
  deliveryFee,
  orderTotal,
  onClose,
  onDeliveryStateChange,
  onSubmit,
}) {
  return (
    <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="checkout-header">
        <div><span className="section-kicker">ONE LAST THING</span><h2 id="checkout-title">Where should we<br />send the good stuff?</h2></div>
        <button className="icon-button" onClick={onClose} aria-label="Close checkout"><Icon name="close" /></button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <label className="field field-full">Your name<input name="name" autoComplete="name" placeholder="How should we address you?" required /></label>
          <label className="field field-full">Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9]{10,15}" placeholder="Digits only, include country code if needed" required /></label>
          <label className="field field-full">Full delivery address<textarea name="address" autoComplete="street-address" rows="2" placeholder="House / flat, street, area" required /></label>
          <label className="field field-full">Landmark <span className="optional">(optional)</span><input name="landmark" placeholder="A nearby landmark" /></label>
          <label className="field">City<input name="city" autoComplete="address-level2" placeholder="Your city" required /></label>
          <label className="field">State / UT<select name="state" autoComplete="address-level1" value={deliveryState} onChange={(event) => onDeliveryStateChange(event.target.value)} required><option value="">Choose state / UT</option>{deliveryStates.map((state) => <option key={state} value={state}>{state}</option>)}</select></label>
          <label className="field field-full">PIN code<input name="pincode" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" placeholder="6-digit PIN code" required /></label>
          <label className="field field-full">Anything else? <span className="optional">(optional)</span><textarea name="note" rows="2" placeholder="Order notes or delivery instructions" /></label>
        </div>
        <div className="checkout-total">
          <span>{itemCount} {itemCount === 1 ? "item" : "items"} · {formatPrice(subtotal)} + {deliveryFee === null ? "delivery" : formatPrice(deliveryFee)} delivery</span>
          <strong>{deliveryFee === null ? "Choose state" : formatPrice(orderTotal)}</strong>
        </div>
        <button className="button button-dark checkout-button" type="submit">Order now on WhatsApp <Icon name="arrow" size={17} /></button>
        <p className="checkout-disclaimer">Your order details will open in WhatsApp, ready to send to Toucanzy Bite.</p>
      </form>
    </section>
  );
}
