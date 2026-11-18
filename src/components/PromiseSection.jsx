import Icon from "./Icon.jsx";

export default function PromiseSection() {
  return (
    <section className="promise-row">
      <div className="promise-icon"><Icon name="leaf" size={21} /></div>
      <div><strong>Fruit first. Always.</strong><p>Real-fruit goodness with a satisfying little crunch.</p></div>
      <span className="promise-separator" />
      <div className="promise-icon promise-icon-sun">✳</div>
      <div><strong>Made for happy snacking</strong><p>Pick a pack, add to your bag, and order on WhatsApp.</p></div>
      <a className="promise-instagram" href="https://www.instagram.com/toucanzy_bite/" target="_blank" rel="noreferrer"><Icon name="instagram" size={18} /><span>Follow our fruity days</span><Icon name="arrow" size={14} /></a>
    </section>
  );
}
