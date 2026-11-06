/**
 * GovEase - Personalized Eligibility Check & Citizen Matching Engine
 * 100% Client-Side, Deterministic, Zero-Knowledge Privacy Architecture
 * Strictly conforms to the Digital Personal Data Protection (DPDP) Act, 2023.
 */

import { Locale } from "../context/I18nContext";

export type GenderType = "all" | "male" | "female" | "transgender";
export type SocialCategoryType = "all" | "general" | "obc" | "sc" | "st" | "ews";
export type DisabilityType =
  "none" | "locomotor" | "visual" | "hearing" | "intellectual" | "multiple";
export type EducationLevelType =
  "below_10th" | "10th_pass" | "12th_pass" | "diploma_iti" | "undergraduate" | "postgraduate";
export type OccupationType =
  | "student"
  | "farmer"
  | "agricultural_labourer"
  | "unorganised_worker"
  | "salaried"
  | "self_employed"
  | "unemployed"
  | "retired";
export type IncomeRangeType =
  "below_1lakh" | "1lakh_to_2_5lakh" | "2_5lakh_to_5lakh" | "5lakh_to_8lakh" | "above_8lakh";
export type RationCardType = "bpl" | "aay" | "phh" | "apl" | "none";
export type LandholdingType = "landless" | "marginal" | "small" | "medium_large" | "not_applicable";
export type AreaType = "rural" | "urban" | "semi_urban";

export interface CitizenProfile {
  age: number;
  gender: GenderType;
  socialCategory: SocialCategoryType;
  disabilityStatus: DisabilityType;
  educationLevel: EducationLevelType;
  occupation: OccupationType;
  familyIncome: IncomeRangeType;
  rationCard: RationCardType;
  landholding: LandholdingType;
  state: string;
  district: string;
  areaType: AreaType;
}

export interface MatchedSchemeResult {
  serviceId: string;
  title: Record<Locale, string>;
  category: string;
  officialDomain: string;
  officialUrl: string;
  matchScore: number; // 0 - 100
  qualificationReasons: Record<Locale, string[]>;
  highlightBenefit: Record<Locale, string>;
  applicationActionUrl: string;
}

export const DEFAULT_CITIZEN_PROFILE: CitizenProfile = {
  age: 21,
  gender: "all",
  socialCategory: "general",
  disabilityStatus: "none",
  educationLevel: "undergraduate",
  occupation: "student",
  familyIncome: "1lakh_to_2_5lakh",
  rationCard: "apl",
  landholding: "not_applicable",
  state: "West Bengal",
  district: "Kolkata",
  areaType: "urban",
};

export const QUICK_DEMO_PROFILES: {
  id: string;
  label: Record<Locale, string>;
  icon: string;
  profile: CitizenProfile;
}[] = [
  {
    id: "student-scholarships",
    icon: "🎓",
    label: {
      en: "Student / Scholarships",
      hi: "विद्यार्थी / छात्रवृत्तियां",
      bn: "ছাত্র / স্কলারশিপ",
      ta: "மாணவர் / உதவித்தொகை",
    },
    profile: {
      age: 20,
      gender: "female",
      socialCategory: "obc",
      disabilityStatus: "none",
      educationLevel: "undergraduate",
      occupation: "student",
      familyIncome: "1lakh_to_2_5lakh",
      rationCard: "apl",
      landholding: "not_applicable",
      state: "West Bengal",
      district: "North 24 Parganas",
      areaType: "semi_urban",
    },
  },
  {
    id: "agriculture-livelihood",
    icon: "🌾",
    label: {
      en: "Agriculture & Livelihood",
      hi: "कृषि व आजीविका",
      bn: "কৃষি ও জীবিকা",
      ta: "விவசாயம் & வாழ்வாதாரம்",
    },
    profile: {
      age: 46,
      gender: "male",
      socialCategory: "general",
      disabilityStatus: "none",
      educationLevel: "10th_pass",
      occupation: "farmer",
      familyIncome: "below_1lakh",
      rationCard: "bpl",
      landholding: "marginal",
      state: "Uttar Pradesh",
      district: "Varanasi",
      areaType: "rural",
    },
  },
  {
    id: "women-startups",
    icon: "👩",
    label: {
      en: "Women & Startups",
      hi: "महिला व स्वरोजगार",
      bn: "মহিলা ও উদ্যোগ",
      ta: "பெண்கள் & தொழில்முனைவோர்",
    },
    profile: {
      age: 28,
      gender: "female",
      socialCategory: "ews",
      disabilityStatus: "none",
      educationLevel: "undergraduate",
      occupation: "self_employed",
      familyIncome: "1lakh_to_2_5lakh",
      rationCard: "apl",
      landholding: "not_applicable",
      state: "Maharashtra",
      district: "Pune",
      areaType: "urban",
    },
  },
  {
    id: "accessibility-divyangjan",
    icon: "♿",
    label: {
      en: "Accessibility & Inclusion",
      hi: "दिव्यांगजन सहायता",
      bn: "প্রতিবন্ধী কল্যাণ",
      ta: "மாற்றுத்திறனாளிகள்",
    },
    profile: {
      age: 24,
      gender: "male",
      socialCategory: "general",
      disabilityStatus: "locomotor",
      educationLevel: "12th_pass",
      occupation: "unemployed",
      familyIncome: "below_1lakh",
      rationCard: "bpl",
      landholding: "not_applicable",
      state: "Tamil Nadu",
      district: "Chennai",
      areaType: "urban",
    },
  },
  {
    id: "informal-gig-worker",
    icon: "👷",
    label: {
      en: "Informal & Gig Worker",
      hi: "असंगठित व दैनिक श्रमिक",
      bn: "অসংগঠিত ও গিগ কর্মী",
      ta: "அமைப்புசாரா தொழிலாளி",
    },
    profile: {
      age: 32,
      gender: "male",
      socialCategory: "sc",
      disabilityStatus: "none",
      educationLevel: "below_10th",
      occupation: "unorganised_worker",
      familyIncome: "1lakh_to_2_5lakh",
      rationCard: "bpl",
      landholding: "landless",
      state: "Delhi",
      district: "Central Delhi",
      areaType: "urban",
    },
  },
];

