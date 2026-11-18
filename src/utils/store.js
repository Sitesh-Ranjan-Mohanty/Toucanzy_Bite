import { products } from "../data/products.js";

export const getDeliveryFee = (state) =>
  state === "Telangana" || state === "Andhra Pradesh" ? 75 : state ? 85 : null;

export const formatPrice = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

export function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("toucanzy-cart") || "{}");
    return Object.entries(savedCart).reduce((nextCart, [key, quantity]) => {
      if (!Number.isInteger(quantity) || quantity <= 0) return nextCart;
      const [productId, variantId, selection = ""] = key.split(":");
      const product = products.find((candidate) => candidate.id === productId);
      const isValidRegularItem = product && !product.isCombo
        && product.variants.some((variant) => variant.id === variantId)
        && !selection;
      const selectedFruitIds = selection.split(",").filter(Boolean);
      const comboSelectionSize = productId === "combo-five" ? 5 : 8;
      const isValidComboItem = product?.isCombo
        && variantId === "combo"
        && selectedFruitIds.length === comboSelectionSize
        && new Set(selectedFruitIds).size === comboSelectionSize
        && selectedFruitIds.every((id) => products.some((fruit) => fruit.id === id && !fruit.isCombo));
      if (isValidRegularItem || isValidComboItem) nextCart[key] = quantity;
      return nextCart;
    }, {});
  } catch {
    return {};
  }
}

export function getCartItems(cart) {
  return Object.entries(cart).flatMap(([cartKey, quantity]) => {
    if (!quantity) return [];
    const [productId, variantId, selection = ""] = cartKey.split(":");
    const product = products.find((candidate) => candidate.id === productId);
    const variant = product?.variants.find((candidate) => candidate.id === variantId);
    if (!product || !variant) return [];
    const selectedFruitIds = product.isCombo ? selection.split(",").filter(Boolean) : [];
    const selectedFruitNames = selectedFruitIds.map((id) =>
      products.find((candidate) => candidate.id === id)?.name,
    ).filter(Boolean);
    return [{ ...product, ...variant, cartKey, quantity, selectedFruitNames }];
  });
}

export function createOrderMessage({ cartItems, subtotal, customer }) {
  const lines = cartItems.map((item) => {
    const fruitSelection = item.selectedFruitNames.length
      ? ` — includes ${item.selectedFruitNames.join(", ")}`
      : "";
    return `• ${item.name} (${item.label})${fruitSelection} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`;
  });
  const address = [
    customer.address,
    customer.landmark,
    [customer.city, customer.state, customer.pincode].filter(Boolean).join(", "),
  ].filter(Boolean).join(", ");
  const deliveryFee = getDeliveryFee(customer.state);
  return [
    "Hi Toucanzy Bite! I'd like to place an order 🍓",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Delivery to ${customer.state}: ${formatPrice(deliveryFee)}`,
    `Order total: ${formatPrice(subtotal + deliveryFee)}`,
    "",
    "Customer details",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Delivery address: ${address}`,
    customer.note ? `Note: ${customer.note}` : "",
  ].filter((line) => line !== "").join("\n");
}
