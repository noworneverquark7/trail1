import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">404 / Unknown coordinate</div>
        <h1>This path has not been written yet.</h1>
        <p>The page may have moved, or it may belong to a future chapter.</p>
        <div style={{ marginTop: 32 }}><Link className="button button-primary" href="/">Return home</Link></div>
      </div>
    </div>
  );
}
