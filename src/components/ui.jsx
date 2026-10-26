export function Btn({ children, kind = "", ...props }) {
  return (
    <button className={`btn ${kind}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

export function Pill({ children, tone = "" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

export function ProgressBar({ value }) {
  return (
    <div className="progress">
      <i style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function Stat({ label, value, icon: Icon }) {
  return (
    <Card className="stat">
      <span>
        {label}
        {Icon && <Icon size={17} />}
      </span>
      <b>{value}</b>
      <small>Updated just now</small>
    </Card>
  );
}
