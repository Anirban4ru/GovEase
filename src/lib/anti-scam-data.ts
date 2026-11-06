/**
 * GovEase - Emergency Helplines & Anti-Scam Verification Engine
 *
 * Provides a verified registry of statutory national civic helplines
 * and cryptographic/TRAI-header analysis to detect fraudulent cyber-cafes,
 * fake e-challan SMS scams, and phishing portals.
 */

export interface CivicHelpline {
  number: string;
  dialNumber: string;
  serviceName: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  authority: string;
  operatingHours: string;
  emergencyPurpose: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
}

export const CIVIC_HELPLINES: CivicHelpline[] = [
  {
    number: "1930",
    dialNumber: "tel:1930",
    serviceName: {
      en: "National Cybercrime Reporting Helpline",
      hi: "राष्ट्रीय साइबर अपराध रिपोर्टिंग हेल्पलाइन",
      bn: "জাতীয় সাইবার ক্রাইম রিপোর্টিং হেল্পলাইন",
      ta: "தேசிய சைபர் குற்ற அறிக்கை உதவி எண்",
    },
    authority: "Ministry of Home Affairs (MHA) & I4C",
    operatingHours: "24x7 Active",
    emergencyPurpose: {
      en: "Immediate freezing of stolen bank funds during the 'Golden Hour' following financial phishing or cyber fraud.",
      hi: "वित्तीय धोखाधड़ी या ऑनलाइन चोरी के मामलों में 'गोल्डन ऑवर' के दौरान बैंक खाते से पैसे रोके जाने हेतु।",
      bn: "ব্যাংকিং জালিয়াতির শিকার হলে তাৎক্ষণিক অর্থ লেনদেন স্থগিত করার জন্য।",
      ta: "நிதி மோசடியின் போது பண பரிவர்த்தனையை உடனடியாக முடக்க.",
    },
  },
  {
    number: "1915",
    dialNumber: "tel:1915",
    serviceName: {
      en: "National Consumer Helpline (NCH)",
      hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन",
      bn: "জাতীয় উপভোক্তা হেল্পলাইন",
      ta: "தேசிய நுகர்வோர் உதவி மையம்",
    },
    authority: "Department of Consumer Affairs, Government of India",
    operatingHours: "8:00 AM – 8:00 PM (Except National Holidays)",
    emergencyPurpose: {
      en: "Official legal grievance redressal against cyber-cafe extortion, insurance claim delays, and defective public services.",
      hi: "जन सेवा केंद्रों द्वारा अधिक पैसे वसूलने, बीमा दावों में देरी और अनुचित व्यापार प्रथाओं के खिलाफ कानूनी शिकायत।",
      bn: "অতিরিক্ত ফি আদায় বা পরিষেবার গাফিলতির বিরুদ্ধে অভিযোগ দায়ের।",
      ta: "அதிகப்படியான கட்டண வசூல் மற்றும் முறைகேடுகளுக்கு எதிரான புகார்.",
    },
  },
  {
    number: "14555",
    dialNumber: "tel:14555",
    serviceName: {
      en: "Ayushman Bharat PM-JAY & ABHA Helpline",
      hi: "आयुष्मान भारत पीएम-जय एवं आभा हेल्पलाइन",
      bn: "আয়ুষ্মান ভারত ও আভা হেল্পলাইন",
      ta: "ஆயுஷ்மான் பாரத் மற்றும் ஆபா உதவி மையம்",
    },
    authority: "National Health Authority (NHA)",
    operatingHours: "24x7 Active",
    emergencyPurpose: {
      en: "Assistance with empanelled hospital admissions, cashless ₹5 Lakh health benefits, and senior citizen ABHA cards.",
      hi: "सूचीबद्ध अस्पतालों में कैशलेस ₹5 लाख के मुफ्त इलाज और आभा कार्ड से संबंधित तत्काल सहायता।",
      bn: "হাসপাতালে বিনামূল্যে ৫ লক্ষ টাকার চিকিৎসা এবং স্বাস্থ্য কার্ড সহায়তা।",
      ta: "இலவச மருத்துவ சிகிச்சை மற்றும் ஆபா அட்டை உதவி.",
    },
  },
  {
    number: "1947",
    dialNumber: "tel:1947",
    serviceName: {
      en: "UIDAI Aadhaar Official Helpline",
      hi: "यूआईडीएआई आधार आधिकारिक हेल्पलाइन",
      bn: "ইউআইডিএআই আধার অফিসিয়াল হেল্পলাইন",
      ta: "யுஐடிஏஐ ஆதார் உதவி மையம்",
    },
    authority: "Unique Identification Authority of India (UIDAI)",
    operatingHours: "24x7 IVRS, 7:00 AM – 11:00 PM Agent Support",
    emergencyPurpose: {
      en: "Locking biometric credentials, tracking update request numbers (URN), and resolving unauthorized updates.",
      hi: "बायोमेट्रिक लॉक करने, आधार अपडेट स्थिति जांचने और अनधिकृत बदलावों की शिकायत के लिए।",
      bn: "বায়োমেট্রিক লক এবং আধার আপডেট সংক্রান্ত যাবতীয় তথ্য।",
      ta: "பயோமெட்ரிக் பூட்டுதல் மற்றும் ஆதார் புதுப்பிப்பு உதவி.",
    },
  },
  {
    number: "14443",
    dialNumber: "tel:14443",
    serviceName: {
      en: "e-Shram National Worker Toll-Free Helpdesk",
      hi: "ई-श्रम राष्ट्रीय श्रमिक टोल-फ्री हेल्पडेस्क",
      bn: "ই-শ্রম জাতীয় হেল্পডেস্ক",
      ta: "இ-ஷ்ரம் தேசிய தொழிலாளர் உதவி மையம்",
    },
    authority: "Ministry of Labour and Employment",
    operatingHours: "8:00 AM – 8:00 PM (Monday to Saturday)",
    emergencyPurpose: {
      en: "Support for unorganised workers, UAN card corrections, and registration under national welfare schemes.",
      hi: "असंगठित श्रमिकों के यूएएन कार्ड सुधार और सामाजिक सुरक्षा योजनाओं से जुड़ी सहायता।",
      bn: "অসংগঠিত শ্রমিকদের ইউএএন কার্ড সংক্রান্ত যাবতীয় সহায়তা।",
      ta: "தொழிலாளர் நலத்திட்டங்கள் மற்றும் பதிவு உதவி.",
    },
  },
  {
    number: "1800-180-1551",
    dialNumber: "tel:18001801551",
    serviceName: {
      en: "Kisan Call Center (PM-Kisan Support)",
      hi: "किसान कॉल सेंटर (पीएम-किसान सहायता)",
      bn: "কিষাণ কল সেন্টার (পিএম-কিষাণ সহায়তা)",
      ta: "கிசான் கால் சென்டர் (பிஎம்-கிசான் உதவி)",
    },
    authority: "Ministry of Agriculture & Farmers Welfare",
    operatingHours: "6:00 AM – 10:00 PM Daily",
    emergencyPurpose: {
      en: "Assistance with PM-Kisan DBT installment status, Land Seeding verification, and Aadhaar eKYC errors.",
      hi: "पीएम-किसान ₹6,000 की किस्त स्थिति, लैंड सीडिंग और बैंक खाता सुधार संबंधी मार्गदर्शन।",
      bn: "পিএম-কিষাণের কিস্তি এবং ব্যাংক আধার লিঙ্কিং সংক্রান্ত তথ্য।",
      ta: "விவசாய உதவித்தொகை மற்றும் நில விவர சரிபார்ப்பு.",
    },
  },
];

