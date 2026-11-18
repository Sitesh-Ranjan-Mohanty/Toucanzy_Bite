import { NavLink } from "react-router-dom";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

export default function SiteHeader({ itemCount, onOpenCart, onShopClick }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-active" : ""}>Discover</NavLink>
          <NavLink to="/shop" onClick={onShopClick} className={({ isActive }) => isActive ? "nav-active" : ""}>Shop fruits</NavLink>
          <NavLink to="/story" className={({ isActive }) => isActive ? "nav-active" : ""}>Our story</NavLink>
        </nav>
        <div className="header-actions">
          <a className="instagram-link" href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer" aria-label="Toucanzy Bite on Instagram">
            <Icon name="instagram" size={19} />
          </a>
          <button className="bag-button" onClick={onOpenCart} aria-label={`Open cart, ${itemCount} items`}>
            <Icon name="bag" size={20} />
            <span className="bag-count">{itemCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
