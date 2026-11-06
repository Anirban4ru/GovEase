/**
 * Unified Life Services Platform - Citizen Life-Stage Navigator Engine
 * 100% Client-Side, Deterministic, Privacy-Preserving Life-Situation Screener
 *
 * Strictly informational: Adheres to Hard Rule 9 (Zero legal/financial advice;
 * informational 'you may want to check' framing; always cites official source).
 */

import { Locale } from "../context/I18nContext";
import type { LifeEcosystem } from "./catalogue";

export type LifeStageId =
  "student" | "unorganised-worker" | "farmer" | "pwd" | "senior" | "family-general";

export type HouseholdNeedId =
  "financial-welfare" | "identity-documents" | "health-housing" | "transport-education";

export interface LifeStageOption {
  id: LifeStageId;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: string;
}

export interface HouseholdNeedOption {
  id: HouseholdNeedId;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: string;
}

export interface MatchedServiceRecommendation {
  serviceId: string;
  ecosystem: LifeEcosystem;
  serviceTitle: Record<Locale, string>;
  relevanceBadge: Record<Locale, string>;
  rationale: Record<Locale, string>;
  officialSource: string;
  sourceUrl: string;
}

export const LIFE_STAGE_OPTIONS: LifeStageOption[] = [
  {
    id: "unorganised-worker",
    label: {
      en: "Unorganised / Gig / Daily-Wage Worker",
      hi: "असंगठित / गिग / दैनिक वेतनभोगी श्रमिक",
      bn: "অসংগঠিত / গিগ / দৈনিক মজুরি কর্মী",
      ta: "அமைப்புசாரா / கிக் / தினசரி கூலித் தொழிலாளி",
    },
    description: {
      en: "Construction, transport, domestic help, or delivery workers without EPFO/ESIC.",
      hi: "भवन निर्माण, परिवहन, घरेलू सहायक या डिलीवरी कर्मी जो ईपीएफओ/ईएसआईसी में नहीं हैं।",
      bn: "নির্মাণ, পরিবহন, গৃহকর্মী বা ডেলিভারি কর্মী যাদের EPFO/ESIC নেই।",
      ta: "EPFO/ESIC இல்லாத கட்டுமானம், போக்குவரத்து, வீட்டு வேலை அல்லது டெலிவரி தொழிலாளர்கள்.",
    },
    icon: "worker",
  },
  {
    id: "farmer",
    label: {
      en: "Farmer or Agricultural Landholder",
      hi: "किसान या कृषि भूमि धारक",
      bn: "কৃষক বা কৃষি জমির মালিক",
      ta: "விவசாயி அல்லது விவசாய நில உரிமையாளர்",
    },
    description: {
      en: "Small and marginal farmers seeking central income support and rural welfare.",
      hi: "छोटे और सीमांत किसान जो केंद्रीय आय सहायता और ग्रामीण कल्याण चाहते हैं।",
      bn: "ছোট ও প্রান্তিক কৃষক যারা কেন্দ্রীয় আয় সহায়তা এবং গ্রামীণ কল্যাণ খুঁজছেন।",
      ta: "மத்திய வருமான ஆதரவு மற்றும் கிராமப்புற நலனை நாடும் சிறு மற்றும் குறு விவசாயிகள்.",
    },
    icon: "farmer",
  },
  {
    id: "student",
    label: {
      en: "Student or Young Learner",
      hi: "छात्र या युवा शिक्षार्थी",
      bn: "শিক্ষার্থী বা তরুণ শিক্ষার্থী",
      ta: "மாணவர் அல்லது இளம் கற்பவர்",
    },
    description: {
      en: "School, college, or university students seeking scholarships and digital academic records.",
      hi: "स्कूल, कॉलेज या विश्वविद्यालय के छात्र जो छात्रवृत्ति और डिजिटल रिकॉर्ड चाहते हैं।",
      bn: "স্কুল, কলেজ বা বিশ্ববিদ্যালয়ের ছাত্র যারা বৃত্তি এবং ডিজিটাল রেকর্ড খুঁজছেন।",
      ta: "பள்ளி, கல்லூரி அல்லது பல்கலைக்கழக மாணவர்கள் உதவித்தொகை மற்றும் டிஜிட்டல் பதிவுகளைத் தேடுகிறார்கள்.",
    },
    icon: "student",
  },
  {
    id: "pwd",
    label: {
      en: "Person with Disability (Divyangjan)",
      hi: "दिव्यांगजन (दिव्यांग व्यक्ति)",
      bn: "প্রতিবন্ধী ব্যক্তি (দিব্যাঙ্গজন)",
      ta: "மாற்றுத்திறனாளி (திவ்யாங்ஜன்)",
    },
    description: {
      en: "Individuals seeking official UDID smart cards, travel concessions, and legal rights.",
      hi: "वे व्यक्ति जो आधिकारिक यूडीआईडी कार्ड, यात्रा छूट और कानूनी अधिकार चाहते हैं।",
      bn: "অফিসিয়াল UDID স্মার্ট কার্ড, ভ্রমণ ছাড় এবং আইনি অধিকার প্রত্যাশী ব্যক্তি।",
      ta: "அதிகாரப்பூர்வ UDID ஸ்மார்ட் கார்டுகள், பயணச் சலுகைகள் மற்றும் சட்ட உரிமைகளைத் தேடும் நபர்கள்.",
    },
    icon: "pwd",
  },
  {
    id: "senior",
    label: {
      en: "Senior Citizen (60+ Years)",
      hi: "वरिष्ठ नागरिक (60+ वर्ष)",
      bn: "প্রবীণ নাগরিক (৬০+ বছর)",
      ta: "மூத்த குடிமகன் (60+ ஆண்டுகள்)",
    },
    description: {
      en: "Retirees and elderly individuals seeking zero-balance banking and life security.",
      hi: "सेवानिवृत्त और बुजुर्ग नागरिक जो शून्य-बैलेंस बैंकिंग और जीवन सुरक्षा चाहते हैं।",
      bn: "অবসরপ্রাপ্ত এবং বয়স্ক ব্যক্তিরা শূন্য-ব্যালেন্স ব্যাংকিং এবং জীবন নিরাপত্তা খুঁজছেন।",
      ta: "ஓய்வுபெற்றவர்கள் மற்றும் முதியவர்கள் பூஜ்ஜிய இருப்பு வங்கி மற்றும் வாழ்க்கை பாதுகாப்பை நாடுகின்றனர்.",
    },
    icon: "senior",
  },
  {
    id: "family-general",
    label: {
      en: "General Citizen & Family Household",
      hi: "सामान्य नागरिक और परिवार",
      bn: "সাধারণ নাগরিক ও পরিবার",
      ta: "பொது குடிமக்கள் மற்றும் குடும்பம்",
    },
    description: {
      en: "Households navigating essential civil certificates, identity, healthcare, and consumer rights.",
      hi: "आवश्यक नागरिक प्रमाण पत्र, पहचान, स्वास्थ्य सेवा और उपभोक्ता अधिकारों के लिए परिवार।",
      bn: "পরিবার প্রয়োজনীয় নাগরিক সনদপত্র, পরিচয়পত্র, স্বাস্থ্যসেবা ও ভোক্তা অধিকারের জন্য।",
      ta: "அத்தியாவசிய குடிமக்கள் சான்றிதழ்கள், அடையாளம், சுகாதாரம் மற்றும் நுகர்வோர் உரிமைகளை வழிநடத்தும் குடும்பங்கள்.",
    },
    icon: "family",
  },
];

