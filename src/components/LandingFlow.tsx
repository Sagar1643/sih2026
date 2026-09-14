import { type Lang, IMG } from "../lib/shared";

interface Props { lang: Lang; }

const STEPS = [
  { step: "01", imgKey: "personRiceField" as const },
  { step: "02", imgKey: "womanCows" as const },
  { step: "03", imgKey: "womanRedCows" as const },
  { step: "04", imgKey: "plowingStormy" as const },
  { step: "05", imgKey: "mudRicePaddy" as const },
];

function stepLabel(i: number, lang: Lang) {
  const en = ["Register","Token Booking","Control Staff","Weighing","Admin Control"];
  const hi = ["पंजीकरण","Token बुकिंग","Control Staff","तुलाई","Admin नियंत्रण"];
  const kn = ["ನೋಂದಣಿ","ಟೋಕನ್ ಬುಕಿಂಗ್","ನಿಯಂತ್ರಣ ಸಿಬ್ಬಂದಿ","ತೂಕ","ಅಡ್ಮಿನ್ ನಿಯಂತ್ರಣ"];
  const d_en = ["Name, phone, Aadhaar — once.","Pick mandi, date, bags.","Staff calls token, gate opens.","Auto weighbridge + digital receipt.","Admin analytics & all mandis."];
  const d_hi = ["नाम, फोन, आधार — एक बार।","मंडी, तारीख, बोरे।","Staff Token कॉल करता है।","Auto weighbridge। डिजिटल रसीद।","Admin डेटा देखे।"];
  const d_kn = ["ಹೆಸರು, ಫೋನ್ — ಒಮ್ಮೆ.","ಮಂಡಿ, ದಿನಾಂಕ, ಚೀಲ.","ಸಿಬ್ಬಂದಿ ಟೋಕನ್ ಕರೆ.","ಸ್ವಯಂ ತೂಕ ಡೇಟಾ.","ಅಡ್ಮಿನ್ ನೋಡಿ."];
  const labels = lang === "hi" ? hi : lang === "kn" ? kn : en;
  const descs  = lang === "hi" ? d_hi : lang === "kn" ? d_kn : d_en;
  return { label: labels[i], desc: descs[i] };
}

export default function LandingFlow({ lang }: Props) {
  return (
    <section style={{ background: "var(--bg-2)", padding: "112px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ color: "var(--gold-base)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 16 }}>
            {lang === "hi" ? "पूरी प्रक्रिया" : lang === "kn" ? "ಸಂಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆ" : "The Complete Journey"}
          </p>
          <h2 className="font-serif-italic" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: "var(--text)", lineHeight: 1.1 }}>
            {lang === "hi" ? "किसान से भुगतान तक" : lang === "kn" ? "ರೈತನಿಂದ ಪಾವತಿಯವರೆಗೆ" : "Farmer → Token → Payment"}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: 100, left: "10%", right: "10%", height: 1, background: "linear-gradient(to right, transparent, var(--border-gold), var(--border-gold), transparent)", zIndex: 0 }} />
          {STEPS.map((s, i) => {
            const { label, desc } = stepLabel(i, lang);
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px", position: "relative", zIndex: 1 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--bg-2)", border: "1.5px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontFamily: "Fraunces, serif", fontWeight: 700, color: "var(--gold-base)", fontSize: 14, flexShrink: 0, boxShadow: "0 0 24px rgba(167,139,113,0.18)" }}>
                  {s.step}
                </div>
                <div style={{ width: "100%", borderRadius: 18, overflow: "hidden", marginBottom: 18, border: "1px solid var(--border)", transition: "border-color 0.3s, transform 0.3s" }}
                  onMouseOver={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "rgba(167,139,113,0.4)"; d.style.transform = "translateY(-3px)"; }}
                  onMouseOut={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--border)"; d.style.transform = "translateY(0)"; }}>
                  <img src={IMG[s.imgKey]} alt={label} style={{ width: "100%", height: 120, objectFit: "cover", display: "block", filter: "brightness(0.8) saturate(0.85)" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13, marginBottom: 6, lineHeight: 1.3 }}>{label}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 11, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
