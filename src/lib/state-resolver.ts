/**
 * GovEase - State & Union Territory Civic Resolver
 *
 * Provides regional resolution across Indian states and union territories.
 * Resolves state-specific public service portals (e.g. state PDS for ration cards,
 * state scholarship portals, and municipal civil registration portals).
 */

export interface IndianState {
  code: string;
  name: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  capital?: string;
}

export interface StatePortalLink {
  stateCode: string;
  portalName: string;
  department: string;
  officialUrl: string;
  notes?: string;
}

export const INDIAN_STATES: IndianState[] = [
  {
    code: "ALL",
    name: { en: "All India (National Portals)", hi: "अखिल भारतीय (राष्ट्रीय पोर्टल)", bn: "সর্বভারতীয় (জাতীয় পোর্টাল)", ta: "அகில இந்திய (தேசிய போர்ட்டல்கள்)" },
  },
  {
    code: "DL",
    name: { en: "Delhi (NCT)", hi: "दिल्ली (रा.रा.क्षे.)", bn: "দিল্লি (এনসিটি)", ta: "தில்லி" },
    capital: "New Delhi",
  },
  {
    code: "MH",
    name: { en: "Maharashtra", hi: "महाराष्ट्र", bn: "মহারাষ্ট্র", ta: "மகாராஷ்டிரா" },
    capital: "Mumbai",
  },
  {
    code: "UP",
    name: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश", bn: "উত্তর প্রদেশ", ta: "உத்தரப் பிரதேசம்" },
    capital: "Lucknow",
  },
  {
    code: "WB",
    name: { en: "West Bengal", hi: "पश्चिम बंगाल", bn: "পশ্চিমবঙ্গ", ta: "மேற்கு வங்கம்" },
    capital: "Kolkata",
  },
  {
    code: "TN",
    name: { en: "Tamil Nadu", hi: "तमिलनाडु", bn: "তামিলনাড়ু", ta: "தமிழ்நாடு" },
    capital: "Chennai",
  },
  {
    code: "KA",
    name: { en: "Karnataka", hi: "कर्नाटक", bn: "কর্ণাটক", ta: "கர்நாடகா" },
    capital: "Bengaluru",
  },
  {
    code: "RJ",
    name: { en: "Rajasthan", hi: "राजस्थान", bn: "রাজস্থান", ta: "ராஜஸ்தான்" },
    capital: "Jaipur",
  },
  {
    code: "GJ",
    name: { en: "Gujarat", hi: "गुजरात", bn: "গুজরাট", ta: "குஜராத்" },
    capital: "Gandhinagar",
  },
  {
    code: "BR",
    name: { en: "Bihar", hi: "बिहार", bn: "বিহার", ta: "பீகார்" },
    capital: "Patna",
  },
  {
    code: "KL",
    name: { en: "Kerala", hi: "केरल", bn: "কেরল", ta: "கேரளா" },
    capital: "Thiruvananthapuram",
  },
  {
    code: "MP",
    name: { en: "Madhya Pradesh", hi: "मध्य प्रदेश", bn: "মধ্যপ্রদেশ", ta: "மத்தியப் பிரதேசம்" },
    capital: "Bhopal",
  },
  {
    code: "AP",
    name: { en: "Andhra Pradesh", hi: "आंध्र प्रदेश", bn: "অন্ধ্রপ্রদেশ", ta: "ஆந்திரப் பிரதேசம்" },
    capital: "Amaravati",
  },
  {
    code: "TG",
    name: { en: "Telangana", hi: "तेलंगाना", bn: "তেলেঙ্গানা", ta: "தெலுங்கானா" },
    capital: "Hyderabad",
  },
  {
    code: "PB",
    name: { en: "Punjab", hi: "पंजाब", bn: "পাঞ্জাব", ta: "பஞ்சாப்" },
    capital: "Chandigarh",
  },
  {
    code: "HR",
    name: { en: "Haryana", hi: "हरियाणा", bn: "হরিয়ানা", ta: "ஹரியானா" },
    capital: "Chandigarh",
  },
  {
    code: "OD",
    name: { en: "Odisha", hi: "ओडिशा", bn: "ওড়িশা", ta: "ஒடிசா" },
    capital: "Bhubaneswar",
  },
  {
    code: "AS",
    name: { en: "Assam", hi: "असम", bn: "অসম", ta: "அசாம்" },
    capital: "Dispur",
  },
  {
    code: "JH",
    name: { en: "Jharkhand", hi: "झारखंड", bn: "ঝাড়খণ্ড", ta: "ஜார்க்கண்ட்" },
    capital: "Ranchi",
  },
  {
    code: "UK",
    name: { en: "Uttarakhand", hi: "उत्तराखंड", bn: "উত্তরাখণ্ড", ta: "உத்தராகண்ட்" },
    capital: "Dehradun",
  },
];

