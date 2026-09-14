import { useState } from "react";
import { MANDIS, type Mandi } from "../data/mandis";
import { type Lang } from "../lib/shared";
import { t } from "../data/i18n";

export default function MandiMapPage({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState<Mandi>(MANDIS[0]);
  const [filter, setFilter] = useState("all");

  const states = ["all", ...Array.from(new Set(MANDIS.map(m => m.state)))];
  const filtered = filter === "all" ? MANDIS : MANDIS.filter(m => m.state === filter);

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.08},${selected.lat - 0.06},${selected.lng + 0.08},${selected.lat + 0.06}&layer=mapnik&marker=${selected.lat},${selected.lng}`;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, padding: "80px 32px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 36 }}>
        <p style={{ color: "var(--gold-base)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 10 }}>{t("map.title", lang)}</p>
        <h1 className="font-serif-italic" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "var(--text)", marginBottom: 10 }}>
          {lang === "hi" ? "20 मंडियाँ, एक नेटवर्क" : lang === "kn" ? "20 ಮಂಡಿಗಳು, ಒಂದು ನೆಟ್‌ವರ್ಕ್" : "20 Mandis, One Network"}
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: 14 }}>{t("map.sub", lang)}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 22, alignItems: "start" }}>
        {/* Map + detail */}
        <div>
          <div className="glass" style={{ overflow: "hidden", marginBottom: 16, height: 380 }}>
            <iframe key={selected.id} src={osmUrl} title={selected.name}
              style={{ width: "100%", height: "100%", border: "none" }} loading="lazy" />
          </div>

          <div className="gold-card" style={{ padding: "24px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
              <div>
                <h2 className="font-serif" style={{ fontSize: 20, color: "var(--text)", marginBottom: 4 }}>
                  {lang === "hi" ? selected.nameHi : lang === "kn" ? selected.nameKn : selected.name}
                </h2>
                <p style={{ color: "var(--text-dim)", fontSize: 12 }}>{selected.address}</p>
              </div>
              <div className="badge-green" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span className="pulse-dot" style={{ width: 6, height: 6 }} />Live
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
              {[
                { icon: "🎫", val: selected.activeTokens, label: t("map.tokens", lang) },
                { icon: "👨‍🌾", val: selected.todayFarmers, label: t("map.farmers", lang) },
                { icon: "⏱️", val: `${selected.avgWait}m`, label: t("map.avgwait", lang) },
                { icon: "🌾", val: selected.crops.length, label: lang === "hi" ? "फसलें" : lang === "kn" ? "ಬೆಳೆಗಳು" : "Crops" },
              ].map((s) => (
                <div key={s.label} className="glass-sm" style={{ padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 5 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 18 }}>{s.val}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 10, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {selected.crops.map(c => <span key={c} className="badge-gold">{c}</span>)}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <span style={{ color: "var(--text-dim)", fontSize: 12 }}>⏰ {selected.timing} | 📞 {selected.phone}</span>
              <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--gold-base)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                {t("map.open", lang)}
              </a>
            </div>
          </div>
        </div>

        {/* Mandi list */}
        <div>
          <select className="nn-input" value={filter} onChange={e => setFilter(e.target.value)} style={{ marginBottom: 12 }}>
            {states.map(s => (
              <option key={s} value={s}>{s === "all" ? (lang === "hi" ? "सभी राज्य" : lang === "kn" ? "ಎಲ್ಲ ರಾಜ್ಯಗಳು" : "All States") : s}</option>
            ))}
          </select>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 700, overflowY: "auto" }}>
            {filtered.map(m => (
              <button key={m.id} onClick={() => setSelected(m)} className="glass-sm"
                style={{
                  textAlign: "left", cursor: "pointer", padding: "12px 14px", border: "none",
                  background: selected.id === m.id ? "var(--gold-dim)" : "var(--surface)",
                  outline: selected.id === m.id ? "1px solid var(--border-gold)" : "none",
                  transition: "all 0.2s ease",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 12, marginBottom: 2 }}>
                      {m.priority && <span style={{ color: "var(--gold-base)", marginRight: 3 }}>★</span>}
                      {lang === "hi" ? m.nameHi : lang === "kn" ? m.nameKn : m.name}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{m.city}, {m.state}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 15 }}>{m.activeTokens}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 10 }}>{t("map.tokens", lang)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
                  <span className="badge-green" style={{ fontSize: 9 }}>{m.avgWait}m wait</span>
                  <span className="badge-gold" style={{ fontSize: 9 }}>{m.todayFarmers} today</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