export const HOUSEHOLD_NEED_OPTIONS: HouseholdNeedOption[] = [
  {
    id: "financial-welfare",
    label: {
      en: "Financial Security, Insurance & Banking",
      hi: "वित्तीय सुरक्षा, बीमा और बैंकिंग",
      bn: "আর্থিক নিরাপত্তা, বীমা এবং ব্যাংকিং",
      ta: "நிதி பாதுகாப்பு, காப்பீடு மற்றும் வங்கி",
    },
    description: {
      en: "Zero-balance Jan Dhan accounts, ₹20/year accident insurance, pension claims.",
      hi: "शून्य-बैलेंस जन धन खाता, ₹20/वर्ष दुर्घटना बीमा, पेंशन दावे।",
      bn: "শূন্য-ব্যালেন্স জন ধন অ্যাকাউন্ট, ₹২০/বছর দুর্ঘটনা বীমা, পেনশন দাবি।",
      ta: "பூஜ்ஜிய இருப்பு ஜன் தன் கணக்குகள், ₹20/ஆண்டு விபத்துக் காப்பீடு, ஓய்வூதியக் கோரிக்கைகள்.",
    },
    icon: "financial",
  },
  {
    id: "health-housing",
    label: {
      en: "Healthcare & Subsidised Housing",
      hi: "स्वास्थ्य सेवा और रियायती आवास",
      bn: "স্বাস্থ্যসেবা ও ভর্তুকিযুক্ত আবাসন",
      ta: "சுகாதாரம் மற்றும் மானிய விலையிலான வீட்டுவசதி",
    },
    description: {
      en: "Ayushman Bharat digital health accounts and rural pucca house status.",
      hi: "आयुष्मान भारत डिजिटल स्वास्थ्य खाता और ग्रामीण पक्के मकान की स्थिति।",
      bn: "আয়ুষ্মান ভারত ডিজিটাল স্বাস্থ্য অ্যাকাউন্ট এবং গ্রামীণ পাকা বাড়ির স্থিতি।",
      ta: "ஆயுஷ்மான் பாரத் டிஜிட்டல் சுகாதார கணக்குகள் மற்றும் கிராமப்புற கான்கிரீட் வீடு நிலை.",
    },
    icon: "health",
  },
  {
    id: "identity-documents",
    label: {
      en: "Essential Identity, Records & DigiLocker",
      hi: "आवश्यक पहचान, रिकॉर्ड और डिजिलॉकर",
      bn: "প্রয়োজনীয় পরিচয়পত্র, নথিপত্র এবং ডিজিলকার",
      ta: "அத்தியாவசிய அடையாளம், ஆவணங்கள் மற்றும் டிஜிலாக்கர்",
    },
    description: {
      en: "Birth certificates, official Aadhaar PVC, e-EPIC voter card, and digital storage.",
      hi: "जन्म प्रमाण पत्र, आधिकारिक आधार पीवीसी, ई-एपिक वोटर कार्ड और डिजिटल भंडारण।",
      bn: "জন্ম সনদ, অফিসিয়াল আধার পিভিসি, ই-এপিক ভোটার কার্ড এবং ডিজিটাল স্টোরেজ।",
      ta: "பிறப்புச் சான்றிதழ்கள், அதிகாரப்பூர்வ ஆதார் பிவிசி, வாக்காளர் அட்டை மற்றும் டிஜிட்டல் சேமிப்பு.",
    },
    icon: "identity",
  },
  {
    id: "transport-education",
    label: {
      en: "Transport, Vehicles & Education",
      hi: "परिवहन, वाहन और शिक्षा",
      bn: "পরিবহন, যানবাহন এবং শিক্ষা",
      ta: "போக்குவரத்து, வாகனங்கள் மற்றும் கல்வி",
    },
    description: {
      en: "Driving licence renewals, vehicle RC ownership transfer, and national scholarships.",
      hi: "ड्राइविंग लाइसेंस नवीनीकरण, वाहन आरसी स्वामित्व हस्तांतरण, और राष्ट्रीय छात्रवृत्ति।",
      bn: "ড্রাইভিং লাইসেন্স পুনর্নবীকরণ, যানবাহন আরসি মালিকানা হস্তান্তর এবং জাতীয় বৃত্তি।",
      ta: "ஓட்டுநர் உரிம புதுப்பித்தல், வாகன ஆர்சி உரிமை மாற்றம் மற்றும் தேசிய உதவித்தொகை.",
    },
    icon: "transport",
  },
];

const SERVICE_META: Record<
  string,
  {
    ecosystem: LifeEcosystem;
    serviceTitle: Record<Locale, string>;
  }
