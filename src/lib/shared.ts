export type Page = "home" | "mandis" | "farmer" | "staff" | "admin";
export type Theme = "dark";
export type Lang = "en" | "hi" | "kn";

export const IMG = {
  heroFarmerOx:    "https://images.unsplash.com/photo-1767880408267-e9f64de1fe7a?w=1800&h=900&fit=crop&auto=format&q=85",
  plowingStormy:   "https://images.unsplash.com/photo-1620901433789-1d2f85a93653?w=800&h=600&fit=crop&auto=format&q=85",
  mudRicePaddy:    "https://images.unsplash.com/photo-1781015967612-be4fdb4494fd?w=800&h=700&fit=crop&auto=format&q=85",
  plowingClouds:   "https://images.unsplash.com/photo-1762884110133-926e4195d3b9?w=800&h=700&fit=crop&auto=format&q=85",
  cattleCarriage:  "https://images.unsplash.com/photo-1578212395236-2b80751beb7a?w=1200&h=600&fit=crop&crop=center&auto=format&q=85",
  womanHarvest:    "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=600&h=800&fit=crop&crop=top&auto=format&q=85",
  manRiceField:    "https://images.unsplash.com/photo-1528693404014-b13ebe6e723e?w=900&h=600&fit=crop&crop=center&auto=format&q=85",
  womanCows:       "https://images.unsplash.com/photo-1709548000627-5da2e6742a04?w=700&h=600&fit=crop&crop=center&auto=format&q=85",
  womanRedCows:    "https://images.unsplash.com/photo-1709547774944-90f19b0d83d8?w=700&h=600&fit=crop&crop=center&auto=format&q=85",
  personRiceField: "https://images.unsplash.com/photo-1542911882-c7100ccf771b?w=600&h=800&fit=crop&crop=center&auto=format&q=85",
};

export const IMG_META = [
  { key: "heroFarmerOx" as const,    title: "Farmer & Oxen",      sub: "Green Fields of Bharat",  pos: "center 55%" },
  { key: "plowingStormy" as const,   title: "Plowing the Earth",  sub: "Traditional Farming",     pos: "center 40%" },
  { key: "mudRicePaddy" as const,    title: "Rice Paddy",         sub: "Water & Soil",            pos: "center 50%" },
  { key: "plowingClouds" as const,   title: "Under Open Skies",   sub: "The Farmer's Labour",     pos: "center 45%" },
  { key: "cattleCarriage" as const,  title: "Cattle Carriage",    sub: "Rural India in Motion",   pos: "center 50%" },
  { key: "womanHarvest" as const,    title: "Harvest Time",       sub: "Woman of the Fields",     pos: "center 20%" },
  { key: "manRiceField" as const,    title: "Rice Fields",        sub: "Paddy Country",           pos: "center 40%" },
  { key: "womanCows" as const,       title: "Village Life",       sub: "Cattle & Community",      pos: "center 50%" },
  { key: "womanRedCows" as const,    title: "The Long Walk",      sub: "Dusk & Dust Roads",       pos: "center 50%" },
  { key: "personRiceField" as const, title: "Walking the Fields", sub: "Solitude & Seasons",      pos: "center 40%" },
];

export const CROPS_EN = ["Wheat","Paddy","Maize","Mustard","Chickpea","Soybean","Tomato","Onion","Potato","Cotton"];
export const CROPS_HI = ["गेहूँ","धान","मक्का","सरसों","चना","सोयाबीन","टमाटर","प्याज","आलू","कपास"];
export const CROPS_KN = ["ಗೋಧಿ","ಭತ್ತ","ಜೋಳ","ಸಾಸಿವೆ","ಕಡಲೆ","ಸೋಯಾಬೀನ್","ಟೊಮೆಟೊ","ಈರುಳ್ಳಿ","ಆಲೂಗಡ್ಡೆ","ಹತ್ತಿ"];

export function cropList(lang: Lang): string[] {
  return lang === "hi" ? CROPS_HI : lang === "kn" ? CROPS_KN : CROPS_EN;
}

export type TokenStatus = "waiting" | "called" | "weighing" | "done" | "held" | "skipped";

export interface RegisteredFarmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  aadhaar: string;
  mandiId: number;
  mandiName: string;
  crop: string;
  bags: number;
  date: string;
  token: string;
  status: TokenStatus;
  registeredAt: string;
  waitMinutes: number;
  position: number;
  lane: number;
  priority: boolean;
}

let _farmerSeq = 1;
export function newFarmerRecord(partial: Partial<RegisteredFarmer> & Pick<RegisteredFarmer,"name"|"phone"|"village"|"aadhaar"|"mandiId"|"mandiName"|"crop"|"bags"|"date">): RegisteredFarmer {
  const pos = Math.floor(Math.random() * 8) + 2;
  return {
    id: `F${String(_farmerSeq++).padStart(4,"0")}`,
    token: `KQ-${partial.mandiId}${String(Math.floor(Math.random()*900)+100)}`,
    status: "waiting",
    registeredAt: new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
    waitMinutes: pos * 14,
    position: pos,
    lane: Math.ceil(Math.random() * 3),
    priority: false,
    ...partial,
  };
}

export function genDemoQueue(mandiId: number): RegisteredFarmer[] {
  const names    = ["Ramesh Kumar","Sukhdev Singh","Ganga Devi","Moolchand Yadav","Phoolwati Devi","Jaswant Patel","Lakshmi Bai","Ramu Naik","Shivanna","Parvati Devi"];
  const villages = ["Sultanpur","Bhagwanpur","Nandpur","Harsana","Tigri","Rampur","Channapatna","Ramanagara","Doddaballapur","Nelamangala"];
  const times    = ["6:00 AM","6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM"];
  const statuses: TokenStatus[] = ["weighing","called","waiting","waiting","waiting","waiting","waiting","waiting","held","waiting"];
  return names.map((name, i) => ({
    id: `D${String(i+1).padStart(4,"0")}`,
    name, village: villages[i], crop: CROPS_EN[i % CROPS_EN.length],
    bags: 20 + i * 5, phone: `987654${3200+i}`,
    aadhaar: "", date: new Date().toLocaleDateString("en-IN"),
    mandiId, mandiName: "", token: `KQ-${mandiId}${String(i+1).padStart(3,"0")}`,
    status: statuses[i], registeredAt: times[i],
    waitMinutes: i === 0 ? 0 : i * 16, position: i + 1,
    lane: (i % 3) + 1, priority: i === 0,
  }));
}
