import { useState } from "react";
import { MANDIS } from "../data/mandis";
import { t } from "../data/i18n";
import { type Lang, type RegisteredFarmer, IMG, CROPS_EN } from "../lib/shared";
import NeuralLines from "./NeuralLines";
import { BarChart, DonutChart, Sparkline, WEEKLY_DATA, CROP_SEGMENTS } from "./AdminCharts";

type AdminTab = "overview" | "mandis" | "farmers" | "analytics" | "system";
interface Props { lang: Lang; registeredFarmers: RegisteredFarmer[]; }

const SAMPLE_FARMERS = Array.from({ length: 12 }, (_, i) => ({
  id: `F${String(i + 1).padStart(4, "0")}`,
  name: ["Ramesh Kumar","Sukhdev Singh","Ganga Devi","Moolchand","Phoolwati","Jaswant","Lakshmi","Ramu Naik","Shivanna","Parvati","Arjun Singh","Devika"][i],
  phone: `98765 ${43200 + i}`, mandi: MANDIS[i % MANDIS.length].name.split(" ")[0],
  crop: CROPS_EN[i % CROPS_EN.length], tokens: i + 1, lastVisit: `${i + 1} Sep 2026`,
  status: i % 4 === 0 ? "active" : "registered",
}));

export default function AdminPortal({ lang, registeredFarmers }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ email: "", pass: "" });
  const [tab, setTab] = useState<AdminTab>("overview");

  const totalTokens  = MANDIS.reduce((a, m) => a + m.activeTokens, 0);
  const totalFarmers = MANDIS.reduce((a, m) => a + m.todayFarmers, 0) + registeredFarmers.length;
  const avgWait      = Math.round(MANDIS.reduce((a, m) => a + m.avgWait, 0) / MANDIS.length);

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80, background: "var(--bg)" }}>
        <div className="dot-grid" style={{ position: "fixed", inset: 0, opacity: 0.45 }} />
        <NeuralLines />
        <div className="gold-card fade-up" style={{ width: "100%", maxWidth: 400, padding: "42px 34px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,rgba(167,139,113,0.2),rgba(167,139,113,0.06))", border: "1px solid var(--border-gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-base)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <p style={{ color: "var(--gold-base)", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 5 }}>{t("role.admin",lang)}</p>
            <h2 className="font-serif-italic" style={{ fontSize: 25, color: "var(--text)" }}>{t("admin.dashboard",lang)}</h2>
          </div>
          <form onSubmit={e => { e.preventDefault(); setLoggedIn(true); }} style={{ display: "grid", gap: 13 }}>
            <div>
              <label style={{ display: "block", color: "var(--text-dim)", fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Email</label>
              <input required type="email" className="nn-input" placeholder="admin@kisanqueue.in" value={creds.email} onChange={e => setCreds({...creds,email:e.target.value})} />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-dim)", fontSize: 10, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{lang === "hi" ? "पासवर्ड" : "Password"}</label>
              <input required type="password" className="nn-input" placeholder="••••••••" value={creds.pass} onChange={e => setCreds({...creds,pass:e.target.value})} />
            </div>
            <button type="submit" className="btn-gold" style={{ marginTop: 4, padding: "13px", fontSize: 14, width: "100%" }}>{t("common.login",lang)} →</button>
          </form>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 11, marginTop: 12 }}>Demo: any email / password</p>
        </div>
      </div>
    );
  }

  const kpis = [
    { abbr:"FA", val: totalFarmers.toLocaleString(), label: t("admin.farmers",lang), trend:[180,210,195,240,260,248,280], trendColor:"#22c55e" },
    { abbr:"TK", val: totalTokens,                  label: t("admin.tokens",lang),  trend:[80,110,95,130,125,140,totalTokens], trendColor:"#a78b71" },
    { abbr:"MN", val: MANDIS.length,                label: t("admin.mandis",lang),  trend:[15,16,17,18,18,19,20], trendColor:"#38bdf8" },
    { abbr:"WT", val: `${avgWait}m`,                label: t("admin.wait",lang),    trend:[55,52,50,48,44,42,avgWait], trendColor:"#f59e0b" },
    { abbr:"DN", val: registeredFarmers.filter(f => f.status==="done").length+"+", label:"Completed", trend:[20,35,28,42,55,48,60], trendColor:"#22c55e" },
  ];

  const tabs: {key:AdminTab;label:string}[] = [
    {key:"overview",  label:lang==="hi"?"अवलोकन":"Overview"},
    {key:"mandis",    label:lang==="hi"?"मंडियाँ":"Mandis"},
    {key:"farmers",   label:lang==="hi"?"किसान":"Farmers"},
    {key:"analytics", label:lang==="hi"?"विश्लेषण":"Analytics"},
    {key:"system",    label:lang==="hi"?"सिस्टम":"System"},
  ];

  const stateVol = Object.entries(MANDIS.reduce((acc,m) => ({...acc,[m.state]:(acc[m.state]??0)+m.todayFarmers}),{} as Record<string,number>)).sort(([,a],[,b])=>b-a);
  const maxVol   = stateVol[0]?.[1] ?? 1;
  const thS: React.CSSProperties = {padding:"10px 12px",textAlign:"left",color:"var(--text-muted)",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"};
  const tdS: React.CSSProperties = {padding:"10px 12px"};
  const allFarmers = [...SAMPLE_FARMERS, ...registeredFarmers.map(f=>({id:f.id,name:f.name,phone:f.phone,mandi:f.mandiName?.split(" ")[0]??"—",crop:f.crop,tokens:1,lastVisit:f.registeredAt,status:f.status}))];

  return (
    <div style={{ minHeight:"100vh", paddingTop:80, background:"var(--bg)" }}>
      <div className="dot-grid" style={{ padding:"32px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" as const, gap:12, marginBottom:24 }}>
            <div>
              <p style={{ color:"var(--gold-base)", fontSize:10, textTransform:"uppercase" as const, letterSpacing:"0.1em", marginBottom:4 }}>{t("role.admin",lang)}</p>
              <h1 className="font-serif-italic" style={{ fontSize:"clamp(1.6rem,2.5vw,2.4rem)", color:"var(--text)" }}>{t("admin.dashboard",lang)}</h1>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:100, padding:"7px 14px" }}>
                <span className="pulse-dot" /><span style={{ color:"var(--text-dim)", fontSize:11 }}>All Systems Live</span>
              </div>
              <button className="btn-outline btn-sm" onClick={() => setLoggedIn(false)}>{t("common.logout",lang)}</button>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:13, marginBottom:22 }}>
            {kpis.map(s => (
              <div key={s.label} className="glass" style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div style={{ width:34,height:34,borderRadius:10,background:"var(--gold-dim)",border:"1px solid var(--border-gold)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:s.trendColor,fontSize:10,letterSpacing:"0.04em" }}>{s.abbr}</div>
                  <Sparkline vals={s.trend} color={s.trendColor} />
                </div>
                <div style={{ fontWeight:700,color:s.trendColor,fontSize:26,lineHeight:1,marginBottom:4 }}>{s.val}</div>
                <div style={{ color:"var(--text-dim)",fontSize:12 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex",gap:3,marginBottom:20,background:"var(--surface)",borderRadius:100,padding:3,overflowX:"auto" as const,width:"fit-content" }}>
            {tabs.map(({key,label}) => (
              <button key={key} onClick={() => setTab(key)} className={tab===key?"tab-pill-active":"tab-pill"} style={{ fontSize:11 }}>{label}</button>
            ))}
          </div>

          {/* Overview */}
          {tab === "overview" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Weekly Token Volume</div>
                <BarChart data={WEEKLY_DATA} />
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Crop Distribution</div>
                <DonutChart segments={CROP_SEGMENTS} />
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Top Mandis by Volume</div>
                {MANDIS.slice().sort((a,b)=>b.todayFarmers-a.todayFarmers).slice(0,6).map((m,i) => (
                  <div key={m.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<5?"1px solid var(--border)":"none" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                      <span style={{ color:"var(--gold-base)",fontWeight:700,fontSize:13,width:20 }}>#{i+1}</span>
                      <div>
                        <div style={{ fontWeight:600,color:"var(--text)",fontSize:12 }}>{m.name.replace(" APMC","")}</div>
                        <div style={{ color:"var(--text-muted)",fontSize:10 }}>{m.city}, {m.state}</div>
                      </div>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <Sparkline vals={[m.todayFarmers*.6,m.todayFarmers*.75,m.todayFarmers*.9,m.todayFarmers].map(Math.round)} color="#a78b71" />
                      <div style={{ textAlign:"right",minWidth:40 }}>
                        <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14 }}>{m.todayFarmers}</div>
                        <div style={{ color:"var(--text-muted)",fontSize:9 }}>farmers</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>State-wise Volume</div>
                {stateVol.map(([state,count]) => (
                  <div key={state} style={{ marginBottom:12 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                      <span style={{ color:"var(--text-dim)",fontSize:12 }}>{state}</span>
                      <span style={{ fontWeight:600,color:"var(--gold-base)",fontSize:12 }}>{count}</span>
                    </div>
                    <div className="progress-track"><div className="progress-fill" style={{ width:`${(count/maxVol)*100}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandis */}
          {tab === "mandis" && (
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14 }}>
              {MANDIS.map(m => (
                <div key={m.id} className="glass" style={{ padding:"18px 20px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                    <div>
                      <div style={{ fontWeight:700,color:"var(--text)",fontSize:13 }}>{m.priority&&<span style={{ color:"var(--gold-base)",marginRight:4 }}>★</span>}{lang==="hi"?m.nameHi:lang==="kn"?m.nameKn:m.name}</div>
                      <div style={{ color:"var(--text-muted)",fontSize:11 }}>{m.city}, {m.state}</div>
                    </div>
                    <span className="badge-green" style={{ fontSize:9 }}>Live</span>
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10 }}>
                    {[[m.activeTokens,"tokens",m.activeTokens>80?"#ef4444":"#a78b71"],[m.todayFarmers,"farmers","#22c55e"],[`${m.avgWait}m`,"wait","#f59e0b"]].map(([v,l,c])=>(
                      <div key={String(l)} style={{ textAlign:"center",background:"var(--surface-2)",borderRadius:10,padding:"8px 4px" }}>
                        <div style={{ fontWeight:700,color:String(c),fontSize:15 }}>{v}</div>
                        <div style={{ color:"var(--text-muted)",fontSize:9 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="progress-track" style={{ marginBottom:10 }}><div className="progress-fill" style={{ width:`${Math.min((m.activeTokens/150)*100,100)}%` }} /></div>
                  <div style={{ display:"flex",flexWrap:"wrap" as const,gap:4 }}>{m.crops.map(c=><span key={c} className="badge-gold" style={{ fontSize:8 }}>{c}</span>)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Farmers */}
          {tab === "farmers" && (
            <div className="glass" style={{ overflow:"hidden" }}>
              <div style={{ padding:"12px 18px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontWeight:600,color:"var(--text)",fontSize:13 }}>All Farmers ({allFarmers.length}){registeredFarmers.length>0&&<span className="badge-green" style={{ marginLeft:8,fontSize:9 }}>+{registeredFarmers.length} live</span>}</span>
                <button className="btn-gold btn-sm">Export CSV</button>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse" }}>
                  <thead><tr style={{ borderBottom:"1px solid var(--border)",background:"var(--surface)" }}>{["ID","Name","Phone","Mandi","Crop","Tokens","Last Visit","Status","Action"].map(h=><th key={h} style={thS}>{h}</th>)}</tr></thead>
                  <tbody>
                    {allFarmers.map((f,i)=>(
                      <tr key={f.id+i} style={{ borderBottom:"1px solid var(--border)" }}>
                        <td style={{...tdS,fontFamily:"monospace",fontSize:10,color:"var(--gold-base)"}}>{f.id}</td>
                        <td style={{...tdS,fontWeight:600,color:"var(--text)",fontSize:12}}>{f.name}</td>
                        <td style={{...tdS,color:"var(--text-dim)",fontSize:11}}>{f.phone}</td>
                        <td style={{...tdS,color:"var(--text-dim)",fontSize:11}}>{f.mandi}</td>
                        <td style={{...tdS,color:"var(--text-dim)",fontSize:11}}>{f.crop}</td>
                        <td style={{...tdS,fontWeight:700,color:"var(--gold-light)",fontSize:13,textAlign:"center"}}>{f.tokens}</td>
                        <td style={{...tdS,color:"var(--text-muted)",fontSize:10}}>{f.lastVisit}</td>
                        <td style={tdS}><span className={f.status==="active"||f.status==="weighing"?"badge-green":f.status==="done"?"badge-gold":"badge-blue"} style={{fontSize:9}}>{String(f.status)}</span></td>
                        <td style={tdS}><button className="btn-outline btn-sm" style={{fontSize:10}}>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics */}
          {tab === "analytics" && (
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16 }}>
              <div className="glass" style={{ padding:"22px",gridColumn:"1/-1" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Monthly Farmer Registrations (2026)</div>
                <BarChart color="#22c55e" height={160} data={[{label:"Jan",value:1240},{label:"Feb",value:1580},{label:"Mar",value:2100},{label:"Apr",value:1890},{label:"May",value:2340},{label:"Jun",value:2780},{label:"Jul",value:2490},{label:"Aug",value:3100},{label:"Sep",value:3420},{label:"Oct",value:0},{label:"Nov",value:0},{label:"Dec",value:0}]} />
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Wait Time by State</div>
                <BarChart color="#f59e0b" height={130} data={MANDIS.reduce((acc,m)=>{const ex=acc.find(a=>a.label===m.state.slice(0,3));if(ex)ex.value=Math.round((ex.value+m.avgWait)/2);else acc.push({label:m.state.slice(0,3),value:m.avgWait});return acc;},[] as {label:string;value:number}[])} />
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Token Volume by Day</div>
                <BarChart color="#38bdf8" data={WEEKLY_DATA} />
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Crop Mix</div>
                <DonutChart segments={CROP_SEGMENTS} />
              </div>
            </div>
          )}

          {/* System */}
          {tab === "system" && (
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>System Health</div>
                {[{label:"API Server",status:"Operational",color:"#22c55e",uptime:"99.97%"},{label:"SMS Gateway",status:"Operational",color:"#22c55e",uptime:"99.82%"},{label:"Database",status:"Operational",color:"#22c55e",uptime:"100%"},{label:"eNAM Integration",status:"Degraded",color:"#f59e0b",uptime:"96.40%"},{label:"Jan Dhan API",status:"Operational",color:"#22c55e",uptime:"99.50%"}].map(s=>(
                  <div key={s.label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--border)" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8 }}><div style={{ width:8,height:8,borderRadius:"50%",background:s.color }} /><span style={{ color:"var(--text-dim)",fontSize:13 }}>{s.label}</span></div>
                    <div style={{ display:"flex",gap:12,alignItems:"center" }}><span style={{ color:"var(--text-muted)",fontSize:11 }}>{s.uptime}</span><span className={s.status==="Operational"?"badge-green":"badge-amber"} style={{ fontSize:9 }}>{s.status}</span></div>
                  </div>
                ))}
              </div>
              <div className="glass" style={{ padding:"22px" }}>
                <div style={{ fontWeight:700,color:"var(--gold-light)",fontSize:14,marginBottom:16 }}>Activity Log</div>
                {[{time:"10:42",msg:"Token KQ-10234 completed — Azadpur",type:"success"},{time:"10:38",msg:"New farmer registered: Lakshmi Devi",type:"info"},{time:"10:31",msg:"SMS batch to 24 farmers — Yeshwanthpur",type:"info"},{time:"10:25",msg:"Token KQ-00198 rescheduled — Mysuru",type:"warn"},{time:"10:18",msg:"Lane 3 reset — Khanna APMC",type:"warn"},{time:"10:05",msg:"eNAM sync completed — 312 records",type:"success"}].map((l,i)=>(
                  <div key={i} style={{ display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)",alignItems:"flex-start" }}>
                    <span style={{ color:"var(--text-muted)",fontSize:10,whiteSpace:"nowrap" as const,marginTop:1 }}>{l.time}</span>
                    <span className={l.type==="success"?"badge-green":l.type==="warn"?"badge-amber":"badge-gold"} style={{ fontSize:8,flexShrink:0 }}>{l.type}</span>
                    <span style={{ color:"var(--text-dim)",fontSize:11 }}>{l.msg}</span>
                  </div>
                ))}
              </div>
              <div style={{ gridColumn:"1/-1",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12 }}>
                {[IMG.plowingClouds,IMG.womanHarvest,IMG.cattleCarriage,IMG.mudRicePaddy].map((src,i)=>(
                  <div key={i} style={{ borderRadius:18,overflow:"hidden",height:110 }}>
                    <img src={src} alt="Farm" style={{ width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(30%) brightness(0.7)" }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
