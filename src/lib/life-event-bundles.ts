/**
 * GovEase - Multi-Service Life Event Journeys
 *
 * Models composite citizen journeys across life milestones.
 * Strings individual services into sequential dependency workflows with prerequisites.
 */

export interface JourneyStep {
  sequence: number;
  serviceId: string;
  stepTitle: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  whyFirst: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  prerequisites: string[];
}

export interface LifeEventJourney {
  id: string;
  category: "family" | "education" | "livelihood" | "elderly";
  title: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  tagline: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  overview: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  targetCitizens: string;
  steps: JourneyStep[];
}

export const LIFE_EVENT_JOURNEYS: LifeEventJourney[] = [
  {
    id: "newborn-arrival",
    category: "family",
    title: {
      en: "Newborn Child in the Family",
      hi: "परिवार में नवजात शिशु का आगमन",
      bn: "পরিবারে নবজাতক শিশুর আগমন",
      ta: "குடும்பத்தில் பிறந்த குழந்தை",
    },
    tagline: {
      en: "Birth registration to infant healthcare identity and maternal welfare",
      hi: "जन्म पंजीकरण से लेकर बाल स्वास्थ्य पहचान और मातृत्व लाभ तक",
      bn: "জন্ম নিবন্ধন থেকে শিশু স্বাস্থ্য পরিচয় এবং মাতৃত্বকালীন সুবিধা",
      ta: "பிறப்புப் பதிவு முதல் குழந்தை சுகாதார அடையாளம் வரை",
    },
    overview: {
      en: "Establish your child's foundational legal rights step-by-step without confusion or commercial intermediary exploitation.",
      hi: "बिना किसी दलाल या बिचौलिए के अपने बच्चे के बुनियादी कानूनी अधिकार चरण-दर-चरण स्थापित करें।",
      bn: "দালাল বা বিভ্রান্তি ছাড়াই ধাপে ধাপে আপনার সন্তানের মৌলিক আইনি অধিকার নিশ্চিত করুন।",
      ta: "இடைத்தரகர்கள் இன்றி உங்கள் குழந்தையின் சட்டப்பூர்வ உரிமைகளை நிலைநாட்டுங்கள்.",
    },
    targetCitizens: "Parents and guardians of infants aged 0 to 12 months",
    steps: [
      {
        sequence: 1,
        serviceId: "birth-certificate-crs",
        stepTitle: {
          en: "Step 1: Obtain CRS Digital Birth Certificate",
          hi: "चरण 1: सीआरएस डिजिटल जन्म प्रमाण पत्र प्राप्त करें",
          bn: "ধাপ ১: সিআরএস ডিজিটাল জন্ম শংসাপত্র সংগ্রহ",
          ta: "படி 1: பிறப்புச் சான்றிதழைப் பெறுங்கள்",
        },
        whyFirst: {
          en: "Foundational legal document required as sole Proof of Identity (PoI) and Date of Birth (DoB) for all future services.",
          hi: "भविष्य की सभी सेवाओं के लिए पहचान और जन्मतिथि के एकमात्र वैध प्रमाण के रूप में आवश्यक।",
          bn: "ভবিষ্যতের সমস্ত পরিষেবার জন্য জন্মতারিখ ও পরিচয়ের প্রধান প্রমাণ।",
          ta: "எதிர்கால அனைத்து சேவைகளுக்கும் தேவையான அடிப்படை சான்று.",
        },
        prerequisites: ["Hospital institutional birth slip", "Parents' Aadhaar numbers"],
      },
      {
        sequence: 2,
        serviceId: "aadhaar-pvc-card",
        stepTitle: {
          en: "Step 2: Enroll for Blue Baal Aadhaar",
          hi: "चरण 2: बाल आधार (नीला कार्ड) नामांकन कराएं",
          bn: "ধাপ ২: নীল বাল আধার কার্ডের জন্য আবেদন",
          ta: "படி 2: நீல பால் ஆதார் அட்டைக்கு விண்ணப்பிக்கவும்",
        },
        whyFirst: {
          en: "Issued without child biometric scans (linked to parent biometrics); creates the 12-digit digital identifier for school admissions.",
          hi: "बच्चे के बायोमेट्रिक के बिना जारी किया जाता है (माता-पिता से लिंक); भविष्य के स्कूल प्रवेश के लिए आवश्यक।",
          bn: "শিশুর বায়োমেট্রিক ছাড়াই পিতা-মাতার আধারের সাথে যুক্ত করে তৈরি হয়।",
          ta: "பள்ளி சேர்க்கைக்கான 12 இலக்க அடையாளத்தை உருவாக்குகிறது.",
        },
        prerequisites: ["CRS Birth Certificate", "Parent's Aadhaar card"],
      },
      {
        sequence: 3,
        serviceId: "create-abha-id",
        stepTitle: {
          en: "Step 3: Create Infant ABHA Health Account",
          hi: "चरण 3: शिशु का आभा (ABHA) स्वास्थ्य खाता बनाएं",
          bn: "ধাপ ৩: শিশুর জন্য আভা (ABHA) স্বাস্থ্য আইডি তৈরি",
          ta: "படி 3: குழந்தைக்கான ஆபா சுகாதார கணக்கை உருவாக்கவும்",
        },
        whyFirst: {
          en: "Stores immunization and vaccination charts digitally under Ayushman Bharat Digital Mission.",
          hi: "आयुष्मान भारत डिजिटल मिशन के तहत टीकाकरण और स्वास्थ्य रिकॉर्ड को डिजिटल रूप से सुरक्षित रखता है।",
          bn: "টিকা এবং স্বাস্থ্য সংক্রান্ত তথ্য ডিজিটালি সংরক্ষণ করতে সাহায্য করে।",
          ta: "தடுப்பூசி அட்டவணைகளை டிஜிட்டல் முறையில் பாதுகாக்கிறது.",
        },
        prerequisites: ["Child's Baal Aadhaar or Parent's Aadhaar"],
      },
    ],
  },
  {
    id: "higher-education-employment",
    category: "education",
    title: {
      en: "Higher Education & First Job Readiness",
      hi: "उच्च शिक्षा एवं प्रथम रोजगार की तैयारी",
      bn: "উচ্চশিক্ষা এবং প্রথম চাকরির প্রস্তুতি",
      ta: "உயர்கல்வி மற்றும் முதல் வேலைக்கான தயாரிப்பு",
    },
    tagline: {
      en: "From digital marksheets and scholarships to driving licence and voter card",
      hi: "डिजिटल मार्कशीट और छात्रवृत्ति से लेकर ड्राइविंग लाइसेंस और वोटर आईडी तक",
      bn: "ডিজিটাল মার্কশিট ও স্কলারশিপ থেকে ড্রাইভিং লাইসেন্স এবং ভোটার আইডি",
      ta: "மதிப்பெண் சான்றிதழ்கள் மற்றும் கல்வி உதவித்தொகை முதல் உரிமம் வரை",
    },
    overview: {
      en: "The essential documentation sequence for Indian youth turning 18 entering college or competitive job markets.",
      hi: "18 वर्ष की आयु पूरी करने वाले भारतीय युवाओं के लिए कॉलेज और प्रतियोगी नौकरियों की आवश्यक दस्तावेज़ श्रृंखला।",
      bn: "১৮ বছর পূর্ণ করা ভারতীয় তরুণদের কলেজ ও চাকরির জন্য প্রয়োজনীয় নথির পথরেখা।",
      ta: "18 வயதை எட்டும் இந்திய இளைஞர்களுக்கான அத்தியாவசிய ஆவண வரிசை.",
    },
    targetCitizens: "Students, college entrants, and first-time job seekers (aged 16 to 25)",
    steps: [
      {
        sequence: 1,
        serviceId: "digilocker-account-setup",
        stepTitle: {
          en: "Step 1: Set Up DigiLocker for Academic Records",
          hi: "चरण 1: शैक्षणिक रिकॉर्ड के लिए डिजिलॉकर खाता बनाएं",
          bn: "ধাপ ১: অ্যাকাডেমিক নথির জন্য ডিজিলকার সেটআপ",
          ta: "படி 1: கல்வி ஆவணங்களுக்கு டிஜிலாக்கரை அமைக்கவும்",
        },
        whyFirst: {
          en: "Pulls legally verified 10th and 12th CBSE/State board marksheets into digital repository without physical paper risk.",
          hi: "बिना कागजी जोखिम के 10वीं व 12वीं की वैध डिजिटल मार्कशीट प्राप्त करने का आधिकारिक माध्यम।",
          bn: "ডিজিটালি ভেরিফায়েড ১০ম ও ১২ম শ্রেণীর মার্কশিট নিরাপদে সংরক্ষণ করতে।",
          ta: "அதிகாரப்பூர்வ டிஜிட்டல் மதிப்பெண் சான்றிதழ்களை பெறுகிறது.",
        },
        prerequisites: ["Aadhaar number linked to mobile for OTP"],
      },
      {
        sequence: 2,
        serviceId: "nsp-scholarship-discovery",
        stepTitle: {
          en: "Step 2: Register on National Scholarship Portal (NSP)",
          hi: "चरण 2: राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर पंजीकरण करें",
          bn: "ধাপ ২: জাতীয় স্কলারশিপ পোর্টালে ওটিআর রেজিস্ট্রেশন",
          ta: "படி 2: தேசிய கல்வி உதவித்தொகை போர்ட்டலில் பதிவு செய்யவும்",
        },
        whyFirst: {
          en: "Secures Central and State fee waivers and merit scholarships using Aadhaar eKYC and DigiLocker certificates.",
          hi: "आधार ई-केवाईसी और डिजिलॉकर के माध्यम से केंद्रीय और राज्य छात्रवृत्ति सहायता प्राप्त करने हेतु।",
          bn: "সরকারি বৃত্তি এবং ফি মওকুফের সুবিধা সরাসরি ব্যাংক অ্যাকাউন্টে পেতে।",
          ta: "கல்வி உதவித்தொகை பெற ஆதார் இ-கேஒய்சி வழியே பதிவு செய்யவும்.",
        },
        prerequisites: ["DigiLocker Marksheet", "Income & Caste Certificate (if applicable)"],
      },
      {
        sequence: 3,
        serviceId: "pan-card-reprint",
        stepTitle: {
          en: "Step 3: Secure Official PAN Card",
          hi: "चरण 3: आधिकारिक पैन (PAN) कार्ड प्राप्त करें",
          bn: "ধাপ ৩: অফিসিয়াল প্যান কার্ড সংগ্রহ",
          ta: "படி 3: அதிகாரப்பூர்வ பான் கார்டைப் பெறுங்கள்",
        },
        whyFirst: {
          en: "Mandatory for opening student bank accounts, college fellowships, and internship tax filings.",
          hi: "छात्रवृत्ति बैंक खाते, इंटर्नशिप स्टाइपेंड और वित्तीय लेनदेन के लिए अनिवार्य।",
          bn: "ব্যাংক অ্যাকাউন্ট খোলা এবং স্টাইপেন্ড জমার জন্য অপরিহার্য।",
          ta: "வங்கி கணக்கு திறக்க மற்றும் உதவித்தொகை பெற கட்டாயம்.",
        },
        prerequisites: ["Aadhaar card with correct name and DoB"],
      },
      {
        sequence: 4,
        serviceId: "voter-id-epic-download",
        stepTitle: {
          en: "Step 4: Register as First-Time Voter (e-EPIC)",
          hi: "चरण 4: पहली बार मतदाता के रूप में पंजीकरण (e-EPIC) करें",
          bn: "ধাপ ৪: প্রথমবার ভোটার হিসেবে ই-এপিক সংগ্রহ",
          ta: "படி 4: முதல்முறை வாக்காளராக இ-எபிக் பெற பதிவு செய்யவும்",
        },
        whyFirst: {
          en: "Exercises democratic voting rights and provides a gold-standard residential identity document.",
          hi: "मतदान का संवैधानिक अधिकार प्राप्त करने और निवास प्रमाण का आधिकारिक दस्तावेज़ हासिल करने के लिए।",
          bn: "গণতান্ত্রিক ভোটাধিকার এবং স্থায়ী ঠিকানার প্রমাণপত্র হিসেবে কার্যকর।",
          ta: "வாக்களிக்கும் உரிமை மற்றும் அதிகாரப்பூர்வ முகவரி சான்று.",
        },
        prerequisites: ["Age 18+ proof", "Passport photo scan", "Address proof"],
      },
    ],
  },
  {
    id: "unorganised-worker-safety",
    category: "livelihood",
    title: {
      en: "Informal & Gig Worker Safety Net",
      hi: "असंगठित व गिग श्रमिक सामाजिक सुरक्षा कवच",
      bn: "অসংগঠিত ও গিগ কর্মীদের সামাজিক সুরক্ষা",
      ta: "அமைப்புசாரா மற்றும் கிக் தொழிலாளர் சமூக பாதுகாப்பு",
    },
    tagline: {
      en: "e-Shram card to zero-balance banking and accidental insurance cover",
      hi: "ई-श्रम कार्ड से लेकर शून्य-बैलेंस बैंकिंग और दुर्घटना बीमा सुरक्षा तक",
      bn: "ই-শ্রম কার্ড থেকে জিরো-ব্যালেন্স ব্যাংক অ্যাকাউন্ট ও দুর্ঘটনা বীমা",
      ta: "இ-ஷ்ரம் அட்டை முதல் ஜீரோ பேலன்ஸ் வங்கி கணக்கு மற்றும் காப்பீடு வரை",
    },
    overview: {
      en: "Empowering agricultural laborers, gig delivery workers, domestic workers, and street vendors with formal central safety nets.",
      hi: "कृषि श्रमिकों, गिग डिलीवरी कर्मियों, घरेलू कामगारों और रेहड़ी-पटरी वालों को केंद्रीय सुरक्षा कवच से जोड़ना।",
      bn: "কৃষি শ্রমিক, ডেলিভারি কর্মী ও পরিযায়ী শ্রমিকদের জন্য রাষ্ট্রীয় নিরাপত্তা নিশ্চিত করার প্রক্রিয়া।",
      ta: "விவசாயிகள், டெலிவரி தொழிலாளர்கள் மற்றும் அமைப்புசாரா பணியாளர்களுக்கான பாதுகாப்பு வரிசை.",
    },
    targetCitizens: "Unorganised workers, gig workers, street vendors, and migrant laborers aged 16 to 59",
    steps: [
      {
        sequence: 1,
        serviceId: "eshram-card-registration",
        stepTitle: {
          en: "Step 1: Register on e-Shram for 12-Digit UAN",
          hi: "चरण 1: 12 अंकों के यूएएन (UAN) के लिए ई-श्रम पंजीकरण करें",
          bn: "ধাপ ১: ১২ সংখ্যার ইউএএন-এর জন্য ই-শ্রম রেজিস্ট্রেশন",
          ta: "படி 1: 12 இலக்க UAN-க்கு இ-ஷ்ரம் பதிவு செய்யுங்கள்",
        },
        whyFirst: {
          en: "National Database of Unorganised Workers (NDUW) baseline identification; unlocks state and central worker welfare funds.",
          hi: "असंगठित श्रमिकों के राष्ट्रीय डेटाबेस में आधिकारिक प्रविष्टि, जो सभी कल्याणकारी योजनाओं की कुंजी है।",
          bn: "জাতীয় ডেটাবেসে নাম অন্তর্ভুক্তি যা সমস্ত ভবিষ্যৎ সরকারি সহায়তার ভিত্তি।",
          ta: "அனைத்து அரசு நலத்திட்டங்களுக்கும் அடிப்படை நுழைவு சீட்டு.",
        },
        prerequisites: ["Aadhaar linked mobile", "Savings bank account number & IFSC"],
      },
      {
        sequence: 2,
        serviceId: "pm-jan-dhan-yojana-account",
        stepTitle: {
          en: "Step 2: Open PM Jan Dhan Zero-Balance Account",
          hi: "चरण 2: पीएम जन धन शून्य-बैलेंस बैंक खाता खोलें",
          bn: "ধাপ ২: পিএম জন ধন জিরো-ব্যালেন্স ব্যাংক অ্যাকাউন্ট",
          ta: "படி 2: பிஎம் ஜன் தன் ஜீரோ பேலன்ஸ் வங்கி கணக்கு",
        },
        whyFirst: {
          en: "No minimum balance penalty, includes free RuPay debit card with ₹2 Lakh built-in accidental insurance.",
          hi: "बिना न्यूनतम राशि जुर्माने के सरकारी सब्सिडी और ₹2 लाख तक का मुफ्त दुर्घटना बीमा कार्ड।",
          bn: "কোনো ন্যূনতম জমার শর্ত নেই এবং বিনামূল্যে ২ লক্ষ টাকার দুর্ঘটনা বীমাযুক্ত রূপেই কার্ড।",
          ta: "குறைந்தபட்ச இருப்பு கட்டணம் இல்லை மற்றும் இலவச ரூபே டெபிட் கார்டு.",
        },
        prerequisites: ["Aadhaar card", "2 passport photos"],
      },
      {
        sequence: 3,
        serviceId: "pm-suraksha-bima-yojana",
        stepTitle: {
          en: "Step 3: Activate PMSBY Accidental Insurance (₹20/year)",
          hi: "चरण 3: पीएम सुरक्षा बीमा योजना सक्रिय करें (₹20/वर्ष)",
          bn: "ধাপ ৩: পিএম সুরক্ষা বীমা যোজনা সক্রিয়করণ (বছরে ₹২০)",
          ta: "படி 3: பிஎம்எஸ்பிஒய் விபத்து காப்பீட்டை செயல்படுத்தவும் (ஆண்டுக்கு ₹20)",
        },
        whyFirst: {
          en: "Provides ₹2,00,000 accidental death/total disability cover for a nominal auto-debit tariff of just ₹20 per year.",
          hi: "मात्र ₹20 वार्षिक प्रीमियम पर ₹2,00,000 का व्यापक दुर्घटना बीमा सुरक्षा कवच।",
          bn: "মাত্র ২০ টাকা বার্ষিক খরচে পরিবারকে ২ লক্ষ টাকার আর্থিক সুরক্ষা প্রদান করে।",
          ta: "ஆண்டுக்கு வெறும் ₹20 கட்டணத்தில் ₹2 லட்சம் விபத்து காப்பீடு.",
        },
        prerequisites: ["Bank savings account", "Auto-debit consent"],
      },
    ],
  },
  {
    id: "senior-citizen-pension",
    category: "elderly",
    title: {
      en: "Senior Citizen & Retirement Dignity",
      hi: "वरिष्ठ नागरिक एवं सेवानिवृत्ति सम्मान",
      bn: "প্রবীণ নাগরিক ও অবসরকালীন মর্যাদা",
      ta: "முதியோர் மற்றும் ஓய்வூதிய கௌரவம்",
    },
    tagline: {
      en: "Pension claim settlement to free healthcare and consumer protection",
      hi: "पेंशन दावों के निपटान से लेकर मुफ्त स्वास्थ्य सेवा और उपभोक्ता सुरक्षा तक",
      bn: "পেনশন নিষ্পত্তি থেকে বিনামূল্যে স্বাস্থ্যসেবা এবং সুরক্ষা",
      ta: "ஓய்வூதியம் முதல் இலவச மருத்துவம் மற்றும் நுகர்வோர் பாதுகாப்பு வரை",
    },
    overview: {
      en: "Essential civic workflows ensuring seamless pension settlement, expanded senior Ayushman healthcare, and grievance redressal.",
      hi: "पेंशन निपटान, वरिष्ठ नागरिकों के लिए आयुष्मान स्वास्थ्य योजना और धोखाधड़ी से सुरक्षा की संरचित व्यवस्था।",
      bn: "পেনশন সুবিধা, ৫ লক্ষ টাকার বিনামূল্যে চিকিৎসা এবং সাইবার প্রতারণা থেকে সুরক্ষার ধারাবাহিক পথরেখা।",
      ta: "ஓய்வூதிய தீர்வு மற்றும் மூத்த குடிமக்களுக்கான இலவச சுகாதார திட்டம்.",
    },
    targetCitizens: "Senior citizens aged 60+ and retiring employees",
    steps: [
      {
        sequence: 1,
        serviceId: "epf-passbook-claim-status",
        stepTitle: {
          en: "Step 1: Check EPF Member Passbook & Pension Status",
          hi: "चरण 1: ईपीएफ सदस्य पासबुक व पेंशन दावा स्थिति जांचें",
          bn: "ধাপ ১: ইপিএফ সদস্য পাসবুক ও পেনশন দাবি যাচাই",
          ta: "படி 1: இபிஎஃப் பாஸ்புக் மற்றும் ஓய்வூதிய நிலையை சரிபார்க்கவும்",
        },
        whyFirst: {
          en: "Settles final PF accumulations and activates monthly EPS-95 pension entitlements.",
          hi: "भविष्य निधि की संचित राशि निकालने और मासिक पेंशन शुरू कराने का प्राथमिक कदम।",
          bn: "মাসিক পেনশন চালু এবং প্রভিডেন্ট ফান্ডের অর্থ উত্তোলনের প্রধান প্রক্রিয়া।",
          ta: "பிஎஃப் பணம் மற்றும் மாதாந்திர ஓய்வூதியம் பெற முதல் படி.",
        },
        prerequisites: ["Active UAN", "Aadhaar linked to bank account"],
      },
      {
        sequence: 2,
        serviceId: "create-abha-id",
        stepTitle: {
          en: "Step 2: Enroll in Senior Citizen Ayushman Bharat (ABHA)",
          hi: "चरण 2: वरिष्ठ नागरिक आयुष्मान भारत (आभा) में नामांकन करें",
          bn: "ধাপ ২: প্রবীণ নাগরিক আয়ুষ্মান ভারত স্বাস্থ্য কার্ড তৈরি",
          ta: "படி 2: மூத்த குடிமக்கள் ஆயுஷ்மான் பாரத் கார்டை பெறவும்",
        },
        whyFirst: {
          en: "Unlocks dedicated ₹5,00,000 annual free secondary/tertiary hospital treatment for all citizens aged 70+ irrespective of income.",
          hi: "आय सीमा के बिना 70+ आयु के सभी बुजुर्गों के लिए ₹5,00,000 की कैशलेस अस्पताल चिकित्सा सुविधा।",
          bn: "৭০+ বয়সী সমস্ত প্রবীণ নাগরিকদের জন্য বার্ষিক ৫ লক্ষ টাকার ক্যাশলেস স্বাস্থ্য বীমা।",
          ta: "70+ வயதுடைய அனைவருக்கும் ₹5 லட்சம் இலவச மருத்துவ சிகிச்சை.",
        },
        prerequisites: ["Aadhaar with DoB proving age 60+/70+"],
      },
      {
        sequence: 3,
        serviceId: "consumer-helpline-grievance",
        stepTitle: {
          en: "Step 3: Register at National Consumer Helpline (NCH 1915)",
          hi: "चरण 3: राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर सहायता प्राप्त करें",
          bn: "ধাপ ৩: জাতীয় উপভোক্তা হেল্পলাইন (১৯১৫) সহায়তা",
          ta: "படி 3: தேசிய நுகர்வோர் உதவி மையத்தை அணுகவும் (1915)",
        },
        whyFirst: {
          en: "Fast-track grievance redressal for unresolved insurance rejections, pension delays, and banking/telecom fraud.",
          hi: "पेंशन में देरी, बीमा क्लेम अस्वीकृति या बैंकिंग धोखाधड़ी के खिलाफ त्वरित शिकायत निवारण।",
          bn: "বীমা দাবি বাতিল বা ব্যাংকিং জটিলতা নিরসনে সরকারি আইনি সহায়তা।",
          ta: "காப்பீடு மறுப்பு மற்றும் ஓய்வூதிய தாமதங்களுக்கு விரைவான தீர்வு.",
        },
        prerequisites: ["Transaction details", "Docket / Reference number"],
      },
    ],
  },
];

