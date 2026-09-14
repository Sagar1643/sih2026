import { IMG, IMG_META } from "../lib/shared";

interface Props {
  limit?: number;
  title?: string;
  subtitle?: string;
}

export default function ImageTabGrid({ limit = 10, title, subtitle }: Props) {
  const items = IMG_META.slice(0, limit);

  return (
    <section style={{ padding: "72px 32px", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {(title || subtitle) && (
          <div style={{ marginBottom: 44, textAlign: "center" }}>
            {title && (
              <h2 className="font-serif-italic" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text)", marginBottom: 10 }}>
                {title}
              </h2>
            )}
            {subtitle && <p style={{ color: "var(--text-dim)", fontSize: 14 }}>{subtitle}</p>}
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
        }}>
          {items.map((meta, i) => (
            <div key={i} className="cin-card">
              <img
                src={IMG[meta.key]}
                alt={meta.title}
                className="cin-img"
                style={{ objectPosition: meta.pos }}
                loading="lazy"
              />
              <div className="cin-overlay" />
              <div className="cin-text">
                <div style={{
                  fontFamily: "Fraunces, serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}>{meta.title}</div>
                <div style={{
                  color: "rgba(201,184,160,0.8)",
                  fontSize: 10,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase" as const,
                  fontWeight: 500,
                }}>{meta.sub}</div>
              </div>
              {/* Corner index */}
              <div style={{
                position: "absolute", top: 12, right: 12,
                width: 22, height: 22, borderRadius: "50%",
                background: "rgba(167,139,113,0.18)",
                border: "1px solid rgba(167,139,113,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--gold-light)", fontSize: 9, fontWeight: 700,
              }}>{String(i + 1).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
