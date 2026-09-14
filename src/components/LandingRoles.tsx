import { type Lang, type Page, IMG } from "../lib/shared";
import { t } from "../data/i18n";

interface Props { lang: Lang; setPage: (p: Page) => void; }

const roles = [
  { key: "farmer" as Page, abbr: "FA", img: IMG.womanHarvest },
  { key: "staff"  as Page, abbr: "CS", img: IMG.manRiceField },
  { key: "admin"  as Page, abbr: "AD", img: IMG.cattleCarriage },
];

export default function LandingRoles({ lang, setPage }: Props) {
  return (
    <section style={{ padding: "112px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p style={{ color: "var(--gold-base)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 16 }}>
          {lang === "hi" ? "अपना पोर्टल चुनें" : lang === "kn" ? "ನಿಮ್ಮ ಪೋರ್ಟಲ್ ಆಯ್ಕೆ ಮಾಡಿ" : "Choose Your Portal"}
        </p>
        <h2 className="font-serif-italic" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: "var(--text)", lineHeight: 1.1 }}>
          {lang === "hi" ? "तीन भूमिकाएँ, एक मंच" : lang === "kn" ? "ಮೂರು ಪಾತ್ರಗಳು, ಒಂದು ವೇದಿಕೆ" : "Three Roles, One Platform"}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
        {roles.map((r) => (
          <button key={r.key} onClick={() => setPage(r.key)}
            style={{ textAlign: "left", cursor: "pointer", overflow: "hidden", border: "1px solid var(--border)", borderRadius: 24, padding: 0, background: "var(--surface)", backdropFilter: "blur(14px)", transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}
            onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(167,139,113,0.4)"; b.style.transform = "translateY(-4px)"; b.style.boxShadow = "0 24px 64px rgba(0,0,0,0.5)"; }}
            onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--border)"; b.style.transform = "translateY(0)"; b.style.boxShadow = "none"; }}>
            <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
              <img src={r.img} alt={t(`role.${r.key}`, lang)} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,10,10,0.7) 0%,transparent 50%)" }} />
              <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(10,10,10,0.7)", backdropFilter: "blur(10px)", border: "1px solid var(--border-gold)", borderRadius: 10, padding: "5px 10px", fontWeight: 800, color: "var(--gold-base)", fontSize: 10, letterSpacing: "0.08em" }}>{r.abbr}</div>
            </div>
            <div style={{ padding: "24px 26px 28px" }}>
              <h3 className="font-serif" style={{ fontWeight: 700, fontSize: 21, color: "var(--text)", marginBottom: 9, lineHeight: 1.2 }}>{t(`role.${r.key}`, lang)}</h3>
              <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>{t(`role.${r.key}.desc`, lang)}</p>
              <span style={{ color: "var(--gold-base)", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em" }}>
                {lang === "hi" ? "जाएं →" : lang === "kn" ? "ಹೋಗಿ →" : "Enter →"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