> = {
  "eshram-card-registration": {
    ecosystem: "finance-and-welfare",
    serviceTitle: {
      en: "e-Shram Card Registration",
      hi: "ई-श्रम कार्ड पंजीकरण",
      bn: "ই-শ্রম কার্ড নিবন্ধন",
      ta: "இ-ஷ்ராம் கார்டு பதிவு",
    },
  },
  "pm-suraksha-bima-yojana": {
    ecosystem: "finance-and-welfare",
    serviceTitle: {
      en: "PM Suraksha Bima Yojana (PMSBY)",
      hi: "पीएम सुरक्षा बीमा योजना",
      bn: "পিএম সুরক্ষা বীমা যোজনা",
      ta: "பிரதான் மந்திரி சுரக்ஷா பீமா யோஜனா",
    },
  },
  "pm-jan-dhan-yojana-account": {
    ecosystem: "finance-and-welfare",
    serviceTitle: {
      en: "PM Jan Dhan Yojana (PMJDY) Account",
      hi: "पीएम जन धन योजना खाता",
      bn: "পিএম জন ধন যোজনা অ্যাকাউন্ট",
      ta: "ஜன் தன் கணக்கு",
    },
  },
  "pm-kisan-status": {
    ecosystem: "finance-and-welfare",
    serviceTitle: {
      en: "PM-Kisan Samman Nidhi Status & eKYC",
      hi: "पीएम-किसान स्थिति और ई-केवाईसी",
      bn: "প্রধানমন্ত্রী-কিসান স্থিতি",
      ta: "பிஎம்-கிசான் நிலை",
    },
  },
  "pmay-beneficiary-status": {
    ecosystem: "utilities-and-local",
    serviceTitle: {
      en: "PM Awas Yojana (PMAY-G) Beneficiary Status",
      hi: "पीएम आवास योजना लाभार्थी स्थिति",
      bn: "পিএম আবাস যোজনা স্থিতি",
      ta: "பிஎம் ஆவாஸ் யோஜனா நிலை",
    },
  },
  "ration-card-nfsa-status": {
    ecosystem: "government-and-citizen",
    serviceTitle: {
      en: "Ration Card NFSA Entitlement Status",
      hi: "राशन कार्ड एनएफएसए पात्रता स्थिति",
      bn: "রেশন কার্ড এনএফএসএ স্থিতি",
      ta: "ரேஷன் அட்டை என்எஃப்எஸ்ஏ நிலை",
    },
  },
  "nsp-scholarship-discovery": {
    ecosystem: "education",
    serviceTitle: {
      en: "National Scholarship Portal (NSP) Discovery",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) खोज",
      bn: "জাতীয় স্কলারশিপ পোর্টাল",
      ta: "தேசிய உதவித்தொகை போர்டல்",
    },
  },
  "digilocker-account-setup": {
    ecosystem: "government-and-citizen",
    serviceTitle: {
      en: "DigiLocker Citizen Account Setup",
      hi: "डिजिलॉकर नागरिक खाता सेटअप",
      bn: "ডিজিলকার নাগরিক অ্যাকাউন্ট",
      ta: "டிஜிலாக்கர் கணக்கு",
    },
  },
  "voter-id-epic-download": {
    ecosystem: "government-and-citizen",
    serviceTitle: {
      en: "Voter ID Registration & e-EPIC Download",
      hi: "मतदाता पहचान पत्र और ई-एपिक डाउनलोड",
      bn: "ভোটার আইডি ও e-EPIC ডাউনলোড",
      ta: "வாக்காளர் அட்டை e-EPIC பதிவிறக்கம்",
    },
  },
  "swavlamban-udid-card": {
    ecosystem: "government-and-citizen",
    serviceTitle: {
      en: "Swavlamban Unique Disability ID (UDID) Card",
      hi: "स्वावलंबन यूडीआईडी कार्ड",
      bn: "স্বাবলম্বন ইউডিআইডি কার্ড",
      ta: "ஸ்வாவலம்பன் யுடிஐடி கார்டு",
    },
  },
  "create-abha-id": {
    ecosystem: "healthcare",
    serviceTitle: {
      en: "Create Ayushman Bharat Health Account (ABHA)",
      hi: "आयुष्मान भारत स्वास्थ्य खाता (आभा) बनाएं",
      bn: "আয়ুষ্মান ভারত হেলথ অ্যাকাউন্ট (আভা)",
      ta: "ஆபா (ABHA) கணக்கை உருவாக்கவும்",
    },
  },
  "epf-passbook-claim-status": {
    ecosystem: "finance-and-welfare",
    serviceTitle: {
      en: "EPF Passbook & UAN Claim Status",
      hi: "ईपीएफ पासबुक और यूएएन दावा स्थिति",
      bn: "ইপিএফ পাসবুক এবং দাবি স্থিতি",
      ta: "இபிஎஃப் பாஸ்புக் மற்றும் உரிமைகோரல் நிலை",
    },
  },
  "birth-certificate-crs": {
    ecosystem: "government-and-citizen",
    serviceTitle: {
      en: "Birth Certificate Registration (CRS)",
      hi: "जन्म प्रमाण पत्र पंजीकरण (सीआरएस)",
      bn: "জন্ম শংসাপত্র নিবন্ধন (সিআরএস)",
      ta: "பிறப்புச் சான்றிதழ் பதிவு",
    },
  },
  "aadhaar-pvc-card": {
    ecosystem: "government-and-citizen",
    serviceTitle: {
      en: "Official Aadhaar PVC Card Order",
      hi: "आधिकारिक आधार पीवीसी कार्ड ऑर्डर",
      bn: "অফিসিয়াল আধার পিভিসি কার্ড",
      ta: "ஆதார் பிவிசி அட்டை ஆர்டர்",
    },
  },
  "consumer-helpline-grievance": {
    ecosystem: "utilities-and-local",
    serviceTitle: {
      en: "National Consumer Helpline Grievance (NCH 1915)",
      hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन शिकायत",
      bn: "জাতীয় ভোক্তা হেল্পলাইন অভিযোগ",
      ta: "தேசிய நுகர்வோர் உதவி மையம்",
    },
  },
  "driving-licence-renewal": {
    ecosystem: "mobility-and-transport",
    serviceTitle: {
      en: "Driving Licence Renewal (SARATHI)",
      hi: "ड्राइविंग लाइसेंस नवीनीकरण (सारथी)",
      bn: "ড্রাইভিং লাইসেন্স পুনর্নবীকরণ",
      ta: "ஓட்டுநர் உரிம புதுப்பித்தல்",
    },
  },
};

interface InternalMatch {
  serviceId: string;
  relevanceBadge: Record<Locale, string>;
  rationale: Record<Locale, string>;
  officialSource: string;
  sourceUrl: string;
}

/**
 * Pure Deterministic Recommendation Evaluator
 * Evaluates citizen life stage + primary need and yields matched public services.
 */
