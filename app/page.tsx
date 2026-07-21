const rangeLot = "https://maps.app.goo.gl/BMGBEW9VfpXXGxVp7";
const starterLot = "https://maps.app.goo.gl/qXsCyQuoFHJtH1ZU9";

const courses = [
  {
    name: "DuPont Course",
    par: "Par 71",
    description: "Championship layout",
    featured: true,
    tees: [
      { name: "Black", yards: "7,120", color: "black" },
      { name: "Blue", yards: "6,763", color: "blue" },
      { name: "Gold", yards: "6,325", color: "gold" },
      { name: "Combo", yards: "5,996", color: "combo" },
      { name: "White", yards: "5,812", color: "white" },
      { name: "Green", yards: "5,255", color: "green" },
    ],
  },
  {
    name: "Nemours Course",
    par: "Par 71",
    description: "Classic parkland course",
    featured: false,
    tees: [
      { name: "Blue", yards: "6,230", color: "blue" },
      { name: "White", yards: "6,000", color: "white" },
      { name: "Red", yards: "5,545", color: "red" },
    ],
  },
  {
    name: "Montchanin Course",
    par: "Par 61",
    description: "Executive course",
    featured: false,
    tees: [
      { name: "Blue", yards: "4,283", color: "blue" },
      { name: "White", yards: "4,166", color: "white" },
      { name: "Red", yards: "3,965", color: "red" },
    ],
  },
];

function MapLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="map-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <span className="map-link-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

function MapPreview({
  href,
  src,
  alt,
  title,
}: {
  href: string;
  src: string;
  alt: string;
  title: string;
}) {
  return (
    <a
      className="map-preview"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${title}: open in Google Maps`}
    >
      <span className="map-preview-image">
        <img src={src} alt={alt} width="1400" height="1050" loading="lazy" />
        <span className="map-pin-label">Park here</span>
      </span>
      <span className="map-preview-caption">
        <span>
          <strong>{title}</strong>
          <small>Satellite preview · Google Maps</small>
        </span>
        <span className="preview-arrow" aria-hidden="true">↗</span>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="DuPont golf day, back to top">
          <span>DuPont Golf Day</span>
        </a>
        <nav className="header-nav" aria-label="Page sections">
          <a href="#route"><span>01</span> Arrival plan</a>
          <a href="#tees"><span>02</span> Tee distances</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="club-intro">
          <img
            className="club-logo"
            src="/dupont-country-club-logo.jpg"
            alt="DuPont Country Club logo"
            width="117"
            height="116"
          />
          <div>
            <p className="eyebrow">Our round at</p>
            <h1>DuPont Country Club</h1>
            <p className="hero-intro">
              Warm up, re-park, and meet at the starters shed—without the scramble.
            </p>
          </div>
        </div>

        <aside className="hero-card" aria-label="Arrive at the starters shed 10 minutes before tee time">
          <strong>10</strong>
          <div>
            <span>Arrive early</span>
            <p>Minutes before tee time</p>
            <small>Meet at the starters shed</small>
          </div>
        </aside>
      </section>

      <section className="route-section" id="route" aria-labelledby="route-heading">
        <div className="section-heading">
          <p className="eyebrow">The game plan</p>
          <h2 id="route-heading">Three simple stops.</h2>
          <p>Follow them in order and we’ll meet up right where we need to be.</p>
        </div>

        <div className="route-list">
          <article className="route-card route-card-range">
            <div className="route-number" aria-hidden="true">01</div>
            <div className="route-content has-map">
              <div className="route-copy">
                <div className="route-meta">
                  <span className="route-tag">First stop</span>
                  <span>Warm up</span>
                </div>
                <h3>Driving range lot</h3>
                <p>
                  Start here. Enter from Black Gates Road, park beside the
                  practice building, and get loose before the round.
                </p>
                <MapLink href={rangeLot}>Open driving range lot</MapLink>
              </div>
              <MapPreview
                href={rangeLot}
                src="/driving-range-parking-map.jpg"
                alt="Satellite map of the DuPont Country Club driving range building and parking lot beside Black Gates Road, marked with a red pin"
                title="Driving range parking"
              />
            </div>
          </article>

          <div className="route-connector" aria-hidden="true">
            <span />
            <p>After warming up, drive to the next lot</p>
            <span />
          </div>

          <article className="route-card route-card-starter">
            <div className="route-number" aria-hidden="true">02</div>
            <div className="route-content has-map">
              <div className="route-copy">
                <div className="route-meta">
                  <span className="route-tag">Re-park</span>
                  <span>Closer to the starters shed</span>
                </div>
                <h3>Clubhouse lot</h3>
                <p>
                  After warming up, move your car to this marked area in the
                  clubhouse lot. It puts you closer to the first tee and the
                  starters shed.
                </p>
                <MapLink href={starterLot}>Open clubhouse lot</MapLink>
              </div>
              <MapPreview
                href={starterLot}
                src="/clubhouse-parking-map.jpg"
                alt="Satellite map of the DuPont Country Club clubhouse parking lot near Rockland Road and the first tee, marked with a red pin"
                title="Clubhouse parking"
              />
            </div>
          </article>

          <div className="route-connector" aria-hidden="true">
            <span />
            <p>Grab your clubs and head to the shed</p>
            <span />
          </div>

          <article className="route-card route-card-arrive">
            <div className="route-number" aria-hidden="true">03</div>
            <div className="route-content">
              <div className="route-meta">
                <span className="route-tag">Final stop</span>
                <span>Ready to play</span>
              </div>
              <h3>Starters shed</h3>
              <p>
                Please be at the starters shed at least <strong>10 minutes before</strong>
                {" "}our tee time.
              </p>
              <div className="arrival-pill">
                <span className="pulse-dot" aria-hidden="true" />
                Meet here 10 minutes early
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="tees-section" id="tees" aria-labelledby="tees-heading">
        <div className="tees-intro">
          <p className="eyebrow">Know your distance</p>
          <h2 id="tees-heading">Pick a tee that fits the day.</h2>
          <p>
            DuPont Country Club has three courses. Match the course name on our
            tee time, then choose by total distance—not just tee color.
          </p>
          <div className="yards-key"><span>YD</span> All distances shown in yards</div>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <article
              className={`course-card${course.featured ? " course-card-featured" : ""}`}
              key={course.name}
            >
              <div className="course-card-header">
                <div>
                  <p>{course.description}</p>
                  <h3>{course.name}</h3>
                </div>
                <span>{course.par}</span>
              </div>
              <ul className="tee-list" aria-label={`${course.name} tee distances`}>
                {course.tees.map((tee) => (
                  <li key={tee.name}>
                    <span className={`tee-dot tee-${tee.color}`} aria-hidden="true" />
                    <span className="tee-name">{tee.name}</span>
                    <strong>{tee.yards}</strong>
                    <span className="yard-label">yd</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="tee-note">
          Scorecard yardages can vary with daily setup. Confirm the course and
          tees with the golf shop or starter before the round.
        </p>
      </section>

      <section className="quick-check" aria-labelledby="check-heading">
        <div>
          <p className="eyebrow">Before you go</p>
          <h2 id="check-heading">The 20-second check.</h2>
        </div>
        <ol>
          <li><span>1</span>Open the range lot</li>
          <li><span>2</span>Warm up, then re-park</li>
          <li><span>3</span>Reach the shed 10 minutes early</li>
        </ol>
      </section>

      <footer>
        <p>See you on the first tee.</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <a className="mobile-cta" href={rangeLot} target="_blank" rel="noreferrer">
        Start at driving range <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
