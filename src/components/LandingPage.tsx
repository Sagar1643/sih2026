import { type Lang, type Page } from "../lib/shared";
import ImageTabGrid from "./ImageTabGrid";
import LandingHero from "./LandingHero";
import LandingRoles from "./LandingRoles";
import LandingFlow from "./LandingFlow";
import LandingFeatures from "./LandingFeatures";
import LandingFooter from "./LandingFooter";

interface Props { lang: Lang; setPage: (p: Page) => void; }

export default function LandingPage({ lang, setPage }: Props) {
  return (
    <div style={{ background: "var(--bg)" }}>
      <LandingHero lang={lang} setPage={setPage} />
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--border), transparent)", maxWidth: 1280, margin: "0 auto" }} />
      <LandingRoles lang={lang} setPage={setPage} />
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--border), transparent)", maxWidth: 1280, margin: "0 auto" }} />
      <LandingFlow lang={lang} />
      <LandingFeatures lang={lang} />
      <ImageTabGrid
        title={lang === "hi" ? "भारत की खेती — एक नज़र" : lang === "kn" ? "ಭಾರತದ ಕೃಷಿ — ಒಂದು ನೋಟ" : "Fields of Bharat"}
        subtitle={lang === "hi" ? "किसानों की कड़ी मेहनत और देशी ज़िंदगी" : lang === "kn" ? "ರೈತರ ಶ್ರಮ ಮತ್ತು ಗ್ರಾಮೀಣ ಜೀವನ" : "The sweat, soil, and spirit of Indian farming"}
      />
      <LandingFooter lang={lang} setPage={setPage} />
    </div>
  );
}
