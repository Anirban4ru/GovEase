/**
 * Unified Life Services Platform - Synonym & Intent Map
 *
 * Maps everyday citizen phrasing, natural language intents, acronyms,
 * Hindi keywords (Devanagari), and Hinglish transliterations to catalogue service IDs.
 *
 * Adheres to PROMPT_FINAL.md §6.4:
 * "Build a synonym and intent map for ordinary-language queries,
 * spelling variants, transliterations, and common acronyms."
 */

export interface ServiceIntentSynonyms {
  serviceId: string;
  acronyms: string[];
  englishSynonyms: string[];
  hindiSynonyms: string[];
  hinglishTransliterations: string[];
  typos: string[];
}

export const SYNONYM_MAP: ServiceIntentSynonyms[] = [
  {
    serviceId: "driving-licence-renewal",
    acronyms: ["DL", "LL", "RTO", "MoRTH", "MV Act"],
    englishSynonyms: [
      "driving licence",
      "driving license",
      "driver license",
      "licence renewal",
      "expired licence",
      "transport licence",
      "renew dl",
      "commercial licence",
      "parivahan",
      "sarathi",
      "vehicle driving test",
      "motor vehicle licence",
    ],
    hindiSynonyms: [
      "ड्राइविंग लाइसेंस",
      "लाइसेंस नवीनीकरण",
      "सारथी",
      "परिवहन",
      "गाड़ी चलाने का लाइसेंस",
      "चालक लाइसेंस",
    ],
    hinglishTransliterations: [
      "gaadi licence",
      "gadi license",
      "licence renew kaise kare",
      "driving licence khatam ho gaya",
      "purana licence renew",
      "sarathi parivahan",
      "chalak praman patra",
    ],
    typos: ["liscense", "licens", "drving", "drivng", "parivahn", "sarthi"],
  },
  {
    serviceId: "create-abha-id",
    acronyms: ["ABHA", "ABDM", "NHA", "NDHM", "PHR"],
    englishSynonyms: [
      "health account",
      "digital health id",
      "ayushman bharat health account",
      "health card",
      "medical records card",
      "ayushman id",
      "patient id",
      "medical history account",
      "14 digit health id",
      "national health authority",
    ],
    hindiSynonyms: [
      "आयुष्मान भारत स्वास्थ्य खाता",
      "आभा कार्ड",
      "स्वास्थ्य कार्ड",
      "डिजिटल हेल्थ आईडी",
      "मेडिकल रिकॉर्ड",
      "आयुष्मान कार्ड",
    ],
    hinglishTransliterations: [
      "swasthya card",
      "swasthya khata",
      "abha card kaise banaye",
      "digital health card",
      "ayushman health id",
      "hospital card",
      "medical report save karne wala card",
    ],
    typos: ["abaha", "ayusman", "aayushman", "helth card", "swasthya"],
  },
  {
    serviceId: "nsp-scholarship-discovery",
    acronyms: ["NSP", "OTR", "DBT", "MeitY", "MoE"],
    englishSynonyms: [
      "national scholarship portal",
      "student scholarship",
      "college scholarship",
      "school scholarship",
      "student financial aid",
      "education fee waiver",
      "merit scholarship",
      "minority scholarship",
      "post matric scholarship",
      "pre matric scholarship",
    ],
    hindiSynonyms: [
      "राष्ट्रीय छात्रवृत्ति पोर्टल",
      "छात्रवृत्ति",
      "विद्यार्थी सहायता",
      "वजीफा",
      "छात्र सहायता योजना",
    ],
    hinglishTransliterations: [
      "chhatravritti",
      "chhatravriti",
      "scholarship form",
      "padhai ke paise",
      "college fee mafi",
      "vazifa form",
      "scholarship kaise milegi",
      "vidyarthi chhatravritti",
    ],
    typos: ["scholarhsip", "scolarship", "schorlarship", "sholarship", "nsp portal"],
  },
  {
    serviceId: "pm-kisan-status",
    acronyms: ["PMKISAN", "PM-KISAN", "eKYC", "DBT", "MoA"],
    englishSynonyms: [
      "pm kisan",
      "pradhan mantri kisan samman nidhi",
      "farmer installment",
      "kisan money",
      "farmer 6000",
      "kisan 2000",
      "farmer welfare",
      "agriculture subsidy",
      "farmer beneficiary status",
      "pm kisan registration",
    ],
    hindiSynonyms: [
      "प्रधानमंत्री किसान सम्मान निधि",
      "पीएम किसान",
      "किसान किस्त",
      "किसान सहायता",
      "किसान खाता स्थिति",
    ],
    hinglishTransliterations: [
      "kisan samman nidhi",
      "kisan ka paisa",
      "kisan kist check karna",
      "2000 ki kist aayi kya",
      "khedut sahay",
      "kisan registration kaise kare",
      "kheti sahayata",
    ],
    typos: ["pmkisan", "pmkissan", "kisaan", "samann nidhi", "kissam"],
  },
  {
    serviceId: "aadhaar-pvc-card",
    acronyms: ["UIDAI", "PVC", "EID", "EAadhaar"],
    englishSynonyms: [
      "aadhaar pvc card",
      "order aadhaar card",
      "plastic aadhaar card",
      "wallet aadhaar",
      "smart aadhaar card",
      "durable aadhaar",
      "speed post aadhaar",
      "uidai pvc order",
      "duplicate aadhaar card",
      "physical aadhaar card",
    ],
    hindiSynonyms: [
      "आधार पीवीसी कार्ड",
      "प्लास्टिक आधार कार्ड",
      "आधार कार्ड ऑर्डर",
      "यूआईडीएआई आधार",
      "नया आधार कार्ड",
    ],
    hinglishTransliterations: [
      "plastic wala aadhaar",
      "pvc aadhar card order online",
      "chhota aadhar card",
      "aadhar kho gaya naya chahiye",
      "aadhar card post se mangwana",
      "smart card aadhar",
    ],
    typos: ["adhar", "aadhar", "adhaar", "uidi", "pvc ard", "aadhhar"],
  },
  {
    serviceId: "consumer-helpline-grievance",
    acronyms: ["NCH", "INGRAM", "DoCA", "1915"],
    englishSynonyms: [
      "national consumer helpline",
      "consumer complaint",
      "consumer grievance",
      "cheated by company",
      "defective product refund",
      "ecommerce dispute",
      "consumer court help",
      "consumer protection",
      "telecom billing dispute",
      "helpline 1915",
    ],
    hindiSynonyms: [
      "राष्ट्रीय उपभोक्ता हेल्पलाइन",
      "उपभोक्ता शिकायत",
      "उपभोक्ता फोरम",
      "कंपनी के खिलाफ शिकायत",
      "उपभोक्ता अधिकार",
    ],
    hinglishTransliterations: [
      "consumer shikayat",
      "company ne dhokha diya",
      "refund nahi mila",
      "kharab saman ki shikayat",
      "consumer court me case",
      "grahak suraksha",
    ],
    typos: ["consumr", "helplin", "complint", "shikayt", "greivance"],
  },
  {
    serviceId: "voter-id-epic-download",
    acronyms: ["EPIC", "ECI", "NVSP", "VSP", "e-EPIC"],
    englishSynonyms: [
      "voter id card",
      "voter registration",
      "download epic card",
      "election photo identity card",
      "voter list search",
      "electoral roll download",
      "apply voter id",
      "voters portal",
      "national voters service portal",
      "polling booth slip",
      "voter id status",
    ],
    hindiSynonyms: [
      "मतदाता पहचान पत्र",
      "वोटर आईडी कार्ड",
      "मतदाता सूची में नाम",
      "चुनाव कार्ड",
      "ई-एपिक डाउनलोड",
      "मतदाता कार्ड डाउनलोड",
      "मतदाता पंजीकरण",
    ],
    hinglishTransliterations: [
      "voter card download kaise kare",
      "chunav card online",
      "voting id search",
      "matdata soochi me naam",
      "epic number se voter card nikale",
      "chunav pehchan patra",
    ],
    typos: ["votter", "voterid", "elction", "votercard", "elctoral", "votar"],
  },
  {
    serviceId: "ration-card-nfsa-status",
    acronyms: ["NFSA", "PDS", "ONORC", "RC", "DFPD"],
    englishSynonyms: [
      "ration card",
      "ration card status",
      "food security card",
      "ration card beneficiary",
      "ration shop entitlement",
      "bpl ration card",
      "apl ration card",
      "ration quota check",
      "one nation one ration card",
      "fair price shop",
      "nfsa eligibility",
    ],
    hindiSynonyms: [
      "राशन कार्ड",
      "राष्ट्रीय खाद्य सुरक्षा",
      "राशन पात्रता सूची",
      "राशन दुकान",
      "राशन कोटा जांच",
      "बीपीएल राशन कार्ड",
      "राशन कार्ड में नाम",
    ],
    hinglishTransliterations: [
      "rashan card status",
      "rashan card me naam kaise dekhe",
      "ration dukan entitlement",
      "ration card bpl",
      "one nation one ration",
      "ration ki dukan",
    ],
    typos: ["rashan", "ratan card", "rationcard", "rasan", "foodration"],
  },
  {
    serviceId: "pan-card-reprint",
    acronyms: ["PAN", "NSDL", "Protean", "UTIITSL", "e-PAN"],
    englishSynonyms: [
      "pan card reprint",
      "duplicate pan card",
      "order pan card",
      "reprint physical pan",
      "lost pan card",
      "download epan",
      "pan card dispatch status",
      "income tax pan",
      "tin nsdl pan",
    ],
    hindiSynonyms: [
      "पैन कार्ड दोबारा मंगाएं",
      "पैन कार्ड रीप्रिंट",
      "खोया पैन कार्ड",
      "ई-पैन डाउनलोड",
      "पैन कार्ड की दूसरी कॉपी",
      "आयकर पैन कार्ड",
    ],
    hinglishTransliterations: [
      "pan card kho gaya",
      "pan reprint kaise kare",
      "plastic pan card order",
      "pan card post se mangwana",
      "duplicate pan card online",
      "epan download karen",
    ],
    typos: ["pancard", "reprit", "reprintt", "nsld", "proten", "e-pan card"],
  },
  {
    serviceId: "epf-passbook-claim-status",
    acronyms: ["EPFO", "EPF", "UAN", "PF", "EDLI", "EPS"],
    englishSynonyms: [
      "epf passbook",
      "pf balance check",
      "uan passbook download",
      "pf claim status",
      "provident fund balance",
      "pf withdrawal status",
      "epfo member portal",
      "epf statement",
      "track pf claim",
    ],
    hindiSynonyms: [
      "ईपीएफ पासबुक",
      "पीएफ बैलेंस चेक",
      "यूएएन पासबुक",
      "पीएफ क्लेम स्टेटस",
      "भविष्य निधि बैलेंस",
      "ईपीएफओ पासबुक",
      "पीएफ निकासी स्थिति",
    ],
    hinglishTransliterations: [
      "pf balance kaise check kare",
      "epf passbook download",
      "uan number se pf check",
      "pf ka paisa kitna hai",
      "pf claim track kaise kare",
      "pf account balance",
    ],
    typos: ["epfo", "epfpassbook", "pfbalence", "providnt", "uannumber", "passbok"],
  },
  {
    serviceId: "pmay-beneficiary-status",
    acronyms: ["PMAY", "PMAY-G", "PMAY-U", "MoRD", "MoHUA", "FTO", "RHISS"],
    englishSynonyms: [
      "pm awas yojana",
      "pradhan mantri awas yojana",
      "awas yojana beneficiary list",
      "pmay gramin status",
      "pmay urban status",
      "housing for all",
      "rural housing subsidy",
      "fto tracking awas",
      "pucca house scheme",
    ],
    hindiSynonyms: [
      "प्रधानमंत्री आवास योजना",
      "पीएम आवास सूची",
      "आवास योजना ग्रामीण",
      "पक्का मकान योजना",
      "आवास लाभार्थी स्टेटस",
      "पीएम आवास किस्त",
      "एफ़टीओ ट्रैकिंग",
    ],
    hinglishTransliterations: [
      "awas yojana me naam kaise dekhe",
      "pm awas list",
      "awas ka paisa kab aayega",
      "gramin awas yojana beneficiary",
      "pradhan mantri pakka ghar",
      "awas yojana status check",
    ],
    typos: ["awaas", "yojna", "pmayg", "pmayurban", "aawas yojana", "awaslist"],
  },
  {
    serviceId: "birth-certificate-crs",
    acronyms: ["CRS", "ORGI", "RBD Act", "B&D"],
    englishSynonyms: [
      "birth certificate",
      "birth registration",
      "apply birth certificate",
      "civil registration system",
      "register newborn",
      "online birth certificate",
      "registrar general birth record",
      "birth certificate download",
    ],
    hindiSynonyms: [
      "जन्म प्रमाण पत्र",
      "जन्म पंजीकरण",
      "सिविल रजिस्ट्रेशन प्रणाली",
      "नवजात का जन्म प्रमाण पत्र",
      "जन्म प्रमाण पत्र ऑनलाइन आवेदन",
    ],
    hinglishTransliterations: [
      "janam praman patra",
      "janam patrika",
      "bachhe ka birth certificate",
      "online birth certificate kaise banaye",
      "crs orgi portal",
      "janam register",
    ],
    typos: ["brith", "certifcate", "janam praman", "birht", "regisration", "crsorgi"],
  },
];