export function evaluateLifeStageMatches(
  lifeStage: LifeStageId,
  householdNeed: HouseholdNeedId,
): MatchedServiceRecommendation[] {
  const matches: InternalMatch[] = [];

  // 1. Life Stage Dominant Matches
  if (lifeStage === "unorganised-worker") {
    matches.push({
      serviceId: "eshram-card-registration",
      relevanceBadge: {
        en: "Highly Recommended for You",
        hi: "आपके लिए अत्यधिक अनुशंसित",
        bn: "আপনার জন্য অত্যন্ত প্রস্তাবিত",
        ta: "உங்களுக்கு மிகவும் பரிந்துரைக்கப்படுகிறது",
      },
      rationale: {
        en: "e-Shram issues a 12-digit universal account number (UAN) for unorganised workers, enabling central welfare benefits and social security coverage.",
        hi: "ई-श्रम असंगठित कामगारों के लिए 12 अंकों का यूनिवर्सल अकाउंट नंबर (UAN) जारी करता है, जो सामाजिक सुरक्षा और कल्याणकारी योजनाओं तक पहुंच प्रदान करता है।",
        bn: "ই-শ্রম অসংগঠিত কর্মীদের জন্য ১২ সংখ্যার সার্বজনীন অ্যাকাউন্ট নম্বর (UAN) প্রদান করে, যা সামাজিক সুরক্ষা এবং কল্যাণমূলক সুবিধার সুযোগ দেয়।",
        ta: "இ-ஷ்ராம் அமைப்புசாரா தொழிலாளர்களுக்கு 12 இலக்க உலகளாவிய கணக்கு எண்ணை (UAN) வழங்குகிறது, இது சமூக பாதுகாப்பு நலன்களைப் பெற உதவுகிறது.",
      },
      officialSource: "Ministry of Labour & Employment",
      sourceUrl: "https://eshram.gov.in",
    });

    matches.push({
      serviceId: "pm-suraksha-bima-yojana",
      relevanceBadge: {
        en: "Essential Financial Safety Net",
        hi: "आवश्यक वित्तीय सुरक्षा कवच",
        bn: "অপরিহার্য আর্থিক সুরক্ষা",
        ta: "அத்தியாவசிய நிதி பாதுகாப்பு வலை",
      },
      rationale: {
        en: "PMSBY provides ₹2 Lakh accidental insurance cover at an affordable premium of only ₹20 per year for anyone aged 18 to 70 with a savings bank account.",
        hi: "पीएमएसबीवाई बचत बैंक खाता रखने वाले 18 से 70 वर्ष के किसी भी व्यक्ति को मात्र ₹20 प्रति वर्ष के प्रीमियम पर ₹2 लाख का दुर्घटना बीमा कवर प्रदान करता है।",
        bn: "PMSBY একটি সেভিংস ব্যাংক অ্যাকাউন্টধারী ১৮ থেকে ৭০ বছর বয়সী যেকোনো ব্যক্তির জন্য বছরে মাত্র ২০ টাকায় ২ লক্ষ টাকার দুর্ঘটনা বীমা কভার প্রদান করে।",
        ta: "PMSBY சேமிப்பு வங்கிக் கணக்கு வைத்திருக்கும் 18 முதல் 70 வயதுக்குட்பட்ட எவருக்கும் ஆண்டுக்கு வெறும் ₹20 பிரீமியத்தில் ₹2 லட்சம் விபத்துக் காப்பீட்டை வழங்குகிறது.",
      },
      officialSource: "Department of Financial Services",
      sourceUrl: "https://jansuraksha.gov.in",
    });

    matches.push({
      serviceId: "pm-jan-dhan-yojana-account",
      relevanceBadge: {
        en: "Zero-Balance Banking Support",
        hi: "शून्य-बैलेंस बैंकिंग सहायता",
        bn: "শূন্য-ব্যালেন্স ব্যাংকিং সহায়তা",
        ta: "பூஜ்ஜிய இருப்பு வங்கி ஆதரவு",
      },
      rationale: {
        en: "PMJDY allows unorganised citizens to open a zero-balance bank account with a free RuPay debit card and direct benefit transfer (DBT) linkage.",
        hi: "पीएमजेडीवाई असंगठित नागरिकों को मुफ्त रुपे डेबिट कार्ड और प्रत्यक्ष लाभ हस्तांतरण (डीबीटी) के साथ शून्य-बैलेंस बैंक खाता खोलने की अनुमति देता है।",
        bn: "PMJDY অসংগঠিত নাগরিকদের একটি বিনামূল্যের RuPay ডেবিট কার্ড এবং সরাসরি সুবিধা স্থানান্তর (DBT) সহ একটি শূন্য-ব্যালেন্স অ্যাকাউন্ট খোলার সুযোগ দেয়।",
        ta: "PMJDY அமைப்புசாரா குடிமக்கள் இலவச RuPay டெபிட் கார்டு மற்றும் நேரடி பயன் பரிமாற்றத்துடன் (DBT) பூஜ்ஜிய இருப்பு கணக்கைத் திறக்க அனுமதிக்கிறது.",
      },
      officialSource: "Ministry of Finance",
      sourceUrl: "https://pmjdy.gov.in",
    });
  } else if (lifeStage === "farmer") {
    matches.push({
      serviceId: "pm-kisan-status",
      relevanceBadge: {
        en: "Direct Farm Income Support",
        hi: "प्रत्यक्ष कृषि आय सहायता",
        bn: "সরাসরি কৃষি আয় সহায়তা",
        ta: "நேரடி விவசாய வருமான ஆதரவு",
      },
      rationale: {
        en: "PM-Kisan provides ₹6,000 per year in three equal instalments directly into the bank accounts of eligible landholding farmer families.",
        hi: "पीएम-किसान पात्र भूमिधारक किसान परिवारों के बैंक खातों में सीधे तीन समान किस्तों में प्रति वर्ष ₹6,000 प्रदान करता है।",
        bn: "প্রধানমন্ত্রী-কিসান যোগ্য কৃষকদের ব্যাংক অ্যাকাউন্টে সরাসরি তিনটি সমান কিস্তিতে প্রতি বছর ৬,০০০ টাকা প্রদান করে।",
        ta: "பிஎம்-கிசான் தகுதியான நில உரிமையாளர் விவசாய குடும்பங்களின் வங்கிக் கணக்கில் நேரடியாக ஆண்டுக்கு ₹6,000 வழங்குகிறது.",
      },
      officialSource: "Ministry of Agriculture & Farmers Welfare",
      sourceUrl: "https://pmkisan.gov.in",
    });

    matches.push({
      serviceId: "pmay-beneficiary-status",
      relevanceBadge: {
        en: "Rural Pucca House Grant",
        hi: "ग्रामीण पक्के मकान हेतु अनुदान",
        bn: "গ্রামীণ পাকা বাড়ির অনুদান",
        ta: "கிராமப்புற கான்கிரீட் வீடு மானியம்",
      },
      rationale: {
        en: "PMAY-Gramin provides financial assistance to eligible rural families living in kutcha or dilapidated houses to construct a durable pucca house.",
        hi: "पीएमएवाई-ग्रामीण कच्चे या जर्जर मकानों में रहने वाले पात्र ग्रामीण परिवारों को पक्का मकान बनाने के लिए वित्तीय सहायता प्रदान करता है।",
        bn: "PMAY-গ্রামীণ কাঁচা বা জরাজীর্ণ বাড়িতে বসবাসকারী যোগ্য গ্রামীণ পরিবারগুলিকে পাকা বাড়ি তৈরির জন্য আর্থিক সহায়তা প্রদান করে।",
        ta: "PMAY-கிராமின் தகுதியான கிராமப்புற குடும்பங்களுக்கு ஒரு நிரந்தர வீட்டை உருவாக்க நிதி உதவி வழங்குகிறது.",
      },
      officialSource: "Ministry of Rural Development",
      sourceUrl: "https://pmayg.nic.in",
    });

    matches.push({
      serviceId: "ration-card-nfsa-status",
      relevanceBadge: {
        en: "Food Security Entitlement",
        hi: "खाद्य सुरक्षा पात्रता",
        bn: "খাদ্য সুরক্ষা প্রাপ্যতা",
        ta: "உணவுப் பாதுகாப்பு உரிமை",
      },
      rationale: {
        en: "Check food grain allocation and active ration card entitlement under the National Food Security Act (NFSA).",
        hi: "राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA) के तहत खाद्यान्न आवंटन और सक्रिय राशन कार्ड पात्रता की जांच करें।",
        bn: "জাতীয় খাদ্য সুরক্ষা আইনের (NFSA) অধীনে খাদ্যশস্য বরাদ্দ এবং সক্রিয় রেশন কার্ড প্রাপ্যতা পরীক্ষা করুন।",
        ta: "தேசிய உணவுப் பாதுகாப்புச் சட்டத்தின் (NFSA) கீழ் உணவு தானிய ஒதுக்கீடு மற்றும் குடும்ப அட்டை நிலையைச் சரிபார்க்கவும்.",
      },
      officialSource: "Department of Food & Public Distribution",
      sourceUrl: "https://nfsa.gov.in",
    });
  } else if (lifeStage === "student") {
    matches.push({
      serviceId: "nsp-scholarship-discovery",
      relevanceBadge: {
        en: "National Scholarship Support",
        hi: "राष्ट्रीय छात्रवृत्ति सहायता",
        bn: "জাতীয় বৃত্তি সহায়তা",
        ta: "தேசிய உதவித்தொகை ஆதரவு",
      },
      rationale: {
        en: "The National Scholarship Portal (NSP) unifies pre-matric, post-matric, and higher education scholarships offered by central and state ministries.",
        hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) केंद्रीय और राज्य मंत्रालयों द्वारा दी जाने वाली प्री-मैट्रिक, पोस्ट-मैट्रिक और उच्च शिक्षा छात्रवृत्तियों को एकीकृत करता है।",
        bn: "জাতীয় বৃত্তি পোর্টাল (NSP) কেন্দ্রীয় এবং রাজ্য সরকার প্রদত্ত প্রাক-ম্যাট্রিক, পোস্ট-ম্যাট্রিক এবং উচ্চশিক্ষা বৃত্তিগুলিকে একত্রিত করে।",
        ta: "தேசிய உதவித்தொகை போர்டல் (NSP) மத்திய மற்றும் மாநில அமைச்சகங்களால் வழங்கப்படும் உதவித்தொகைகளை ஒருங்கிணைக்கிறது.",
      },
      officialSource: "Ministry of Electronics and Information Technology",
      sourceUrl: "https://scholarships.gov.in",
    });

    matches.push({
      serviceId: "digilocker-account-setup",
      relevanceBadge: {
        en: "Academic Certificates & Storage",
        hi: "शैक्षणिक प्रमाण पत्र और डिजिटल लॉकर",
        bn: "শিক্ষাগত শংসাপত্র এবং ডিজিটাল লকার",
        ta: "கல்விச் சான்றிதழ்கள் மற்றும் டிஜிட்டல் சேமிப்பு",
      },
      rationale: {
        en: "DigiLocker lets students fetch and share legally valid digital marks sheets, degrees, transfer certificates, and entrance exam scorecards.",
        hi: "डिजिलॉकर छात्रों को कानूनी रूप से वैध डिजिटल अंकपत्र, डिग्री, स्थानांतरण प्रमाण पत्र और प्रवेश परीक्षा स्कोरकार्ड प्राप्त करने की सुविधा देता है।",
        bn: "ডিজিলকার শিক্ষার্থীদের বৈধ ডিজিটাল মার্কশিট, ডিগ্রি এবং প্রবেশিকা পরীক্ষার ফলাফল সংরক্ষণ ও শেয়ার করার সুযোগ দেয়।",
        ta: "டிஜிலாக்கர் மாணவர்கள் சட்டப்பூர்வமாக செல்லுபடியாகும் மதிப்பெண் பட்டியல்கள் மற்றும் பட்டங்களை அணுக அனுமதிக்கிறது.",
      },
      officialSource: "Digital India Corporation",
      sourceUrl: "https://digilocker.gov.in",
    });

    matches.push({
      serviceId: "voter-id-epic-download",
      relevanceBadge: {
        en: "Young Citizen Voting Registration",
        hi: "युवा नागरिक मतदान पंजीकरण",
        bn: "তরুণ নাগরিক ভোটার নিবন্ধন",
        ta: "இளம் குடிமக்கள் வாக்காளர் பதிவு",
      },
      rationale: {
        en: "Citizens turning 18 can enrol on electoral rolls and download an official digital e-EPIC identity card for free.",
        hi: "18 वर्ष की आयु पूरी करने वाले नागरिक मतदाता सूची में पंजीकरण करा सकते हैं और मुफ्त में आधिकारिक डिजिटल ई-एपिक कार्ड डाउनलोड कर सकते हैं।",
        bn: "১৮ বছর পূর্ণ হওয়া নাগরিকরা ভোটার তালিকায় নাম নথিভুক্ত করতে পারেন এবং বিনামূল্যে অফিসিয়াল ডিজিটাল e-EPIC কার্ড ডাউনলোড করতে পারেন।",
        ta: "18 வயதை எட்டிய குடிமக்கள் வாக்காளர் பட்டியலில் பதிவு செய்து அதிகாரப்பூர்வ டிஜிட்டல் e-EPIC அட்டையை இலவசமாகப் பதிவிறக்கலாம்.",
      },
      officialSource: "Election Commission of India",
      sourceUrl: "https://voters.eci.gov.in",
    });
  } else if (lifeStage === "pwd") {
    matches.push({
      serviceId: "swavlamban-udid-card",
      relevanceBadge: {
        en: "Legal Disability Rights & Smart Card",
        hi: "दिव्यांग अधिकार और स्मार्ट कार्ड",
        bn: "প্রতিবন্ধী অধিকার ও স্মার্ট কার্ড",
        ta: "மாற்றுத்திறனாளி உரிமைகள் & ஸ்மார்ட் கார்டு",
      },
      rationale: {
        en: "The UDID card provides a single national document for persons with disabilities, ensuring seamless verification for travel concessions, pensions, and medical benefits.",
        hi: "यूडीआईडी कार्ड दिव्यांगजनों के लिए एकल राष्ट्रीय दस्तावेज प्रदान करता है, जिससे यात्रा छूट, पेंशन और चिकित्सा लाभों के लिए सत्यापन आसान होता है।",
        bn: "UDID কার্ড প্রতিবন্ধী ব্যক্তিদের জন্য একটি একক জাতীয় পরিচয়পত্র প্রদান করে, যা ভ্রমণ ছাড়, পেনশন এবং চিকিৎসার সুযোগ নিশ্চিত করে।",
        ta: "UDID அட்டை மாற்றுத்திறனாளிகளுக்கு ஒரே தேசிய ஆவணத்தை வழங்குகிறது, இது பயணச் சலுகைகள் மற்றும் ஓய்வூதியங்களை உறுதி செய்கிறது.",
      },
      officialSource: "Department of Empowerment of Persons with Disabilities",
      sourceUrl: "https://swavlambancard.gov.in",
    });

    matches.push({
      serviceId: "create-abha-id",
      relevanceBadge: {
        en: "Accessible Digital Medical Records",
        hi: "सुलभ डिजिटल मेडिकल रिकॉर्ड",
        bn: "সহজলভ্য ডিজিটাল মেডিকেল রেকর্ড",
        ta: "அணுகக்கூடிய டிஜிட்டல் மருத்துவ பதிவுகள்",
      },
      rationale: {
        en: "ABHA creates a 14-digit digital health ID to link medical history, diagnostic reports, and disability evaluations with healthcare providers.",
        hi: "आभा (ABHA) 14 अंकों का डिजिटल स्वास्थ्य आईडी बनाता है जो चिकित्सा इतिहास, जांच रिपोर्ट और दिव्यांगता मूल्यांकन को डॉक्टरों से जोड़ता है।",
        bn: "ABHA একটি ১৪ সংখ্যার ডিজিটাল স্বাস্থ্য আইডি তৈরি করে যা চিকিৎসা ইতিহাস এবং ডায়াগনস্টিক রিপোর্টগুলিকে স্বাস্থ্য প্রদানকারীদের সাথে সংযুক্ত করে।",
        ta: "ABHA 14 இலக்க டிஜிட்டல் சுகாதார அடையாளத்தை உருவாக்குகிறது, இது மருத்துவ வரலாறு மற்றும் அறிக்கைகளை இணைக்கிறது.",
      },
      officialSource: "National Health Authority",
      sourceUrl: "https://abdm.gov.in",
    });

    matches.push({
      serviceId: "digilocker-account-setup",
      relevanceBadge: {
        en: "Digital Disability Certificate Access",
        hi: "डिजिटल दिव्यांगता प्रमाण पत्र",
        bn: "ডিজিটাল প্রতিবন্ধী শংসাপত্র অ্যাক্সেস",
        ta: "டிஜிட்டல் மாற்றுத்திறனாளி சான்றிதழ் அணுகல்",
      },
      rationale: {
        en: "Access verified digital copies of disability certificates and medical assessment reports without carrying paper originals.",
        hi: "मूल कागजात साथ रखे बिना दिव्यांगता प्रमाण पत्र और मेडिकल रिपोर्ट की सत्यापित डिजिटल प्रतियां प्राप्त करें।",
        bn: "কাগজের মূল কপি বহন না করেই প্রতিবন্ধী শংসাপত্র এবং মেডিকেল রিপোর্টের যাচাইকৃত ডিজিটাল কপি অ্যাক্সেস করুন।",
        ta: "காகித அசல்களை எடுத்துச் செல்லாமல் மாற்றுத்திறனாளி சான்றிதழ்களின் டிஜிட்டல் நகல்களை அணுகவும்.",
      },
      officialSource: "Digital India Corporation",
      sourceUrl: "https://digilocker.gov.in",
    });
  } else if (lifeStage === "senior") {
    matches.push({
      serviceId: "epf-passbook-claim-status",
      relevanceBadge: {
        en: "Retirement Savings & Pension Status",
        hi: "सेवानिवृत्ति बचत और पेंशन स्थिति",
        bn: "অবসর সঞ্চয় ও পেনশন স্থিতি",
        ta: "ஓய்வூதிய சேமிப்பு மற்றும் நிலை",
      },
      rationale: {
        en: "Check Employees' Provident Fund (EPF) balance, interest credits, and monthly pension claim status under EPS-95.",
        hi: "कर्मचारी भविष्य निधि (ईपीएफ) शेष राशि, ब्याज और ईपीएस-95 के तहत मासिक पेंशन दावे की स्थिति की जांच करें।",
        bn: "কর্মচারী ভবিষ্য তহবিল (EPF) ব্যালেন্স এবং EPS-95 এর অধীনে মাসিক পেনশন দাবির স্থিতি পরীক্ষা করুন।",
        ta: "வருங்கால வைப்பு நிதி (EPF) இருப்பு மற்றும் மாதாந்திர ஓய்வூதியக் கோரிக்கை நிலையைச் சரிபார்க்கவும்.",
      },
      officialSource: "Employees' Provident Fund Organisation",
      sourceUrl: "https://passbook.epfindia.gov.in",
    });

    matches.push({
      serviceId: "pm-jan-dhan-yojana-account",
      relevanceBadge: {
        en: "Zero-Maintenance Banking Account",
        hi: "शून्य-रखरखाव बैंक खाता",
        bn: "শূন্য-রক্ষণাবেক্ষণ ব্যাংক অ্যাকাউন্ট",
        ta: "பூஜ்ஜிய பராமரிப்பு வங்கிக் கணக்கு",
      },
      rationale: {
        en: "PMJDY accounts have zero minimum balance requirements, free cheque/debit facilities, and easy direct deposit of pensions and welfare grants.",
        hi: "पीएमजेडीवाई खातों में न्यूनतम शेष राशि की कोई आवश्यकता नहीं होती है और पेंशन व सरकारी सहायता सीधे जमा होती है।",
        bn: "PMJDY অ্যাকাউন্টে কোনো ন্যূনতম ব্যালেন্সের প্রয়োজন নেই এবং পেনশন সরাসরি জমা হয়।",
        ta: "PMJDY கணக்குகளுக்கு குறைந்தபட்ச இருப்பு தேவையில்லை மற்றும் ஓய்வூதியங்கள் எளிதாக வரவு வைக்கப்படும்.",
      },
      officialSource: "Ministry of Finance",
      sourceUrl: "https://pmjdy.gov.in",
    });

    matches.push({
      serviceId: "create-abha-id",
      relevanceBadge: {
        en: "Lifelong Health History Record",
        hi: "आजीवन स्वास्थ्य इतिहास रिकॉर्ड",
        bn: "আজীবন স্বাস্থ্য ইতিহাস রেকর্ড",
        ta: "வாழ்நாள் சுகாதார வரலாறு பதிவு",
      },
      rationale: {
        en: "Organise prescriptions, lab tests, and doctor consultation notes into a secure digital health record for senior healthcare needs.",
        hi: "वरिष्ठ नागरिकों की स्वास्थ्य आवश्यकताओं के लिए नुस्खे, लैब रिपोर्ट और डॉक्टरों के परामर्श नोट्स को डिजिटल रूप में व्यवस्थित करें।",
        bn: "বয়স্কদের স্বাস্থ্যসেবার জন্য প্রেসক্রিপশন এবং ল্যাব টেস্টের রিপোর্ট একটি নিরাপদ ডিজিটাল রেকর্ডে সাজান।",
        ta: "மருத்துவ ஆலோசனைக் குறிப்புகள் மற்றும் அறிக்கைகளை பாதுகாப்பான டிஜிட்டல் சுகாதார பதிவில் ஒழுங்கமைக்கவும்.",
      },
      officialSource: "National Health Authority",
      sourceUrl: "https://abdm.gov.in",
    });
  } else {
    // family-general
    matches.push({
      serviceId: "birth-certificate-crs",
      relevanceBadge: {
        en: "Foundational Civil Record",
        hi: "बुनियादी नागरिक रिकॉर्ड",
        bn: "মৌলিক নাগরিক রেকর্ড",
        ta: "அடிப்படை குடிமைப் பதிவு",
      },
      rationale: {
        en: "Official birth registration under the Registration of Births and Deaths Act is the primary proof of age and citizenship for schools and passports.",
        hi: "जन्म और मृत्यु पंजीकरण अधिनियम के तहत आधिकारिक जन्म पंजीकरण स्कूलों और पासपोर्ट के लिए आयु और नागरिकता का प्राथमिक प्रमाण है।",
        bn: "জন্ম ও মৃত্যু নিবন্ধন আইনের অধীনে সরকারি জন্ম নিবন্ধন হল স্কুল ও পাসপোর্টের জন্য বয়স ও নাগরিকত্বের প্রাথমিক প্রমাণ।",
        ta: "பிறப்பு மற்றும் இறப்பு பதிவுச் சட்டத்தின் கீழ் பதிவு செய்வது வயது மற்றும் குடியுரிமைக்கான முதன்மை ஆதாரமாகும்.",
      },
      officialSource: "Office of the Registrar General of India",
      sourceUrl: "https://crsorgi.gov.in",
    });

    matches.push({
      serviceId: "aadhaar-pvc-card",
      relevanceBadge: {
        en: "Durable Official Identity Card",
        hi: "टिकाऊ आधिकारिक पहचान पत्र",
        bn: "টেকসই অফিসিয়াল পরিচয়পত্র",
        ta: "நீடித்த அதிகாரப்பூர்வ அடையாள அட்டை",
      },
      rationale: {
        en: "Order a secure, weather-resistant plastic PVC Aadhaar card directly from UIDAI with a digitally signed QR code and hologram for ₹50.",
        hi: "यूआईडीएआई से सीधे मात्र ₹50 में डिजिटल रूप से हस्ताक्षरित क्यूआर कोड और होलोग्राम वाला सुरक्षित प्लास्टिक पीवीसी आधार कार्ड ऑर्डर करें।",
        bn: "UIDAI থেকে সরাসরি মাত্র ৫০ টাকায় ডিজিটাল স্বাক্ষরিত কিউআর কোড এবং হলোগ্রাম সহ সুরক্ষিত পিভিসি আধার কার্ড অর্ডার করুন।",
        ta: "UIDAI இலிருந்து நேரடியாக ₹50 க்கு டிஜிட்டல் கையொப்பமிடப்பட்ட QR குறியீட்டுடன் கூடிய பாதுகாப்பான PVC ஆதார் அட்டையை ஆர்டர் செய்யவும்.",
      },
      officialSource: "Unique Identification Authority of India",
      sourceUrl: "https://uidai.gov.in",
    });

    matches.push({
      serviceId: "consumer-helpline-grievance",
      relevanceBadge: {
        en: "Consumer Protection & Redressal",
        hi: "उपभोक्ता संरक्षण और शिकायत निवारण",
        bn: "ভোক্তা সুরক্ষা ও প্রতিকার",
        ta: "நுகர்வோர் பாதுகாப்பு மற்றும் தீர்வு",
      },
      rationale: {
        en: "Lodge official consumer complaints against defective goods, unfair trade practices, or deficiency in services without hiring an advocate.",
        hi: "वकील के बिना ही दोषपूर्ण सामान, अनुचित व्यापार प्रथाओं या सेवा में कमी के खिलाफ आधिकारिक उपभोक्ता शिकायत दर्ज करें।",
        bn: "আইনজীবী ছাড়াই ত্রুটিপূর্ণ পণ্য বা সেবার ঘাটতির বিরুদ্ধে সরকারি ভোক্তা অভিযোগ দায়ের করুন।",
        ta: "வழக்கறிஞர் இல்லாமல் குறைபாடுள்ள பொருட்கள் அல்லது சேவைகளுக்கு எதிராக அதிகாரப்பூர்வ நுகர்வோர் புகாரைப் பதிவு செய்யவும்.",
      },
      officialSource: "Department of Consumer Affairs",
      sourceUrl: "https://consumerhelpline.gov.in",
    });
  }

  // 2. Household Need Secondary Enhancements (avoiding duplicates)
  const existingIds = new Set(matches.map((m) => m.serviceId));

  if (householdNeed === "financial-welfare" && !existingIds.has("pm-suraksha-bima-yojana")) {
    matches.push({
      serviceId: "pm-suraksha-bima-yojana",
      relevanceBadge: {
        en: "Recommended Scheme",
        hi: "अनुशंसित योजना",
        bn: "প্রস্তাবিত প্রকল্প",
        ta: "பரிந்துரைக்கப்பட்ட திட்டம்",
      },
      rationale: {
        en: "Affordable accidental death and disability coverage for ₹20/year.",
        hi: "मात्र ₹20/वर्ष में किफायती दुर्घटना मृत्यु और दिव्यांगता सुरक्षा।",
        bn: "বছরে মাত্র ২০ টাকায় সাশ্রয়ী দুর্ঘটনাজনিত মৃত্যু এবং প্রতিবন্ধী সুরক্ষা।",
        ta: "ஆண்டுக்கு ₹20 இல் விபத்து மரணம் மற்றும் இயலாமை பாதுகாப்பு.",
      },
      officialSource: "Department of Financial Services",
      sourceUrl: "https://jansuraksha.gov.in",
    });
  } else if (
    householdNeed === "transport-education" &&
    !existingIds.has("driving-licence-renewal")
  ) {
    matches.push({
      serviceId: "driving-licence-renewal",
      relevanceBadge: {
        en: "Mobility & Transport",
        hi: "गतिशीलता और परिवहन",
        bn: "গতিশীলতা ও পরিবহন",
        ta: "இயக்கம் மற்றும் போக்குவரத்து",
      },
      rationale: {
        en: "Renew your driving licence online via SARATHI Parivahan without visiting the RTO in advance.",
        hi: "आरटीओ कार्यालय के चक्कर काटे बिना सारथी परिवहन के माध्यम से अपने ड्राइविंग लाइसेंस का ऑनलाइन नवीनीकरण करें।",
        bn: "RTO তে না গিয়েই সারথি পরিবহনের মাধ্যমে অনলাইনে আপনার ড্রাইভিং লাইসেন্স পুনর্নবীকরণ করুন।",
        ta: "RTO-விற்குச் செல்லாமல் SARATHI பரிவஹன் வழியாக உங்கள் ஓட்டுநர் உரிமத்தை ஆன்லைனில் புதுப்பிக்கவும்.",
      },
      officialSource: "Ministry of Road Transport and Highways",
      sourceUrl: "https://sarathi.parivahan.gov.in",
    });
  } else if (householdNeed === "health-housing" && !existingIds.has("create-abha-id")) {
    matches.push({
      serviceId: "create-abha-id",
      relevanceBadge: {
        en: "Healthcare Identification",
        hi: "स्वास्थ्य सेवा पहचान",
        bn: "স্বাস্থ্যসেবা সনাক্তকরণ",
        ta: "சுகாதார அடையாளம்",
      },
      rationale: {
        en: "Create an official ABHA health account to access hospital services digitally.",
        hi: "अस्पतालों में डिजिटल सेवाओं का उपयोग करने के लिए आधिकारिक आभा स्वास्थ्य खाता बनाएं।",
        bn: "হাসপাতালগুলিতে ডিজিটাল পরিষেবা অ্যাক্সেস করতে একটি অফিসিয়াল ABHA স্বাস্থ্য অ্যাকাউন্ট তৈরি করুন।",
        ta: "மருத்துவமனை சேவைகளை டிஜிட்டல் முறையில் அணுக அதிகாரப்பூர்வ ABHA சுகாதார கணக்கை உருவாக்கவும்.",
      },
      officialSource: "National Health Authority",
      sourceUrl: "https://abdm.gov.in",
    });
  } else if (
    householdNeed === "identity-documents" &&
    !existingIds.has("digilocker-account-setup")
  ) {
    matches.push({
      serviceId: "digilocker-account-setup",
      relevanceBadge: {
        en: "Digital Documents & Records",
        hi: "डिजिटल दस्तावेज और रिकॉर्ड",
        bn: "ডিজিটাল নথি ও রেকর্ড",
        ta: "டிஜிட்டல் ஆவணங்கள் & பதிவுகள்",
      },
      rationale: {
        en: "Store and access government certificates, driving licences, and vehicle RCs securely in DigiLocker.",
        hi: "सरकारी प्रमाण पत्र, ड्राइविंग लाइसेंस और वाहन आरसी को डिजिलॉकर में सुरक्षित रूप से रखें।",
        bn: "সরকারি শংসাপত্র, ড্রাইভিং লাইসেন্স এবং যানবাহনের আরসি নিরাপদে ডিজিলকারে সংরক্ষণ ও অ্যাক্সেস করুন।",
        ta: "அரசு சான்றிதழ்கள், ஓட்டுநர் உரிமங்கள் மற்றும் வாகன ஆர்சிகளை பாதுகாப்பாக அணுகவும்.",
      },
      officialSource: "Digital India Corporation",
      sourceUrl: "https://digilocker.gov.in",
    });
  }

  return matches.map((m) => {
    const meta = SERVICE_META[m.serviceId] || {
      ecosystem: "government-and-citizen" as LifeEcosystem,
      serviceTitle: {
        en: m.serviceId,
        hi: m.serviceId,
        bn: m.serviceId,
        ta: m.serviceId,
      },
    };
    return {
      ...m,
      ecosystem: meta.ecosystem,
      serviceTitle: meta.serviceTitle,
    };
  });
}