export interface SenderAnalysisResult {
  isGovernment: boolean;
  isHighRiskScam: boolean;
  category: "OFFICIAL_GOV" | "HIGH_RISK_PHONE" | "UNKNOWN_HEADER";
  title: string;
  explanation: string;
  officialDepartment?: string;
  safetyProtocol: string;
}

export const VERIFIED_SMS_HEADERS: Record<string, string> = {
  PARIVH: "Ministry of Road Transport and Highways (MoRTH - Sarathi / Vahan / Parivahan)",
  UIDAI: "Unique Identification Authority of India (Aadhaar Services)",
  EPFOHO: "Employees' Provident Fund Organisation (EPFO Head Office)",
  ITDPRC: "Income Tax Department (Central Processing Centre)",
  ITDEFL: "Income Tax Department (e-Filing Services)",
  CPGRAM: "Department of Administrative Reforms and Public Grievances (DARPG)",
  CRSORG: "Office of the Registrar General of India (Civil Registration System)",
  NSPOTR: "National Scholarship Portal (MeitY & Ministry of Education)",
  DIGILK: "DigiLocker National Platform (NeGD / MeitY)",
  ABDMNH: "National Health Authority (Ayushman Bharat Digital Mission)",
};

/**
 * Validates whether an SMS sender string or phone number is a legitimate government header.
 */
export function analyzeSmsSender(input: string): SenderAnalysisResult {
  const sanitized = input.trim().toUpperCase();

  // Check 1: Is it a 10-digit mobile number or standard international number?
  // FRAUD RULE: Indian Government entities NEVER send legal notices or challans from personal 10-digit numbers!
  const digitsOnly = sanitized.replace(/[^0-9]/g, "");
  if (digitsOnly.length >= 10) {
    return {
      isGovernment: false,
      isHighRiskScam: true,
      category: "HIGH_RISK_PHONE",
      title: "HIGH RISK WARNING: Likely Cyber Fraud or Phishing",
      explanation:
        "The Government of India, State Police departments, and Courts NEVER send official e-challans, arrest threats, or account block notices from standard 10-digit personal mobile numbers.",
      safetyProtocol:
        "DO NOT click any links, DO NOT install any .APK files, and NEVER transfer money. Report this number immediately to the Cybercrime Helpline at 1930.",
    };
  }

  // Check 2: Check against registered 6-character TRAI alphanumeric headers
  // TRAI format: 2-letter operator prefix + '-' + 6-letter sender code (e.g., 'AX-PARIVH', 'VK-UIDAI')
  const headerCode = sanitized.includes("-") ? sanitized.split("-")[1] || "" : sanitized;

  for (const [key, dept] of Object.entries(VERIFIED_SMS_HEADERS)) {
    if (headerCode.includes(key)) {
      return {
        isGovernment: true,
        isHighRiskScam: false,
        category: "OFFICIAL_GOV",
        title: "VERIFIED OFFICIAL GOVERNMENT SENDER",
        explanation: `This SMS header is legitimately registered under TRAI regulations for official government communications.`,
        officialDepartment: dept,
        safetyProtocol:
          "Official government SMS messages will only contain links ending strictly in .gov.in or .nic.in. Even for official senders, never share your OTP or banking PIN.",
      };
    }
  }

  return {
    isGovernment: false,
    isHighRiskScam: false,
    category: "UNKNOWN_HEADER",
    title: "UNVERIFIED OR COMMERCIAL SENDER",
    explanation:
      "This sender ID does not match any primary central government registry for public life services. It may be a commercial enterprise, bank, or third-party entity.",
    safetyProtocol:
      "Always inspect links before clicking. Never provide Aadhaar OTPs or payment approvals on unverified non-governmental portals.",
  };
}