/**
 * Returns an expanded list of terms and keywords for a given service ID
 */
export function getSynonymsForService(serviceId: string): string[] {
  const item = SYNONYM_MAP.find((s) => s.serviceId === serviceId);
  if (!item) return [];
  return [
    ...item.acronyms,
    ...item.englishSynonyms,
    ...item.hindiSynonyms,
    ...item.hinglishTransliterations,
    ...item.typos,
  ];
}

/**
 * Given a user search term, finds any directly matching service IDs from the synonym dictionary
 */
export function matchServiceByDirectSynonym(query: string): string[] {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return [];

  const matchedIds: string[] = [];
  for (const entry of SYNONYM_MAP) {
    const allKeywords = [
      ...entry.acronyms.map((a) => a.toLowerCase()),
      ...entry.englishSynonyms.map((s) => s.toLowerCase()),
      ...entry.hindiSynonyms.map((h) => h.toLowerCase()),
      ...entry.hinglishTransliterations.map((t) => t.toLowerCase()),
      ...entry.typos.map((ty) => ty.toLowerCase()),
    ];

    for (const kw of allKeywords) {
      if (cleaned === kw || cleaned.includes(kw) || kw.includes(cleaned)) {
        matchedIds.push(entry.serviceId);
        break;
      }
    }
  }

  return matchedIds;
}
