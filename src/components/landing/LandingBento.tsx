import { OutlineIcon } from "@/icons";
import { TILES } from "@/constants/landing";

export const LandingBento = () => {
  return (
    <section className="section pt-10" id="features">
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
                <OutlineIcon size={20}>{tile.icon}</OutlineIcon>
              </div>
              <h4>{tile.title}</h4>
              <p>{tile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
