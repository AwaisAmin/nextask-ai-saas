import { TILES } from "@/constants/landing";

export function LandingBento() {
  return (
    <section className="section" id="features" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">One workspace</div>
          <h2 className="h2">Everything your team needs, together</h2>
          <p className="lead">
            Stop paying for — and switching between — three tools. NexTask
            brings tasks, docs and chat into one fast, beautiful place.
          </p>
        </div>
        <div className="bento">
          {TILES.map((tile) => (
            <div
              key={tile.title}
              className={`tile reveal${tile.delay ? ` ${tile.delay}` : ""}${tile.wide ? " wide" : ""}`}
            >
              <div className="ic">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {tile.icon}
                </svg>
              </div>
              <h4>{tile.title}</h4>
              <p>{tile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
