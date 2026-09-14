export type Lang = "en" | "hi" | "kn";

export const T: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", hi: "होम", kn: "ಮನೆ" },
  "nav.mandis": { en: "Mandis", hi: "मंडियाँ", kn: "ಮಂಡಿಗಳು" },
  "nav.farmer": { en: "Farmer", hi: "किसान", kn: "ರೈತ" },
  "nav.staff": { en: "Control Staff", hi: "नियंत्रण कर्मचारी", kn: "ನಿಯಂತ್ರಣ ಸಿಬ್ಬಂದಿ" },
  "nav.admin": { en: "Admin", hi: "प्रशासक", kn: "ನಿರ್ವಾಹಕ" },
  "nav.free": { en: "100% Free", hi: "बिल्कुल मुफ्त", kn: "ಸಂಪೂರ್ಣ ಉಚಿತ" },

  // Hero
  "hero.tag": { en: "Smart India Hackathon 2026", hi: "स्मार्ट इंडिया हैकाथॉन 2026", kn: "ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ 2026" },
  "hero.h1a": { en: "Mandi Queue,", hi: "मंडी कतार से", kn: "ಮಂಡಿ ಸರದಿಯಿಂದ" },
  "hero.h1b": { en: "Reimagined.", hi: "मुक्ति मिलेगी।", kn: "ಮುಕ್ತಿ ಸಿಗಲಿದೆ." },
  "hero.sub": { en: "No more 8–12 hour waits. Book a digital token, arrive at your slot, weigh your crop, get paid. Zero cost — for every Indian farmer.", hi: "8–12 घंटे की लाइन खत्म। डिजिटल Token बुक करें, अपनी बारी पर आएं, फसल तुलाई करें, भुगतान पाएं। हर किसान के लिए बिल्कुल मुफ्त।", kn: "8–12 ಗಂಟೆ ಕಾಯುವಿಕೆ ಮುಗಿದಿದೆ. ಡಿಜಿಟಲ್ ಟೋಕನ್ ಬುಕ್ ಮಾಡಿ, ನಿಮ್ಮ ಸ್ಲಾಟ್‌ನಲ್ಲಿ ಬನ್ನಿ, ಬೆಳೆ ತೂಕ ಮಾಡಿ, ಪಾವತಿ ಪಡೆಯಿರಿ. ಸಂಪೂರ್ಣ ಉಚಿತ." },
  "hero.cta1": { en: "Book Token — Free", hi: "Token बुक करें — मुफ्त", kn: "ಟೋಕನ್ ಬುಕ್ ಮಾಡಿ — ಉಚಿತ" },
  "hero.cta2": { en: "View Live Queue →", hi: "Live कतार देखें →", kn: "ಲೈವ್ ಸರದಿ ನೋಡಿ →" },
  "hero.stat1": { en: "Farmers Served", hi: "किसान जुड़े", kn: "ರೈತರು ಸೇವೆ ಪಡೆದರು" },
  "hero.stat2": { en: "Mandis Live", hi: "मंडियाँ सक्रिय", kn: "ಮಂಡಿಗಳು ಸಕ್ರಿಯ" },
  "hero.stat3": { en: "Hrs Saved / Visit", hi: "घंटे बचाए/दौरे", kn: "ಗಂಟೆ ಉಳಿತಾಯ/ಭೇಟಿ" },

  // Roles
  "role.farmer": { en: "Farmer Portal", hi: "किसान पोर्टल", kn: "ರೈತ ಪೋರ್ಟಲ್" },
  "role.staff": { en: "Control Staff Portal", hi: "नियंत्रण कर्मचारी पोर्टल", kn: "ನಿಯಂತ್ರಣ ಸಿಬ್ಬಂದಿ ಪೋರ್ಟಲ್" },
  "role.admin": { en: "Admin Portal", hi: "प्रशासक पोर्टल", kn: "ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್" },
  "role.farmer.desc": { en: "Register, book mandi slot, track token", hi: "पंजीकरण, मंडी स्लॉट बुक, Token ट्रैक करें", kn: "ನೋಂದಣಿ, ಮಂಡಿ ಸ್ಲಾಟ್ ಬುಕ್, ಟೋಕನ್ ಟ್ರ್ಯಾಕ್" },
  "role.staff.desc": { en: "Manage queue, call tokens, update weighing", hi: "कतार प्रबंधन, Token कॉल करें, तुलाई अपडेट करें", kn: "ಸರದಿ ನಿರ್ವಹಣೆ, ಟೋಕನ್ ಕರೆ, ತೂಕ ಅಪ್ಡೇಟ್" },
  "role.admin.desc": { en: "Full analytics, user management, mandi control", hi: "पूर्ण विश्लेषण, उपयोगकर्ता प्रबंधन, मंडी नियंत्रण", kn: "ಸಂಪೂರ್ಣ ವಿಶ್ಲೇಷಣೆ, ಬಳಕೆದಾರ ನಿರ್ವಹಣೆ, ಮಂಡಿ ನಿಯಂತ್ರಣ" },

  // Farmer portal
  "farmer.register": { en: "Register", hi: "पंजीकरण करें", kn: "ನೋಂದಣಿ" },
  "farmer.book": { en: "Book Token", hi: "Token बुक करें", kn: "ಟೋಕನ್ ಬುಕ್ ಮಾಡಿ" },
  "farmer.track": { en: "Track Token", hi: "Token ट्रैक करें", kn: "ಟೋಕನ್ ಟ್ರ್ಯಾಕ್" },
  "farmer.name": { en: "Full Name", hi: "पूरा नाम", kn: "ಪೂರ್ಣ ಹೆಸರು" },
  "farmer.phone": { en: "Mobile Number", hi: "मोबाइल नंबर", kn: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" },
  "farmer.village": { en: "Village / District", hi: "गाँव / जिला", kn: "ಗ್ರಾಮ / ಜಿಲ್ಲೆ" },
  "farmer.aadhaar": { en: "Aadhaar Number", hi: "आधार नंबर", kn: "ಆಧಾರ್ ಸಂಖ್ಯೆ" },
  "farmer.crop": { en: "Crop Type", hi: "फसल का प्रकार", kn: "ಬೆಳೆ ವಿಧ" },
  "farmer.bags": { en: "Number of Bags", hi: "बोरों की संख्या", kn: "ಚೀಲಗಳ ಸಂಖ್ಯೆ" },
  "farmer.mandi": { en: "Select Mandi", hi: "मंडी चुनें", kn: "ಮಂಡಿ ಆಯ್ಕೆ ಮಾಡಿ" },
  "farmer.date": { en: "Preferred Date", hi: "पसंदीदा तारीख", kn: "ಆದ್ಯತೆಯ ದಿನಾಂಕ" },
  "farmer.submit": { en: "Register & Continue", hi: "पंजीकरण करें और जारी रखें", kn: "ನೋಂದಣಿ ಮಾಡಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ" },
  "farmer.token.success": { en: "Token Generated!", hi: "Token मिल गया!", kn: "ಟೋಕನ್ ಸಿಕ್ಕಿತು!" },
  "farmer.wait": { en: "Estimated Wait", hi: "अनुमानित प्रतीक्षा", kn: "ಅಂದಾಜು ನಿರೀಕ್ಷೆ" },
  "farmer.position": { en: "Queue Position", hi: "कतार में स्थान", kn: "ಸರದಿಯಲ್ಲಿ ಸ್ಥಾನ" },

  // Staff portal
  "staff.queue": { en: "Queue Management", hi: "कतार प्रबंधन", kn: "ಸರದಿ ನಿರ್ವಹಣೆ" },
  "staff.call": { en: "Call Next", hi: "अगला बुलाएं", kn: "ಮುಂದಿನದನ್ನು ಕರೆಯಿರಿ" },
  "staff.complete": { en: "Mark Complete", hi: "पूर्ण करें", kn: "ಸಂಪೂರ್ಣಗೊಳಿಸಿ" },
  "staff.weighing": { en: "At Weighbridge", hi: "तुलाई पर", kn: "ತೂಕ ಸೇತುವೆಯಲ್ಲಿ" },
  "staff.waiting": { en: "Waiting", hi: "प्रतीक्षारत", kn: "ಕಾಯುತ್ತಿದೆ" },
  "staff.done": { en: "Done", hi: "पूर्ण", kn: "ಮುಗಿದಿದೆ" },

  // Admin
  "admin.dashboard": { en: "Admin Dashboard", hi: "प्रशासक डैशबोर्ड", kn: "ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
  "admin.farmers": { en: "Total Farmers", hi: "कुल किसान", kn: "ಒಟ್ಟು ರೈತರು" },
  "admin.tokens": { en: "Tokens Today", hi: "आज के Token", kn: "ಇಂದಿನ ಟೋಕನ್" },
  "admin.mandis": { en: "Active Mandis", hi: "सक्रिय मंडियाँ", kn: "ಸಕ್ರಿಯ ಮಂಡಿಗಳು" },
  "admin.wait": { en: "Avg Wait (min)", hi: "औसत प्रतीक्षा (मिनट)", kn: "ಸರಾಸರಿ ನಿರೀಕ್ಷೆ (ನಿಮಿಷ)" },

  // Map
  "map.title": { en: "Mandi Network", hi: "मंडी नेटवर्क", kn: "ಮಂಡಿ ನೆಟ್‌ವರ್ಕ್" },
  "map.sub": { en: "20 mandis across India — click any to view live queue", hi: "भारत में 20 मंडियाँ — लाइव कतार देखने के लिए क्लिक करें", kn: "ಭಾರತದಾದ್ಯಂತ 20 ಮಂಡಿಗಳು — ಲೈವ್ ಸರದಿ ನೋಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ" },
  "map.tokens": { en: "Active Tokens", hi: "सक्रिय Token", kn: "ಸಕ್ರಿಯ ಟೋಕನ್" },
  "map.farmers": { en: "Farmers Today", hi: "आज किसान", kn: "ಇಂದು ರೈತರು" },
  "map.avgwait": { en: "Avg Wait", hi: "औसत प्रतीक्षा", kn: "ಸರಾಸರಿ ನಿರೀಕ್ಷೆ" },
  "map.open": { en: "Open in Maps →", hi: "मैप में खोलें →", kn: "ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ →" },

  // Common
  "common.login": { en: "Login", hi: "लॉगिन", kn: "ಲಾಗಿನ್" },
  "common.logout": { en: "Logout", hi: "लॉगआउट", kn: "ಲಾಗ್‌ಔಟ್" },
  "common.minutes": { en: "min", hi: "मिनट", kn: "ನಿಮಿಷ" },
  "common.free": { en: "100% Free, Always", hi: "हमेशा 100% मुफ्त", kn: "ಯಾವಾಗಲೂ 100% ಉಚಿತ" },
  "common.back": { en: "Back", hi: "वापस", kn: "ಹಿಂದೆ" },
};

export function t(key: string, lang: Lang): string {
  return T[key]?.[lang] ?? T[key]?.["en"] ?? key;
}
