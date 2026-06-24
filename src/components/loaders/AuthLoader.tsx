export function AuthLoader({ visible }: { visible: boolean }) {
  return (
    <div className={`loader-overlay${visible ? " on" : ""}`}>
      <div className="loader-mark">N</div>
      <div className="flex items-center gap-2.5 text-(--text-2) text-sm">
        <span className="loader-spinner" />
        Opening your workspace…
      </div>
    </div>
  );
}
