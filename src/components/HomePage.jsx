import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function HomePage() {
  return (
    <>
      <section className="welcome-row" id="home">
        <div>
          <p className="welcome-kicker">A LITTLE CRUNCH GOES A LONG WAY</p>
          <h1>Good things,<br className="mobile-only" /> <span>good mood.</span></h1>
        </div>
        <div className="welcome-note"><Icon name="leaf" size={17} /><span>Real fruit, ready to crunch</span></div>
      </section>

      <section className="promo-card" aria-label="Toucanzy Bite introduction">
        <div className="promo-copy">
          <span className="promo-label"><span /> OUR NO. 1 FRUIT</span>
          <h2>Mango magic.<br /><span>Big crunch.</span></h2>
          <p>Meet the mango everyone loves, freeze-dried for a sunny little crunch.</p>
          <Link className="button button-dark" to="/shop">Explore the good stuff <Icon name="arrow" size={16} /></Link>
          <span className="promo-footnote">100% FRUIT · ZERO FUSS</span>
        </div>
        <div className="promo-art">
          <span className="promo-orbit promo-orbit-one" />
          <span className="promo-orbit promo-orbit-two" />
          <video
            className="discover-video"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/mango.webp"
            aria-label="A looping Toucanzy Bite fruit video"
          >
            <source src="/discover-video.mp4" type="video/mp4" />
          </video>
          <span className="promo-badge">OUR<br />BESTSELLER</span>
          <span className="promo-sparkle promo-sparkle-one">✳</span>
          <span className="promo-sparkle promo-sparkle-two">✳</span>
        </div>
        <span className="promo-decoration" aria-hidden="true">✳</span>
      </section>
    </>
  );
}
