import { products } from "../data/products.js";
import { formatPrice } from "../utils/store.js";
import Icon from "./Icon.jsx";
import ProductCard from "./ProductCard.jsx";

const categories = ["All fruits", "Bestsellers", "Combos", "Tropical", "Berries", "Orchard"];

export default function ShopPage({
  activeCategory,
  searchQuery,
  favorites,
  onCategoryChange,
  onSearchChange,
  onToggleFavorite,
  onOpenProduct,
}) {
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All fruits"
      || (activeCategory === "Bestsellers" ? product.bestSeller : product.category === activeCategory);
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="shop-section" id="shop">
      <div className="shop-toolbar">
        <div className="shop-heading">
          <span className="section-kicker">PICK YOUR HAPPY</span>
          <h2>Recommended <span>for you</span></h2>
        </div>
        <label className="search-field">
          <Icon name="search" size={18} />
          <input aria-label="Search fruit snacks" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Find your favourite..." />
          {searchQuery && <button type="button" onClick={() => onSearchChange("")} aria-label="Clear search"><Icon name="close" size={15} /></button>}
        </label>
      </div>

      <div className="category-row" aria-label="Filter products by category">
        {categories.map((category, index) => (
          <button className={`category-pill${activeCategory === category ? " category-active" : ""}`} key={category} onClick={() => onCategoryChange(category)}>
            {index === 0 && <Icon name="grid" size={15} />}
            {category === "Bestsellers" && <span className="bestseller-sparkle" aria-hidden="true">✦</span>}
            {category}
            {index === 0 && <span className="category-count">{products.length}</span>}
          </button>
        ))}
        <span className="category-caption">Small-batch, big-crunch energy <span>✳</span></span>
      </div>

      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <span>🍊</span><h3>No snacks found just yet.</h3>
          <p>Try another search or pick a different fruit family.</p>
          <button className="text-link" onClick={() => { onSearchChange(""); onCategoryChange("All fruits"); }}>Show all fruits <Icon name="arrow" size={15} /></button>
        </div>
      )}
    </section>
  );
}
