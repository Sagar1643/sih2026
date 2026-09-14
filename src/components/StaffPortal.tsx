import { useState, useMemo } from "react";
import { MANDIS } from "../data/mandis";
import { t } from "../data/i18n";
import { type Lang, type RegisteredFarmer, type TokenStatus, IMG, genDemoQueue } from "../lib/shared";
import NeuralLines from "./NeuralLines";

type StaffTab = "queue" | "registered" | "lanes" | "log";

interface Props {
  lang: Lang;
  registeredFarmers: RegisteredFarmer[];
  onStatusChange: (token: string, status: TokenStatus) => void;
}

function statusBadge(s: TokenStatus) {
  if (s === "weighing") return <span className="badge-green">Weighing</span>;
  if (s === "called")   return <span className="badge-amber">Called</span>;
  if (s === "held")     return <span className="badge-blue">Held</span>;
  if (s === "skipped")  return <span className="badge-red">Skipped</span>;
  if (s === "done")     return <span className="badge-gold">Done</span>;
  return <span className="badge-gold">Waiting</span>;
}

export default function StaffPortal({ lang, registeredFarmers, onStatusChange }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ id: "", pin: "" });
  const [mandiId, setMandiId] = useState(MANDIS[0].id);
  const [tab, setTab] = useState<StaffTab>("queue");
  const [search, setSearch] = useState("");
  const [demoQueue, setDemoQueue] = useState<RegisteredFarmer[]>(() => genDemoQueue(MANDIS[0].id));
  const [log, setLog] = useState<{ time: string; msg: string; type: string }[]>([
    { time: "10:42", msg: "Token KQ-1001 completed weighing", type: "success" },
    { time: "10:38", msg: "Token KQ-1002 called to Lane 2", type: "info" },
    { time: "10:30", msg: "Token KQ-1005 held — farmer absent", type: "warn" },
  ]);

  const mandi = MANDIS.find(m => m.id === mandiId) ?? MANDIS[0];

  const allQueue: RegisteredFarmer[] = useMemo(() => {
    const mandiRegistered = registeredFarmers.filter(f => f.mandiId === mandiId);
    const merged = [...mandiRegistered, ...demoQueue.filter(d => !mandiRegistered.find(r => r.token === d.token))];
    if (!search) return merged;
    const s = search.toLowerCase();
    return merged.filter(f => f.name.toLowerCase().includes(s) || f.token.toLowerCase().includes(s) || f.crop.toLowerCase().includes(s));
  }, [registeredFarmers, demoQueue, mandiId, search]);

  const active = allQueue.filter(f => f.status !== "done" && f.status !== "skipped");
  const done   = allQueue.filter(f => f.status === "done");

  const addLog = (msg: string, type = "info") => {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setLog(prev => [{ time, msg, type }, ...prev].slice(0, 20));
  };

  const updateDemo = (token: string, status: TokenStatus) => {
    setDemoQueue(prev => prev.map(q => q.token === token ? { ...q, status } : q));
    onStatusChange(token, status);
    addLog(`Token ${token} → ${status}`, status === "done" ? "success" : status === "held" ? "warn" : "info");
  };

  const callNext = () => {
    const w = active.find(q => q.status === "waiting");
    if (!w) return;
    updateDemo(w.token, "called");
    addLog(`Token ${w.token} (${w.name}) called to Lane ${w.lane}`, "info");
  };

  const handleMandi = (id: number) => {
    setMandiId(id);
    setDemoQueue(genDemoQueue(id));
    setSearch("");
    addLog(`Switched to ${MANDIS.find(m => m.id === id)?.name}`, "info");
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80, background: "var(--bg)" }}>
        <div className="dot-grid" style={{ position: "fixed", inset: 0, opacity: 0.45 }} />
        <NeuralLines />
        <div className="gold-card fade-up" style={{ width: "100%", maxWidth: 400, padding: "42px 34px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,rgba(167,139,113,0.2),rgba(167,139,113,0.06))", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-base)" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
            </div>
            <p style={{ color: "var(--gold-base)", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 5 }}>{t("role.staff",lang)}</p>
            <h2 className="font-serif-italic" style={{ fontSize: 25, color: "var(--text)" }}>{t("common.login",lang)}</h2>
          </div>
          <form onSubmit={e => { e.preventDefault(); setLoggedIn(true); }} style={{ display: "grid", gap: 13 }}>
            <div>
              <label style={{ display: "block", color: "var(--text-dim)", fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
                {lang === "hi" ? "स्टाफ ID" : "Staff ID"}
              </label>
              <input required className="nn-input" placeholder="STAFF-001" value={creds.id} onChange={e => setCreds({...creds,id:e.target.value})} />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-dim)", fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
                {lang === "hi" ? "4-अंकीय PIN" : "4-Digit PIN"}
              </label>
              <input required type="password" maxLength={4} className="nn-input" placeholder="••••" value={creds.pin} onChange={e => setCreds({...creds,pin:e.target.value})} />
            </div>
            <button type="submit" className="btn-gold" style={{ marginTop: 4, padding: "13px", fontSize: 14, width: "100%" }}>{t("common.login",lang)} →</button>
          </form>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 11, marginTop: 12 }}>Demo: any Staff ID / PIN works</p>
        </div>
      </div>
    );
  }

  const thS: React.CSSProperties = { padding: "10px 12px", textAlign: "left", color: "var(--text-muted)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" as const };
  const tdS: React.CSSProperties = { padding: "10px 12px", fontSize: 12 };

  const tabs: { key: StaffTab; label: string }[] = [
    { key: "queue",      label: lang === "hi" ? "कतार" : "Active Queue" },
    { key: "registered", label: lang === "hi" ? "पंजीकृत" : "Registered" },
    { key: "lanes",      label: lang === "hi" ? "लेन" : "Lane View" },
    { key: "log",        label: lang === "hi" ? "लॉग" : "Activity Log" },
  ];

  const lanes = [1, 2, 3];

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "var(--bg)" }}>
      <div className="dot-grid" style={{ padding: "32px 28px", minHeight: "calc(100vh - 80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const, gap: 12, marginBottom: 24 }}>
            <div>
              <p style={{ color: "var(--gold-base)", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 4 }}>{t("role.staff",lang)}</p>
              <h1 className="font-serif-italic" style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", color: "var(--text)", marginBottom: 3 }}>{t("staff.queue",lang)}</h1>
              <div style={{ color: "var(--text-dim)", fontSize: 12 }}>{mandi.name} — {mandi.city}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, alignItems: "center" }}>
              <select className="nn-input" style={{ width: "auto", minWidth: 200, fontSize: 12 }} value={mandiId} onChange={e => handleMandi(+e.target.value)}>
                {MANDIS.map(m => <option key={m.id} value={m.id}>{m.priority?"★ ":""}{m.name}</option>)}
              </select>
              <button className="btn-gold btn-sm" onClick={callNext}>Call Next →</button>
              <button className="btn-outline btn-sm" onClick={() => setLoggedIn(false)}>{t("common.logout",lang)}</button>
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 22 }}>
            {[
              { val: active.filter(q => q.status === "waiting").length,  label: "Waiting",   color: "var(--gold-light)" },
              { val: active.filter(q => q.status === "called").length,   label: "Called",    color: "#f59e0b" },
              { val: active.filter(q => q.status === "weighing").length, label: "Weighing",  color: "#22c55e" },
              { val: active.filter(q => q.status === "held").length,     label: "On Hold",   color: "#38bdf8" },
              { val: done.length,                                         label: "Done",      color: "#22c55e" },
              { val: allQueue.length,                                     label: "Total",     color: "var(--text-dim)" },
            ].map(s => (
              <div key={s.label} className="glass" style={{ padding: "18px 16px", textAlign: "center" }}>
                <div style={{ fontWeight: 800, color: s.color, fontSize: 28, lineHeight: 1, marginBottom: 5, fontFamily: "Fraunces,serif" }}>{s.val}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search + Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" as const, alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <input className="nn-input" placeholder="🔍 Search farmer, token, crop..." value={search} onChange={e => setSearch(e.target.value)} style={{ fontSize: 12 }} />
            </div>
            <div style={{ display: "flex", gap: 3, background: "var(--surface)", borderRadius: 100, padding: 3 }}>
              {tabs.map(tb => (
                <button key={tb.key} onClick={() => setTab(tb.key)}
                  className={tab === tb.key ? "tab-pill-active" : "tab-pill"}
                  style={{ fontSize: 11 }}>
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Active Queue */}
          {tab === "queue" && (
            <div className="glass" style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="pulse-dot" />
                <span style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>
                  Active Queue ({active.length}) — {mandi.name}
                </span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                      {["Token","Farmer","Village","Crop","Bags","Lane","Registered","Status","Actions"].map(h => <th key={h} style={thS}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {active.map((q, i) => (
                      <tr key={q.token} style={{ borderBottom: "1px solid var(--border)", background: q.status === "weighing" ? "rgba(34,197,94,0.04)" : q.status === "called" ? "rgba(245,158,11,0.04)" : q.priority ? "rgba(167,139,113,0.04)" : "transparent" }}>
                        <td style={tdS}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            {q.priority && <span style={{ color: "var(--gold-base)", fontSize: 10 }}>★</span>}
                            <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 11, color: "var(--gold-base)" }}>{q.token}</span>
                          </div>
                        </td>
                        <td style={tdS}>
                          <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 12 }}>{q.name}</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{q.phone}</div>
                        </td>
                        <td style={{ ...tdS, color: "var(--text-dim)" }}>{q.village}</td>
                        <td style={{ ...tdS, color: "var(--text-dim)" }}>{q.crop}</td>
                        <td style={{ ...tdS, fontWeight: 700, color: "var(--gold-light)", fontSize: 13 }}>{q.bags}</td>
                        <td style={tdS}>
                          <select value={q.lane} onChange={e => { updateDemo(q.token, q.status); }}
                            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "3px 8px", color: "var(--text)", fontSize: 11 }}>
                            {[1,2,3].map(l => <option key={l} value={l}>Lane {l}</option>)}
                          </select>
                        </td>
                        <td style={{ ...tdS, color: "var(--text-muted)", fontSize: 11 }}>{q.registeredAt}</td>
                        <td style={tdS}>{statusBadge(q.status)}</td>
                        <td style={tdS}>
                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                            {q.status === "waiting"  && <button className="btn-amber" onClick={() => updateDemo(q.token,"called")}>Call</button>}
                            {q.status === "called"   && <button className="btn-green" onClick={() => updateDemo(q.token,"weighing")}>Weigh</button>}
                            {q.status === "weighing" && <button className="btn-green" onClick={() => updateDemo(q.token,"done")}>Done</button>}
                            {(q.status === "waiting" || q.status === "called") && <button className="btn-amber" onClick={() => updateDemo(q.token,"held")}>Hold</button>}
                            {q.status === "held" && <button className="btn-gold btn-sm" onClick={() => updateDemo(q.token,"waiting")}>Resume</button>}
                            {q.status === "waiting"  && <button className="btn-danger" onClick={() => updateDemo(q.token,"skipped")}>Skip</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {active.length === 0 && (
                      <tr><td colSpan={9} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", fontSize: 13 }}>
                        {search ? "No results found" : "No active farmers in queue"}
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Registered Farmers (from app) */}
          {tab === "registered" && (
            <div>
              {registeredFarmers.filter(f => f.mandiId === mandiId).length === 0 ? (
                <div className="glass" style={{ padding: "60px 32px", textAlign: "center" }}>
                  <div style={{ marginBottom: 12 }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-base)" strokeWidth="1" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                  <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
                    {lang === "hi" ? "अभी कोई किसान पंजीकृत नहीं है। किसान पोर्टल से Token बुक करें।" : "No farmers registered yet. Ask farmers to book a token via the Farmer portal."}
                  </p>
                </div>
              ) : (
                <div className="glass" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="pulse-dot" />
                    <span style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>
                      {lang === "hi" ? "पंजीकृत किसान" : "App-Registered Farmers"} ({registeredFarmers.filter(f => f.mandiId === mandiId).length})
                    </span>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                          {["Token","Name","Phone","Village","Crop","Bags","Registered","Status","Actions"].map(h => <th key={h} style={thS}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {registeredFarmers.filter(f => f.mandiId === mandiId).map(f => (
                          <tr key={f.token} style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={tdS}><span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 11, color: "var(--gold-base)" }}>{f.token}</span></td>
                            <td style={{ ...tdS, fontWeight: 600, color: "var(--text)" }}>{f.name}</td>
                            <td style={{ ...tdS, color: "var(--text-dim)" }}>{f.phone}</td>
                            <td style={{ ...tdS, color: "var(--text-dim)" }}>{f.village || "—"}</td>
                            <td style={{ ...tdS, color: "var(--text-dim)" }}>{f.crop}</td>
                            <td style={{ ...tdS, fontWeight: 700, color: "var(--gold-light)" }}>{f.bags}</td>
                            <td style={{ ...tdS, color: "var(--text-muted)", fontSize: 11 }}>{f.registeredAt}</td>
                            <td style={tdS}>{statusBadge(f.status)}</td>
                            <td style={tdS}>
                              <div style={{ display: "flex", gap: 4 }}>
                                {f.status === "waiting"  && <button className="btn-amber" onClick={() => { onStatusChange(f.token,"called"); addLog(`${f.name} called to weighbridge`,"info"); }}>Call</button>}
                                {f.status === "called"   && <button className="btn-green" onClick={() => { onStatusChange(f.token,"weighing"); addLog(`${f.name} at weighbridge`,"success"); }}>Weigh</button>}
                                {f.status === "weighing" && <button className="btn-green" onClick={() => { onStatusChange(f.token,"done"); addLog(`${f.name} completed`,"success"); }}>Done</button>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Lane View */}
          {tab === "lanes" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {lanes.map(ln => {
                const laneQ = active.filter(q => q.lane === ln);
                return (
                  <div key={ln} className="glass" style={{ overflow: "hidden" }}>
                    <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, color: "var(--gold-light)", fontSize: 15 }}>Lane {ln}</span>
                      <span className="badge-gold">{laneQ.length} farmers</span>
                    </div>
                    <div style={{ padding: "12px" }}>
                      {laneQ.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)", fontSize: 12 }}>Clear</div>
                      ) : laneQ.map((q, i) => (
                        <div key={q.token} style={{ padding: "10px 12px", borderRadius: 10, marginBottom: 8, background: q.status === "weighing" ? "rgba(34,197,94,0.1)" : q.status === "called" ? "rgba(245,158,11,0.1)" : "var(--surface)", border: "1px solid var(--border)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--gold-base)", fontWeight: 700 }}>{q.token}</span>
                            {statusBadge(q.status)}
                          </div>
                          <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 12 }}>{q.name}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: 10 }}>{q.crop} • {q.bags} bags</div>
                          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                            {q.status === "waiting"  && <button className="btn-amber" style={{ padding: "3px 8px", fontSize: 10 }} onClick={() => updateDemo(q.token,"called")}>Call</button>}
                            {q.status === "called"   && <button className="btn-green" style={{ padding: "3px 8px", fontSize: 10 }} onClick={() => updateDemo(q.token,"weighing")}>Weigh</button>}
                            {q.status === "weighing" && <button className="btn-green" style={{ padding: "3px 8px", fontSize: 10 }} onClick={() => updateDemo(q.token,"done")}>Done</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab: Activity Log */}
          {tab === "log" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
              <div className="glass" style={{ overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--text)", fontSize: 13 }}>Activity Log</div>
                <div style={{ padding: "8px 0" }}>
                  {log.map((entry, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "10px 18px", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: 10, whiteSpace: "nowrap" as const, marginTop: 2 }}>{entry.time}</span>
                      <span className={entry.type === "success" ? "badge-green" : entry.type === "warn" ? "badge-amber" : "badge-gold"} style={{ fontSize: 9, flexShrink: 0 }}>{entry.type}</span>
                      <span style={{ color: "var(--text-dim)", fontSize: 12 }}>{entry.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="glass" style={{ padding: "18px" }}>
                  <div style={{ fontWeight: 600, color: "var(--gold-light)", fontSize: 13, marginBottom: 12 }}>Mandi Info</div>
                  <div style={{ color: "var(--text-dim)", fontSize: 12, lineHeight: 1.8 }}>
                    <div>{mandi.name}</div>
                    <div style={{ color: "var(--text-muted)" }}>{mandi.address}</div>
                    <div>{mandi.timing}</div>
                    <div>{mandi.phone}</div>
                  </div>
                </div>
                <div style={{ borderRadius: 18, overflow: "hidden", height: 180, position: "relative" }}>
                  <img src={IMG.womanHarvest} alt="Farm" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.45)" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
