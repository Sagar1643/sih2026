import { type Lang, type Page, IMG } from "../lib/shared";
import { t } from "../data/i18n";

interface Props { lang: Lang; setPage: (p: Page) => void; }

export default function LandingFooter({ lang, setPage }: Props) {
  return (
    <>
      {/* Promise banner */}
      <section style={{ position: "relative", height: 480, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.cattleCarriage} alt="Man riding cattle carriage in rural India" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", filter: "brightness(0.45) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.72) 100%)" }} />
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 32px" }}>
          <h2 className="font-serif-italic" style={{ fontSize: "clamp(2.4rem,6vw,5rem)", color: "var(--text)", marginBottom: 10, lineHeight: 1.08, letterSpacing: "-0.01em" }}>
            {lang === "hi" ? "हमेशा मुफ्त।" : lang === "kn" ? "ಯಾವಾಗಲೂ ಉಚಿತ." : "Always Free."}
          </h2>
          <h2 className="font-serif-italic" style={{ fontSize: "clamp(2.4rem,6vw,5rem)", color: "var(--gold-base)", marginBottom: 36, lineHeight: 1.08, letterSpacing: "-0.01em" }}>
            {lang === "hi" ? "हर किसान के लिए।" : lang === "kn" ? "ಪ್ರತಿ ರೈತರಿಗೆ." : "For every farmer."}
          </h2>
          <button className="btn-gold" onClick={() => setPage("farmer")} style={{ fontSize: 15, padding: "15px 40px" }}>{t("hero.cta1", lang)}</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)", padding: "72px 48px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ fontFamily: "Fraunces,serif", fontStyle: "italic", fontWeight: 700, color: "var(--text)", fontSize: 26, marginBottom: 6 }}>KisanQueue</div>
              <div style={{ color: "var(--gold-base)", fontSize: 11, marginBottom: 18, letterSpacing: "0.06em" }}>किसान कतार · ರೈತ ಸರದಿ</div>
              <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.8, maxWidth: 340 }}>Digital mandi queue management. Built for SIH 2026. 100% Free forever — no subscription, no ads.</p>
            </div>
            {[
              { head: lang === "hi" ? "पोर्टल" : "Portals", links: [t("nav.farmer",lang), t("nav.staff",lang), t("nav.admin",lang), t("nav.mandis",lang)] },
              { head: lang === "hi" ? "सहायता" : "Support",  links: ["1800-000-KISAN","WhatsApp","USSD *123#","help@kisanqueue.in"] },
            ].map((col) => (
              <div key={col.head}>
                <div style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 20 }}>{col.head}</div>
                {col.links.map(l => <div key={l} style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 10 }}>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>© 2026 KisanQueue — 100% Free Forever</div>
            <div style={{ color: "var(--gold-base)", fontSize: 12, letterSpacing: "0.04em" }}>🇮🇳 जय किसान | ಜಯ ರೈತ</div>
          </div>
        </div>
      </footer>
    </>
  );
}
