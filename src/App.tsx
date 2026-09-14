import { useState, useEffect } from "react";
import { type Page, type Lang, type RegisteredFarmer } from "./lib/shared";
import Navbar       from "./components/Navbar";
import LandingPage  from "./components/LandingPage";
import MandiMapPage from "./components/MandiMapPage";
import FarmerPortal from "./components/FarmerPortal";
import StaffPortal  from "./components/StaffPortal";
import AdminPortal  from "./components/AdminPortal";

export default function App() {
  const [page,    setPage]    = useState<Page>("home");
  const [lang,    setLang]    = useState<Lang>("en");
  const [farmers, setFarmers] = useState<RegisteredFarmer[]>([]);

  const addFarmer = (f: RegisteredFarmer) => setFarmers(prev => [f, ...prev]);

  const updateFarmerStatus = (token: string, status: RegisteredFarmer["status"]) =>
    setFarmers(prev => prev.map(f => f.token === token ? { ...f, status } : f));

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} />
      {page === "home"   && <LandingPage  lang={lang} setPage={setPage} />}
      {page === "mandis" && <MandiMapPage lang={lang} />}
      {page === "farmer" && <FarmerPortal lang={lang} onTokenBooked={addFarmer} />}
      {page === "staff"  && <StaffPortal  lang={lang} registeredFarmers={farmers} onStatusChange={updateFarmerStatus} />}
      {page === "admin"  && <AdminPortal  lang={lang} registeredFarmers={farmers} />}
    </div>
  );
}
