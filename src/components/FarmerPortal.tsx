import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { MANDIS } from "../data/mandis";
import { t } from "../data/i18n";
import { type Lang, type RegisteredFarmer, IMG, CROPS_EN, cropList, newFarmerRecord } from "../lib/shared";
import NeuralLines from "./NeuralLines";

type Step = "register" | "book" | "token";

interface Props {
  lang: Lang;
  onTokenBooked: (f: RegisteredFarmer) => void;
}

const CalendarIcon = () => (
  <svg className="date-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display:"inline",verticalAlign:"middle",marginRight:4 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckCircle = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-base)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.18 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
  </svg>
);

export default function FarmerPortal({ lang, onTokenBooked }: Props) {
  const [step, setStep] = useState<Step>("register");
  const [profile, setProfile] = useState({ name: "", phone: "", village: "", aadhaar: "" });
  const [booking, setBooking] = useState({ mandiId: MANDIS[0].id, crop: CROPS_EN[0], bags: "", date: "" });
  const [tokenData, setTokenData] = useState<RegisteredFarmer | null>(null);

  const mandi = MANDIS.find(m => m.id === booking.mandiId) ?? MANDIS[0];
  const today = new Date().toISOString().split("T")[0];

  const handleRegister = (e: React.FormEvent) => { e.preventDefault(); setStep("book"); };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const f = newFarmerRecord({
      name: profile.name, phone: profile.phone,
      village: profile.village, aadhaar: profile.aadhaar,
      mandiId: mandi.id, mandiName: mandi.name,
      crop: booking.crop, bags: parseInt(booking.bags) || 0,
      date: booking.date || new Date().toLocaleDateString("en-IN"),
    });
    setTokenData(f);
    onTokenBooked(f);
    setStep("token");
  };

  const reset = () => {
    setStep("register");
    setProfile({ name: "", phone: "", village: "", aadhaar: "" });
    setBooking({ mandiId: MANDIS[0].id, crop: CROPS_EN[0], bags: "", date: "" });
    setTokenData(null);
  };

  const sideImgs: Record<Step, { src: string; pos: string; caption: string }> = {
    register: { src: IMG.womanHarvest,  pos: "center 20%", caption: lang === "hi" ? "मंडी की लाइन से आज़ादी" : lang === "kn" ? "ಮಂಡಿ ಸರದಿಯಿಂದ ಮುಕ್ತಿ" : "Freedom from mandi queues" },
    book:     { src: IMG.plowingClouds, pos: "center 45%", caption: lang === "hi" ? "सही समय पर आएं" : lang === "kn" ? "ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಬನ್ನಿ" : "Arrive right on time" },
    token:    { src: IMG.mudRicePaddy,  pos: "center 50%", caption: lang === "hi" ? "टोकन मिल गया!" : lang === "kn" ? "ಟೋಕನ್ ಸಿಕ್ಕಿತು!" : "Token confirmed!" },
  };
  const side = sideImgs[step];

  const stepOrder: Step[] = ["register", "book", "token"];
  const stepLabels: Record<Step, string> = {
    register: lang === "hi" ? "पंजीकरण" : lang === "kn" ? "ನೋಂದಣಿ" : "Register",
    book:     lang === "hi" ? "स्लॉट बुक" : lang === "kn" ? "ಸ್ಲಾಟ್ ಬುಕ್" : "Book Slot",
    token:    lang === "hi" ? "टोकन" : lang === "kn" ? "ಟೋಕನ್" : "Token",
  };

  const labelSt: React.CSSProperties = { display: "block", color: "var(--text-dim)", fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" };
  const g2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

  const qrValue = tokenData ? `KISANQUEUE:${tokenData.token}:${tokenData.name}:${tokenData.mandiName}:${tokenData.crop}` : "";

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "var(--bg)" }}>
      <div className="dot-grid" style={{ minHeight: "calc(100vh - 80px)", padding: "44px 28px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

          {/* Form */}
          <div>
            {/* Step indicators */}
            <div style={{ display: "flex", gap: 0, marginBottom: 32, alignItems: "center" }}>
              {stepOrder.map((s, i) => {
                const idx = stepOrder.indexOf(step);
                const isDone = i < idx;
                const isActive = s === step;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        background: isActive ? "linear-gradient(135deg,var(--gold-base),var(--gold-light))" : isDone ? "rgba(34,197,94,0.15)" : "var(--surface)",
                        border: `1.5px solid ${isActive ? "var(--gold-light)" : isDone ? "rgba(34,197,94,0.5)" : "var(--border)"}`,
                        fontSize: 10, fontWeight: 700, transition: "all 0.3s",
                        color: isActive ? "#0a0a0a" : isDone ? "#22c55e" : "var(--text-muted)",
                      }}>
                        {isDone ? "✓" : i + 1}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 400, color: isActive ? "var(--gold-light)" : isDone ? "#22c55e" : "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{stepLabels[s]}</span>
                    </div>
                    {i < 2 && <div style={{ width: 48, height: 1, background: isDone ? "rgba(34,197,94,0.4)" : "var(--border)", margin: "0 10px", transition: "background 0.3s" }} />}
                  </div>
                );
              })}
            </div>

            {/* ── Step 1: Register ── */}
            {step === "register" && (
              <div className="gold-card fade-up" style={{ padding: "38px 34px" }}>
                <p style={{ color: "var(--gold-base)", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 8, fontWeight: 600 }}>{t("role.farmer",lang)} · Step 1</p>
                <h2 className="font-serif-italic" style={{ fontSize: 30, color: "var(--text)", marginBottom: 6, lineHeight: 1.15 }}>
                  {lang === "hi" ? "किसान पंजीकरण" : lang === "kn" ? "ರೈತ ನೋಂದಣಿ" : "Farmer Registration"}
                </h2>
                <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>
                  {lang === "hi" ? "एक बार पंजीकरण करें — हमेशा के लिए।" : lang === "kn" ? "ಒಮ್ಮೆ ನೋಂದಾಯಿಸಿ — ಯಾವಾಗಲೂ." : "Register once. Access your slot anytime."}
                </p>
                <form onSubmit={handleRegister} style={{ display: "grid", gap: 16 }}>
                  <div style={g2}>
                    <div>
                      <label style={labelSt}>{t("farmer.name",lang)} *</label>
                      <input required className="nn-input" placeholder={lang === "hi" ? "रमेश कुमार" : "Ramesh Kumar"} value={profile.name} onChange={e => setProfile({...profile,name:e.target.value})} />
                    </div>
                    <div>
                      <label style={labelSt}>{t("farmer.phone",lang)} *</label>
                      <input required className="nn-input" type="tel" placeholder="+91 98765 43210" value={profile.phone} onChange={e => setProfile({...profile,phone:e.target.value})} />
                    </div>
                  </div>
                  <div style={g2}>
                    <div>
                      <label style={labelSt}>{t("farmer.village",lang)}</label>
                      <input className="nn-input" placeholder={lang === "hi" ? "गाँव / जिला" : "Village / District"} value={profile.village} onChange={e => setProfile({...profile,village:e.target.value})} />
                    </div>
                    <div>
                      <label style={labelSt}>{t("farmer.aadhaar",lang)}</label>
                      <input className="nn-input" placeholder="XXXX XXXX XXXX" maxLength={14} value={profile.aadhaar} onChange={e => setProfile({...profile,aadhaar:e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold" style={{ width: "100%", padding: "14px", fontSize: 14, marginTop: 6 }}>
                    {lang === "hi" ? "पंजीकरण करें — स्लॉट बुक करने जाएं" : lang === "kn" ? "ನೋಂದಣಿ — ಮುಂದೆ ಹೋಗಿ" : "Register — Continue to Book Slot →"}
                  </button>
                  <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <LockIcon />{t("common.free",lang)} · No subscription
                  </p>
                </form>
              </div>
            )}

            {/* ── Step 2: Book Slot ── */}
            {step === "book" && (
              <div className="gold-card fade-up" style={{ padding: "38px 34px" }}>
                <p style={{ color: "var(--gold-base)", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 8, fontWeight: 600 }}>
                  {lang === "hi" ? `नमस्ते, ${profile.name}` : lang === "kn" ? `ನಮಸ್ಕಾರ, ${profile.name}` : `Welcome, ${profile.name}`} · Step 2
                </p>
                <h2 className="font-serif-italic" style={{ fontSize: 30, color: "var(--text)", marginBottom: 28, lineHeight: 1.15 }}>
                  {lang === "hi" ? "मंडी स्लॉट बुक करें" : lang === "kn" ? "ಮಂಡಿ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ" : "Book Your Mandi Slot"}
                </h2>
                <form onSubmit={handleBook} style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={labelSt}>{t("farmer.mandi",lang)} *</label>
                    <select required className="nn-input" value={booking.mandiId} onChange={e => setBooking({...booking,mandiId:+e.target.value})}>
                      {MANDIS.map(m => <option key={m.id} value={m.id}>{m.priority?"★ ":""}{lang === "hi" ? m.nameHi : lang === "kn" ? m.nameKn : m.name} — {m.city}</option>)}
                    </select>
                  </div>
                  <div style={g2}>
                    <div>
                      <label style={labelSt}>{t("farmer.crop",lang)} *</label>
                      <select required className="nn-input" value={booking.crop} onChange={e => setBooking({...booking,crop:e.target.value})}>
                        {cropList(lang).map((c,i) => <option key={i} value={CROPS_EN[i]}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelSt}>{t("farmer.bags",lang)} *</label>
                      <input required type="number" min="1" className="nn-input" placeholder="40" value={booking.bags} onChange={e => setBooking({...booking,bags:e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label style={labelSt}>{t("farmer.date",lang)} — {lang === "hi" ? "केवल भविष्य की तारीख" : lang === "kn" ? "ಭವಿಷ್ಯದ ದಿನಾಂಕ" : "Future dates only"}</label>
                    <div className="date-wrap">
                      <input type="date" className="nn-input" value={booking.date} min={today} onChange={e => setBooking({...booking,date:e.target.value})} />
                      <CalendarIcon />
                    </div>
                  </div>

                  {/* Mandi preview card */}
                  <div className="glass-sm" style={{ padding: "14px 16px", borderColor: "var(--border-gold)", background: "var(--gold-dim)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 14 }}>{mandi.name}</div>
                        <div style={{ color: "var(--text-dim)", fontSize: 11, marginTop: 2 }}>{mandi.city} · {mandi.timing}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 800, color: "var(--gold-base)", fontSize: 22, lineHeight: 1 }}>{mandi.activeTokens}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase" }}>active tokens</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" className="btn-outline" onClick={() => setStep("register")}>{t("common.back",lang)}</button>
                    <button type="submit" className="btn-gold" style={{ flex: 1, padding: "14px", fontSize: 14 }}>
                      {lang === "hi" ? "स्लॉट कन्फर्म करें" : lang === "kn" ? "ಸ್ಲಾಟ್ ಖಚಿತಪಡಿಸಿ" : "Confirm Slot & Get Token →"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Step 3: Token Issued ── */}
            {step === "token" && tokenData && (
              <div className="fade-up">
                <div className="gold-card" style={{ padding: "38px 34px", marginBottom: 16 }}>
                  {/* Header */}
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                      <div className="token-ring"><CheckCircle /></div>
                    </div>
                    <h2 className="font-serif-italic" style={{ fontSize: 26, color: "var(--text)", marginBottom: 4 }}>
                      {lang === "hi" ? "टोकन जारी हो गया!" : lang === "kn" ? "ಟೋಕನ್ ನೀಡಲಾಗಿದೆ!" : "Token Issued!"}
                    </h2>
                    <p style={{ color: "var(--text-dim)", fontSize: 13 }}>{mandi.name} · {mandi.city}</p>
                  </div>

                  {/* Token number + QR side by side */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <div style={{ color: "var(--text-muted)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Token Number</div>
                      <div style={{
                        fontFamily: "monospace", fontWeight: 900, fontSize: 40,
                        color: "var(--gold-base)",
                        background: "rgba(167,139,113,0.06)",
                        borderRadius: 14, padding: "14px 20px",
                        letterSpacing: "0.1em",
                        border: "1px solid rgba(167,139,113,0.18)",
                        lineHeight: 1,
                      }}>{tokenData.token}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <span className="badge-gold" style={{ fontSize: 9 }}>Position #{tokenData.position}</span>
                        <span className="badge-amber" style={{ fontSize: 9 }}>~{tokenData.waitMinutes}m wait</span>
                        <span className="badge-green" style={{ fontSize: 9 }}>Lane {tokenData.lane}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div className="qr-wrap">
                        <QRCodeSVG
                          value={qrValue}
                          size={120}
                          level="H"
                          fgColor="#c9b8a0"
                          bgColor="transparent"
                        />
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: 9, marginTop: 6, letterSpacing: "0.05em" }}>Scan at mandi gate</div>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                    {[
                      [lang === "hi" ? "किसान" : "Farmer",   tokenData.name],
                      [lang === "hi" ? "फसल" : "Crop",       tokenData.crop],
                      [lang === "hi" ? "बोरे" : "Bags",      String(tokenData.bags)],
                      [lang === "hi" ? "तारीख" : "Date",      tokenData.date],
                    ].map(([l,v]) => (
                      <div key={l} className="glass-sm" style={{ padding: "10px 14px" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{l}</div>
                        <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Confirmation badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: "10px 16px", marginBottom: 16 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600 }}>
                      {lang === "hi" ? "Control Staff को भेज दिया गया" : lang === "kn" ? "ಸಿಬ್ಬಂದಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ" : "Sent to Control Staff queue"}
                    </span>
                  </div>

                  <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: 11, marginBottom: 16 }}>
                    {lang === "hi" ? "SMS आपके नंबर पर भेज दिया गया।" : "SMS confirmation sent · Show QR at mandi gate."}
                  </p>
                  <button className="btn-outline btn-sm" onClick={reset} style={{ width: "100%" }}>
                    {lang === "hi" ? "नया Token बुक करें" : "Book Another Token"}
                  </button>
                </div>

                {/* Mandi address */}
                <div className="glass" style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 13, marginBottom: 8 }}>{mandi.name}</div>
                  <p style={{ color: "var(--text-dim)", fontSize: 12, lineHeight: 1.9 }}>
                    {mandi.address}<br />
                    {mandi.timing} &nbsp;·&nbsp; {mandi.phone}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 88 }}>
            <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "4/5", position: "relative" }}>
              <img src={side.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: side.pos }} />
              <div className="cin-overlay" />
              <div className="cin-text">
                <div style={{ fontFamily: "Fraunces,serif", fontWeight: 700, fontStyle: "italic", color: "white", fontSize: 16, lineHeight: 1.25 }}>{side.caption}</div>
              </div>
            </div>

            {/* Support */}
            <div className="glass" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div className="icon-box"><PhoneIcon /></div>
                <span style={{ fontWeight: 600, color: "var(--gold-light)", fontSize: 13 }}>{lang === "hi" ? "सहायता" : "Support"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Toll Free", "1800-000-KISAN"],["WhatsApp", "+91 98765 43210"],["USSD", "*123#"]].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{label}</span>
                    <span style={{ color: "var(--gold-light)", fontSize: 11, fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority mandis */}
            <div className="glass" style={{ padding: "16px 20px" }}>
              <div style={{ fontWeight: 600, color: "var(--gold-light)", fontSize: 12, marginBottom: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {lang === "hi" ? "नज़दीकी मंडियाँ" : "Priority Mandis — Bengaluru"}
              </div>
              {MANDIS.filter(m => m.priority).slice(0, 3).map(m => (
                <div key={m.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                  <span style={{ color: "var(--text-dim)", fontSize: 11 }}>{m.name.replace(" APMC","")}</span>
                  <span className="badge-green" style={{ fontSize: 9 }}>{m.avgWait}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NeuralLines />
    </div>
  );
}
