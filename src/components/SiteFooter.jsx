import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <span className="copyright">Real fruit. Real good. · © {new Date().getFullYear()} Toucanzy Bite</span>
      <a href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer" aria-label="Toucanzy Bite on Instagram">
        <Icon name="instagram" size={14} />
        <span>Instagram</span>
        <Icon name="arrow" size={14} />
      </a>
    </footer>
  );
}
