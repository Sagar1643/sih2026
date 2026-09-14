import { useState, useEffect } from "react";
import { type Page, type Lang } from "../lib/shared";
import { t } from "../data/i18n";

interface Props {
  page: Page; setPage: (p: Page) => void;
  lang: Lang; setLang: (l: Lang) => void;
}

export default function Navbar({ page, setPage, lang, setLang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems: { key: Page; labelKey: string }[] = [
    { key: "home",   labelKey: "nav.home" },
    { key: "mandis", labelKey: "nav.mandis" },
    { key: "farmer", labelKey: "nav.farmer" },
    { key: "staff",  labelKey: "nav.staff" },
    { key: "admin",  labelKey: "nav.admin" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(167,139,113,0.12)" : "none",
      padding: "0 28px", transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

        {/* Logo */}
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 11, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg,#a78b71,#e8d5b7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(167,139,113,0.35)",
          }}>
            <span style={{ fontFamily: "Fraunces,serif", fontWeight: 700, color: "#0a0a0a", fontSize: 20, fontStyle: "italic", lineHeight: 1 }}>K</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "Fraunces,serif", fontWeight: 700, color: "var(--text)", fontSize: 17, lineHeight: 1.1, fontStyle: "italic" }}>KisanQueue</div>
            <div style={{ color: "var(--gold-base)", fontSize: 9, lineHeight: 1, marginTop: 2, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>जय जवान जय किसान · Jai Jawan Jai Kisan</div>
          </div>
        </button>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, overflow: "hidden" }}>
          {navItems.map(({ key, labelKey }) => (
            <button key={key} onClick={() => setPage(key)} style={{
              background: page === key ? "rgba(167,139,113,0.14)" : "none",
              border: page === key ? "1px solid rgba(167,139,113,0.28)" : "1px solid transparent",
              borderRadius: 100, padding: "6px 14px",
              color: page === key ? "var(--gold-light)" : "var(--text-dim)",
              fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase" as const,
              cursor: "pointer", fontFamily: "Inter,sans-serif", fontWeight: 600,
              transition: "all 0.2s", whiteSpace: "nowrap" as const,
            }}>{t(labelKey, lang)}</button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* Language switcher */}
          <div style={{ display: "flex", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 100, overflow: "hidden" }}>
            {(["en","hi","kn"] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "6px 10px", fontSize: 10, fontWeight: 700,
                background: lang === l ? "var(--gold-dim)" : "none",
                color: lang === l ? "var(--gold-hover)" : "var(--text-muted)",
                border: "none", cursor: "pointer", transition: "all 0.15s",
              }}>{l === "en" ? "EN" : l === "hi" ? "हि" : "ಕ"}</button>
            ))}
          </div>
          {/* CTA */}
          <button className="btn-gold btn-sm" onClick={() => setPage("farmer")} style={{ fontSize: 11, letterSpacing: "0.04em" }}>
            {lang === "hi" ? "Register Free" : lang === "kn" ? "ನೋಂದಣಿ" : "Register Free"}
          </button>
        </div>
      </div>
    </nav>
  );
}
