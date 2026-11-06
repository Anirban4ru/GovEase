/**
 * Unified Life Services Platform - Bureaucratic Jargon Glossary
 *
 * Translates official administrative and government jargon into plain,
 * 6th-grade language in both English and Hindi.
 *
 * Plain Language Accessibility Specifications:
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
  digilocker_uri: {
    term: "DigiLocker URI",
    acronym: "Uniform Resource Identifier",
    title: {
      en: "DigiLocker URI (Digital Document Link)",
      hi: "डिजीलॉकर यूआरआई (डिजिटल दस्तावेज़ संदर्भ)",
    },
    plainExplanation: {
      en: "A unique digital code that directly links to your official document in government issuer databases. It acts as electronic proof without holding a paper copy.",
      hi: "सरकारी विभागों के डेटाबेस में आपके आधिकारिक दस्तावेज़ का एक विशिष्ट डिजिटल पता। यह कागजी कॉपी रखे बिना इलेक्ट्रॉनिक प्रमाण का काम करता है।",
    },
    whyItMatters: {
      en: "Under Rule 9A of the IT Rules 2016, presenting a DigiLocker issued document has the exact same legal validity as carrying the original physical certificate.",
      hi: "आईटी नियम 2016 के नियम 9A के तहत, डिजीलॉकर द्वारा जारी दस्तावेज़ को मूल प्रमाण पत्र के बराबर कानूनी मान्यता प्राप्त है।",
    },
  },
  pmjdy_od: {
    term: "Overdraft (OD)",
    acronym: "Overdraft Facility",
    title: {
      en: "PMJDY Overdraft Facility (Up to ₹10,000)",
      hi: "जन-धन ओवरड्राफ्ट सुविधा (₹10,000 तक)",
    },
    plainExplanation: {
      en: "A credit feature allowing Jan Dhan account holders to withdraw money even when their account balance is zero, designed to cover urgent emergency expenses.",
      hi: "खाते में शून्य बैलेंस होने पर भी बैंक से आपातकालीन जरूरतों के लिए ₹10,000 तक निकालने की सुविधा।",
    },
    whyItMatters: {
      en: "Eligible after 6 months of active account operations with regular transactions, protecting families from high-interest informal moneylenders.",
      hi: "खाता 6 महीने तक नियमित चलाने पर उपलब्ध, जो नागरिकों को ऊंचे ब्याज वाले साहूकारों के कर्ज से बचाता है।",
    },
  },
  eshram_uan: {
    term: "UAN",
    acronym: "Universal Account Number (e-Shram)",
    title: {
      en: "e-Shram 12-Digit Universal Account Number",
      hi: "ई-श्रम 12-अंकीय यूनिवर्सल खाता संख्या (UAN)",
    },
    plainExplanation: {
      en: "A permanent 12-digit number issued to unorganised workers that stays with them throughout their life, across any job or state.",
      hi: "असंगठित क्षेत्र के कामगारों को जारी किया गया 12 अंकों का स्थायी नंबर, जो किसी भी राज्य या व्यवसाय में बदलने पर भी वही रहता है।",
    },
    whyItMatters: {
      en: "Acts as single window identity for social security benefits, accidental death insurance under PMSBY, and pandemic relief distributions.",
      hi: "भविष्य की सभी सामाजिक सुरक्षा योजनाओं, दुर्घटना बीमा और संकटकालीन आर्थिक सहायता प्राप्त करने का एकल पहचान पत्र है।",
    },
  },
  pmsby_autodebit: {
    term: "Auto-Debit",
    acronym: "Automatic Bank Deduction",
    title: {
      en: "PMSBY Auto-Debit (₹20/year)",
      hi: "ऑटो-डेबिट (वार्षिक ₹20 की स्वतः कटौती)",
    },
    plainExplanation: {
      en: "A standing instruction where your bank automatically deducts the ₹20 annual insurance premium from your savings account every May.",
      hi: "बैंक को दी गई स्थायी सहमति जिससे वह हर साल मई के महीने में आपके खाते से ₹20 का बीमा प्रीमियम अपने आप काट लेता है।",
    },
    whyItMatters: {
      en: "You must keep at least ₹20 in your account before May 31st each year so your ₹2 lakh accidental death and disability cover stays active.",
      hi: "मई महीने में खाते में कम से कम ₹20 रखना जरूरी है ताकि आपका ₹2 लाख का दुर्घटना बीमा बंद न हो।",
    },
  },
  udid_card: {
    term: "UDID",
    acronym: "Unique Disability Identity",
    title: {
      en: "UDID Card (National Disability Smart Card)",
      hi: "यूडीआईडी कार्ड (विशिष्ट दिव्यांगता पहचान पत्र)",
    },
    plainExplanation: {
      en: "A national smart card and certificate for persons with disabilities that contains a QR code and is recognized across all Indian states and Union Territories.",
      hi: "दिव्यांगजनों के लिए एक राष्ट्रीय स्मार्ट कार्ड और डिजिटल प्रमाणपत्र जो पूरे देश के सभी राज्यों में मान्य है।",
    },
    whyItMatters: {
      en: "Eliminates the need to carry separate state medical certificates or undergo fresh medical boards when seeking welfare, rail concessions, or job reservations.",
      hi: "रेलवे छूट, सरकारी आरक्षण और पेंशन के लिए बार-बार अलग-अलग मेडिकल बोर्ड के चक्कर काटने और कागजी दस्तावेज ले जाने की जरूरत खत्म हो जाती है।",
    },
  },
  form_29_30: {
    term: "Form 29 & 30",
    acronym: "Motor Vehicle Transfer Forms",
    title: {
      en: "Form 29 (Notice) & Form 30 (Application for RC Transfer)",
      hi: "फॉर्म 29 (बिक्री सूचना) एवं फॉर्म 30 (आरसी हस्तांतरण आवेदन)",
    },
    plainExplanation: {
      en: "The two statutory forms submitted to the RTO to record vehicle resale. Form 29 is the seller's notice of sale; Form 30 is the joint application to transfer the RC.",
      hi: "वाहन बेचने पर आरटीओ में जमा होने वाले दो अनिवार्य कानूनी फॉर्म। फॉर्म 29 विक्रेता की सूचना है और फॉर्म 30 खरीदार के नाम आरसी करने का संयुक्त आवेदन है।",
    },
    whyItMatters: {
      en: "Must be submitted within 30 days of sale. Failing to submit leaves the seller legally responsible for any traffic accidents or criminal misuse caused by the new buyer.",
      hi: "बिक्री के 30 दिनों में जमा करना आवश्यक है, अन्यथा नए खरीदार द्वारा किए गए किसी भी चालान या दुर्घटना की कानूनी जिम्मेदारी पुराने मालिक पर ही रहती है।",
    },
  },
};

export function getJargon(key: string): JargonDefinition | undefined {
  return JARGON_GLOSSARY[key.toLowerCase()];
}

export function getAllJargon(): JargonDefinition[] {
  return Object.values(JARGON_GLOSSARY);
}
