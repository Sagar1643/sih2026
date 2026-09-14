export default function NeuralLines() {
  const paths = [
    "M 20% 20%  C 35% 50%, 65% 50%, 80% 80%",
    "M 80% 15%  C 60% 40%, 40% 60%, 20% 85%",
    "M 50% 5%   C 55% 35%, 45% 65%, 50% 95%",
    "M 5% 50%   C 30% 45%, 70% 55%, 95% 50%",
    "M 15% 70%  C 35% 55%, 65% 45%, 85% 30%",
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.22 }}>
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#a78b71" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78b71" stopOpacity="0" />
        </radialGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#a78b71" strokeWidth="1"
          className="anim-path"
          style={{ animationDelay: `${i * 1.3}s`, animationDuration: `${10 + i * 2}s` }} />
      ))}
      <ellipse cx="50%" cy="50%" rx="30%" ry="25%" fill="url(#ng)" />
    </svg>
  );
}
