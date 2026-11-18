import { products } from "../data/products.js";
import { formatPrice } from "../utils/store.js";
import Icon from "./Icon.jsx";
import ProductVisual from "./ProductVisual.jsx";

export default function ProductModal({
  product,
  variant,
  selectedComboFruits,
  quantity,
  onClose,
  onVariantChange,
  onComboFruitsChange,
  onQuantityChange,
  onAddToCart,
}) {
  const selectionLimit = product.id === "combo-five" ? 5 : 8;

  return (
    <section className={`product-modal${product.isCombo ? " product-modal-combo" : ""}`} role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
      <button className="icon-button modal-close" onClick={onClose} aria-label="Close product details"><Icon name="close" /></button>
      <div className="detail-image" style={{ backgroundColor: product.color }}>
        <ProductVisual product={product} />
        {product.tag && <span className="product-tag">{product.tag}</span>}
      </div>
      <div className="detail-copy">
        <span className="section-kicker">{product.category.toUpperCase()} · FREEZE-DRIED</span>
        <h2 id="product-modal-title">{product.name}</h2>
        <p className="detail-description">{product.description}. Light, crunchy, and ready for whenever snack o'clock hits.</p>
        <div className="detail-perks"><span><Icon name="leaf" size={16} /> Real fruit</span><span><Icon name="heart" size={15} /> Made for sharing</span></div>
        {product.isCombo ? (
          <section className="combo-fruit-picker" aria-labelledby="combo-picker-title">
            <div className="combo-picker-heading">
              <h3 id="combo-picker-title">Choose {selectionLimit} fruits</h3>
              <span>{selectedComboFruits.length} / {selectionLimit} selected</span>
            </div>
            <p>Pick different fruits for your combo. Each selection adds 10 g.</p>
            <div className="combo-fruit-grid">
              {products.filter((fruit) => !fruit.isCombo).map((fruit) => {
                const isSelected = selectedComboFruits.includes(fruit.id);
                const isFull = selectedComboFruits.length === selectionLimit;
                return (
                  <button
                    className={`combo-fruit-option${isSelected ? " combo-fruit-selected" : ""}`}
                    type="button"
                    key={fruit.id}
                    aria-pressed={isSelected}
                    disabled={!isSelected && isFull}
                    onClick={() => onComboFruitsChange((current) =>
                      isSelected ? current.filter((id) => id !== fruit.id) : [...current, fruit.id],
                    )}
                  >
                    <span className="combo-fruit-check" aria-hidden="true">{isSelected ? "✓" : "+"}</span>
                    <span>{fruit.name}</span>
                    <small>10 g</small>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <fieldset className="pack-options">
            <legend>Choose your pack size</legend>
            {product.variants.map((option) => (
              <label className={`pack-option${variant?.id === option.id ? " pack-option-selected" : ""}`} key={option.id}>
                <input type="radio" name="pack-size" value={option.id} checked={variant?.id === option.id} onChange={() => onVariantChange(option)} />
                <span>{option.label}</span>
                <strong>{formatPrice(option.price)}</strong>
              </label>
            ))}
          </fieldset>
        )}
        <div className="detail-bottom">
          <div className="detail-price">{formatPrice(variant.price)}<span> / pack</span></div>
          <div className="quantity-control">
            <button onClick={() => onQuantityChange((current) => Math.max(1, current - 1))} aria-label="Decrease quantity"><Icon name="minus" size={14} /></button>
            <span>{quantity}</span>
            <button onClick={() => onQuantityChange((current) => current + 1)} aria-label="Increase quantity"><Icon name="plus" size={14} /></button>
          </div>
        </div>
        <button className="button button-dark checkout-button" disabled={product.isCombo && selectedComboFruits.length !== selectionLimit} onClick={onAddToCart}>
          Add to cart · {formatPrice(variant.price * quantity)} <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  );
}
