const LOGOS = [
  "Northwind",
  "Loop",
  "Vertex",
  "Cascade",
  "Monarch",
  "Lumen",
  "Forge",
];

export function LandingTrust() {
  return (
    <section className="trust">
      <div className="wrap">
        <p className="reveal">TRUSTED BY FAST-MOVING TEAMS EVERYWHERE</p>
        <div className="logos reveal">
          {LOGOS.map((name) => (
            <span key={name} className="logo-word">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
