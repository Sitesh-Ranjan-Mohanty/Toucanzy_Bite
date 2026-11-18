import Icon from "./Icon.jsx";
import ProductVisual from "./ProductVisual.jsx";
import { formatPrice } from "../utils/store.js";

export default function ProductCard({ product, isFavorite, onToggleFavorite, onOpenProduct }) {
  return (
    <article className="product-card">
      <div className="product-photo" style={{ backgroundColor: product.color }}>
        <button className="product-image-button" onClick={() => onOpenProduct(product)} aria-label={`View ${product.name} details`}>
          <ProductVisual product={product} />
          {product.tag && <span className="product-tag">{product.tag}</span>}
        </button>
        <button className={`favorite-button${isFavorite ? " favorite-active" : ""}`} aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`} onClick={() => onToggleFavorite(product.id)}>
          <Icon name="heart" size={17} />
        </button>
        <button className="quick-add" onClick={() => onOpenProduct(product)} aria-label={`Choose a pack size for ${product.name}`}>
          <Icon name="plus" size={18} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-title-row">
          <button className="product-name" onClick={() => onOpenProduct(product)}>{product.name}</button>
          <span className="product-price">{product.variants.length === 1 ? formatPrice(product.variants[0].price) : `From ${formatPrice(product.variants[0].price)}`}</span>
        </div>
        <p>{product.description}</p>
        <div className="product-meta">
          <span>{product.variants.length === 1 ? product.variants[0].label : "50 g · 100 g"} <i /> {product.category}</span>
          <button onClick={() => onOpenProduct(product)}>Choose pack <Icon name="arrow" size={14} /></button>
        </div>
      </div>
    </article>
  );
}
