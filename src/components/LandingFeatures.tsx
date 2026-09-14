import { type Lang } from "../lib/shared";

interface Props { lang: Lang; }

export default function LandingFeatures({ lang }: Props) {
  const features = [
    { abbr: "PH", title: lang === "hi" ? "कोई भी फोन" : lang === "kn" ? "ಯಾವ ಫೋನ್" : "Any Phone Works",
      desc: lang === "hi" ? "2G से भी चलता है" : "Works on any 2G device" },
    { abbr: "WB", title: lang === "hi" ? "स्मार्ट वेब्रिज" : lang === "kn" ? "ಸ್ಮಾರ್ಟ್ ವೇಬ್ರಿಡ್ಜ್" : "Smart Weighbridge",
      desc: lang === "hi" ? "डिजिटल रसीद तुरंत" : "Instant digital receipt" },
    { abbr: "₹",  title: lang === "hi" ? "MSP भुगतान" : lang === "kn" ? "ಎಂಎಸ್‌ಪಿ ಪಾವತಿ" : "MSP Payment",
      desc: lang === "hi" ? "सीधे बैंक खाते में" : "Direct to Jan Dhan account" },
    { abbr: "RT", title: lang === "hi" ? "Real-Time अलर्ट" : lang === "kn" ? "ರಿಯಲ್-ಟೈಮ್ ಅಲರ್ಟ್" : "Real-Time Alerts",
      desc: lang === "hi" ? "SMS से अपडेट" : "Live SMS queue updates" },
    { abbr: "3L", title: lang === "hi" ? "3 भाषाएँ" : lang === "kn" ? "3 ಭಾಷೆಗಳು" : "3 Languages",
      desc: lang === "hi" ? "हिंदी, कन्नड़, अंग्रेज़ी" : "Hindi · Kannada · English" },
    { abbr: "AN", title: lang === "hi" ? "Admin Analytics" : lang === "kn" ? "ಅಡ್ಮಿನ್ ಅನಾಲಿಟಿಕ್ಸ್" : "Admin Analytics",
      desc: lang === "hi" ? "सभी मंडियों का डेटा" : "All-India mandi insights" },
  ];

  return (
    <section style={{ padding: "112px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ color: "var(--gold-base)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 16 }}>
            {lang === "hi" ? "विशेषताएँ" : lang === "kn" ? "ವೈಶಿಷ್ಟ್ಯಗಳು" : "Built for every farmer"}
          </p>
          <h2 className="font-serif-italic" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: "var(--text)", lineHeight: 1.1 }}>
            {lang === "hi" ? "क्यों KisanQueue?" : lang === "kn" ? "ಏಕೆ KisanQueue?" : "Why KisanQueue?"}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
          {features.map((f) => (
            <div key={f.title} style={{ padding: "28px 26px", border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", backdropFilter: "blur(14px)", transition: "border-color 0.25s, transform 0.25s, background 0.25s" }}
              onMouseOver={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "rgba(167,139,113,0.35)"; d.style.transform = "translateY(-3px)"; d.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseOut={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--border)"; d.style.transform = "translateY(0)"; d.style.background = "var(--surface)"; }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 12, background: "var(--gold-dim)", border: "1px solid var(--border-gold)", fontWeight: 900, color: "var(--gold-base)", fontSize: 13, letterSpacing: "0.03em", marginBottom: 18 }}>{f.abbr}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 8, lineHeight: 1.25 }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