/**
 * Generates CSC (Common Service Centre) Physical Preparation Pack items
 * for a list of matched service IDs.
 */
export interface CscPrepItem {
  category: "originals" | "photocopies" | "photographs" | "fees";
  item: Record<Locale, string>;
  notes: Record<Locale, string>;
}

export function generateCscPrepPack(serviceIds: string[]): CscPrepItem[] {
  const items: CscPrepItem[] = [
    {
      category: "originals",
      item: {
        en: "Original Aadhaar Card (with mobile linked for OTP verification)",
        hi: "मूल आधार कार्ड (ओटीपी सत्यापन के लिए मोबाइल नंबर लिंक होना चाहिए)",
        bn: "মূল আধার কার্ড (ওটিপি যাচাইয়ের জন্য মোবাইল লিঙ্ক থাকতে হবে)",
        ta: "அசல் ஆதார் அட்டை (OTP சரிபார்ப்புக்கு மொபைல் இணைக்கப்பட்டிருக்க வேண்டும்)",
      },
      notes: {
        en: "Mandatory for identity verification across all central and state portals.",
        hi: "सभी केंद्रीय और राज्य पोर्टलों पर पहचान सत्यापन के लिए अनिवार्य।",
        bn: "সমস্ত কেন্দ্রীয় ও রাজ্য পোর্টালে পরিচয় যাচাইয়ের জন্য বাধ্যতামূলক।",
        ta: "அனைத்து போர்ட்டல்களிலும் அடையாள சரிபார்ப்புக்கு கட்டாயம்.",
      },
    },
    {
      category: "photocopies",
      item: {
        en: "Self-Attested Photocopies of Aadhaar and Bank Passbook (2 sets)",
        hi: "आधार और बैंक पासबुक की स्व-सत्यापित फोटोकॉपी (2 सेट)",
        bn: "আধার এবং ব্যাংক পাসবুকের স্ব-প্রত্যয়িত ফটোকপি (২ সেট)",
        ta: "ஆதார் மற்றும் வங்கி பாஸ்புக்கின் சுய சான்றளிக்கப்பட்ட நகல்கள் (2 செட்கள்)",
      },
      notes: {
        en: "Sign your name with date on the lower half of each photocopy.",
        hi: "प्रत्येक फोटोकॉपी के निचले हिस्से में तारीख के साथ अपना हस्ताक्षर करें।",
        bn: "প্রতিটি ফটোকপির নিচের অংশে তারিখ সহ স্বাক্ষর করুন।",
        ta: "ஒவ்வொரு நகலின் கீழ்ப் பகுதியிலும் தேதியுடன் கையொப்பமிடவும்.",
      },
    },
    {
      category: "photographs",
      item: {
        en: "Recent Passport-Size Color Photographs (3 copies, white background)",
        hi: "हाल ही की पासपोर्ट साइज रंगीन फोटो (3 प्रतियां, सफेद पृष्ठभूमि)",
        bn: "সাম্প্রতিক পাসপোর্ট সাইজের রঙিন ছবি (৩ কপি, সাদা ব্যাকগ্রাউন্ড)",
        ta: "சமீபத்திய பாஸ்போர்ட் அளவு வண்ண புகைப்படங்கள் (3 பிரதிகள், வெள்ளை பின்னணி)",
      },
      notes: {
        en: "Required for physical application forms and centre filing records.",
        hi: "भौतिक आवेदन प्रपत्रों और केंद्र फाइलिंग रिकॉर्ड के लिए आवश्यक।",
        bn: "কাগজের আবেদনপত্র এবং রেকর্ডের জন্য প্রয়োজনীয়।",
        ta: "விண்ணப்ப படிவங்கள் மற்றும் பதிவுகளுக்கு தேவை.",
      },
    },
  ];

  // Specific service attachments
  if (serviceIds.includes("pm-kisan-status") || serviceIds.includes("pm-jan-dhan-yojana-account")) {
    items.push({
      category: "originals",
      item: {
        en: "Original Bank Passbook showing IFSC code and Account Number",
        hi: "मूल बैंक पासबुक जिसमें आईएफएससी कोड और खाता संख्या स्पष्ट हो",
        bn: "IFSC কোড এবং অ্যাকাউন্ট নম্বর সহ মূল ব্যাংক পাসবুক",
        ta: "IFSC குறியீடு மற்றும் கணக்கு எண்ணைக் காட்டும் அசல் வங்கி பாஸ்புக்",
      },
      notes: {
        en: "Required for Direct Benefit Transfer (DBT) verification.",
        hi: "प्रत्यक्ष लाभ हस्तांतरण (DBT) सत्यापन के लिए आवश्यक।",
        bn: "সরাসরি সুবিধা স্থানান্তর (DBT) যাচাইয়ের জন্য প্রয়োজনীয়।",
        ta: "நேரடி பயன் பரிமாற்ற (DBT) சரிபார்ப்புக்கு தேவை.",
      },
    });
  }

  if (serviceIds.includes("swavlamban-udid-card")) {
    items.push({
      category: "originals",
      item: {
        en: "Government Hospital Medical Disability Assessment Report",
        hi: "सरकारी अस्पताल की मेडिकल दिव्यांगता मूल्यांकन रिपोर्ट",
        bn: "সরকারি হাসপাতালের মেডিকেল প্রতিবন্ধী মূল্যায়ন রিপোর্ট",
        ta: "அரசு மருத்துவமனை மருத்துவ மாற்றுத்திறனாளி மதிப்பீட்டு அறிக்கை",
      },
      notes: {
        en: "Signed by the Medical Board / Chief Medical Officer.",
        hi: "मेडिकल बोर्ड / मुख्य चिकित्सा अधिकारी द्वारा हस्ताक्षरित।",
        bn: "মেডিকেল বোর্ড / চিফ মেডিকেল অফিসার দ্বারা স্বাক্ষরিত।",
        ta: "மருத்துவக் குழு / முதன்மை மருத்துவ அலுவலரால் கையொப்பமிடப்பட்டது.",
      },
    });
  }

  if (serviceIds.includes("parivahan-rc-transfer")) {
    items.push({
      category: "originals",
      item: {
        en: "Form 29 & Form 30 (Duly signed by seller and buyer) + Original RC",
        hi: "फॉर्म 29 और फॉर्म 30 (विक्रेता और खरीदार द्वारा हस्ताक्षरित) + मूल आरसी",
        bn: "ফর্ম ২৯ ও ফর্ম ৩০ (ক্রেতা ও বিক্রেতার স্বাক্ষর সহ) + মূল আরসি",
        ta: "படிவம் 29 மற்றும் 30 (விற்பனையாளர் மற்றும் வாங்குபவர் கையொப்பமிட்டது) + அசல் ஆர்சி",
      },
      notes: {
        en: "Valid vehicle insurance policy and PUC certificate must be attached.",
        hi: "वैध वाहन बीमा पॉलिसी और प्रदूषण प्रमाण पत्र (PUC) संलग्न होना चाहिए।",
        bn: "বৈধ যানবাহন বীমা পলিসি এবং পিইউসি শংসাপত্র সংযুক্ত থাকতে হবে।",
        ta: "செல்லுபடியாகும் வாகனக் காப்பீடு மற்றும் PUC சான்றிதழ் இணைக்கப்பட வேண்டும்.",
      },
    });
  }

  items.push({
    category: "fees",
    item: {
      en: "Cash or UPI for CSC Authorised Service Charge (Approx ₹30 - ₹50)",
      hi: "सीएससी अधिकृत सेवा शुल्क के लिए नकद या यूपीआई (लगभग ₹30 - ₹50)",
      bn: "CSC অনুমোদিত পরিষেবা চার্জের জন্য নগদ বা UPI (আনুমানিক ₹৩০ - ₹৫০)",
      ta: "CSC அங்கீகரிக்கப்பட்ட கட்டணத்திற்கு பணம் அல்லது UPI (சுமார் ₹30 - ₹50)",
    },
    notes: {
      en: "Always request an official system-generated receipt. Government registrations like e-Shram are free of government fees.",
      hi: "हमेशा सिस्टम द्वारा जनरेट की गई आधिकारिक रसीद मांगें। ई-श्रम जैसे सरकारी पंजीकरण सरकारी शुल्क से मुक्त हैं।",
      bn: "সর্বদা কম্পিউটার নির্মিত রসিদ গ্রহণ করুন। ই-শ্রমের মতো নিবন্ধনগুলিতে কোনো সরকারি ফি নেই।",
      ta: "எப்போதும் கணினி ரசீதை கோருங்கள். இ-ஷ்ராம் போன்ற பதிவுகளுக்கு அரசு கட்டணம் இலவசம்.",
    },
  });

  return items;
}
