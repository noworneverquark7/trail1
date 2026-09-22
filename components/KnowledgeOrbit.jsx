const nodes = ["Physics", "Mathematics", "Computation", "Research", "Ideas", "Experiments"];

export function KnowledgeOrbit() {
  return (
    <div className="orbit" aria-label="Diagram connecting physics, mathematics, computation, research, ideas, and experiments">
      <div className="orbit-ring orbit-ring-a" />
      <div className="orbit-ring orbit-ring-b" />
      <div className="orbit-core"><span>AP</span><small>becoming</small></div>
      {nodes.map((node, i) => (
        <div key={node} className={`orbit-node orbit-node-${i + 1}`}><span>{node}</span></div>
      ))}
    </div>
  );
}
