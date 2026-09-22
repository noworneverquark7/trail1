export function SectionHeading({ index, label, title, copy }) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div>
        <div className="eyebrow">{label}</div>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}
