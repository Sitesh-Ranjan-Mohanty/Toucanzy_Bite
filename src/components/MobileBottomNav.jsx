import { NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function MobileBottomNav({ itemCount, onOpenCart, onShopClick }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      <NavLink to="/" end className={({ isActive }) => isActive ? "bottom-nav-active" : ""}><Icon name="home" size={19} /><span>Home</span></NavLink>
      <NavLink to="/shop" onClick={onShopClick} className={({ isActive }) => isActive ? "bottom-nav-active" : ""}><Icon name="grid" size={19} /><span>Shop</span></NavLink>
      <NavLink to="/story" className={({ isActive }) => isActive ? "bottom-nav-active" : ""}><Icon name="leaf" size={19} /><span>Our story</span></NavLink>
      <button onClick={onOpenCart} aria-label={`Open cart, ${itemCount} items`}>
        <span className="bottom-bag-icon"><Icon name="bag" size={20} />{itemCount > 0 && <i>{itemCount}</i>}</span>
        <span>My bag</span>
      </button>
    </nav>
  );
}