export const ALL_INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/**
 * Deterministic multi-attribute matching engine.
 * Evaluates citizen profile against all registered public schemes.
 */
export function evaluateCitizenEligibility(profile: CitizenProfile): MatchedSchemeResult[] {
  const matches: MatchedSchemeResult[] = [];

  const isLowIncome =
    profile.familyIncome === "below_1lakh" || profile.familyIncome === "1lakh_to_2_5lakh";
  const isMidIncome = profile.familyIncome === "2_5lakh_to_5lakh";
  const hasSubsidizedRation =
    profile.rationCard === "bpl" || profile.rationCard === "aay" || profile.rationCard === "phh";
  const isAffirmativeCategory =
    profile.socialCategory === "sc" ||
    profile.socialCategory === "st" ||
    profile.socialCategory === "obc" ||
    profile.socialCategory === "ews";
  const isStudent =
    profile.occupation === "student" ||
    profile.educationLevel === "10th_pass" ||
    profile.educationLevel === "12th_pass" ||
    profile.educationLevel === "undergraduate" ||
    profile.educationLevel === "postgraduate";

  // 1. National Scholarship Portal (NSP OTR)
  if (isStudent && (isLowIncome || isMidIncome || isAffirmativeCategory)) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Enrolled in formal education stream",
        "Family income meets central scholarship ceilings",
        isAffirmativeCategory
          ? "Qualifies for designated post-matric affirmative scholarships"
          : "Qualifies for Central Sector Scheme of Scholarship",
      ],
      hi: [
        "मान्यता प्राप्त शैक्षणिक पाठ्यक्रम में नामांकित",
        "पारिवारिक आय केंद्रीय छात्रवृत्ति सीमा के अनुकूल है",
        isAffirmativeCategory
          ? "पोस्ट-मैट्रिक विशेष छात्रवृत्ति हेतु योग्य"
          : "सेंट्रल सेक्टर छात्रवृत्ति योजना हेतु योग्य",
      ],
      bn: [
        "অনুমোদিত শিক্ষাক্রমে পাঠরত",
        "পারিবারিক আয় সরকারি স্কলারশিপ সীমার মধ্যে",
        isAffirmativeCategory
          ? "পোস্ট-ম্যাট্রিক সংরক্ষিত স্কলারশিপের আওতাভুক্ত"
          : "সেন্ট্রাল সেক্টর স্কলারশিপ স্কিমের আওতাভুক্ত",
      ],
      ta: [
        "அங்கீகரிக்கப்பட்ட கல்வி வகுப்பில் பயில்கிறார்",
        "குடும்ப வருமானம் உதவித்தொகை வரம்புக்குள் உள்ளது",
        "மத்திய அரசு மற்றும் மாநில உதவித்தொகைக்கு தகுதியுடையவர்",
      ],
    };

    matches.push({
      serviceId: "nsp-scholarship-discovery",
      title: {
        en: "National Scholarship Portal (NSP OTR)",
        hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP OTR)",
        bn: "জাতীয় স্কলারশিপ পোর্টাল (NSP)",
        ta: "தேசிய உதவித்தொகை போர்டல் (NSP)",
      },
      category: "Education & Scholarships",
      officialDomain: "scholarships.gov.in",
      officialUrl: "https://scholarships.gov.in/",
      matchScore: 100,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Annual Direct Financial Aid up to ₹20,000 via DBT",
        hi: "DBT द्वारा ₹20,000 तक की प्रत्यक्ष वार्षिक वित्तीय सहायता",
        bn: "DBT মারফত বার্ষিক ₹২০,০০০ পর্যন্ত সরাসরি আর্থিক সহায়তা",
        ta: "ஆண்டுக்கு ₹20,000 வரை நேரடி வங்கி உதவித்தொகை",
      },
      applicationActionUrl: "/services/nsp-scholarship-discovery",
    });
  }

  // 2. PM Kisan Samman Nidhi
  if (
    profile.occupation === "farmer" ||
    profile.occupation === "agricultural_labourer" ||
    profile.landholding === "marginal" ||
    profile.landholding === "small"
  ) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Identified as small/marginal cultivating household",
        "Eligible under PM-Kisan operational guidelines",
        `Resident of agricultural state: ${profile.state}`,
      ],
      hi: [
        "लघु एवं सीमांत कृषक परिवार के रूप में चिह्नित",
        "पीएम-किसान परिचालन दिशानिर्देशों के तहत पात्र",
        `कृषि राज्य के निवासी: ${profile.state}`,
      ],
      bn: [
        "ক্ষুদ্র ও প্রান্তিক কৃষক পরিবারের আওতাভুক্ত",
        "পিএম-কিসান নির্দেশিকা অনুযায়ী যোগ্য",
        `রাজ্যের যোগ্য কৃষক: ${profile.state}`,
      ],
      ta: [
        "சிறு மற்றும் குறு விவசாய குடும்பமாக தகுதி",
        "PM-Kisan திட்ட வழிகாட்டுதலின் கீழ் தகுதி",
        "வருடாந்திர நேரடி உதவி பெறுபவர்",
      ],
    };

    matches.push({
      serviceId: "pm-kisan-status",
      title: {
        en: "PM-Kisan Samman Nidhi & Farmer eKYC",
        hi: "पीएम-किसान सम्मान निधि व किसान eKYC",
        bn: "পিএম-কিসান সম্মান নিধি ও কৃষক eKYC",
        ta: "PM-கிசான் சம்மான் நிதி & இ-KYC",
      },
      category: "Agriculture & Livelihood",
      officialDomain: "pmkisan.gov.in",
      officialUrl: "https://pmkisan.gov.in/",
      matchScore: 100,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Assured ₹6,000 per year in 3 equal installments into Aadhaar-linked bank",
        hi: "आधार लिंक बैंक खाते में प्रतिवर्ष ₹6,000 (3 समान किश्तों में)",
        bn: "প্রতি বছর ₹৬,০০০ সরাসরি আধার লিঙ্কযুক্ত ব্যাংক একাউন্টে",
        ta: "ஆண்டுக்கு ₹6,000 மூன்று தவணைகளில் வங்கி கணக்கில்",
      },
      applicationActionUrl: "/services/pm-kisan-status",
    });
  }

  // 3. e-Shram Card Registration (Unorganised Workers)
  if (
    (profile.occupation === "unorganised_worker" ||
      profile.occupation === "agricultural_labourer" ||
      profile.occupation === "self_employed" ||
      isLowIncome) &&
    profile.age >= 16 &&
    profile.age <= 59 &&
    profile.occupation !== "salaried"
  ) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Age between 16 and 59 years",
        "Engaged in informal or gig sector without EPFO/ESIC coverage",
        "Family income falls under unorganised safety net",
      ],
      hi: [
        "आयु 16 से 59 वर्ष के मध्य",
        "ईपीएफओ/ईएसआईसी कवरेज के बिना असंगठित या गिग क्षेत्र में कार्यरत",
        "पारिवारिक आय सामाजिक सुरक्षा सीमा के अनुकूल",
      ],
      bn: [
        "বয়স ১৬ থেকে ৫৯ বছরের মধ্যে",
        "EPFO/ESIC ছাড়া অসংগঠিত বা গিগ ক্ষেত্রে কর্মরত",
        "সামাজিক সুরক্ষার আওতাভুক্ত",
      ],
      ta: [
        "வயது 16 முதல் 59 வரை",
        "EPFO/ESIC இல்லாத அமைப்புசாரா தொழிலாளி",
        "மத்திய அரசின் சமூக பாதுகாப்பு அட்டை",
      ],
    };

    matches.push({
      serviceId: "eshram-card-registration",
      title: {
        en: "e-Shram Worker Registration & National UAN",
        hi: "ई-श्रम श्रमिक पंजीकरण व 12-अंकीय UAN",
        bn: "ই-শ্রম শ্রমিক নিবন্ধন ও ১২-সংখ্যার UAN",
        ta: "இ-ஷ்ரம் தொழிலாளர் பதிவு & UAN",
      },
      category: "Finance & Welfare",
      officialDomain: "eshram.gov.in",
      officialUrl: "https://eshram.gov.in/",
      matchScore: 98,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Universal 12-Digit UAN + ₹2 Lakh Accidental Insurance Coverage",
        hi: "सार्वभौमिक 12-अंकीय UAN कार्ड + ₹2 लाख का दुर्घटना बीमा",
        bn: "১২-সংখ্যার স্থায়ী UAN কার্ড + ₹২ লক্ষের দুর্ঘটনা বীমা",
        ta: "12 இலக்க UAN அட்டை + ₹2 லட்சம் விபத்து காப்பீடு",
      },
      applicationActionUrl: "/services/eshram-card-registration",
    });
  }

  // 4. Swavlamban Unique Disability ID (UDID Smart Card)
  if (profile.disabilityStatus !== "none") {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Self-declared benchmark disability (Divyangjan status)",
        "Eligible for unified national UDID card under DEPwD",
        "Unlocks statutory transport concessions & assistive aids",
      ],
      hi: [
        "दिव्यांगजन प्रमाणन हेतु पात्र",
        "DEPwD के तहत राष्ट्रीय UDID कार्ड के लिए योग्य",
        "रेल/बस रियायतें एवं सहायक उपकरण प्राप्त करने का अधिकार",
      ],
      bn: [
        "স্বীকৃত বিশেষ চাহিদাসম্পন্ন (দিব্যাঙ্গ) নাগরিক",
        "জাতীয় UDID স্মার্ট কার্ডের জন্য উপযুক্ত",
        "ভ্রমণ ছাড় ও সহায়ক যন্ত্রপাতি পাওয়ার সুবিধা",
      ],
      ta: [
        "மாற்றுத்திறனாளிகளுக்கான தேசிய அட்டை",
        "UDID ஸ்மார்ட் கார்டு பெற தகுதியுடையவர்",
        "பயண கட்டண சலுகைகள் மற்றும் நலத்திட்டங்கள்",
      ],
    };

    matches.push({
      serviceId: "swavlamban-udid-card",
      title: {
        en: "Unique Disability ID (UDID Smart Card)",
        hi: "विशिष्ट दिव्यांगता पहचान पत्र (UDID कार्ड)",
        bn: "ইউনিক ডিজ্যাবিলিটি আইডি (UDID স্মার্ট কার্ড)",
        ta: "தனித்துவ மாற்றுத்திறனாளி அட்டை (UDID)",
      },
      category: "Citizen & Legal Identity",
      officialDomain: "swavlambancard.gov.in",
      officialUrl: "https://www.swavlambancard.gov.in/",
      matchScore: 100,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Single National Verification Card + Rail/Bus Concessions & Equipment Grants",
        hi: "एकल राष्ट्रीय सत्यापन कार्ड + रेल/बस रियायतें एवं उपकरण अनुदान",
        bn: "একক জাতীয় পরিচয়পত্র + ট্রেন/বাস ছাড় ও সরকারি অনুদান",
        ta: "நாடு தழுவிய செல்லுபடியாகும் அட்டை + பயண சலுகைகள்",
      },
      applicationActionUrl: "/services/swavlamban-udid-card",
    });

    // 4b. ADIP Scheme (Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances)
    matches.push({
      serviceId: "adip-disability-aids",
      title: {
        en: "ADIP Scheme - Free Assistive Devices & Appliances",
        hi: "एडिप योजना - निःशुल्क सहायक उपकरण एवं व्हीलचेयर",
        bn: "এডিপ প্রকল্প - বিনামূল্যে সহায়ক যন্ত্রপাতি ও ট্রাইসাইকেল",
        ta: "ADIP திட்டம் - இலவச உதவி உபகரணங்கள்",
      },
      category: "Citizen & Legal Identity",
      officialDomain: "alimco.in",
      officialUrl: "https://www.alimco.in/",
      matchScore: 95,
      qualificationReasons: {
        en: [
          "Benchmark disability status certified or reported",
          "Family income ceiling under ADIP welfare guidelines (below ₹2.5 Lakh)",
          "Direct supply of modern motorized tricycles, hearing aids & smart canes",
        ],
        hi: [
          "मान्यता प्राप्त दिव्यांगता प्रमाणन",
          "आय सीमा ₹2.5 लाख से कम",
          "मोटराइज्ड ट्राइसाइकिल, श्रवण यंत्र एवं कृत्रिम अंग निःशुल्क प्राप्त करने हेतु पात्र",
        ],
        bn: [
          "স্বীকৃত বিশেষ চাহিদাসম্পন্ন নাগরিক",
          "পারিবারিক আয় বার্ষিক ₹২.৫ লক্ষের মধ্যে",
          "বিনামূল্যে আধুনিক ট্রাইসাইকেল ও শ্রবণযন্ত্র সহায়তা",
        ],
        ta: [
          "சான்றளிக்கப்பட்ட மாற்றுத்திறனாளி தகுதி",
          "வருமான வரம்பு ₹2.5 லட்சத்திற்குள் உள்ளது",
          "இலவச நவீன உபகரணங்கள் மற்றும் சக்கர நாற்காலிகள்",
        ],
      },
      highlightBenefit: {
        en: "100% Free Motorized Tricycles, Hearing Aids, Prosthetics & Blind Smart Canes",
        hi: "100% निःशुल्क मोटराइज्ड ट्राइसाइकिल, श्रवण यंत्र व आधुनिक कृत्रिम अंग",
        bn: "১০০% বিনামূল্যে ট্রাইসাইকেল, শ্রবণযন্ত্র ও স্মার্ট ক্যান",
        ta: "100% இலவச சக்கர நாற்காலிகள் மற்றும் நவீன உபகரணங்கள்",
      },
      applicationActionUrl: "https://www.alimco.in/",
    });
  }

  // Women Specific Welfare & Enterprise Initiatives
  if (profile.gender === "female") {
    if (
      profile.occupation === "self_employed" ||
      profile.occupation === "unemployed" ||
      profile.age >= 18
    ) {
      matches.push({
        serviceId: "standup-india-women-entrepreneurs",
        title: {
          en: "Stand-Up India & Women Entrepreneurship Enterprise",
          hi: "स्टैंड-अप इंडिया व महिला उद्यमिता योजना",
          bn: "স্ট্যান্ড-আপ ইন্ডিয়া মহিলা উদ্যোগ সহায়তা",
          ta: "ஸ்டாண்ட்-அப் இந்தியா பெண்கள் தொழில் திட்டம்",
        },
        category: "Finance & Welfare",
        officialDomain: "standupmitra.in",
        officialUrl: "https://www.standupmitra.in/",
        matchScore: 96,
        qualificationReasons: {
          en: [
            "Female entrepreneur / business founder priority track",
            "Age 18+ eligible for greenfield enterprise financing",
            "Special collateral-free loan provisions under SIDBI/CGTMSE",
          ],
          hi: [
            "महिला उद्यमी / व्यवसाय संस्थापक प्राथमिकता ट्रैक",
            "18+ आयु वर्ग हेतु हरित उद्यम ऋण पात्रता",
            "सिडबी के अंतर्गत विशेष रियायती ब्याज दरें",
          ],
          bn: [
            "মহিলা উদ্যোক্তা অগ্রাধিকার সহায়তা",
            "১৮+ বয়সী মহিলাদের ব্যবসা শুরু করার সুবিধা",
            "SIDBI গ্যারান্টিযুক্ত ব্যাংক ঋণ সুবিধা",
          ],
          ta: [
            "பெண்கள் தொழில் முனைவோருக்கான முன்னுரிமை",
            "18+ வயதுடைய பசுமை நிறுவன நிதி தகுதி",
            "வங்கி கடன் உத்தரவாத சலுகைகள்",
          ],
        },
        highlightBenefit: {
          en: "Bank Loans between ₹10 Lakh to ₹1 Crore with collateral support",
          hi: "₹10 लाख से ₹1 करोड़ तक का बैंक ऋण (विशेष महिला रियायत)",
          bn: "₹১০ লক্ষ থেকে ₹১ কোটি পর্যন্ত ব্যাংক ঋণ সুবিধা",
          ta: "₹10 லட்சம் முதல் ₹1 கோடி வரை தொழில் கடன்",
        },
        applicationActionUrl: "https://www.standupmitra.in/",
      });
    }

    if (
      isStudent ||
      profile.educationLevel === "undergraduate" ||
      profile.educationLevel === "diploma_iti"
    ) {
      matches.push({
        serviceId: "aicte-pragati-scholarship-girls",
        title: {
          en: "AICTE Pragati Scholarship for Girl Students",
          hi: "एआईसीटीई प्रगति छात्रवृत्ति (बालिकाओं हेतु)",
          bn: "এআইসিটিই প্রগতি স্কলারশিপ (মেয়েদের জন্য)",
          ta: "AICTE பிரகதி உதவித்தொகை (மாணவிகளுக்கு)",
        },
        category: "Education & Scholarships",
        officialDomain: "scholarships.gov.in",
        officialUrl: "https://scholarships.gov.in/",
        matchScore: 100,
        qualificationReasons: {
          en: [
            "Female student enrolled in higher/technical education",
            "Family income below ₹8 Lakhs per annum limit",
            "Direct tuition & contingency transfer directly via NSP portal",
          ],
          hi: [
            "तकनीकी/उच्च शिक्षा में नामांकित छात्रा",
            "पारिवारिक आय ₹8 लाख प्रतिवर्ष की सीमा के भीतर",
            "NSP पोर्टल द्वारा ₹50,000 वार्षिक प्रत्यक्ष अनुदान",
          ],
          bn: [
            "কারিগরি বা উচ্চশিক্ষায় পাঠরত ছাত্রী",
            "বার্ষিক পারিবারিক আয় ₹৮ লক্ষের নিচে",
            "NSP মাধ্যমে সরাসরি ₹৫০,০০০ বার্ষিক স্কলারশিপ",
          ],
          ta: [
            "தொழில்நுட்ப கல்வியில் பயிலும் மாணவி",
            "ஆண்டு வருமானம் ₹8 லட்சத்திற்குள் உள்ளது",
            "நேரடி வங்கி உதவித்தொகை ₹50,000",
          ],
        },
        highlightBenefit: {
          en: "₹50,000 per annum towards tuition and incidental educational expenses",
          hi: "शिक्षण शुल्क एवं शैक्षणिक व्यय हेतु ₹50,000 प्रतिवर्ष",
          bn: "টিউশন ফি ও বইপত্রের জন্য প্রতি বছর ₹৫০,০০০",
          ta: "கல்வி கட்டணத்திற்காக ஆண்டுக்கு ₹50,000",
        },
        applicationActionUrl: "/services/nsp-scholarship-discovery",
      });
    }
  }

  // 5. PM Jan Dhan Yojana (Basic Savings Bank Account)
  if (
    profile.age >= 10 &&
    (isLowIncome || hasSubsidizedRation || profile.occupation !== "salaried")
  ) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Age 10+ eligible for basic savings account",
        "Zero-balance banking privilege with zero maintenance penalties",
        "Essential pipeline for direct government DBT transfers",
      ],
      hi: [
        "10 वर्ष से अधिक आयु के नागरिक हेतु उपलब्ध",
        "बिना किसी न्यूनतम शेष राशि (Zero Balance) की सुविधा",
        "सभी सरकारी डीबीटी योजनाओं का सीधा लाभ प्राप्त करने का माध्यम",
      ],
      bn: [
        "১০ বছর বা তার বেশি বয়সের নাগরিকদের জন্য",
        "জিরো-ব্যালেন্স একাউন্ট, কোনো পেনাল্টি নেই",
        "সব সরকারি DBT সরাসরি পাওয়ার সহজ মাধ্যম",
      ],
      ta: [
        "10 வயதுக்கு மேற்பட்டோருக்கு ஜீரோ பேலன்ஸ் கணக்கு",
        "பராமரிப்பு கட்டணம் இல்லாத வங்கி கணக்கு",
        "அரசு மானியங்களை நேரடியாக பெறும் வசதி",
      ],
    };

    matches.push({
      serviceId: "pm-jan-dhan-yojana-account",
      title: {
        en: "PM Jan Dhan Yojana (PMJDY Zero-Balance Account)",
        hi: "प्रधानमंत्री जन धन योजना (PMJDY खाता)",
        bn: "প্রধানমন্ত্রী জন ধন যোজনা (PMJDY জিরো ব্যালেন্স)",
        ta: "பிரதான் மந்திரி ஜன் தன் திட்டம் (PMJDY)",
      },
      category: "Finance & Welfare",
      officialDomain: "pmjdy.gov.in",
      officialUrl: "https://pmjdy.gov.in/",
      matchScore: 95,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Zero Minimum Balance + Free RuPay Card + ₹10,000 Overdraft Facility",
        hi: "शून्य न्यूनतम शेष + निःशुल्क रुपे कार्ड + ₹10,000 की ओवरड्राफ्ट सुविधा",
        bn: "শূন্য ব্যালেন্স একাউন্ট + বিনামূল্যে RuPay কার্ড + ₹১০,০০০ ওভারড্রাফট",
        ta: "குறைந்தபட்ச இருப்பு தேவையில்லை + இலவச RuPay கார்டு",
      },
      applicationActionUrl: "/services/pm-jan-dhan-yojana-account",
    });
  }

  // 6. PM Suraksha Bima Yojana (Accident Cover)
  if (profile.age >= 18 && profile.age <= 70) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Citizen within eligible age bracket (18 to 70 years)",
        "Affordable statutory civic accidental protection",
        "Direct auto-debit from savings bank account",
      ],
      hi: [
        "पात्र आयु वर्ग (18 से 70 वर्ष) के अंतर्गत",
        "मात्र ₹20 वार्षिक प्रीमियम पर उच्च वैधानिक सुरक्षा",
        "बैंक बचत खाते से सीधा ऑटो-डेबिट",
      ],
      bn: [
        "১৮ থেকে ৭০ বছর বয়সের যোগ্য নাগরিক",
        "মাত্র ₹২০ বার্ষিক প্রিমিয়ামে সরকারি সুরক্ষা",
        "ব্যাংক একাউন্ট থেকে সরাসরি যুক্ত",
      ],
      ta: [
        "வயது 18 முதல் 70 வரை தகுதி",
        "ஆண்டுக்கு வெறும் ₹20 பிரீமியத்தில் ₹2 லட்சம் பாதுகாப்பு",
        "வங்கி கணக்குடன் நேரடி இணைப்பு",
      ],
    };

    matches.push({
      serviceId: "pm-suraksha-bima-yojana",
      title: {
        en: "PM Suraksha Bima Yojana (PMSBY Accidental Cover)",
        hi: "प्रधानमंत्री सुरक्षा बीमा योजना (PMSBY)",
        bn: "প্রধানমন্ত্রী সুরক্ষা বিমা যোজনা (PMSBY)",
        ta: "பிரதான் மந்திரி சுரக்ஷா பீமா யோஜனா (PMSBY)",
      },
      category: "Finance & Welfare",
      officialDomain: "jansuraksha.gov.in",
      officialUrl: "https://jansuraksha.gov.in/",
      matchScore: 92,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "₹2,00,000 Accidental Death/Disability Cover for just ₹20/Year",
        hi: "मात्र ₹20 प्रति वर्ष में ₹2,00,000 का दुर्घटना सुरक्षा कवच",
        bn: "মাত্র ₹২০/বছরে ₹২,০০,০০০ টাকার দুর্ঘটনা বিমা",
        ta: "ஆண்டுக்கு ₹20 மட்டுமே - ₹2,00,000 விபத்து காப்பீடு",
      },
      applicationActionUrl: "/services/pm-suraksha-bima-yojana",
    });
  }

  // 7. National Food Security Act (NFSA Subsidized Ration)
  if (hasSubsidizedRation || isLowIncome) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Household categorized under priority or low-income criteria",
        "Statutory guarantee of subsidized foodgrains under NFSA",
        "One Nation One Ration Card (ONORC) portability enabled",
      ],
      hi: [
        "प्राथमिकता अथवा कम आय वाले परिवार के रूप में पात्र",
        "एनएफएसए के तहत मुफ्त/रियायती खाद्यान्न की वैधानिक गारंटी",
        "वन नेशन वन राशन कार्ड (ONORC) के तहत पूरे भारत में मान्य",
      ],
      bn: [
        "অগ্রাধিকার বা স্বল্প আয়ের পরিবারের আওতাভুক্ত",
        "এনএফএসএ আইনের অধীনে খাদ্যশস্যের অধিকার",
        "এক দেশ এক রেশন কার্ড সুবিধায় দেশজুড়ে বহনযোগ্য",
      ],
      ta: [
        "முன்னுரிமை அல்லது குறைந்த வருமான குடும்ப தகுதி",
        "NFSA சட்டத்தின் கீழ் உணவு தானிய உரிமை",
        "நாடு முழுவதும் செல்லுபடியாகும் ரேஷன் அட்டை",
      ],
    };

    matches.push({
      serviceId: "ration-card-nfsa-status",
      title: {
        en: "National Food Security Act (NFSA Ration Card)",
        hi: "राष्ट्रीय खाद्य सुरक्षा (NFSA राशन कार्ड)",
        bn: "জাতীয় খাদ্য সুরক্ষা (NFSA রেশন কার্ড)",
        ta: "தேசிய உணவுப் பாதுகாப்பு ரேஷன் அட்டை (NFSA)",
      },
      category: "Finance & Welfare",
      officialDomain: "nfsa.gov.in",
      officialUrl: "https://nfsa.gov.in/",
      matchScore: 96,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Free/Subsidized Foodgrains under PMGKAY + Pan-India Portability",
        hi: "PMGKAY के तहत मुफ्त खाद्यान्न + संपूर्ण भारत में पोर्टेबिलिटी",
        bn: "বিনামূল্যে খাদ্যশস্য + সমগ্র ভারতে রেশন তোলার সুবিধা",
        ta: "இலவச/மானிய உணவு தானியங்கள் + நாடு தழுவிய ரேஷன்",
      },
      applicationActionUrl: "/services/ration-card-nfsa-status",
    });
  }

  // 8. Pradhan Mantri Awas Yojana (PMAY Housing)
  if ((isLowIncome || hasSubsidizedRation) && profile.age >= 21) {
    const reasons: Record<Locale, string[]> = {
      en: [
        "Family income falls under EWS / LIG economic bracket",
        "Eligible for pucca house grant or interest subvention",
        `Active in ${profile.areaType === "rural" ? "Gramin (PMAY-G)" : "Urban (PMAY-U)"} sector`,
      ],
      hi: [
        "पारिवारिक आय ईडब्ल्यूएस / एलआईजी आर्थिक वर्ग के अनुकूल",
        "पक्का आवास निर्माण हेतु सरकारी सहायता अथवा ब्याज सब्सिडी",
        `${profile.areaType === "rural" ? "ग्रामीण (PMAY-G)" : "शहरी (PMAY-U)"} श्रेणी में सक्रिय`,
      ],
      bn: [
        "পারিবারিক আয় EWS/LIG সীমার মধ্যে",
        "পাকা বাড়ি তৈরির জন্য সরকারি অনুদান",
        `${profile.areaType === "rural" ? "গ্রামীণ (PMAY-G)" : "শহুরে (PMAY-U)"} আওতাভুক্ত`,
      ],
      ta: [
        "EWS / LIG வருமானப் பிரிவினருக்கான வீடு திட்டம்",
        "பக்கா வீடு கட்ட அரசு மானிய உதவி",
        "கிராமப்புற மற்றும் நகர்ப்புற வீடு திட்டம்",
      ],
    };

    matches.push({
      serviceId: "pmay-beneficiary-status",
      title: {
        en: "Pradhan Mantri Awas Yojana (PMAY Housing)",
        hi: "प्रधानमंत्री आवास योजना (PMAY आवास)",
        bn: "প্রধানমন্ত্রী আবাস যোজনা (PMAY আবাসন)",
        ta: "பிரதான் மந்திரி ஆவாஸ் யோஜனா (PMAY)",
      },
      category: "Finance & Welfare",
      officialDomain: "pmaymis.gov.in",
      officialUrl: "https://pmaymis.gov.in/",
      matchScore: 90,
      qualificationReasons: reasons,
      highlightBenefit: {
        en: "Up to ₹1.20 Lakh Grant (Gramin) or up to ₹2.67 Lakh Interest Subsidy (Urban)",
        hi: "ग्रामीण हेतु ₹1.20 लाख तक अनुदान अथवा शहरी हेतु ₹2.67 लाख तक ब्याज सब्सिडी",
        bn: "গ্রামীণ ক্ষেত্রে ₹১.২০ লক্ষ অনুদান অথবা শহরে ₹২.৬৭ লক্ষ পর্যন্ত লোন সাবসিডি",
        ta: "வீடு கட்ட ₹1.20 லட்சம் மானியம் அல்லது கடன் வட்டி தள்ளுபடி",
      },
      applicationActionUrl: "/services/pmay-beneficiary-status",
    });
  }

  // 9. Ayushman Bharat Health Account (ABHA ID)
  // Universal for all citizens
  const abhaReasons: Record<Locale, string[]> = {
    en: [
      "Universal public health entitlement for all residents",
      "Consent-based digital sharing with hospitals & clinics",
      "100% free under National Health Authority (NHA)",
    ],
    hi: [
      "सभी भारतीय नागरिकों के लिए सार्वभौमिक डिजिटल स्वास्थ्य पहचान",
      "अस्पतालों व जांच केंद्रों में सुरक्षित डिजिटल रिपोर्ट साझाकरण",
      "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA) द्वारा पूरी तरह निःशुल्क",
    ],
    bn: [
      "সকল ভারতীয় নাগরিকের জন্য সর্বজনীন ডিজিটাল স্বাস্থ্য কার্ড",
      "হাসপাতালে বিনা কাগজে ডিজিটাল প্রেসক্রিপশন ও রিপোর্ট",
      "জাতীয় স্বাস্থ্য মিশন দ্বারা সম্পূর্ণ বিনামূল্যে",
    ],
    ta: [
      "அனைத்து இந்தியர்களுக்கும் டிஜிட்டல் சுகாதார அடையாள அட்டை",
      "மருத்துவமனை அறிக்கைகளை பாதுகாப்பாக பகிரும் வசதி",
      "தேசிய சுகாதார ஆணையத்தின் மூலம் 100% இலவசம்",
    ],
  };

  matches.push({
    serviceId: "create-abha-id",
    title: {
      en: "Ayushman Bharat Health Account (ABHA ID)",
      hi: "आयुष्मान भारत डिजिटल हेल्थ अकाउंट (ABHA ID)",
      bn: "আয়ুষ্মান ভারত স্বাস্থ্য একাউন্ট (ABHA ID)",
      ta: "ஆயுஷ்மான் பாரத் ஹெல்த் ஐடி (ABHA ID)",
    },
    category: "Healthcare & Well-Being",
    officialDomain: "abdm.gov.in",
    officialUrl: "https://abdm.gov.in/",
    matchScore: 100,
    qualificationReasons: abhaReasons,
    highlightBenefit: {
      en: "14-Digit Unified Health Record + Paperless Hospital Check-in",
      hi: "14-अंकीय डिजिटल स्वास्थ्य कार्ड + अस्पतालों में पेपरलेस चेक-इन",
      bn: "১৪-সংখ্যার স্থায়ী স্বাস্থ্য কার্ড + হাসপাতালে পেপারলেস চিকিৎসা",
      ta: "14 இலக்க தேசிய சுகாதார அட்டை + காகிதமில்லா சிகிச்சை",
    },
    applicationActionUrl: "/services/create-abha-id",
  });

  // 10. Voter ID Registration & e-EPIC
  if (profile.age >= 18) {
    const voterReasons: Record<Locale, string[]> = {
      en: [
        `Age criteria satisfied (${profile.age} >= 18 years)`,
        `Resident voter in ${profile.state}`,
        "Completely free electoral registration from ECI",
      ],
      hi: [
        `आयु अर्हता पूर्ण (${profile.age} >= 18 वर्ष)`,
        `${profile.state} के पंजीकृत मतदाता`,
        "भारत निर्वाचन आयोग द्वारा पूर्णतः निःशुल्क",
      ],
      bn: [
        `বয়স মানদণ্ড সম্পূর্ণ (${profile.age} >= ১৮ বছর)`,
        `${profile.state} রাজ্যের ভোটার`,
        "নির্বাচন কমিশন থেকে সম্পূর্ণ বিনামূল্যে",
      ],
      ta: [
        "18 வயது நிரம்பிய தகுதி",
        "இலவச டிஜிட்டல் வாக்காளர் அட்டை",
        "தேர்தல் ஆணையத்தின் அதிகாரப்பூர்வ பதிவு",
      ],
    };

    matches.push({
      serviceId: "voter-id-epic-download",
      title: {
        en: "Voter ID Registration & e-EPIC Download",
        hi: "मतदाता पहचान पत्र व e-EPIC डाउनलोड",
        bn: "ভোটার পরিচয়পত্র ও e-EPIC ডাউনলোড",
        ta: "வாக்காளர் அட்டை & இ-EPIC பதிவிறக்கம்",
      },
      category: "Citizen & Legal Identity",
      officialDomain: "voters.eci.gov.in",
      officialUrl: "https://voters.eci.gov.in/",
      matchScore: 100,
      qualificationReasons: voterReasons,
      highlightBenefit: {
        en: "Free High-Security Digital Color Voter Card (e-EPIC) in PDF",
        hi: "निःशुल्क डिजिटल रंगीन मतदाता पहचान पत्र (e-EPIC) पीडीएफ में",
        bn: "সম্পূর্ণ বিনামূল্যে ডিজিটাল রঙিন ভোটার আইডি কার্ড (PDF)",
        ta: "இலவச வண்ண டிஜிட்டல் வாக்காளர் அடையாள அட்டை",
      },
      applicationActionUrl: "/services/voter-id-epic-download",
    });
  }

  // 11. DigiLocker Cloud Storage
  if (profile.age >= 10) {
    const digiReasons: Record<Locale, string[]> = {
      en: [
        "All Indian citizens eligible for 1 GB authentic document locker",
        "Legally equivalent to original paper documents under IT Act 2000",
        "Instant pull of marksheets, driving licence & Aadhaar",
      ],
      hi: [
        "सभी नागरिकों हेतु 1 GB निःशुल्क आधिकारिक क्लाउड स्टोरेज",
        "आईटी एक्ट 2000 के नियम 9A के तहत मूल दस्तावेज के समान मान्य",
        "अंकपत्र, ड्राइविंग लाइसेंस व आरसी का तुरंत डिजिटल प्रमाणीकरण",
      ],
      bn: [
        "সকল নাগরিকের জন্য ১ GB নির্ভরযোগ্য সরকারি ক্লাউড",
        "আইনত মূল সার্টিফিকেটের সমান মর্যাদাপ্রাপ্ত",
        "মার্ Schiller, ড্রাইভিং লাইসেন্স ও আধার সরাসরি ডাউনলোড",
      ],
      ta: [
        "1 GB இலவச அரசு கிளவுட் சேமிப்பு",
        "அசல் ஆவணங்களுக்கு இணையான சட்டப்பூர்வ மதிப்பு",
        "சான்றிதழ்கள் மற்றும் உரிமங்களை பாதுகாக்கும் வசதி",
      ],
    };

    matches.push({
      serviceId: "digilocker-account-setup",
      title: {
        en: "DigiLocker Cloud Storage & Verifications",
        hi: "डिजिलॉकर आधिकारिक क्लाउड दस्तावेज",
        bn: "ডিজিলকার সরকারি ক্লাউড ও নথি",
        ta: "டிஜிலாக்கர் ஆவண பாதுகாப்பு பெட்டகம்",
      },
      category: "Citizen & Legal Identity",
      officialDomain: "digilocker.gov.in",
      officialUrl: "https://www.digilocker.gov.in/",
      matchScore: 98,
      qualificationReasons: digiReasons,
      highlightBenefit: {
        en: "1 GB Free Cloud Storage + 100% Legally Valid Digital Documents",
        hi: "1 GB निःशुल्क क्लाउड + मूल प्रति के समान 100% कानूनी मान्यता",
        bn: "১ GB ফ্রি ক্লাউড + শতভাগ বৈধ ডিজিটাল ডকুমেন্ট",
        ta: "1 GB இலவச சேமிப்பு + சட்டப்பூர்வ டிஜிட்டல் ஆவணங்கள்",
      },
      applicationActionUrl: "/services/digilocker-account-setup",
    });
  }

  // 12. EPF Passbook (Salaried / Formal Sector)
  if (profile.occupation === "salaried" || profile.occupation === "retired") {
    const epfReasons: Record<Locale, string[]> = {
      en: [
        "Identified as formal/salaried or superannuated contributor",
        "Universal Account Number (UAN) passbook tracking",
        "Direct online settlement without employer intervention",
      ],
      hi: [
        "वेतनभोगी अथवा सेवानिवृत्त कर्मचारी के रूप में पहचान",
        "UAN पासबुक द्वारा ब्याज व अंशदान की सीधी निगरानी",
        "बिना नियोक्ता के ऑनलाइन पीएफ निकासी व दावा स्थिति",
      ],
      bn: [
        "বেতনভোগী বা অবসরপ্রাপ্ত ইপিএফ সদস্য",
        "UAN পাসবুক মারফত ব্যালেন্স ও সুদের হিসাব",
        "অনলাইনে সরাসরি পিএফ দাবি ও টাকা তোলার সুবিধা",
      ],
      ta: [
        "சம்பளம் பெறும் ஊழியர்களுக்கான பிஎஃப் திட்டம்",
        "UAN மூலம் பாஸ்புக் மற்றும் இருப்பு பார்க்கும் வசதி",
        "ஆன்லைனில் பிஎஃப் பணம் எடுக்கும் வசதி",
      ],
    };

    matches.push({
      serviceId: "epf-passbook-claim-status",
      title: {
        en: "EPF Passbook & UAN Claim Tracking",
        hi: "ईपीएफ पासबुक व UAN दावा ट्रैकिंग",
        bn: "ইপিএফ পাসবুক ও দাবি স্থিতি",
        ta: "EPF பாஸ்புக் & உரிமைகோரல் கண்காணிப்பு",
      },
      category: "Finance & Welfare",
      officialDomain: "passbook.epfindia.gov.in",
      officialUrl: "https://passbook.epfindia.gov.in/",
      matchScore: 100,
      qualificationReasons: epfReasons,
      highlightBenefit: {
        en: "8.25% Statutory Interest Tracking + Online PF Advance Settlement",
        hi: "8.25% वैधानिक ब्याज ट्रैकिंग + ऑनलाइन अग्रिम पीएफ निकासी",
        bn: "৮.২৫% সুদের হিসাব + অনলাইনে অ্যাডভান্স পিএফ দাবি",
        ta: "8.25% அரசு வட்டி கணக்கீடு + ஆன்லைன் பிஎஃப் செட்டில்மெண்ட்",
      },
      applicationActionUrl: "/services/epf-passbook-claim-status",
    });
  }

  // 13. Driving Licence Renewal
  if (profile.age >= 18) {
    matches.push({
      serviceId: "driving-licence-renewal",
      title: {
        en: "Driving Licence Renewal & Endorsement",
        hi: "ड्राइविंग लाइसेंस नवीनीकरण (Sarathi)",
        bn: "ড্রাইভিং লাইসেন্স পুনর্নবীকরণ (সারথী)",
        ta: "ஓட்டுநர் உரிமம் புதுப்பித்தல் (Sarathi)",
      },
      category: "Mobility & Transport",
      officialDomain: "sarathi.parivahan.gov.in",
      officialUrl: "https://sarathi.parivahan.gov.in/",
      matchScore: 88,
      qualificationReasons: {
        en: [
          "Age 18+ eligible for motor vehicle licensing",
          "Contactless online renewal without RTO visit in most states",
          "Calculates statutory grace periods and statutory fees",
        ],
        hi: [
          "18 वर्ष से अधिक आयु मोटर वाहन लाइसेंस हेतु पात्र",
          "अधिकांश राज्यों में बिना आरटीओ गए संपर्क रहित ऑनलाइन सेवा",
          "वैधानिक छूट अवधि व आधिकारिक शुल्क की स्पष्ट गणना",
        ],
        bn: [
          "১৮ বছর বা তার বেশি বয়সের যোগ্য নাগরিক",
          "বেশিরভাগ রাজ্যে আরটিও না গিয়ে অনলাইন নবায়ন",
          "সরকারি ফি ও গ্রেস পিরিয়ডের সঠিক হিসাব",
        ],
        ta: [
          "18 வயது நிரம்பிய ஓட்டுநர் உரிம தகுதி",
          "ஆர்டிஓ அலுவலகம் செல்லாமல் ஆன்லைன் புதுப்பித்தல்",
          "சட்டப்பூர்வ கட்டண கணக்கீடு",
        ],
      },
      highlightBenefit: {
        en: "Faceless Aadhaar-Based Licence Renewal Delivered to Doorstep",
        hi: "आधार आधारित संपर्क रहित नवीनीकरण व घर पर डाक द्वारा डिलीवरी",
        bn: "আধার ভিত্তিক ফেসলেস নবায়ন ও সরাসরি বাড়িতে ডেলিভারি",
        ta: "முகமற்ற ஆவண புதுப்பித்தல் மற்றும் வீட்டு விநியோகம்",
      },
      applicationActionUrl: "/services/driving-licence-renewal",
    });
  }

  // Sort by match score descending
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
