/**
 * Unified Life Services Platform - Bureaucratic Jargon Glossary
 *
 * Translates official administrative and government jargon into plain,
 * 6th-grade language in both English and Hindi.
 *
 * Adheres to PROMPT_FINAL.md §7.3 & §8:
 * "Assisted: step-by-step guidance and contextual explanations in text... plain language"
 */

export interface JargonDefinition {
  term: string;
  acronym?: string;
  title: {
    en: string;
    hi: string;
  };
  plainExplanation: {
    en: string;
    hi: string;
  };
  whyItMatters: {
    en: string;
    hi: string;
  };
}

export const JARGON_GLOSSARY: Record<string, JargonDefinition> = {
  ekyc: {
    term: "eKYC",
    acronym: "Electronic Know Your Customer",
    title: {
      en: "eKYC (Online Identity Verification)",
      hi: "ई-केवाईसी (ऑनलाइन पहचान सत्यापन)",
    },
    plainExplanation: {
      en: "A digital way to prove who you are without visiting an office. An OTP (one-time code) is sent to the mobile number registered with your Aadhaar.",
      hi: "बिना किसी सरकारी दफ्तर गए अपनी पहचान साबित करने का डिजिटल तरीका। आपके आधार से जुड़े मोबाइल नंबर पर एक ओटीपी (सुरक्षा कोड) भेजा जाता है।",
    },
    whyItMatters: {
      en: "Your Aadhaar must be linked to your current, active mobile number to receive the verification OTP.",
      hi: "ओटीपी प्राप्त करने के लिए आपके आधार में आपका चालू मोबाइल नंबर दर्ज होना अनिवार्य है।",
    },
  },
  otr: {
    term: "OTR",
    acronym: "One-Time Registration",
    title: {
      en: "OTR (One-Time Student Registration)",
      hi: "ओटीआर (एकमुश्त विद्यार्थी पंजीकरण)",
    },
    plainExplanation: {
      en: "A permanent student registration number on the National Scholarship Portal. Once created, you use the same number to apply for any government scholarship throughout your school or college years.",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल पर एक स्थायी विद्यार्थी पंजीकरण संख्या। इसे एक बार बनाने के बाद आप स्कूल या कॉलेज के दौरान किसी भी सरकारी छात्रवृत्ति के लिए इसी नंबर का उपयोग कर सकते हैं।",
    },
    whyItMatters: {
      en: "You do not need to upload your family certificates or school documents again for future scholarship applications.",
      hi: "भविष्य में नई छात्रवृत्ति के लिए आपको बार-बार पारिवारिक प्रमाण पत्र या अंकतालिका अपलोड करने की आवश्यकता नहीं होगी।",
    },
  },
  dbt: {
    term: "DBT",
    acronym: "Direct Benefit Transfer",
    title: {
      en: "DBT (Direct Bank Transfer)",
      hi: "डीबीटी (प्रत्यक्ष लाभ अंतरण)",
    },
    plainExplanation: {
      en: "Government financial assistance (money) sent directly into your bank account, cutting out middlemen or cash distribution.",
      hi: "सरकारी वित्तीय सहायता (पैसा) बिना किसी बिचौलिए के सीधे आपके बैंक खाते में जमा होना।",
    },
    whyItMatters: {
      en: "Your bank account must be 'Aadhaar-seeded' (linked with NPCI mapping) to receive government funds directly.",
      hi: "सरकारी राशि प्राप्त करने के लिए आपके बैंक खाते का आधार (NPCI मैपिंग) से जुड़ा होना आवश्यक है।",
    },
  },
  abha_address: {
    term: "ABHA Address",
    acronym: "Ayushman Bharat Health Account Handle",
    title: {
      en: "ABHA Address (Health Handle)",
      hi: "आभा पता (स्वास्थ्य हैंडल)",
    },
    plainExplanation: {
      en: "A simple username (like a UPI ID, e.g., name@abdm) that lets you receive lab test results and doctor prescriptions digitally from any hospital in India.",
      hi: "एक आसान उपयोगकर्ता नाम (जैसे यूपीआई आईडी, उदाहरण: name@abdm), जिसके माध्यम से आप भारत के किसी भी अस्पताल से अपनी लैब रिपोर्ट और पर्ची डिजिटल रूप से प्राप्त कर सकते हैं।",
    },
    whyItMatters: {
      en: "You can share medical history with new doctors with your explicit consent, eliminating paper file bundles.",
      hi: "आप अपनी सहमति से नए डॉक्टर के साथ पुरानी बीमारियों और रिपोर्टों का रिकॉर्ड साझा कर सकते हैं, जिससे कागजी फाइलें संभालने का झंझट समाप्त हो जाता है।",
    },
  },
  sarathi_selection: {
    term: "State Selection",
    title: {
      en: "State Selection on Sarathi Parivahan",
      hi: "सारथी परिवहन पर राज्य चयन",
    },
    plainExplanation: {
      en: "Road transport rules and fees in India are managed by individual state governments. Before seeing driving licence options, the central portal requires you to select your state.",
      hi: "भारत में सड़क परिवहन नियम और शुल्क राज्य सरकारों द्वारा तय किए जाते हैं। ड्राइविंग लाइसेंस सेवाएं देखने से पहले पोर्टल पर अपने राज्य का चयन करना आवश्यक होता है।",
    },
    whyItMatters: {
      en: "Selecting the wrong state will show incorrect RTO offices and fee structures. Choose the state where your permanent or current address is located.",
      hi: "गलत राज्य चुनने पर गलत आरटीओ कार्यालय और शुल्क दिखाई देंगे। वही राज्य चुनें जहां आपका वर्तमान या स्थायी पता है।",
    },
  },
  pvc_card: {
    term: "PVC Card",
    acronym: "Polyvinyl Chloride Card",
    title: {
      en: "Aadhaar PVC Card",
      hi: "आधार पीवीसी कार्ड",
    },
    plainExplanation: {
      en: "A durable plastic card similar to an ATM or debit card, printed officially by UIDAI with tamper-proof security features.",
      hi: "एटीएम या डेबिट कार्ड जैसा एक टिकाऊ प्लास्टिक कार्ड, जिसे यूआईडीएआई (UIDAI) द्वारा सुरक्षा होलोग्राम और क्यूआर कोड के साथ आधिकारिक रूप से छापा जाता है।",
    },
    whyItMatters: {
      en: "It resists water and tearing, and costs exactly ₹50 including speed post delivery across India. Avoid unofficial market printouts which lack security features.",
      hi: "यह पानी और फटने से सुरक्षित रहता है और डाक खर्च सहित मात्र ₹50 में घर पहुंचता है। बाजार की अनधिकृत दुकानों से प्लास्टिक लैमिनेशन कराने से बचें।",
    },
  },
};

export function getJargon(key: string): JargonDefinition | undefined {
  return JARGON_GLOSSARY[key.toLowerCase()];
}

export function getAllJargon(): JargonDefinition[] {
  return Object.values(JARGON_GLOSSARY);
}