export const STATE_SERVICE_MAP: Record<string, StatePortalLink[]> = {
  "ration-card-nfsa-status": [
    {
      stateCode: "DL",
      portalName: "Delhi e-Ration Portal",
      department: "Department of Food Supplies and Consumer Affairs GNCTD",
      officialUrl: "https://nfs.delhi.gov.in",
      notes: "Online ration card application and e-food security status for Delhi residents.",
    },
    {
      stateCode: "MH",
      portalName: "MahaFood PDS Portal",
      department: "Food, Civil Supplies and Consumer Protection Dept, Maharashtra",
      officialUrl: "https://mahafood.gov.in",
      notes: "Online ration card management system and RC booklet status.",
    },
    {
      stateCode: "UP",
      portalName: "UP Food & Civil Supplies (e-Challan)",
      department: "Food and Civil Supplies Department, Uttar Pradesh",
      officialUrl: "https://fcs.up.gov.in",
      notes: "NFSA eligibility list and ration card search by digital number.",
    },
    {
      stateCode: "WB",
      portalName: "WBPDS (Khadya Sathi)",
      department: "Department of Food and Supplies, Government of West Bengal",
      officialUrl: "https://wbpds.wb.gov.in",
      notes: "Check digital ration card status, e-Ration card download, and Aadhaar seeding.",
    },
    {
      stateCode: "TN",
      portalName: "TNPDS Smart Card Portal",
      department: "Civil Supplies and Consumer Protection Department, Tamil Nadu",
      officialUrl: "https://www.tnpds.gov.in",
      notes: "Smart card family status, card member addition, and FPS entitlement.",
    },
    {
      stateCode: "KA",
      portalName: "Ahara Karnataka PDS",
      department: "Food, Civil Supplies & Consumer Affairs Department, Karnataka",
      officialUrl: "https://ahara.kar.nic.in",
      notes: "BPL/APL ration card verification and e-status Karnataka.",
    },
    {
      stateCode: "RJ",
      portalName: "Rajasthan Food Department",
      department: "Food and Civil Supplies Department, Rajasthan",
      officialUrl: "https://food.rajasthan.gov.in",
      notes: "Ration card details and NFSA inclusion status for Rajasthan.",
    },
    {
      stateCode: "BR",
      portalName: "Bihar e-PDS Portal",
      department: "Food & Consumer Protection Department, Government of Bihar",
      officialUrl: "http://epds.bihar.gov.in",
      notes: "RC issue system and district-wise beneficiary list Bihar.",
    },
  ],
  "birth-certificate-crs": [
    {
      stateCode: "DL",
      portalName: "MCD Delhi Birth & Death Registration",
      department: "Municipal Corporation of Delhi (MCD)",
      officialUrl: "https://mcdonline.nic.in",
      notes: "Official registration and QR-coded digital birth certificate issuance in Delhi.",
    },
    {
      stateCode: "MH",
      portalName: "Aaple Sarkar Maharashtra",
      department: "Rural & Urban Development Dept, Maharashtra",
      officialUrl: "https://aaplesarkar.mahaonline.gov.in",
      notes: "Citizen services portal for birth & death certificates across Maharashtra.",
    },
    {
      stateCode: "UP",
      portalName: "e-NagarSewa Uttar Pradesh",
      department: "Urban Development Directorate, Uttar Pradesh",
      officialUrl: "https://e-nagarsewaup.gov.in",
      notes: "Urban municipal birth registration and digital verification for UP.",
    },
    {
      stateCode: "WB",
      portalName: "Janma-Mrityu Tathya West Bengal",
      department: "Health and Family Welfare Department, West Bengal",
      officialUrl: "https://janma-mrityutathya.wb.gov.in",
      notes: "Statewide civil registration system for West Bengal hospital & home births.",
    },
    {
      stateCode: "TN",
      portalName: "TN e-Sevai / GCC Civil Registration",
      department: "Directorate of Public Health and Preventive Medicine, Tamil Nadu",
      officialUrl: "https://chennaicorporation.gov.in",
      notes: "Tamil Nadu online birth extract download and verification.",
    },
    {
      stateCode: "KA",
      portalName: "Seva Sindhu Karnataka",
      department: "Department of e-Governance, Karnataka",
      officialUrl: "https://sevasindhu.karnataka.gov.in",
      notes: "Unified citizen portal for birth record searches in Karnataka.",
    },
  ],
  "nsp-scholarship-discovery": [
    {
      stateCode: "MH",
      portalName: "MahaDBT Direct Benefit Transfer",
      department: "Social Justice and Special Assistance Dept, Maharashtra",
      officialUrl: "https://mahadbt.maharashtra.gov.in",
      notes: "Post-matric and pre-matric state scholarships for Maharashtra students.",
    },
    {
      stateCode: "UP",
      portalName: "UP Scholarship & Fee Reimbursement",
      department: "Social Welfare Department, Uttar Pradesh",
      officialUrl: "https://scholarship.up.gov.in",
      notes: "Dashmottar and pre-matric financial assistance for students in UP.",
    },
    {
      stateCode: "WB",
      portalName: "OASIS Scholarship Portal",
      department: "Backward Classes Welfare Department, West Bengal",
      officialUrl: "https://oasis.gov.in",
      notes: "SC, ST, and OBC pre/post-matric scholarships in West Bengal.",
    },
    {
      stateCode: "KA",
      portalName: "State Scholarship Portal (SSP)",
      department: "Centre for e-Governance, Karnataka",
      officialUrl: "https://ssp.postmatric.karnataka.gov.in",
      notes: "Karnataka automated Aadhaar-based student fee waiver scheme.",
    },
  ],
  "driving-licence-renewal": [
    {
      stateCode: "DL",
      portalName: "Delhi Faceless Transport Services",
      department: "Transport Department, Government of NCT of Delhi",
      officialUrl: "https://transport.delhi.gov.in",
      notes: "100% contactless driving licence renewal and doorstep delivery in Delhi.",
    },
    {
      stateCode: "MH",
      portalName: "Motor Vehicles Department Maharashtra",
      department: "Transport Commissionerate, Maharashtra",
      officialUrl: "https://transport.maharashtra.gov.in",
      notes: "RTO appointment booking and document uploads for Maharashtra.",
    },
    {
      stateCode: "WB",
      portalName: "West Bengal Transport Department",
      department: "Transport Department, Government of West Bengal",
      officialUrl: "https://transport.wb.gov.in",
      notes: "RTO facilitation and learner/driving licence status WB.",
    },
  ],
};

/**
 * Returns state-specific portal links for a given service.
 * If stateCode is 'ALL', returns all available state-specific portals.
 */
export function getStatePortalsForService(serviceId: string, stateCode = "ALL"): StatePortalLink[] {
  const allForService = STATE_SERVICE_MAP[serviceId] || [];
  if (stateCode === "ALL") {
    return allForService;
  }
  return allForService.filter((link) => link.stateCode === stateCode);
}

/**
 * Retrieves the display name of a state in the active language.
 */
export function getStateDisplayName(stateCode: string, locale: "en" | "hi" | "bn" | "ta" = "en"): string {
  const match = INDIAN_STATES.find((s) => s.code === stateCode);
  if (!match) return stateCode;
  return match.name[locale] || match.name.en;
}

