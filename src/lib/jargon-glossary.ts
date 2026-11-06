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
  epic_number: {
    term: "EPIC Number",
    acronym: "Electors Photo Identity Card Number",
    title: {
      en: "EPIC Number (Voter ID Number)",
      hi: "ईपीआईसी नंबर (मतदाता पहचान संख्या)",
    },
    plainExplanation: {
      en: "A unique 10-character alphanumeric code printed on your voter card (e.g. ABC1234567). It permanently links your identity to the electoral roll of your constituency.",
      hi: "आपके वोटर कार्ड पर छपा 10 अक्षरों और अंकों का विशेष कोड (जैसे ABC1234567)। यह चुनाव आयोग की मतदाता सूची में आपके नाम और मतदान केंद्र को प्रमाणित करता है।",
    },
    whyItMatters: {
      en: "You need this number to download your digital e-EPIC card, check your polling station, or transfer your voter registration when shifting homes.",
      hi: "डिजिटल वोटर कार्ड डाउनलोड करने, अपना मतदान केंद्र जानने या पता बदलने पर मतदाता सूची अपडेट करने के लिए यह नंबर जरूरी है।",
    },
  },
  nfsa_rc: {
    term: "NFSA Ration Card",
    acronym: "National Food Security Act",
    title: {
      en: "NFSA Ration Card & Fair Price Shop",
      hi: "राष्ट्रीय खाद्य सुरक्षा राशन कार्ड एवं उचित दर दुकान",
    },
    plainExplanation: {
      en: "A government card classifying family food assistance into Priority (PHH) or Antyodaya (AAY). Under One Nation One Ration Card, grains can be collected from any licensed ration shop in India.",
      hi: "सरकारी योजना के तहत रियायती या निःशुल्क अनाज पाने का परिवारिक कार्ड। 'एक राष्ट्र एक राशन कार्ड' के तहत आप देश के किसी भी शहर की सरकारी राशन दुकान से अनाज ले सकते हैं।",
    },
    whyItMatters: {
      en: "Migrant workers and families do not need to make a new ration card when moving to other states for employment.",
      hi: "रोजगार के लिए दूसरे राज्य जाने पर मजदूरों और परिवारों को नया राशन कार्ड बनवाने की जरूरत नहीं होती।",
    },
  },
  uan_number: {
    term: "UAN",
    acronym: "Universal Account Number",
    title: {
      en: "UAN (Universal PF Account Number)",
      hi: "यूएएन (सार्वभौमिक भविष्य निधि खाता संख्या)",
    },
    plainExplanation: {
      en: "A permanent 12-digit number given by EPFO to every formal sector employee. It links all your different Provident Fund accounts across all the companies you work for throughout your career.",
      hi: "ईपीएफओ (EPFO) द्वारा नौकरीपेशा लोगों को दिया गया 12 अंकों का स्थायी नंबर। यह आपके पूरे करियर में अलग-अलग कंपनियों के पीएफ खातों को एक साथ जोड़ता है।",
    },
    whyItMatters: {
      en: "When switching jobs, you simply give your UAN to your new employer. Your accumulated PF savings and interest follow you automatically.",
      hi: "नौकरी बदलने पर नया पीएफ खाता खोलने के बजाय सिर्फ यूएएन नंबर देना होता है। आपकी पुरानी बचत और ब्याज स्वतः नए खाते में जुड़ जाते हैं।",
    },
  },
  pmay_fto: {
    term: "FTO",
    acronym: "Fund Transfer Order",
    title: {
      en: "FTO (Government Fund Transfer Order)",
      hi: "एफ़टीओ (फंड ट्रांसफर ऑर्डर / किस्त आदेश)",
    },
    plainExplanation: {
      en: "A digitally signed payment order issued by the government directing the treasury bank to credit a subsidy installment directly into the beneficiary's bank account.",
      hi: "सरकार द्वारा जारी किया गया डिजिटल भुगतान आदेश जिसके बाद आवास या कल्याणकारी योजना की किस्त सीधे आपके बैंक खाते में जमा होती है।",
    },
    whyItMatters: {
      en: "Tracking the FTO status tells you the exact date the money left the government treasury and the UTR transaction number to show your bank manager.",
      hi: "एफ़टीओ स्टेटस देखने से पता चलता है कि सरकारी खजाने से पैसा किस तारीख को निकला और उसका बैंक ट्रांजैक्शन नंबर (UTR) क्या है।",
    },
  },
  crs_registration: {
    term: "CRS",
    acronym: "Civil Registration System",
    title: {
      en: "CRS (Civil Registration System - Births & Deaths)",
      hi: "सिविल रजिस्ट्रेशन सिस्टम (जन्म एवं मृत्यु पंजीकरण)",
    },
    plainExplanation: {
      en: "The unified national digital registry operated by the Registrar General of India to officially record births and deaths and issue digitally verifiable certificates.",
      hi: "भारत के महारजिस्ट्रार द्वारा संचालित आधिकारिक राष्ट्रीय डिजिटल पोर्टल, जिसके माध्यम से जन्म और मृत्यु का कानूनी रिकॉर्ड दर्ज कर प्रमाणपत्र जारी किया जाता है।",
    },
    whyItMatters: {
      en: "Reporting a birth within 21 days is completely free by law and ensures seamless school admissions, Aadhaar generation, and passport issuance later in life.",
      hi: "कानूनन 21 दिन के भीतर जन्म दर्ज कराना पूरी तरह निःशुल्क है और भविष्य में स्कूल दाखिले, आधार और पासपोर्ट के लिए कानूनी आधार बनता है।",
    },
  },
  epan: {
    term: "e-PAN",
    acronym: "Electronic Permanent Account Number",
    title: {
      en: "e-PAN (Digital PAN Card PDF)",
      hi: "ई-पैन (डिजिटल पैन कार्ड पीडीएफ)",
    },
    plainExplanation: {
      en: "A digitally signed PDF version of your PAN card issued by the Income Tax Department containing a tamper-proof QR code. It is 100% equivalent to a physical plastic PAN card.",
      hi: "आयकर विभाग द्वारा जारी डिजिटल रूप से हस्ताक्षरित पीडीएफ पैन कार्ड, जिसमें सुरक्षा क्यूआर कोड होता है। यह प्लास्टिक पैन कार्ड के बिल्कुल बराबर मान्य है।",
    },
    whyItMatters: {
      en: "You can download it instantly to your phone for bank account opening, mutual funds, or tax returns without waiting for physical mail delivery.",
      hi: "बैंक खाता खोलने या वित्तीय कार्यों के लिए आप इसे तुरंत फोन में डाउनलोड कर उपयोग कर सकते हैं, डाक से कार्ड आने का इंतजार नहीं करना पड़ता।",
    },
  },
};

export function getJargon(key: string): JargonDefinition | undefined {
  return JARGON_GLOSSARY[key.toLowerCase()];
}

export function getAllJargon(): JargonDefinition[] {
  return Object.values(JARGON_GLOSSARY);
}
