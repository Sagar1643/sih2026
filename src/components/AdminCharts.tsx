// Shared chart primitives for AdminPortal

export function BarChart({ data, color = "var(--gold-base)", height = 140 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: "100%", background: `linear-gradient(to top, ${color}, rgba(201,184,160,0.7))`, borderRadius: "5px 5px 0 0", height: `${(d.value / max) * (height - 22)}px`, transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)", minHeight: 4 }} />
          <span style={{ color: "var(--text-muted)", fontSize: 9, textAlign: "center" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let cumulative = 0;
  const r = 48, cx = 64, cy = 64, stroke = 18;
  const arcs = segments.map(seg => {
    const pct = seg.value / total;
    const start = cumulative;
    cumulative += pct;
    const a1 = start * 2 * Math.PI - Math.PI / 2;
    const a2 = cumulative * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    return { ...seg, d: `M ${x1} ${y1} A ${r} ${r} 0 ${pct > 0.5 ? 1 : 0} 1 ${x2} ${y2}`, pct: Math.round(pct * 100) };
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width="128" height="128" viewBox="0 0 128 128">
        {arcs.map((arc, i) => <path key={i} d={arc.d} fill="none" stroke={arc.color} strokeWidth={stroke} strokeLinecap="butt" />)}
        <text x="64" y="68" textAnchor="middle" fill="var(--gold-light)" fontSize="14" fontWeight="700" fontFamily="Fraunces,serif">{total}</text>
        <text x="64" y="80" textAnchor="middle" fill="rgba(240,236,230,0.4)" fontSize="8" fontFamily="Inter,sans-serif">farmers</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {arcs.map((arc, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: arc.color, flexShrink: 0 }} />
            <span style={{ color: "var(--text-dim)", fontSize: 12 }}>{arc.label}</span>
            <span style={{ color: arc.color, fontWeight: 700, fontSize: 12, marginLeft: "auto" }}>{arc.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({ vals, color = "#a78b71" }: { vals: number[]; color?: string }) {
  const max = Math.max(...vals, 1);
  const w = 120, h = 36;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} fillOpacity="0.12" stroke="none" />
    </svg>
  );
}

export const WEEKLY_DATA = [
  { label: "Mon", value: 180 }, { label: "Tue", value: 240 },
  { label: "Wed", value: 210 }, { label: "Thu", value: 280 },
  { label: "Fri", value: 320 }, { label: "Sat", value: 290 }, { label: "Sun", value: 350 },
];

export const CROP_SEGMENTS = [
  { label: "Paddy",      value: 35, color: "#22c55e" },
  { label: "Wheat",      value: 28, color: "#a78b71" },
  { label: "Maize",      value: 14, color: "#f59e0b" },
  { label: "Vegetables", value: 12, color: "#38bdf8" },
  { label: "Others",     value: 11, color: "#818cf8" },
];
