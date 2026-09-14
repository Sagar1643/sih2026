import { type Lang, type Page, IMG } from "../lib/shared";
import { t } from "../data/i18n";
import NeuralLines from "./NeuralLines";

interface Props { lang: Lang; setPage: (p: Page) => void; }

export default function LandingHero({ lang, setPage }: Props) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={IMG.heroFarmerOx} alt="Indian farmer with two oxen in lush green field" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(10,10,10,0.4) 0%, transparent 60%)" }} />
      </div>
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
      <NeuralLines />

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 32px 80px" }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(167,139,113,0.1)", border: "1px solid rgba(167,139,113,0.28)", borderRadius: 100, padding: "7px 18px", marginBottom: 36 }}>
          <span className="pulse-dot" />
          <span style={{ color: "var(--gold-light)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em" }}>{t("hero.tag", lang)}</span>
        </div>

        <h1 className="font-serif-italic fade-up fade-up-1" style={{ fontSize: "clamp(3.2rem,8vw,7rem)", lineHeight: 1.04, color: "var(--text)", marginBottom: 24, maxWidth: 900, letterSpacing: "-0.01em" }}>
          {t("hero.h1a", lang)}<br />
          <em style={{ color: "var(--gold-base)", fontStyle: "italic" }}>{t("hero.h1b", lang)}</em>
        </h1>

        <p className="fade-up fade-up-2" style={{ color: "var(--text-dim)", fontSize: 17, lineHeight: 1.75, maxWidth: 560, marginBottom: 44 }}>
          {t("hero.sub", lang)}
        </p>

        <div className="fade-up fade-up-3" style={{ display: "flex", gap: 14, flexWrap: "wrap" as const, justifyContent: "center", marginBottom: 72 }}>
          <button className="btn-gold" onClick={() => setPage("farmer")} style={{ fontSize: 15, padding: "15px 34px" }}>{t("hero.cta1", lang)}</button>
          <button className="btn-outline" onClick={() => setPage("mandis")} style={{ fontSize: 15, padding: "15px 28px" }}>{t("hero.cta2", lang)}</button>
        </div>

        <div className="fade-up fade-up-4" style={{ display: "flex", gap: 64, justifyContent: "center", flexWrap: "wrap" as const, borderTop: "1px solid rgba(167,139,113,0.18)", paddingTop: 36 }}>
          {([[" 47,000+", t("hero.stat1",lang)],["320+", t("hero.stat2",lang)],["9 hrs", t("hero.stat3",lang)]] as [string,string][]).map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="font-serif" style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--gold-base)", lineHeight: 1 }}>{v}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 8, letterSpacing: "0.04em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingBottom: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.45 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, var(--gold-base))" }} />
          <span style={{ color: "var(--text-muted)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>scroll</span>
        </div>
      </div>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", height: 120 }}>
        {[IMG.plowingClouds, IMG.womanHarvest, IMG.mudRicePaddy, IMG.womanCows, IMG.plowingStormy].map((src, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.7)", transition: "filter 600ms ease" }}
              onMouseOver={e => (e.currentTarget.style.filter = "brightness(0.8) saturate(1)")}
              onMouseOut={e => (e.currentTarget.style.filter = "brightness(0.55) saturate(0.7)")} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.8) 100%)" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
