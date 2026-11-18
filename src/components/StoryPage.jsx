import Icon from "./Icon.jsx";

export default function StoryPage() {
  return (
    <section className="process-section" id="story">
      <div className="process-heading">
        <span className="section-kicker">OUR STORY · FRUIT PRESERVATION</span>
        <h2>Three ways to <span>preserve fruit.</span></h2>
        <p>Different preservation methods create different textures and storage needs. Here’s how freeze-dried, frozen, and dehydrated fruit compare.</p>
      </div>
      <div className="process-grid">
        <article className="process-card">
          <span className="process-number">01 · FREEZE-DRIED</span>
          <h3>Our process</h3>
          <p>Fruit is frozen, then dried under vacuum so ice leaves as vapour. The result is typically light and crisp. This is the process used for Toucanzy Bite fruit.</p>
          <span className="process-highlight">Our featured method</span>
        </article>
        <article className="process-card">
          <span className="process-number">02 · FROZEN</span>
          <h3>Kept frozen</h3>
          <p>Freezing stores fruit with most of its water still present as ice. It remains moist when thawed and needs freezer storage.</p>
        </article>
        <article className="process-card">
          <span className="process-number">03 · DEHYDRATED</span>
          <h3>Warm-air dried</h3>
          <p>Conventional dehydration uses heat and airflow to remove moisture. Depending on the fruit and method, the texture is often denser or chewier.</p>
        </article>
      </div>
      <div className="process-method-heading">
        <span className="section-kicker">OUR PROCESS</span>
        <h3>How we make Toucanzy Bite freeze-dried fruit</h3>
      </div>
      <div className="freeze-dry-steps">
        <article className="process-card process-card-featured">
          <span className="process-number">STEP 01</span>
          <h3>Select, prepare & freeze</h3>
          <p>Fruit is selected, cleaned, and cut into pieces, then frozen. Freezing prepares the fruit for drying while helping it hold its shape.</p>
        </article>
        <article className="process-card process-card-featured">
          <span className="process-number">STEP 02</span>
          <h3>Dry under vacuum</h3>
          <p>In a low-pressure chamber, ice turns directly into water vapour through sublimation. A further drying stage removes more moisture, leaving a light, crisp texture.</p>
        </article>
        <article className="process-card process-card-featured">
          <span className="process-number">STEP 03</span>
          <h3>Seal & store well</h3>
          <p>Once dry, the fruit needs protection from moisture. Store it in its sealed pack in a cool, dry place, reseal promptly after opening, and follow the pack’s storage and best-before guidance.</p>
        </article>
      </div>
      <div className="process-storage">
        <span className="process-storage-icon"><Icon name="leaf" size={20} /></span>
        <div>
          <strong>Storage matters</strong>
          <p>Freeze-dried fruit readily absorbs moisture from the air, so keep it in its original sealed, moisture-protective packaging until use. Shelf life and nutrient retention depend on the fruit, processing, and packaging; check the best-before date and storage directions on your pack rather than relying on a single shelf-life estimate.</p>
        </div>
      </div>
    </section>
  );
}
