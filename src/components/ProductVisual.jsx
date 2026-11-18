export default function ProductVisual({ product }) {
  return <img src={product.image} alt={product.alt} loading="lazy" />;
}
