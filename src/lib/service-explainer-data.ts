/**
 * Unified Life Services Platform - Service Explainer Guide Data
 *
 * Provides a standardized 5-step journey for every public service in the catalogue:
 * 1. Preparation & Pre-requisites
 * 2. Official Portal Navigation (avoiding ad traps & fake sites)
 * 3. Data Entry & Document Requirements
 * 4. Official Fees & Receipts
 * 5. Status Tracking & Post-Submission
 *
 * Adheres strictly to Hard Rule 8 & 9 (neutral, factual, verified sources).
 */

export interface ExplainerStep {
  stepNumber: number;
  title: {
    en: string;
    hi: string;
  };
  summary: {
    en: string;
    hi: string;
  };
  actionItems: {
    en: string[];
    hi: string[];
  };
  commonPitfallWarning?: {
    en: string;
    hi: string;
  };
  relatedJargonKey?: string;
}

export interface ServiceExplainerGuide {
  serviceId: string;
  steps: ExplainerStep[];
}

export function getExplainerGuideForService(serviceId: string): ServiceExplainerGuide | undefined {
  return EXPLAINER_GUIDES[serviceId];
}

export const EXPLAINER_GUIDES: Record<string, ServiceExplainerGuide> = {
  "create-abha-id": {
    serviceId: "create-abha-id",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites",
          hi: "चरण 1: आवश्यक पूर्व-तैयारी की जांच करें",
        },
        summary: {
          en: "Ensure you have an active Aadhaar number and the mobile phone linked to it.",
          hi: "सुनिश्चित करें कि आपके पास वैध आधार संख्या और उससे जुड़ा चालू मोबाइल फोन उपलब्ध है।",
        },
        actionItems: {
          en: [
            "Keep your 12-digit Aadhaar number ready.",
            "Make sure your Aadhaar-linked mobile phone has active network coverage to receive an OTP.",
            "If your mobile number is not linked to Aadhaar, you can alternatively use your Driving Licence.",
          ],
          hi: [
            "अपनी 12 अंकों की आधार संख्या तैयार रखें।",
            "ओटीपी प्राप्त करने के लिए आधार से जुड़ा मोबाइल फोन चालू रखें।",
            "यदि आधार से मोबाइल लिंक नहीं है, तो आप ड्राइविंग लाइसेंस का विकल्प भी चुन सकते हैं।",
          ],
        },
        commonPitfallWarning: {
          en: "Never pay any agent or cyber cafe to create an ABHA card. It is 100% free of charge on the official portal.",
          hi: "आभा कार्ड बनाने के लिए किसी बिचौलिए या दुकान को कोई शुल्क न दें। यह आधिकारिक पोर्टल पर पूरी तरह निःशुल्क है।",
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Navigate to Official ABDM Portal",
          hi: "चरण 2: आधिकारिक राष्ट्रीय स्वास्थ्य प्राधिकरण पोर्टल खोलें",
        },
        summary: {
          en: "Open the verified portal abha.abdm.gov.in.",
          hi: "सत्यापित आधिकारिक पोर्टल abha.abdm.gov.in पर जाएं।",
        },
        actionItems: {
          en: [
            "Verify the browser address bar reads 'https://abha.abdm.gov.in'.",
            "Click on the button labeled 'Create ABHA Number'.",
            "Select 'Create your ABHA using Aadhaar' (recommended for instant generation).",
          ],
          hi: [
            "ब्राउज़र के एड्रेस बार में जांचें कि केवल 'https://abha.abdm.gov.in' लिखा हो।",
            "'Create ABHA Number' (आभा संख्या बनाएं) बटन पर क्लिक करें।",
            "त्वरित निर्माण के लिए 'आधार के माध्यम से आभा बनाएं' विकल्प चुनें।",
          ],
        },
        commonPitfallWarning: {
          en: "Beware of search engine sponsored ads that mimic the government portal. Always look for the .gov.in domain.",
          hi: "सर्च इंजन पर दिखने वाले फर्जी विज्ञापनों से सावधान रहें। हमेशा .gov.in डोमेन की जांच करें।",
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Details & Verify OTP",
          hi: "चरण 3: विवरण दर्ज करें और ओटीपी सत्यापित करें",
        },
        summary: {
          en: "Enter Aadhaar digits and complete the electronic verification.",
          hi: "आधार नंबर दर्ज करें और इलेक्ट्रॉनिक सत्यापन पूरा करें।",
        },
        actionItems: {
          en: [
            "Enter your 12-digit Aadhaar number.",
            "Read and accept the consent disclaimer regarding Aadhaar authentication.",
            "Enter the 6-digit OTP received on your mobile phone and submit.",
          ],
          hi: [
            "अपना 12 अंकों का आधार नंबर दर्ज करें।",
            "सहमति घोषणा पत्र पढ़ें और चेकबॉक्स पर टिक करें।",
            "मोबाइल पर आया 6 अंकों का ओटीपी दर्ज कर सबमिट करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Do NOT share the received OTP with anyone claiming to be a hospital representative over phone calls.",
          hi: "किसी भी फोन कॉल पर खुद को अस्पताल कर्मी बताने वाले व्यक्ति के साथ ओटीपी साझा न करें।",
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Create ABHA Address (Health Handle)",
          hi: "चरण 4: अपना आभा पता (हेल्थ हैंडल) चुनें",
        },
        summary: {
          en: "Choose a memorable handle like a UPI address (e.g. yourname@abdm).",
          hi: "यूपीआई आईडी की तरह अपना एक आसान हैंडल चुनें (उदा. yourname@abdm)।",
        },
        actionItems: {
          en: [
            "Review your auto-filled demographic details fetched from UIDAI.",
            "Type your preferred ABHA handle (e.g. name123@abdm).",
            "Set a secure password if you wish to log in directly via username in future.",
          ],
          hi: [
            "आधार से प्राप्त अपने नाम और जन्मतिथि की जांच करें।",
            "अपनी पसंद का आभा पता (जैसे name123@abdm) दर्ज करें।",
            "भविष्य में लॉगिन के लिए एक सुरक्षित पासवर्ड सेट करें।",
          ],
        },
        relatedJargonKey: "abha_address",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Download & Save ABHA Card",
          hi: "चरण 5: आभा कार्ड डाउनलोड करें और सुरक्षित रखें",
        },
        summary: {
          en: "Download your digital 14-digit ABHA card PDF or save to DigiLocker.",
          hi: "अपना 14 अंकों का डिजिटल आभा कार्ड पीडीएफ डाउनलोड करें या डिजिलॉकर में सहेजें।",
        },
        actionItems: {
          en: [
            "Click 'Download ABHA Card' to save the official PDF.",
            "Note down your 14-digit ABHA Number (e.g. XX-XXXX-XXXX-XXXX).",
            "Present this QR code or 14-digit number at hospital registration counters for fast paperless OPD registration.",
          ],
          hi: [
            "'Download ABHA Card' पर क्लिक करके आधिकारिक पीडीएफ सुरक्षित करें।",
            "अपनी 14 अंकों की आभा संख्या कहीं सुरक्षित डायरी में नोट कर लें।",
            "अस्पताल ओपीडी में त्वरित पर्ची बनवाने के लिए यह क्यूआर कोड या 14 अंकों का नंबर दिखाएं।",
          ],
        },
      },
    ],
  },
  "driving-licence-renewal": {
    serviceId: "driving-licence-renewal",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & Medical Fitness",
          hi: "चरण 1: आवश्यक दस्तावेज और मेडिकल फिटनेस जांचें",
        },
        summary: {
          en: "Gather your existing driving licence, photograph, and medical certificate if over 40.",
          hi: "अपना पुराना लाइसेंस, पासपोर्ट फोटो और 40 वर्ष से अधिक आयु होने पर मेडिकल प्रमाण पत्र तैयार रखें।",
        },
        actionItems: {
          en: [
            "Keep your existing Driving Licence Number and Date of Birth ready.",
            "If you are aged 40 years or older, obtain Medical Certificate Form 1-A signed by a registered MBBS doctor.",
            "Keep scanned copies of address proof and medical certificate in PDF (under 200 KB).",
          ],
          hi: [
            "अपना पुराना ड्राइविंग लाइसेंस नंबर और जन्मतिथि नोट करके रखें।",
            "यदि आपकी आयु 40 वर्ष या उससे अधिक है, तो पंजीकृत एमबीबीएस डॉक्टर द्वारा हस्ताक्षरित फॉर्म 1-ए (मेडिकल प्रमाणपत्र) बनवाएं।",
            "पते के प्रमाण और मेडिकल फॉर्म की 200 केबी से कम साइज की पीडीएफ फाइल तैयार रखें।",
          ],
        },
        commonPitfallWarning: {
          en: "You can apply for renewal up to one year before expiry or within one year after expiry without re-testing.",
          hi: "आप लाइसेंस समाप्त होने से एक वर्ष पहले या समाप्ति के एक वर्ष बाद तक बिना दोबारा ड्राइविंग टेस्ट दिए नवीनीकरण करा सकते हैं।",
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Sarathi Parivahan & Select State",
          hi: "चरण 2: सारथी परिवहन पोर्टल खोलें और राज्य चुनें",
        },
        summary: {
          en: "Visit sarathi.parivahan.gov.in and choose your current state.",
          hi: "sarathi.parivahan.gov.in पर जाएं और अपना राज्य चुनें।",
        },
        actionItems: {
          en: [
            "Open 'https://sarathi.parivahan.gov.in'.",
            "From the drop-down menu, select the State where your RTO is located.",
            "On the state services homepage, select 'Apply for DL Renewal'.",
          ],
          hi: [
            "पोर्टल 'https://sarathi.parivahan.gov.in' खोलें।",
            "ड्रॉप-डाउन सूची से उस राज्य का चयन करें जहां आपका आरटीओ कार्यालय स्थित है।",
            "'Apply for DL Renewal' (लाइसेंस नवीनीकरण के लिए आवेदन) पर क्लिक करें।",
          ],
        },
        relatedJargonKey: "sarathi_selection",
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Licence Number & Upload Documents",
          hi: "चरण 3: लाइसेंस नंबर दर्ज करें और दस्तावेज अपलोड करें",
        },
        summary: {
          en: "Fetch existing licence records and upload required certificates.",
          hi: "लाइसेंस रिकॉर्ड फेच करें और आवश्यक प्रमाण पत्र अपलोड करें।",
        },
        actionItems: {
          en: [
            "Enter Driving Licence Number (in the exact standard format, e.g. DL-0420110012345).",
            "Enter your Date of Birth and click 'Get DL Details'.",
            "Confirm your details and select 'Renewal of DL' from the available service list.",
            "Upload Form 1-A medical certificate and address proof.",
          ],
          hi: [
            "लाइसेंस नंबर सही फॉर्मेट में दर्ज करें।",
            "अपनी जन्मतिथि दर्ज कर 'Get DL Details' पर क्लिक करें।",
            "सेवा सूची में से 'Renewal of DL' का चयन करें।",
            "फॉर्म 1-ए और पते का प्रमाण अपलोड करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Pay Official Government Fee Online",
          hi: "चरण 4: आधिकारिक सरकारी शुल्क का ऑनलाइन भुगतान करें",
        },
        summary: {
          en: "Pay the standard renewal fee (typically ₹200 + smart card fee).",
          hi: "मानक नवीनीकरण शुल्क (सामान्यतः ₹200 + स्मार्ट कार्ड शुल्क) का ऑनलाइन भुगतान करें।",
        },
        actionItems: {
          en: [
            "Review the fee breakdown displayed on the portal.",
            "Pay online using UPI, Debit Card, or Net Banking through Bharatkosh / state treasury gateway.",
            "Download and print the Payment Receipt (Form 1) containing your Application Reference Number.",
          ],
          hi: [
            "स्क्रीन पर प्रदर्शित सरकारी शुल्क विवरण की जांच करें।",
            "यूपीआई, डेबिट कार्ड या नेट बैंकिंग से भुगतान पूरा करें।",
            "आवेदन पावती रसीद डाउनलोड करें और उसका प्रिंट निकालें।",
          ],
        },
        commonPitfallWarning: {
          en: "Never close the browser window until the payment confirmation receipt is generated.",
          hi: "जब तक भुगतान रसीद डाउनलोड न हो जाए, तब तक ब्राउज़र विंडो बंद न करें।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Application & Dispatch",
          hi: "चरण 5: आवेदन की स्थिति ट्रैक करें और कार्ड प्राप्त करें",
        },
        summary: {
          en: "Track RTO approval status online; renewed licence is dispatched via Speed Post.",
          hi: "पोर्टल पर आवेदन की स्थिति देखें; नया स्मार्ट कार्ड स्पीड पोस्ट से घर भेजा जाता है।",
        },
        actionItems: {
          en: [
            "Go to 'Application Status' on the Sarathi homepage and enter your Application Number.",
            "Once approved by the Licensing Authority, the virtual driving licence is instantly available in DigiLocker and mParivahan.",
            "Physical smart card is delivered by India Post within 15–30 working days.",
          ],
          hi: [
            "सारथी होमपेज पर 'Application Status' में जाकर आवेदन नंबर दर्ज करें।",
            "स्वीकृति मिलते ही आपका डिजिटल लाइसेंस डिजिलॉकर में दिखने लगेगा।",
            "स्पीड पोस्ट द्वारा भौतिक स्मार्ट कार्ड 15 से 30 दिनों में पते पर पहुंचेगा।",
          ],
        },
      },
    ],
  },
  "nsp-scholarship-discovery": {
    serviceId: "nsp-scholarship-discovery",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & Family Income",
          hi: "चरण 1: पात्रता और पारिवारिक आय की जांच करें",
        },
        summary: {
          en: "Ensure valid student Aadhaar, bank passbook, and current academic year income certificate.",
          hi: "विद्यार्थी का आधार, बैंक पासबुक और चालू वर्ष का आय प्रमाण पत्र तैयार रखें।",
        },
        actionItems: {
          en: [
            "Ensure student's bank account is in their own name and seeded with Aadhaar for DBT.",
            "Obtain fresh family income certificate from Tehsildar / revenue authority.",
            "Keep previous year marksheet and bonafide student certificate from school or college.",
          ],
          hi: [
            "सुनिश्चित करें कि बैंक खाता छात्र के नाम पर हो और डीबीटी (DBT) के लिए आधार से जुड़ा हो।",
            "सक्षम राजस्व अधिकारी से बना चालू वर्ष का आय प्रमाण पत्र रखें।",
            "गत वर्ष की अंकतालिका और वर्तमान कॉलेज/स्कूल का बोनाफाइड सर्टिफिकेट रखें।",
          ],
        },
        relatedJargonKey: "dbt",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Generate One-Time Registration (OTR)",
          hi: "चरण 2: वन-टाइम रजिस्ट्रेशन (OTR) बनाएं",
        },
        summary: {
          en: "Create your permanent student OTR handle on scholarships.gov.in.",
          hi: "scholarships.gov.in पर अपना स्थायी छात्र पंजीकरण नंबर बनाएं।",
        },
        actionItems: {
          en: [
            "Visit 'https://scholarships.gov.in'.",
            "Click on 'Apply for OTR' (One Time Registration).",
            "Perform Aadhaar Face Authentication or Aadhaar OTP verification via the NSP OTR app.",
            "Record your 14-digit OTR Reference Number.",
          ],
          hi: [
            "पोर्टल 'https://scholarships.gov.in' खोलें।",
            "'Apply for OTR' पर क्लिक करें।",
            "आधार ओटीपी या फेस ऑथेंटिकेशन के जरिए सत्यापन पूरा करें।",
            "अपना 14 अंकों का ओटीआर नंबर सुरक्षित लिखकर रखें।",
          ],
        },
        relatedJargonKey: "otr",
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Discover Matching Schemes",
          hi: "चरण 3: पात्र छात्रवृत्ति योजनाओं की खोज करें",
        },
        summary: {
          en: "Log in with your OTR credentials and view eligible schemes.",
          hi: "ओटीआर नंबर से लॉगिन करें और अपनी पात्र योजनाएं देखें।",
        },
        actionItems: {
          en: [
            "Log in using your OTR number and password.",
            "Fill in academic course details (AISHE / UDISE code of your institution).",
            "The portal automatically filters eligible central, state, and UGC/AICTE scholarship schemes.",
          ],
          hi: [
            "ओटीआर नंबर और पासवर्ड से लॉगिन करें।",
            "अपने संस्थान का UDISE / AISHE कोड और कक्षा विवरण दर्ज करें।",
            "सिस्टम आपके लिए उपलब्ध योजनाओं की सूची स्वतः प्रदर्शित करेगा।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Upload Documents & Submit Application",
          hi: "चरण 4: दस्तावेज अपलोड करें और आवेदन जमा करें",
        },
        summary: {
          en: "Upload scanned certificates and submit before the scheme deadline.",
          hi: "प्रमाण पत्र अपलोड करें और अंतिम तिथि से पहले फॉर्म सबमिट करें।",
        },
        actionItems: {
          en: [
            "Upload caste/category certificate (if applying under SC/ST/OBC/Minority scheme).",
            "Upload fee receipt of current academic semester.",
            "Verify all details carefully and click 'Final Submit'.",
          ],
          hi: [
            "आवश्यकतानुसार जाति/श्रेणी प्रमाण पत्र अपलोड करें।",
            "वर्तमान कक्षा की फीस रसीद अपलोड करें।",
            "विवरण जांचने के बाद 'Final Submit' करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Once 'Final Submit' is clicked, you cannot edit institute or bank details. Review every field thoroughly.",
          hi: "फाइनल सबमिट के बाद विवरण में बदलाव नहीं किया जा सकता। सबमिट करने से पहले हर प्रविष्टि जांच लें।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Institute Verification & DBT Disbursement",
          hi: "चरण 5: संस्थान सत्यापन और डीबीटी छात्रवृत्ति अंतरण",
        },
        summary: {
          en: "Inform your school or college nodal officer to verify your application online.",
          hi: "अपने स्कूल या कॉलेज के नोडल अधिकारी को ऑनलाइन सत्यापन हेतु सूचित करें।",
        },
        actionItems: {
          en: [
            "Submit a printed copy of the submitted form to your institution's scholarship desk.",
            "Track verification progress: Level 1 (Institute) -> Level 2 (District/State Nodal Officer).",
            "Scholarship money is credited directly via DBT to your Aadhaar-linked bank account.",
          ],
          hi: [
            "आवेदन फॉर्म का प्रिंट अपने संस्थान के छात्रवृत्ति कार्यालय में जमा करें।",
            "सत्यापन स्थिति पोर्टल पर ट्रैक करें।",
            "राशि सीधे आपके आधार से जुड़े बैंक खाते में जमा होगी।",
          ],
        },
        relatedJargonKey: "dbt",
      },
    ],
  },
  "pm-kisan-status": {
    serviceId: "pm-kisan-status",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & eKYC Status",
          hi: "चरण 1: पात्रता और ई-केवाईसी स्थिति की जांच करें",
        },
        summary: {
          en: "Ensure your Aadhaar is linked to your land record (Bhulekh) and active bank account.",
          hi: "सुनिश्चित करें कि आपका आधार जमीन की खतौनी और बैंक खाते से जुड़ा हुआ है।",
        },
        actionItems: {
          en: [
            "Ensure farmer has completed mandatory eKYC on the PM-Kisan portal.",
            "Verify land seeding status in your state revenue records (Bhulekh).",
            "Ensure bank account is mapped on NPCI for Direct Benefit Transfer.",
          ],
          hi: [
            "सुनिश्चित करें कि पीएम किसान पोर्टल पर आपकी ई-केवाईसी पूर्ण है।",
            "भूलेख पोर्टल पर जमीन की मैपिंग की स्थिति जांचें।",
            "बैंक खाते में डीबीटी और एनपीसीआई मैपिंग सक्रिय होनी चाहिए।",
          ],
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Official PM-Kisan Portal",
          hi: "चरण 2: आधिकारिक पीएम किसान पोर्टल खोलें",
        },
        summary: {
          en: "Visit pmkisan.gov.in.",
          hi: "pmkisan.gov.in पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Go to 'https://pmkisan.gov.in'.",
            "Scroll to the 'Farmers Corner' section on the homepage.",
            "Click on 'Know Your Status'.",
          ],
          hi: [
            "वेबसाइट 'https://pmkisan.gov.in' खोलें।",
            "होमपेज पर 'Farmers Corner' विकल्प पर जाएं।",
            "'Know Your Status' (अपनी स्थिति जानें) पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Registration Number or Mobile",
          hi: "चरण 3: पंजीकरण संख्या या मोबाइल नंबर दर्ज करें",
        },
        summary: {
          en: "Enter your PM-Kisan Registration Number or search via Aadhaar.",
          hi: "अपना पीएम-किसान रजिस्ट्रेशन नंबर दर्ज करें अथवा आधार से खोजें।",
        },
        actionItems: {
          en: [
            "Enter your PM-Kisan Registration Number (format: UP123456789).",
            "If you do not remember your number, click 'Know your registration number' and enter Aadhaar.",
            "Enter the security captcha code and click 'Get OTP'.",
          ],
          hi: [
            "अपना रजिस्ट्रेशन नंबर दर्ज करें।",
            "यदि नंबर याद नहीं है, तो 'Know your registration number' पर क्लिक कर आधार से प्राप्त करें।",
            "कैप्चा कोड दर्ज कर 'Get OTP' पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Inspect Installment Status & Eligibility Flags",
          hi: "चरण 4: किस्त की स्थिति और पात्रता फ्लैग जांचें",
        },
        summary: {
          en: "Verify the three essential green ticks: Land Seeding, eKYC, and Aadhaar Bank Account.",
          hi: "तीन आवश्यक हरी टिक जांचें: Land Seeding (भूलेख), eKYC, और आधार बैंक सीडिंग।",
        },
        actionItems: {
          en: [
            "Check that 'Land Seeding' status shows 'YES'.",
            "Check that 'eKYC Done' shows 'YES'.",
            "Check that 'Aadhaar Bank Account Seeding' shows 'YES'.",
          ],
          hi: [
            "जांचें कि 'Land Seeding' में 'YES' लिखा हो।",
            "जांचें कि 'eKYC Done' में 'YES' लिखा हो।",
            "जांचें कि 'Aadhaar Bank Account Seeding' में 'YES' लिखा हो।",
          ],
        },
        commonPitfallWarning: {
          en: "If any of the three flags shows 'NO', installments will be paused until corrected at the local agriculture / revenue office.",
          hi: "यदि इनमें से किसी में भी 'NO' लिखा है, तो स्थानीय कृषि अधिकारी या बैंक शाखा से इसे तुरंत सही कराएं।",
        },
        relatedJargonKey: "dbt",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: View Credited Installment History",
          hi: "चरण 5: खाते में जमा किस्तों का विवरण देखें",
        },
        summary: {
          en: "Review the FTO (Fund Transfer Order) generation and bank UTR numbers.",
          hi: "किस्त जारी होने (FTO) की तारीख और बैंक यूटीआर नंबर देखें।",
        },
        actionItems: {
          en: [
            "Select the installment number (e.g. 18th Installment).",
            "Verify the payment status shows 'Payment Success' with bank credit date and reference.",
            "If payment failed, the exact reason (e.g. account closed/dormant) is displayed for redressal.",
          ],
          hi: [
            "किस्त संख्या का चयन करें।",
            "जांचें कि भुगतान स्थिति में 'Payment Success' और बैंक खाता संख्या प्रदर्शित हो।",
            "यदि भुगतान रुका हुआ है, तो प्रदर्शित कारण को नोट कर सुधार करें।",
          ],
        },
      },
    ],
  },
  "aadhaar-pvc-card": {
    serviceId: "aadhaar-pvc-card",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & Fee",
          hi: "चरण 1: आवश्यक जानकारी और सरकारी शुल्क जांचें",
        },
        summary: {
          en: "Have your 12-digit Aadhaar number ready and ensure you have an active mobile number.",
          hi: "अपनी 12 अंकों की आधार संख्या तैयार रखें और कोई भी चालू मोबाइल नंबर पास रखें।",
        },
        actionItems: {
          en: [
            "Keep your 12-digit Aadhaar number or 28-digit Enrolment ID ready.",
            "Official fee is exactly ₹50 (inclusive of GST and Speed Post delivery across India).",
            "Even if your registered mobile is lost, you can use any alternate mobile number to order.",
          ],
          hi: [
            "अपना 12 अंकों का आधार नंबर या 28 अंकों की ईआईडी तैयार रखें।",
            "आधिकारिक शुल्क मात्र ₹50 है (डाक खर्च और जीएसटी सहित)।",
            "यदि आधार से जुड़ा मोबाइल खो गया है, तो भी आप किसी वैकल्पिक मोबाइल नंबर पर ओटीपी मंगा सकते हैं।",
          ],
        },
        relatedJargonKey: "pvc_card",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open myAadhaar Official Portal",
          hi: "चरण 2: myAadhaar आधिकारिक पोर्टल खोलें",
        },
        summary: {
          en: "Visit myaadhaar.uidai.gov.in.",
          hi: "myaadhaar.uidai.gov.in पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Open 'https://myaadhaar.uidai.gov.in/genricPVC'.",
            "Verify the URL belongs to uidai.gov.in domain.",
            "Click on 'Order Aadhaar PVC Card'.",
          ],
          hi: [
            "पोर्टल 'https://myaadhaar.uidai.gov.in/genricPVC' खोलें।",
            "जांचें कि वेबसाइट यूआईडीएआई (uidai.gov.in) की है।",
            "'Order Aadhaar PVC Card' पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Aadhaar & Security Captcha",
          hi: "चरण 3: आधार नंबर और सुरक्षा कोड दर्ज करें",
        },
        summary: {
          en: "Enter Aadhaar digits and request verification OTP.",
          hi: "आधार नंबर भरें और सत्यापन ओटीपी का अनुरोध करें।",
        },
        actionItems: {
          en: [
            "Enter your 12-digit Aadhaar Number.",
            "Enter the security Captcha code.",
            "If your mobile number is not registered, tick 'My mobile number is not registered' and type any active phone number.",
            "Click 'Send OTP' and enter the 6 digits received.",
          ],
          hi: [
            "अपना आधार नंबर और कैप्चा कोड भरें।",
            "यदि आधार से मोबाइल लिंक नहीं है, तो 'My mobile number is not registered' पर टिक करके दूसरा मोबाइल नंबर भरें।",
            "'Send OTP' दबाकर प्राप्त कोड दर्ज करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Pay Official ₹50 Fee Online",
          hi: "चरण 4: ₹50 सरकारी शुल्क का ऑनलाइन भुगतान करें",
        },
        summary: {
          en: "Complete payment via UPI, Debit Card, or Netbanking.",
          hi: "यूपीआई, डेबिट कार्ड या नेट बैंकिंग से भुगतान करें।",
        },
        actionItems: {
          en: [
            "Review the payment terms and check the consent box.",
            "Choose payment gateway (Razorpay / PayU on UIDAI portal).",
            "Pay ₹50 using UPI (Google Pay, PhonePe, Paytm, BHIM) or card.",
            "Download the official Payment Receipt containing the SRN (Service Request Number).",
          ],
          hi: [
            "सहमति बॉक्स पर टिक करें और भुगतान गेटवे चुनें।",
            "यूपीआई या कार्ड से ₹50 का भुगतान पूरा करें।",
            "एसआरएन (SRN) नंबर वाली आधिकारिक रसीद डाउनलोड करें।",
          ],
        },
        commonPitfallWarning: {
          en: "UIDAI charges only ₹50. Do not use commercial print services that charge ₹150–₹300 for non-secure laminated cards.",
          hi: "यूआईडीएआई केवल ₹50 शुल्क लेता है। बाजार में गैर-सुरक्षित कार्ड के लिए ₹200-₹300 देने से बचें।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Speed Post Delivery",
          hi: "चरण 5: स्पीड पोस्ट डिलीवरी ट्रैक करें",
        },
        summary: {
          en: "UIDAI prints and dispatches the PVC card within 5 working days via India Post.",
          hi: "यूआईडीएआई 5 कार्य दिवसों में कार्ड डाक विभाग को सौंप देता है।",
        },
        actionItems: {
          en: [
            "Track status on myaadhaar.uidai.gov.in using your 28-digit SRN.",
            "Once dispatched, a Speed Post tracking consignment number (e.g. ED123456789IN) is sent via SMS.",
            "Track on indiapost.gov.in until delivered to your Aadhaar address.",
          ],
          hi: [
            "अपने 28 अंकों के SRN नंबर से पोर्टल पर स्थिति ट्रैक करें।",
            "डिस्पैच होने पर एसएमएस द्वारा स्पीड पोस्ट ट्रैकिंग नंबर प्राप्त होगा।",
            "डाक विभाग की वेबसाइट पर डिलीवरी स्थिति देखें।",
          ],
        },
      },
    ],
  },
  "consumer-helpline-grievance": {
    serviceId: "consumer-helpline-grievance",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Gather Purchase Evidence",
          hi: "चरण 1: खरीद व शिकायत के प्रमाण एकत्र करें",
        },
        summary: {
          en: "Keep tax invoice, transaction receipts, warranty cards, and written communication ready.",
          hi: "बिल, भुगतान रसीद, वारंटी कार्ड और कंपनी से हुए पत्राचार की प्रति तैयार रखें।",
        },
        actionItems: {
          en: [
            "Keep the original purchase invoice or order confirmation number.",
            "Save email threads or chat transcripts showing company's refusal to refund or resolve.",
            "Identify the company's registered business name and customer support email.",
          ],
          hi: [
            "सामान या सेवा की रसीद / इनवॉइस तैयार रखें।",
            "कंपनी से ईमेल या चैट पर हुई बातचीत का स्क्रीनशॉट रखें।",
            "कंपनी का सही पंजीकृत नाम और ईमेल पता नोट करें।",
          ],
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Choose Grievance Channel",
          hi: "चरण 2: शिकायत दर्ज करने का माध्यम चुनें",
        },
        summary: {
          en: "Lodge grievance via toll-free call (1915), WhatsApp, or web portal.",
          hi: "टोल-फ्री नंबर 1915, व्हाट्सएप या आधिकारिक वेबसाइट द्वारा शिकायत दर्ज करें।",
        },
        actionItems: {
          en: [
            "Option A: Call National Toll-Free Helpline 1915 (working 8 AM to 8 PM, all days except national holidays).",
            "Option B: Send message on official NCH WhatsApp at 8800001915.",
            "Option C: Register online at consumerhelpline.gov.in (recommended for uploading documents).",
          ],
          hi: [
            "विकल्प क: राष्ट्रीय टोल-फ्री नंबर 1915 पर कॉल करें।",
            "विकल्प ख: आधिकारिक व्हाट्सएप नंबर 8800001915 पर संदेश भेजें।",
            "विकल्प ग: consumerhelpline.gov.in पर ऑनलाइन पंजीकरण करें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Register Citizen Account & File Details",
          hi: "चरण 3: नागरिक खाता बनाएं और शिकायत का विवरण भरें",
        },
        summary: {
          en: "Select Industry sector, Company name, product type, and dispute amount.",
          hi: "उद्योग का प्रकार, कंपनी का नाम, उत्पाद और विवादित राशि का चयन करें।",
        },
        actionItems: {
          en: [
            "Select Industry sector (e.g. E-Commerce, Banking, Airlines, Telecom, Real Estate).",
            "Select Company Name from the pre-populated registered brand directory.",
            "Write a factual, chronological summary of the grievance (dates, defect, relief sought).",
          ],
          hi: [
            "उद्योग क्षेत्र (उदा. ई-कॉमर्स, बैंकिंग, एयरलाइंस) चुनें।",
            "सूची में से संबंधित कंपनी का नाम चुनें।",
            "तथ्यों के आधार पर संक्षेप में समस्या और समाधान का विवरण लिखें।",
          ],
        },
        commonPitfallWarning: {
          en: "Filing a grievance on NCH is completely free. Government never asks for money to lodge consumer complaints.",
          hi: "उपभोक्ता हेल्पलाइन पर शिकायत दर्ज करना पूर्णतः निःशुल्क है। सरकार कोई शुल्क नहीं लेती।",
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Upload Invoices & Submit Docket",
          hi: "चरण 4: बिल अपलोड करें और डॉकेट नंबर प्राप्त करें",
        },
        summary: {
          en: "Attach PDF/JPEG proofs and submit to generate your Grievance Docket Number.",
          hi: "प्रमाण पत्र संलग्न करें और शिकायत सबमिट कर डॉकेट नंबर प्राप्त करें।",
        },
        actionItems: {
          en: [
            "Upload purchase bill, payment proof, and email correspondence (PDF or image format, max 5MB).",
            "Review grievance declaration and submit.",
            "Immediately record your 7-digit NCH Docket Number.",
          ],
          hi: [
            "बिल और पत्राचार की कॉपी अपलोड करें।",
            "घोषणा पत्र स्वीकार कर सबमिट करें।",
            "स्क्रीन पर आए 7 अंकों के डॉकेट नंबर को नोट करें।",
          ],
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Resolution & Escalation",
          hi: "चरण 5: समाधान ट्रैक करें और आवश्यकता पड़ने पर अपील करें",
        },
        summary: {
          en: "NCH sends notice to company; track status online within 45 days turnaround.",
          hi: "हेल्पलाइन कंपनी को नोटिस भेजती है; 45 दिनों के भीतर ऑनलाइन स्थिति ट्रैक करें।",
        },
        actionItems: {
          en: [
            "NCH automatically forwards the grievance to the registered company's nodal desk for resolution.",
            "Track status on consumerhelpline.gov.in using your Docket Number.",
            "If company fails to resolve within 45 days, you receive a pre-formatted referral to file before the District Consumer Disputes Redressal Commission via e-Daakhil.",
          ],
          hi: [
            "हेल्पलाइन कंपनी के नोडल अधिकारी को समाधान हेतु सीधे निर्देशित करती है।",
            "डॉकेट नंबर से पोर्टल पर प्रगति ट्रैक करें।",
            "यदि 45 दिनों में समाधान न हो, तो ई-दाखिल पोर्टल के माध्यम से उपभोक्ता अदालत में केस दर्ज किया जा सकता है।",
          ],
        },
      },
    ],
  },
  "voter-id-epic-download": {
    serviceId: "voter-id-epic-download",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & Eligibility",
          hi: "चरण 1: आवश्यक पूर्व-तैयारी एवं पात्रता जांचें",
        },
        summary: {
          en: "Ensure you are 18+ and have your 10-digit EPIC number or enrollment details ready.",
          hi: "सुनिश्चित करें कि आपकी आयु 18 वर्ष पूरी हो चुकी है और अपना 10 अंकों का ईपीआईसी नंबर या संदर्भ पर्ची तैयार रखें।",
        },
        actionItems: {
          en: [
            "Check that your age is 18 years or older on the qualifying quarterly date.",
            "If downloading digital e-EPIC, keep your 10-digit EPIC Number (e.g. ABC1234567) ready.",
            "Make sure your mobile number is mapped to your EPIC on the portal to receive verification OTP.",
          ],
          hi: [
            "जांचें कि आपकी आयु संबंधित तिमाही में 18 वर्ष पूर्ण हो चुकी हो।",
            "डिजिटल कार्ड डाउनलोड के लिए 10 अंकों का वोटर आईडी नंबर तैयार रखें।",
            "ओटीपी प्राप्त करने के लिए सुनिश्चित करें कि आपका मोबाइल नंबर वोटर रिकॉर्ड से जुड़ा हो।",
          ],
        },
        commonPitfallWarning: {
          en: "The Election Commission of India provides e-EPIC downloads completely free. Never pay third-party websites offering 'instant plastic voter ID'.",
          hi: "चुनाव आयोग डिजिटल वोटर कार्ड पूरी तरह निःशुल्क देता है। बाजार की अनधिकृत वेबसाइटों को कोई शुल्क न दें।",
        },
        relatedJargonKey: "epic_number",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Official ECI Voters Portal",
          hi: "चरण 2: आधिकारिक चुनाव आयोग पोर्टल खोलें",
        },
        summary: {
          en: "Visit verified national portal voters.eci.gov.in.",
          hi: "सत्यापित राष्ट्रीय पोर्टल voters.eci.gov.in पर जाएं।",
        },
        actionItems: {
          en: [
            "Verify browser address bar displays 'https://voters.eci.gov.in'.",
            "Log in using your registered mobile number and password (or click 'Sign Up' if first time).",
            "On the dashboard, click on 'E-EPIC Download'.",
          ],
          hi: [
            "ब्राउज़र में जांचें कि पता 'https://voters.eci.gov.in' ही हो।",
            "अपने मोबाइल नंबर और पासवर्ड से लॉगिन करें।",
            "डैशबोर्ड पर 'E-EPIC Download' विकल्प पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter EPIC Number & Select State",
          hi: "चरण 3: ईपीआईसी नंबर दर्ज करें और राज्य चुनें",
        },
        summary: {
          en: "Search electoral record by EPIC number or Form Reference Number.",
          hi: "वोटर आईडी नंबर या आवेदन संदर्भ संख्या से रिकॉर्ड खोजें।",
        },
        actionItems: {
          en: [
            "Select 'EPIC no.' option and enter your 10-character code.",
            "Select your State/UT from the drop-down menu.",
            "Click 'Search' to view your electoral details (Name, Relative's Name, Assembly Constituency).",
          ],
          hi: [
            "'EPIC no.' विकल्प चुनें और अपना 10 अंकों का कोड भरें।",
            "ड्रॉप-डाउन सूची से अपना राज्य चुनें।",
            "'Search' पर क्लिक कर अपने नाम और विधानसभा क्षेत्र की पुष्टि करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Verify Mobile OTP",
          hi: "चरण 4: मोबाइल ओटीपी सत्यापित करें",
        },
        summary: {
          en: "Enter one-time security code sent to your registered mobile number.",
          hi: "अपने पंजीकृत मोबाइल पर भेजा गया 6 अंकों का सुरक्षा कोड दर्ज करें।",
        },
        actionItems: {
          en: [
            "Click 'Send OTP' to request the code on your linked phone.",
            "Enter the 6-digit OTP received via SMS from ECI.",
            "Click 'Verify' to complete electronic identity verification.",
          ],
          hi: [
            "'Send OTP' पर क्लिक करें।",
            "मोबाइल पर प्राप्त 6 अंकों का ओटीपी भरें।",
            "'Verify' पर क्लिक करके सत्यापन पूरा करें।",
          ],
        },
        commonPitfallWarning: {
          en: "If your mobile number is not registered, submit Form 8 (Correction of Entries) online to link your active mobile phone before downloading.",
          hi: "यदि मोबाइल नंबर लिंक नहीं है, तो पहले फॉर्म 8 भरकर अपना चालू मोबाइल नंबर ऑनलाइन जोड़ें।",
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Download & Save Color e-EPIC PDF",
          hi: "चरण 5: रंगीन ई-ईपीआईसी पीडीएफ डाउनलोड करें",
        },
        summary: {
          en: "Download digitally signed PDF voter card containing secure QR code.",
          hi: "डिजिटल हस्ताक्षरित एवं क्यूआर कोड युक्त आधिकारिक पीडीएफ सुरक्षित करें।",
        },
        actionItems: {
          en: [
            "Click 'Download e-EPIC' to save the official PDF to your device or DigiLocker.",
            "The downloaded PDF features a tamper-proof QR code readable by polling officers during elections.",
            "You can print this PDF or present it on your smartphone at your designated polling station on election day.",
          ],
          hi: [
            "'Download e-EPIC' पर क्लिक करके आधिकारिक पीडीएफ डाउनलोड करें।",
            "यह पीडीएफ चुनाव के दिन मतदान केंद्र पर पहचान पत्र के रूप में पूरी तरह मान्य है।",
            "इसे आप अपने फोन में डिजिलॉकर में भी सुरक्षित रख सकते हैं।",
          ],
        },
      },
    ],
  },
  "ration-card-nfsa-status": {
    serviceId: "ration-card-nfsa-status",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Locate Family Ration Card or Aadhaar",
          hi: "चरण 1: परिवार का राशन कार्ड या आधार नंबर खोजें",
        },
        summary: {
          en: "Keep your 12-digit Ration Card number or head of family Aadhaar ready.",
          hi: "अपना 12 अंकों का राशन कार्ड नंबर या मुखिया का आधार नंबर तैयार रखें।",
        },
        actionItems: {
          en: [
            "Find your 12-digit State Ration Card number printed on your physical card or receipt.",
            "If card number is misplaced, note down the Aadhaar number of any adult family member listed in the ration unit.",
            "Note your current district and Fair Price Shop (FPS) dealer name if known.",
          ],
          hi: [
            "पुराने राशन कार्ड पर लिखा 12 अंकों का राशन कार्ड नंबर निकालें।",
            "यदि कार्ड नंबर नहीं है, तो परिवार के किसी भी सदस्य का आधार नंबर तैयार रखें।",
            "अपने जिले और स्थानीय राशन डीलर (कोटेदार) का नाम नोट करें।",
          ],
        },
        relatedJargonKey: "nfsa_rc",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Official NFSA Portal",
          hi: "चरण 2: आधिकारिक राष्ट्रीय खाद्य सुरक्षा पोर्टल खोलें",
        },
        summary: {
          en: "Visit nfsa.gov.in and navigate to Know Your Ration Card.",
          hi: "nfsa.gov.in पर जाएं और 'Know Your Ration Card' विकल्प चुनें।",
        },
        actionItems: {
          en: [
            "Open 'https://nfsa.gov.in/portal/know_your_ration_card'.",
            "Verify the green address bar indicates the official central government domain.",
            "Select the 'Search with Ration Card No.' radio button.",
          ],
          hi: [
            "वेबसाइट 'https://nfsa.gov.in/portal/know_your_ration_card' खोलें।",
            "जांचें कि वेबसाइट भारत सरकार के खाद्य मंत्रालय की आधिकारिक साइट हो।",
            "'Search with Ration Card No.' विकल्प का चयन करें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Card Number & Captcha",
          hi: "चरण 3: राशन कार्ड नंबर और सुरक्षा कोड दर्ज करें",
        },
        summary: {
          en: "Submit query to fetch live records from State Food Portals.",
          hi: "राज्य खाद्य पोर्टल से लाइव रिकॉर्ड फेच करने हेतु विवरण भरें।",
        },
        actionItems: {
          en: [
            "Enter your 12-digit Ration Card Number.",
            "Enter the visual Captcha characters displayed on screen.",
            "Click on 'Get RC Details' to query the central database.",
          ],
          hi: [
            "अपना 12 अंकों का राशन कार्ड नंबर भरें।",
            "स्क्रीन पर दिख रहा कैप्चा कोड भरें।",
            "'Get RC Details' पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Inspect Family Member Seeding & Category",
          hi: "चरण 4: पारिवारिक सदस्यों के नाम और आधार सीडिंग जांचें",
        },
        summary: {
          en: "Verify scheme category (PHH or AAY) and individual Aadhaar seeding status.",
          hi: "योजना की श्रेणी (PHH या अंत्योदय) और परिवार के सभी सदस्यों की आधार सीडिंग स्थिति जांचें।",
        },
        actionItems: {
          en: [
            "Check that Scheme shows 'PHH' (Priority Household) or 'AAY' (Antyodaya).",
            "Review the list of family members; ensure UID Seeding status shows 'YES' for all members.",
            "Identify the registered Fair Price Shop (FPS) ID and dealer name for collection.",
          ],
          hi: [
            "जांचें कि योजना की श्रेणी 'PHH' या 'AAY' (अंत्योदय) दर्ज हो।",
            "जांचें कि परिवार के सभी सदस्यों के नाम के आगे आधार सीडिंग में 'YES' लिखा हो।",
            "अपनी अधिकृत राशन दुकान (कोटेदार) का नाम और आईडी नोट करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Under One Nation One Ration Card (ONORC), you can collect your foodgrain entitlement from ANY ration shop in India using biometric ePOS authentication.",
          hi: "वन नेशन वन राशन कार्ड के तहत आप देश के किसी भी शहर की सरकारी राशन दुकान से बायोमेट्रिक अंगूठा लगाकर अपना राशन ले सकते हैं।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: View Monthly Grain Entitlement & Entitled Quota",
          hi: "चरण 5: मासिक अनाज कोटा और पात्रता की जांच करें",
        },
        summary: {
          en: "Check exact monthly kilograms of wheat, rice, and coarse grains allocated.",
          hi: "प्रति सदस्य 5 किलो (या अंत्योदय पर 35 किलो) खाद्यान्न का आधिकारिक कोटा देखें।",
        },
        actionItems: {
          en: [
            "Verify your monthly allocation: 5 kg per person for PHH cards, or 35 kg per family for AAY cards.",
            "Government foodgrains under PMGKAY are distributed 100% free of charge; do not pay dealers extra per-kg charges.",
            "Save or print the RC details sheet to resolve any distribution dispute with the local dealer.",
          ],
          hi: [
            "अपना मासिक कोटा जांचें: प्राथमिकता परिवारों को प्रति व्यक्ति 5 किलो, अंत्योदय परिवारों को 35 किलो।",
            "पीएम गरीब कल्याण अन्न योजना के तहत अनाज पूरी तरह निःशुल्क है; कोटेदार को कोई पैसा न दें।",
            "आवश्यकता पड़ने पर विवरण पर्ची का प्रिंट निकालें।",
          ],
        },
      },
    ],
  },
  "pan-card-reprint": {
    serviceId: "pan-card-reprint",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & Official Fee",
          hi: "चरण 1: आवश्यक पूर्व-तैयारी एवं सरकारी शुल्क जांचें",
        },
        summary: {
          en: "Keep your 10-character PAN and Aadhaar number ready; fee is exactly ₹50.",
          hi: "अपना 10 अक्षरों का पैन नंबर और आधार नंबर तैयार रखें; सरकारी शुल्क मात्र ₹50 है।",
        },
        actionItems: {
          en: [
            "Have your 10-character Permanent Account Number (PAN) ready (format: ABCDE1234F).",
            "Ensure you have your 12-digit Aadhaar number for individual identity reconciliation.",
            "Official fee for reprint and postal delivery within India is exactly ₹50 (inclusive of GST).",
          ],
          hi: [
            "अपना 10 अक्षरों का पैन नंबर नोट करके रखें।",
            "सत्यापन के लिए अपना 12 अंकों का आधार नंबर पास रखें।",
            "स्पीड पोस्ट से नया कार्ड घर मंगाने का आधिकारिक सरकारी शुल्क मात्र ₹50 है।",
          ],
        },
        commonPitfallWarning: {
          en: "Beware of commercial intermediary websites charging ₹150–₹400 for PAN reprint. The official Protean/Income Tax tariff is strictly ₹50.",
          hi: "निजी एजेंटों और फर्जी वेबसाइटों से बचें जो ₹200 से ₹400 वसूलते हैं। आधिकारिक शुल्क केवल ₹50 है।",
        },
        relatedJargonKey: "epan",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Protean Official PAN Portal",
          hi: "चरण 2: आधिकारिक प्रोटीन (NSDL) पोर्टल खोलें",
        },
        summary: {
          en: "Open onlineservices.nsdl.com reprint page.",
          hi: "onlineservices.nsdl.com रीप्रिंट पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Open 'https://www.onlineservices.nsdl.com/paam/ReprintEPan.html'.",
            "Confirm the URL begins with the verified domain 'onlineservices.nsdl.com'.",
            "Read the introductory conditions regarding address dispatch.",
          ],
          hi: [
            "वेबसाइट 'https://www.onlineservices.nsdl.com/paam/ReprintEPan.html' खोलें।",
            "जांचें कि वेबसाइट प्रोटीन (NSDL) के आधिकारिक डोमेन पर है।",
            "पते पर कार्ड भेजने संबंधी नियम पढ़ें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter PAN, Aadhaar & Date of Birth",
          hi: "चरण 3: पैन, आधार और जन्मतिथि दर्ज करें",
        },
        summary: {
          en: "Provide taxpayer identifiers to match against Income Tax Department records.",
          hi: "आयकर रिकॉर्ड से मिलान के लिए पैन और आधार विवरण भरें।",
        },
        actionItems: {
          en: [
            "Type your 10-character PAN in capital letters.",
            "Type your 12-digit Aadhaar Number.",
            "Select Month and Year of Birth matching your PAN record.",
            "Tick the consent box agreeing to use Aadhaar demographic data for reprint authentication.",
          ],
          hi: [
            "बड़े अक्षरों में अपना पैन नंबर भरें।",
            "अपना 12 अंकों का आधार नंबर दर्ज करें।",
            "पैन रिकॉर्ड के अनुसार जन्म का महीना और वर्ष चुनें।",
            "सहमति चेकबॉक्स पर टिक करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Verify OTP on Mobile or Email",
          hi: "चरण 4: मोबाइल या ईमेल पर ओटीपी सत्यापित करें",
        },
        summary: {
          en: "Select destination for security code and verify identity.",
          hi: "सुरक्षा कोड प्राप्त करने का माध्यम चुनें और सत्यापन पूरा करें।",
        },
        actionItems: {
          en: [
            "Choose where to receive OTP: 'Mobile Number', 'Email ID', or 'Both'.",
            "Click 'Generate OTP' and enter the 6-digit code received.",
            "Click 'Validate' to confirm identity.",
          ],
          hi: [
            "ओटीपी विकल्प चुनें: 'Mobile Number' या 'Email ID'।",
            "'Generate OTP' दबाएं और प्राप्त कोड भरें।",
            "'Validate' पर क्लिक करके आगे बढ़ें।",
          ],
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Pay Official ₹50 Fee & Download Receipt",
          hi: "चरण 5: ₹50 सरकारी शुल्क का भुगतान करें और पावती रसीद लें",
        },
        summary: {
          en: "Complete online payment; physical card is dispatched by Speed Post.",
          hi: "यूपीआई या कार्ड से ₹50 भुगतान करें; कार्ड स्पीड पोस्ट से घर भेजा जाता है।",
        },
        actionItems: {
          en: [
            "Select payment mode (UPI, Debit Card, Netbanking) via BillDesk / Paytm gateway.",
            "Pay ₹50.00; do not refresh the browser until confirmation appears.",
            "Download and save the official Acknowledgement Receipt with your 15-digit Acknowledgement Number to track postal dispatch.",
          ],
          hi: [
            "यूपीआई, डेबिट कार्ड या नेट बैंकिंग से ₹50 का ऑनलाइन भुगतान पूरा करें।",
            "भुगतान पुष्टि होने तक ब्राउज़र बंद न करें।",
            "15 अंकों की पावती रसीद डाउनलोड करें जिससे आप डाक विभाग की डिलीवरी ट्रैक कर सकें।",
          ],
        },
      },
    ],
  },
  "epf-passbook-claim-status": {
    serviceId: "epf-passbook-claim-status",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Locate Active 12-Digit UAN & Password",
          hi: "चरण 1: अपना 12 अंकों का यूएएन (UAN) और पासवर्ड निकालें",
        },
        summary: {
          en: "Have your activated Universal Account Number and portal password ready.",
          hi: "अपना सक्रिय यूनिवर्सल अकाउंट नंबर और ईपीएफओ पासवर्ड तैयार रखें।",
        },
        actionItems: {
          en: [
            "Find your 12-digit UAN printed on your monthly salary slip.",
            "Ensure your UAN has been activated on the EPFO Unified Portal (unifiedportal-mem.epfindia.gov.in).",
            "If password is forgotten, use the 'Forgot Password' feature on the Unified Member Portal to reset via Aadhaar OTP.",
          ],
          hi: [
            "अपनी वेतन पर्ची (सैलरी स्लिप) पर लिखा 12 अंकों का यूएएन नंबर निकालें।",
            "सुनिश्चित करें कि आपका यूएएन नंबर सक्रिय हो चुका है।",
            "यदि पासवर्ड भूल गए हैं, तो आधार ओटीपी के जरिए पहले नया पासवर्ड बनाएं।",
          ],
        },
        relatedJargonKey: "uan_number",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Official EPFO Passbook Portal",
          hi: "चरण 2: आधिकारिक ईपीएफओ पासबुक पोर्टल खोलें",
        },
        summary: {
          en: "Visit passbook.epfindia.gov.in.",
          hi: "passbook.epfindia.gov.in पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Open 'https://passbook.epfindia.gov.in/MemberPassBook/Login'.",
            "Confirm the URL matches the official EPFO subdomain.",
            "Review service maintenance announcements on the login screen.",
          ],
          hi: [
            "पोर्टल 'https://passbook.epfindia.gov.in/MemberPassBook/Login' खोलें।",
            "जांचें कि पता आधिकारिक ईपीएफओ पोर्टल का ही है।",
            "स्क्रीन पर दिए गए निर्देश पढ़ें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter UAN, Password & Mathematical Captcha",
          hi: "चरण 3: यूएएन, पासवर्ड और कैप्चा भरकर लॉगिन करें",
        },
        summary: {
          en: "Authenticate to enter the member financial dashboard.",
          hi: "अपने सदस्य डैशबोर्ड में प्रवेश करने हेतु लॉगिन करें।",
        },
        actionItems: {
          en: [
            "Enter your 12-digit UAN.",
            "Enter your member password.",
            "Solve the arithmetic calculation captcha (e.g. 45 + 5 = 50).",
            "Click 'Sign In' to access your account.",
          ],
          hi: [
            "अपना 12 अंकों का यूएएन भरें।",
            "अपना पासवर्ड भरें।",
            "गणितीय कैप्चा हल करें।",
            "'Sign In' पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Select Member ID & View Balance Breakdown",
          hi: "चरण 4: मेंबर आईडी चुनें और पीएफ बैलेंस का विवरण देखें",
        },
        summary: {
          en: "Select employer establishment to inspect month-wise contributions.",
          hi: "कंपनी का चयन करें और मासिक जमा राशि व ब्याज देखें।",
        },
        actionItems: {
          en: [
            "From the drop-down menu, select the Member ID of your current or previous employer.",
            "View the graphical balance overview: Employee Share, Employer Share, and Pension Contribution.",
            "Click 'Download Passbook' to save the complete year-wise ledger in PDF format.",
          ],
          hi: [
            "ड्रॉप-डाउन सूची से अपनी कंपनी की मेंबर आईडी चुनें।",
            "कर्मचारी अंशदान, कंपनी अंशदान और पेंशन फंड का अलग-अलग बैलेंस देखें।",
            "'Download Passbook' पर क्लिक करके वार्षिक पीडीएफ डाउनलोड करें।",
          ],
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Online Claim Status",
          hi: "चरण 5: ऑनलाइन निकासी दावे की स्थिति ट्रैक करें",
        },
        summary: {
          en: "Monitor advance, full withdrawal, or transfer claims submitted.",
          hi: "पीएफ एडवांस या अंतिम निकासी दावे की प्रगति देखें।",
        },
        actionItems: {
          en: [
            "Click on the 'Claims' tab from the top navigation bar.",
            "Check status of pending claims (e.g. Under Process, Field Office Approved, or Settled).",
            "If claim was settled, note the bank payment dispatch date and NEFT reference number.",
          ],
          hi: [
            "शीर्ष मेनू से 'Claims' विकल्प पर क्लिक करें।",
            "दावे की स्थिति जांचें (जैसे Under Process या Settled)।",
            "यदि दावा स्वीकृत हो गया है, तो बैंक भुगतान की तारीख और एनईएफटी नंबर देखें।",
          ],
        },
        commonPitfallWarning: {
          en: "EPFO never charges any commission or fee for claim settlement. Never share your UAN password or Aadhaar OTP with any agent.",
          hi: "पीएफ निकासी के लिए ईपीएफओ कोई कमीशन नहीं लेता। अपना यूएएन पासवर्ड या ओटीपी किसी के साथ साझा न करें।",
        },
      },
    ],
  },
  "pmay-beneficiary-status": {
    serviceId: "pmay-beneficiary-status",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Locate PMAY Registration Number",
          hi: "चरण 1: अपना पीएमएवाई पंजीकरण नंबर खोजें",
        },
        summary: {
          en: "Find your rural housing registration code or search via Gram Panchayat name.",
          hi: "अपना ग्रामीण आवास रजिस्ट्रेशन नंबर निकालें अथवा ग्राम पंचायत से खोजें।",
        },
        actionItems: {
          en: [
            "Look for your PMAY-G Registration ID (e.g. UP123456789) on your survey slip or sanction letter.",
            "If you do not know your registration ID, you can search using your State, District, Block, Panchayat, and Beneficiary Name.",
            "Keep the beneficiary's bank account number ready for verification.",
          ],
          hi: [
            "अपनी आवास सर्वे पर्ची पर लिखा पीएमएवाई रजिस्ट्रेशन नंबर निकालें।",
            "यदि नंबर याद नहीं है, तो अपने राज्य, जिले, ब्लॉक और ग्राम पंचायत से खोजें।",
            "सत्यापन के लिए लाभार्थी का बैंक खाता नंबर पास रखें।",
          ],
        },
        relatedJargonKey: "pmay_fto",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Official PMAY-G Portal",
          hi: "चरण 2: आधिकारिक पीएमएवाई-जी पोर्टल खोलें",
        },
        summary: {
          en: "Visit pmayg.nic.in official central portal.",
          hi: "pmayg.nic.in आधिकारिक केंद्रीय पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Open 'https://pmayg.nic.in/netiayHome/home.aspx'.",
            "Ensure the URL belongs to the verified 'pmayg.nic.in' domain.",
            "In the top navigation menu, hover over 'Stakeholders' and click on 'IAY/PMAYG Beneficiary'.",
          ],
          hi: [
            "वेबसाइट 'https://pmayg.nic.in/netiayHome/home.aspx' खोलें।",
            "जांचें कि पोर्टल भारत सरकार के ग्रामीण विकास मंत्रालय का हो।",
            "मेनू में 'Stakeholders' के अंतर्गत 'IAY/PMAYG Beneficiary' पर क्लिक करें।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Registration Number & Submit",
          hi: "चरण 3: पंजीकरण संख्या दर्ज करें और सबमिट करें",
        },
        summary: {
          en: "Input your beneficiary ID to load the complete housing dossier.",
          hi: "पूरी आवास फाइल देखने के लिए अपना रजिस्ट्रेशन नंबर भरें।",
        },
        actionItems: {
          en: [
            "Type your complete Registration Number in the search box.",
            "Click on the 'Submit' button.",
            "If searching without number, click 'Advanced Search' and select your State, District, Block, and Panchayat.",
          ],
          hi: [
            "सर्च बॉक्स में अपना रजिस्ट्रेशन नंबर भरें।",
            "'Submit' बटन पर क्लिक करें।",
            "यदि नंबर नहीं है, तो 'Advanced Search' पर जाकर अपना जिला और ग्राम पंचायत चुनें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Inspect Sanction Order & Geotagged Construction Stages",
          hi: "चरण 4: आवास स्वीकृति और निर्माण की जियोटैग तस्वीरें जांचें",
        },
        summary: {
          en: "Review house sanctioned amount and field officer inspection photos.",
          hi: "स्वीकृत सहायता राशि (₹1.20 लाख) और अधिकारी द्वारा ली गई निर्माण की फोटो देखें।",
        },
        actionItems: {
          en: [
            "Verify personal and bank account details: ensure Bank Account Status reads 'Verified'.",
            "Inspect Sanction Details: Total Sanctioned Amount (typically ₹1,20,000 in plains / ₹1,30,000 in hilly areas).",
            "View House Inspection Photographs uploaded by local officials at foundation, lintel, and roof levels.",
          ],
          hi: [
            "जांचें कि बैंक खाता स्थिति में 'Verified' लिखा हो।",
            "स्वीकृत राशि जांचें (मैदानी क्षेत्रों में ₹1,20,000 / पहाड़ी क्षेत्रों में ₹1,30,000)।",
            "नींव, खिड़की और छत स्तर पर अधिकारियों द्वारा अपलोड की गई तस्वीरें देखें।",
          ],
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Installment Payments & Bank FTO Status",
          hi: "चरण 5: किस्तों का भुगतान और बैंक एफ़टीओ स्थिति ट्रैक करें",
        },
        summary: {
          en: "Verify FTO generation dates and direct bank account credits.",
          hi: "खाते में भेजी गई पहली, दूसरी और तीसरी किस्त की तारीख और यूटीआर नंबर देखें।",
        },
        actionItems: {
          en: [
            "Review the Installment Table: Installment 1 (foundation), Installment 2 (lintel), Installment 3 (completion).",
            "Note down the Fund Transfer Order (FTO) number and bank credit date for each stage.",
            "If payment shows failed or rejected, report immediately to your Gram Panchayat Secretary or Block Development Officer (BDO).",
          ],
          hi: [
            "किस्त तालिका देखें: पहली किस्त (नींव), दूसरी किस्त (दीवार/छत), तीसरी किस्त (पूर्णता)।",
            "एफ़टीओ (FTO) नंबर और खाते में पैसा आने की तारीख नोट करें।",
            "यदि भुगतान रुका हुआ है, तो ग्राम पंचायत सचिव या ब्लॉक अधिकारी से संपर्क करें।",
          ],
        },
        commonPitfallWarning: {
          en: "PMAY-G funds are transferred 100% directly from central treasury to your bank account via DBT. Never pay any fee or bribe to local middlemen claiming to sanction housing.",
          hi: "आवास का पैसा सीधे सरकारी खजाने से आपके बैंक खाते में आता है। आवास स्वीकृत कराने के नाम पर किसी को कोई रिश्वत न दें।",
        },
      },
    ],
  },
  "birth-certificate-crs": {
    serviceId: "birth-certificate-crs",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Pre-requisites & 21-Day Rule",
          hi: "चरण 1: आवश्यक पूर्व-तैयारी एवं 21 दिन का नियम जांचें",
        },
        summary: {
          en: "Ensure birth is reported within 21 days for free registration.",
          hi: "सुनिश्चित करें कि जन्म की सूचना 21 दिन के भीतर दी जा रही हो जिससे पंजीकरण पूर्णतः निःशुल्क रहे।",
        },
        actionItems: {
          en: [
            "Under the RBD Act 1969, reporting within 21 days of birth is legally mandated and 100% free of charge.",
            "Keep the Hospital Birth Discharge Slip or Form 1 (Institutional Birth Report) ready.",
            "Have scanned copies of parents' identity proofs (Aadhaar Card, Voter ID, or Passport).",
          ],
          hi: [
            "कानूनन 21 दिन के भीतर जन्म की सूचना देना अनिवार्य और पूरी तरह निःशुल्क है।",
            "अस्पताल की डिस्चार्ज पर्ची या जन्म रिपोर्ट (फॉर्म 1) तैयार रखें।",
            "माता-पिता के पहचान पत्र (आधार या वोटर कार्ड) की प्रति रखें।",
          ],
        },
        commonPitfallWarning: {
          en: "If birth occurred in a hospital, the hospital registrar automatically enters the report on CRS. Do not submit a duplicate home birth application.",
          hi: "यदि जन्म अस्पताल में हुआ है, तो अस्पताल प्रशासन स्वयं इसे दर्ज करता है। घर पर हुए जन्म का ही अलग से फॉर्म भरें।",
        },
        relatedJargonKey: "crs_registration",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Open Official CRS Portal",
          hi: "चरण 2: आधिकारिक सिविल रजिस्ट्रेशन सिस्टम पोर्टल खोलें",
        },
        summary: {
          en: "Visit crsorgi.gov.in national portal.",
          hi: "crsorgi.gov.in राष्ट्रीय पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Open 'https://crsorgi.gov.in/web/index.php/auth/login'.",
            "Verify the domain is 'crsorgi.gov.in' under the Registrar General of India.",
            "If applying for a home birth, click on 'General Public Signup' to create a citizen account.",
          ],
          hi: [
            "पोर्टल 'https://crsorgi.gov.in/web/index.php/auth/login' खोलें।",
            "जांचें कि पोर्टल भारत के महारजिस्ट्रार (ORGI) का ही हो।",
            "घर में हुए जन्म के लिए 'General Public Signup' पर क्लिक करके खाता बनाएं।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Child & Parents Information",
          hi: "चरण 3: शिशु एवं माता-पिता का विवरण भरें",
        },
        summary: {
          en: "Provide exact date, place of birth, and parents' permanent address.",
          hi: "जन्म की सही तारीख, स्थान और माता-पिता का स्थायी पता दर्ज करें।",
        },
        actionItems: {
          en: [
            "Fill in Date of Birth, Gender, and Child Name (if already named; naming can also be done within 1 year).",
            "Enter Mother's and Father's full names, Aadhaar numbers, and education levels as required by national statistics.",
            "Enter the exact address where the birth occurred (House No., Street, Village/Town, District, Pin Code).",
          ],
          hi: [
            "जन्म तिथि, लिंग और शिशु का नाम (यदि तय हो चुका है) भरें।",
            "माता और पिता का पूरा नाम व आधार नंबर भरें।",
            "जन्म का सही स्थान (मकान नंबर, गांव/शहर, पिन कोड) भरें।",
          ],
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Upload Hospital Report & ID Proofs",
          hi: "चरण 4: जन्म पर्ची और पहचान पत्र अपलोड करें",
        },
        summary: {
          en: "Upload supporting proof and submit to local registrar.",
          hi: "प्रमाण पत्र अपलोड करें और स्थानीय रजिस्ट्रार को सबमिट करें।",
        },
        actionItems: {
          en: [
            "Upload scanned copy of the institutional discharge slip or head of family declaration in PDF.",
            "Upload identity and address proofs of parents.",
            "Review the draft summary and click 'Submit' to transmit to the local Gram Panchayat or Municipal Registrar office.",
          ],
          hi: [
            "अस्पताल की पर्ची या घोषणा पत्र की पीडीएफ फाइल अपलोड करें।",
            "माता-पिता के पहचान पत्र अपलोड करें।",
            "विवरण जांचने के बाद फॉर्म स्थानीय रजिस्ट्रार (ग्राम पंचायत/नगर पालिका) को सबमिट करें।",
          ],
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Approval & Download Digitally Signed Certificate",
          hi: "चरण 5: स्वीकृति ट्रैक करें और डिजिटल प्रमाणपत्र डाउनलोड करें",
        },
        summary: {
          en: "Download official QR-coded birth certificate once approved by the registrar.",
          hi: "रजिस्ट्रार द्वारा स्वीकृति मिलते ही आधिकारिक क्यूआर कोड वाला प्रमाणपत्र डाउनलोड करें।",
        },
        actionItems: {
          en: [
            "Track application status using your Application Reference Number.",
            "The Registrar verifies documents and signs the electronic certificate within 7 to 14 working days.",
            "Download the official digitally signed Birth Certificate PDF featuring government emblem and verification QR code.",
          ],
          hi: [
            "आवेदन संदर्भ संख्या से पोर्टल पर प्रगति ट्रैक करें।",
            "रजिस्ट्रार द्वारा 7 से 14 दिनों में डिजिटल हस्ताक्षर कर प्रमाणपत्र जारी किया जाता है।",
            "आधिकारिक क्यूआर कोड युक्त जन्म प्रमाण पत्र डाउनलोड करें।",
          ],
        },
      },
    ],
  },
  "digilocker-account-setup": {
    serviceId: "digilocker-account-setup",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Verify Pre-requisites",
          hi: "चरण 1: आवश्यक पूर्व-तैयारी की जांच करें",
        },
        summary: {
          en: "Ensure you have your 12-digit Aadhaar number and the linked mobile phone ready.",
          hi: "सुनिश्चित करें कि आपके पास 12 अंकों का आधार नंबर और उससे जुड़ा सक्रिय मोबाइल फोन तैयार है।",
        },
        actionItems: {
          en: [
            "Keep your 12-digit Aadhaar card number at hand.",
            "Ensure the mobile number registered with your Aadhaar is switched on and able to receive SMS OTPs.",
            "Think of a memorable 6-digit security PIN for securing your account login.",
          ],
          hi: [
            "अपना 12 अंकों का आधार नंबर पास रखें।",
            "जांच लें कि आधार से जुड़ा मोबाइल नंबर चालू है और एसएमएस ओटीपी प्राप्त कर सकता है।",
            "लॉगिन सुरक्षित करने के लिए 6 अंकों का एक गोपनीय सुरक्षा पिन सोच लें।",
          ],
        },
        commonPitfallWarning: {
          en: "If your mobile number has changed, update it first at an Aadhaar Seva Kendra; DigiLocker cannot send OTPs to unlinked numbers.",
          hi: "यदि आपका मोबाइल नंबर बदल चुका है, तो पहले आधार सेवा केंद्र पर इसे अपडेट कराएं; डिजीलॉकर केवल पंजीकृत नंबर पर ही ओटीपी भेजता है।",
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Navigate to Official DigiLocker Portal",
          hi: "चरण 2: आधिकारिक डिजीलॉकर पोर्टल पर जाएं",
        },
        summary: {
          en: "Access the authentic government website and click on 'Sign Up'.",
          hi: "आधिकारिक सरकारी वेबसाइट पर जाएं और 'साइन अप' पर क्लिक करें।",
        },
        actionItems: {
          en: [
            "Open your browser and navigate strictly to https://www.digilocker.gov.in/.",
            "Verify the browser address bar confirms the secure HTTPS connection and government domain .gov.in.",
            "Click on the blue 'Sign Up' button located in the top navigation header.",
          ],
          hi: [
            "ब्राउज़र में केवल आधिकारिक पोर्टल https://www.digilocker.gov.in/ खोलें।",
            "जांचें कि एड्रेस बार में सुरक्षित एचटीटीपीएस (HTTPS) और सरकारी डोमेन .gov.in प्रदर्शित हो रहा है।",
            "शीर्ष हेडर में स्थित नीले 'साइन अप' (Sign Up) बटन पर क्लिक करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Never install unofficial APKs or third-party apps requesting money to download certificates; DigiLocker is completely free.",
          hi: "प्रमाणपत्र डाउनलोड के नाम पर पैसे मांगने वाले किसी अनाधिकृत ऐप या पोर्टल पर विश्वास न करें; डिजीलॉकर पूर्णतः निःशुल्क है।",
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Account Creation & Aadhaar OTP Authentication",
          hi: "चरण 3: खाता निर्माण एवं आधार ओटीपी प्रमाणीकरण",
        },
        summary: {
          en: "Fill in your demographic details exactly as in Aadhaar and verify via OTP.",
          hi: "आधार के अनुसार अपना नाम, जन्मतिथि दर्ज करें और ओटीपी द्वारा सत्यापित करें।",
        },
        actionItems: {
          en: [
            "Enter your full name, date of birth (DD/MM/YYYY), and gender exactly matching your Aadhaar card.",
            "Enter your active mobile number and set your 6-digit security PIN.",
            "Optionally provide an email ID for communication and password recovery.",
            "Enter the 6-digit one-time password (OTP) sent to your mobile phone and click 'Submit'.",
          ],
          hi: [
            "आधार कार्ड के अनुसार अपना पूरा नाम, जन्मतिथि और लिंग दर्ज करें।",
            "अपना सक्रिय मोबाइल नंबर दर्ज करें और 6 अंकों का सुरक्षा पिन सेट करें।",
            "ईमेल आईडी दर्ज करें ताकि खाता पुनः प्राप्ति में आसानी हो।",
            "मोबाइल पर आया 6 अंकों का ओटीपी दर्ज कर 'सबमिट' पर क्लिक करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Names with spelling differences compared to Aadhaar will cause authentication to fail.",
          hi: "आधार में दर्ज नाम की वर्तनी में अंतर होने पर खाता प्रमाणीकरण विफल हो जाएगा।",
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Search & Pull Official Documents",
          hi: "चरण 4: आधिकारिक दस्तावेज़ खोजें और जारी कराएं",
        },
        summary: {
          en: "Link and fetch digital certificates directly from government issuer databases.",
          hi: "सरकारी विभागों के डेटाबेस से सीधे अपने डिजिटल प्रमाणपत्र खोजकर जोड़ें।",
        },
        actionItems: {
          en: [
            "Navigate to the 'Search Documents' section from your dashboard.",
            "Select the issuing department (e.g., MoRTH for Driving Licence/RC, Income Tax for PAN, CBSE for Marksheets).",
            "Enter the document roll number, registration number, or PAN.",
            "Provide consent to fetch the electronic document directly from the issuer repository.",
          ],
          hi: [
            "डैशबोर्ड से 'दस्तावेज़ खोजें' (Search Documents) विकल्प पर जाएं।",
            "संबंधित सरकारी विभाग (जैसे परिवहन, आयकर, या शिक्षा बोर्ड) का चयन करें।",
            "रोल नंबर, वाहन नंबर या पैन नंबर दर्ज करें।",
            "सरकारी डेटाबेस से दस्तावेज़ फेच करने के लिए सहमति दें।",
          ],
        },
        relatedJargonKey: "digilocker_uri",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Access Issued Documents with Legal Validity",
          hi: "चरण 5: जारी दस्तावेज़ देखें और कानूनी प्रमाण के रूप में उपयोग करें",
        },
        summary: {
          en: "Access your legally binding electronic certificates under Rule 9A of IT Rules 2016.",
          hi: "आईटी नियम 2016 के नियम 9A के तहत मूल दस्तावेज़ों के समान वैध डिजिटल प्रतियों का उपयोग करें।",
        },
        actionItems: {
          en: [
            "View all fetched certificates inside the 'Issued Documents' section.",
            "Download the tamper-proof PDF with the embedded DigiLocker verification QR code and digital signature.",
            "Present these electronic documents directly to traffic police, airport security, or university admissions without carrying physical papers.",
          ],
          hi: [
            "'जारी किए गए दस्तावेज़' (Issued Documents) टैब में अपने सभी प्रमाणपत्र देखें।",
            "डिजिटल हस्ताक्षर और क्यूआर कोड युक्त सुरक्षित पीडीएफ डाउनलोड करें।",
            "यातायात पुलिस, हवाई अड्डे या कॉलेज में मूल कागजात के बदले इसे डिजिटल रूप में दिखाएं।",
          ],
        },
        commonPitfallWarning: {
          en: "Self-uploaded files in 'Drive' are storage only; only certificates fetched under 'Issued Documents' have legal statutory standing under IT Rules 2016.",
          hi: "'ड्राइव' में खुद अपलोड की गई स्कैन प्रतियां कानूनी तौर पर मान्य नहीं होतीं; केवल 'जारी दस्तावेज़' ही कानूनी प्रमाण माने जाते हैं।",
        },
      },
    ],
  },
  "pm-jan-dhan-yojana-account": {
    serviceId: "pm-jan-dhan-yojana-account",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Eligibility & Gather Identity Documents",
          hi: "चरण 1: पात्रता जांचें और आवश्यक पहचान पत्र एकत्र करें",
        },
        summary: {
          en: "Verify that you are aged 10 or above and gather your basic KYC documents.",
          hi: "जांचें कि आपकी आयु 10 वर्ष या अधिक है और मूल पहचान पत्र तैयार रखें।",
        },
        actionItems: {
          en: [
            "Verify you do not already have an active basic savings bank account at any commercial bank.",
            "Keep your Aadhaar Card ready as the primary officially valid document (OVD).",
            "If Aadhaar is not available, gather Voter ID, PAN card, NREGA job card, or passport.",
            "Keep two recent passport-size color photographs ready.",
          ],
          hi: [
            "सुनिश्चित करें कि किसी अन्य बैंक में आपका पहले से बुनियादी बचत खाता नहीं है।",
            "पहचान और पते के प्रमाण के रूप में अपना आधार कार्ड तैयार रखें।",
            "आधार न होने पर मतदाता पहचान पत्र, पैन कार्ड, नरेगा जॉब कार्ड या पासपोर्ट का उपयोग किया जा सकता है।",
            "पासपोर्ट साइज के दो हालिया रंगीन फोटो साथ रखें।",
          ],
        },
        commonPitfallWarning: {
          en: "Even if you lack standard official documents, you can still open a 'Small Account' with just two self-attested photographs, valid for 12 months.",
          hi: "यदि कोई आधिकारिक दस्तावेज़ नहीं है, तो भी आप केवल दो फोटो देकर 12 महीने के लिए 'छोटा खाता' (Small Account) खुलवा सकते हैं।",
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Visit Authorized Bank Branch or Bank Mitra Kiosk",
          hi: "चरण 2: अधिकृत बैंक शाखा या बैंक मित्र (CSP) केंद्र पर जाएं",
        },
        summary: {
          en: "Locate a participating public/private bank branch or rural Business Correspondent.",
          hi: "किसी भी सरकारी अथवा निजी बैंक शाखा या नजदीकी ग्राहक सेवा केंद्र (CSP) पर जाएं।",
        },
        actionItems: {
          en: [
            "Visit any public sector bank (SBI, PNB, BoB, etc.) or authorized private bank branch.",
            "In rural areas, you can directly visit a Bank Mitra (Business Correspondent kiosk).",
            "Request the official 'Pradhan Mantri Jan-Dhan Yojana (PMJDY) Account Opening Form'.",
          ],
          hi: [
            "किसी भी सार्वजनिक क्षेत्र के बैंक या अधिकृत बैंक शाखा में जाएं।",
            "ग्रामीण क्षेत्रों में सीधे अधिकृत बैंक मित्र (ग्राहक सेवा केंद्र) से संपर्क करें।",
            "'प्रधानमंत्री जन-धन योजना खाता खोलने का फॉर्म' प्राप्त करें।",
          ],
        },
        commonPitfallWarning: {
          en: "PMJDY account opening is 100% free; do not pay any agent fees or minimum deposit to anyone.",
          hi: "जन-धन खाता खोलना पूर्णतः निःशुल्क है; किसी भी दलाल को खाता खोलने के नाम पर पैसे न दें।",
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Fill Account Opening Form & Nominee Details",
          hi: "चरण 3: खाता खोलने का फॉर्म भरें और नॉमिनी का नाम दर्ज करें",
        },
        summary: {
          en: "Enter personal details and nominate a family member for insurance coverage.",
          hi: "व्यक्तिगत विवरण भरें और बीमा सुरक्षा के लिए परिवार के सदस्य को नामांकित करें।",
        },
        actionItems: {
          en: [
            "Fill in your full name, date of birth, father's/spouse's name, and residential address.",
            "Ensure the nominee section is completed with name, relationship, and date of birth.",
            "Affix your recent passport photographs and sign or place your thumb impression.",
          ],
          hi: [
            "अपना नाम, जन्मतिथि, पिता/पति का नाम और वर्तमान पता साफ अक्षरों में भरें।",
            "नॉमिनी (वारिस) का नाम, संबंध और जन्मतिथि अवश्य दर्ज करें।",
            "फोटो चिपकाएं और निर्धारित स्थान पर हस्ताक्षर या अंगूठे का निशान लगाएं।",
          ],
        },
        commonPitfallWarning: {
          en: "Never skip the nominee section; nominating a family member is essential to claim the ₹2 lakh accidental insurance benefit smoothly.",
          hi: "नॉमिनी का नाम खाली न छोड़ें; ₹2 लाख के दुर्घटना बीमा दावे के लिए नॉमिनी का विवरण अनिवार्य है।",
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Biometric Authentication & Account Generation",
          hi: "चरण 4: बायोमेट्रिक सत्यापन एवं खाता निर्माण",
        },
        summary: {
          en: "Complete instant Aadhaar e-KYC using biometric fingerprint or iris scan.",
          hi: "फिंगरप्रिंट या आईरिस स्कैनर के माध्यम से तुरंत आधार e-KYC पूरा करें।",
        },
        actionItems: {
          en: [
            "Provide your Aadhaar number to the bank official or Bank Mitra.",
            "Complete biometric fingerprint or OTP verification.",
            "The bank official links your demographic details directly from UIDAI.",
            "Account number is generated with zero minimum balance requirement.",
          ],
          hi: [
            "बैंक अधिकारी या बैंक मित्र को अपना आधार नंबर बताएं।",
            "फिंगरप्रिंट या मोबाइल ओटीपी द्वारा पहचान प्रमाणित करें।",
            "बैंक अधिकारी सीधे यूआईडीएआई (UIDAI) से विवरण सत्यापित कर खाता खोलता है।",
            "बिना किसी न्यूनतम राशि की शर्त के आपका खाता तुरंत सक्रिय हो जाता है।",
          ],
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Receive Passbook, RuPay Card & Activate Benefits",
          hi: "चरण 5: पासबुक एवं रुपे कार्ड प्राप्त करें तथा लाभ सक्रिय रखें",
        },
        summary: {
          en: "Collect your free bank passbook and RuPay debit card with ₹2 lakh accidental cover.",
          hi: "निःशुल्क पासबुक और ₹2 लाख दुर्घटना बीमा युक्त रुपे डेबिट कार्ड प्राप्त करें।",
        },
        actionItems: {
          en: [
            "Collect your physical bank passbook with your 11-digit account number and IFSC code.",
            "Receive your free RuPay Debit Card.",
            "Perform at least one financial or non-financial transaction at an ATM or PoS machine every 90 days to keep the ₹2 lakh accidental insurance cover active.",
            "Maintain active, satisfactory operations for 6 months to become eligible for the ₹10,000 overdraft facility.",
          ],
          hi: [
            "खाता नंबर और आईएफएससी कोड दर्ज वाली अपनी पासबुक प्राप्त करें।",
            "अपना निःशुल्क रुपे (RuPay) डेबिट कार्ड लें।",
            "₹2 लाख का दुर्घटना बीमा चालू रखने के लिए प्रत्येक 90 दिन में कम से कम एक बार कार्ड से लेनदेन अवश्य करें।",
            "खाते को 6 महीने तक सक्रिय रखने पर ₹10,000 तक की ओवरड्राफ्ट सुविधा प्राप्त करें।",
          ],
        },
        relatedJargonKey: "pmjdy_od",
      },
    ],
  },
  "eshram-card-registration": {
    serviceId: "eshram-card-registration",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Confirm Eligibility Criteria",
          hi: "चरण 1: पात्रता शर्तों की पुष्टि करें",
        },
        summary: {
          en: "Verify that you are an unorganised worker aged between 16 and 59 years.",
          hi: "जांचें कि आप 16 से 59 वर्ष की आयु के असंगठित कामगार हैं।",
        },
        actionItems: {
          en: [
            "Confirm that your age is between 16 and 59 years.",
            "Confirm that you are not a registered member of EPFO (EPF) or ESIC.",
            "Confirm that you are not an income tax assessee.",
            "Keep your Aadhaar number, Aadhaar-linked mobile phone, and bank savings account details ready.",
          ],
          hi: [
            "पुष्टि करें कि आपकी आयु 16 से 59 वर्ष के मध्य है।",
            "सुनिश्चित करें कि आप ईपीएफओ (EPFO) या ईएसआईसी (ESIC) के सदस्य नहीं हैं।",
            "सुनिश्चित करें कि आप आयकर दाता नहीं हैं।",
            "अपना आधार नंबर, आधार से जुड़ा मोबाइल फोन और बैंक खाता पास रखें।",
          ],
        },
        commonPitfallWarning: {
          en: "Salaried employees already contributing to EPFO/ESIC or paying income tax are not eligible for e-Shram registration.",
          hi: "वेतनभोगी कर्मचारी जिनका पीएफ या ईएसआईसी कटता है अथवा जो इनकम टैक्स भरते हैं, वे ई-श्रम के पात्र नहीं हैं।",
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Access Official e-Shram Portal",
          hi: "चरण 2: आधिकारिक ई-श्रम पोर्टल पर जाएं",
        },
        summary: {
          en: "Navigate to the official Ministry of Labour & Employment portal.",
          hi: "श्रम एवं रोजगार मंत्रालय के आधिकारिक पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Open your web browser and go to https://eshram.gov.in/.",
            "Verify the .gov.in domain in the browser address bar.",
            "Click on the 'Register on e-Shram' button on the homepage.",
          ],
          hi: [
            "ब्राउज़र में आधिकारिक वेबसाइट https://eshram.gov.in/ खोलें।",
            "एड्रेस बार में .gov.in डोमेन की जांच करें।",
            "होमपेज पर दिए गए 'Register on e-Shram' (ई-श्रम पर पंजीकरण करें) पर क्लिक करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Self-registration on the official portal is 100% free of charge. Do not pay any money to online cafes for portal access.",
          hi: "आधिकारिक पोर्टल पर स्वयं पंजीकरण पूरी तरह फ्री है; किसी भी साइबर कैफे को पोर्टल शुल्क के नाम पर अतिरिक्त पैसे न दें।",
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Aadhaar Authentication via OTP",
          hi: "चरण 3: आधार ओटीपी द्वारा पहचान सत्यापन",
        },
        summary: {
          en: "Authenticate your identity using your Aadhaar-linked mobile number.",
          hi: "आधार से जुड़े मोबाइल नंबर पर प्राप्त ओटीपी से पहचान सत्यापित करें।",
        },
        actionItems: {
          en: [
            "Enter your Aadhaar-linked mobile number and captcha code.",
            "Confirm you are not an EPFO/ESIC member by selecting 'No'.",
            "Click 'Send OTP' and enter the 6-digit verification code received on your phone.",
            "Enter your 12-digit Aadhaar number, accept the consent declaration, and submit.",
          ],
          hi: [
            "आधार से जुड़ा मोबाइल नंबर और कैप्चा कोड भरें।",
            "ईपीएफओ/ईएसआईसी के विकल्प में 'नहीं' (No) चुनें।",
            "'सेंड ओटीपी' पर क्लिक कर मोबाइल पर आया 6 अंकों का कोड दर्ज करें।",
            "अपना 12 अंकों का आधार नंबर डालें और सहमति देकर सबमिट करें।",
          ],
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Enter Occupation, Skills & Bank Details",
          hi: "चरण 4: व्यवसाय, कौशल और बैंक खाते का विवरण भरें",
        },
        summary: {
          en: "Select your primary occupation from the national list and enter your bank account.",
          hi: "राष्ट्रीय सूची से अपने काम का चयन करें और बैंक खाता नंबर दर्ज करें।",
        },
        actionItems: {
          en: [
            "Review pre-filled demographic details fetched automatically from UIDAI.",
            "Enter your current address and education qualification.",
            "Select your primary occupation/skill (e.g., construction, agriculture, driver, domestic worker, street vendor).",
            "Enter your active bank account number and IFSC code for direct welfare transfers.",
          ],
          hi: [
            "आधार से स्वतः लिए गए अपने नाम और पते की जांच करें।",
            "वर्तमान निवास और शैक्षणिक योग्यता का चयन करें।",
            "अपने मुख्य व्यवसाय का चयन करें (जैसे निर्माण श्रमिक, किसान, चालक, घरेलू कामगार, रेहड़ी-पटरी)।",
            "सरकारी आर्थिक लाभ सीधे प्राप्त करने के लिए बैंक खाता और IFSC कोड दर्ज करें।",
          ],
        },
        commonPitfallWarning: {
          en: "Ensure your bank account is Aadhaar-seeded so direct benefit transfers (DBT) credit smoothly during relief distributions.",
          hi: "सुनिश्चित करें कि बैंक खाता आधार से लिंक हो ताकि सरकारी सहायता सीधे खाते में आ सके।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Review Self-Declaration & Download 12-Digit UAN Card",
          hi: "चरण 5: घोषणा पत्र जांचें और 12 अंकों का ई-श्रम UAN कार्ड डाउनलोड करें",
        },
        summary: {
          en: "Download your permanent national e-Shram card with photo and QR code.",
          hi: "फोटो और क्यूआर कोड युक्त अपना स्थायी राष्ट्रीय ई-श्रम कार्ड डाउनलोड करें।",
        },
        actionItems: {
          en: [
            "Preview the complete self-declaration form on screen and verify all details.",
            "Click 'Submit' to generate your permanent 12-digit Universal Account Number (UAN).",
            "Download your digital e-Shram Card PDF containing your photo, UAN, and QR code.",
            "Save the card in your mobile phone or print a physical copy for safe keeping.",
          ],
          hi: [
            "स्क्रीन पर पूरा विवरण जांचें और घोषणा पत्र स्वीकार करें।",
            "'सबमिट' पर क्लिक करते ही 12 अंकों का यूनिवर्सल अकाउंट नंबर (UAN) बन जाएगा।",
            "अपनी फोटो और क्यूआर कोड वाला ई-श्रम कार्ड पीडीएफ तुरंत डाउनलोड करें।",
            "कार्ड को फोन में सुरक्षित रखें या प्रिंट करवाकर अपने पास रख लें।",
          ],
        },
        relatedJargonKey: "eshram_uan",
      },
    ],
  },
  "pm-suraksha-bima-yojana": {
    serviceId: "pm-suraksha-bima-yojana",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check Eligibility & Bank Account Standing",
          hi: "चरण 1: पात्रता और बैंक खाते की स्थिति जांचें",
        },
        summary: {
          en: "Confirm you are between 18 and 70 years old with an active savings account.",
          hi: "जांचें कि आपकी आयु 18 से 70 वर्ष के बीच है और आपका बचत खाता सक्रिय है।",
        },
        actionItems: {
          en: [
            "Ensure you are between 18 and 70 years of age.",
            "Hold an active individual or joint savings bank account in any participating bank or post office.",
            "Keep your Aadhaar card and active bank account passbook ready.",
            "Decide on your nominee's name, age, and relationship.",
          ],
          hi: [
            "पुष्टि करें कि आपकी उम्र 18 से 70 वर्ष के बीच है।",
            "किसी भी बैंक या डाकघर में सक्रिय बचत खाता होना अनिवार्य है।",
            "अपना आधार कार्ड और बैंक पासबुक तैयार रखें।",
            "अपने नॉमिनी (वारिस) का नाम, आयु और संबंध तय कर लें।",
          ],
        },
        commonPitfallWarning: {
          en: "A person can enroll in PMSBY through only one bank account; having multiple enrollments in different banks will forfeit extra premiums without additional coverage.",
          hi: "एक व्यक्ति केवल एक ही बैंक खाते से इस योजना में जुड़ सकता है; अलग-अलग बैंकों से जुड़ने पर अतिरिक्त प्रीमियम व्यर्थ जाएगा और क्लेम केवल एक ही मिलेगा।",
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Choose Enrolment Mode (Online or Branch)",
          hi: "चरण 2: नामांकन का तरीका चुनें (ऑनलाइन अथवा शाखा)",
        },
        summary: {
          en: "Enrol instantly through internet banking or by submitting a physical form at the branch.",
          hi: "नेटबैंकिंग के माध्यम से तुरंत ऑनलाइन अथवा बैंक शाखा में फॉर्म जमा कर नामांकन करें।",
        },
        actionItems: {
          en: [
            "Option A (Online): Log in to your bank's net banking or mobile banking app, navigate to 'Government / Social Security Schemes', and select 'PMSBY'.",
            "Option B (Branch): Download the official bilingual consent form from https://jansuraksha.gov.in/ or collect it from your bank branch.",
            "In rural areas, you can also enroll through a customer service point (CSP) or Post Office savings bank.",
          ],
          hi: [
            "विकल्प क (ऑनलाइन): अपने बैंक की नेटबैंकिंग या मोबाइल ऐप में लॉगिन करें, 'सामाजिक सुरक्षा योजनाएं' में जाकर 'PMSBY' चुनें।",
            "विकल्प ख (शाखा): आधिकारिक पोर्टल https://jansuraksha.gov.in/ से फॉर्म डाउनलोड करें या बैंक शाखा से प्राप्त करें।",
            "डाकघर या ग्राहक सेवा केंद्र (CSP) पर जाकर भी नामांकन कराया जा सकता है।",
          ],
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Fill Nominee Details & Address",
          hi: "चरण 3: नॉमिनी का विवरण और पता दर्ज करें",
        },
        summary: {
          en: "Designate a legal nominee to receive the ₹2 lakh insurance settlement in case of death.",
          hi: "आकस्मिक मृत्यु की स्थिति में ₹2 लाख का क्लेम पाने के लिए नॉमिनी का स्पष्ट विवरण भरें।",
        },
        actionItems: {
          en: [
            "Enter nominee's full legal name, relationship to you, and date of birth.",
            "If the nominee is a minor (under 18), name an appointed guardian with relationship details.",
            "Provide nominee's bank account details if available for seamless claim credit.",
          ],
          hi: [
            "नॉमिनी का पूरा नाम, आपके साथ संबंध और जन्मतिथि भरें।",
            "यदि नॉमिनी 18 वर्ष से कम उम्र का है, तो अभिभावक (गार्जियन) का नाम दर्ज करें।",
            "शीघ्र क्लेम निपटान के लिए नॉमिनी का बैंक खाता विवरण भी साथ में जोड़ें।",
          ],
        },
        commonPitfallWarning: {
          en: "Failing to specify nominee details makes it difficult for families to claim the benefit in an emergency.",
          hi: "नॉमिनी का नाम स्पष्ट रूप से दर्ज न होने पर परिवार को क्लेम राशि मिलने में भारी परेशानी होती है।",
        },
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Authorize ₹20 Annual Auto-Debit Consent",
          hi: "चरण 4: वार्षिक ₹20 ऑटो-डेबिट की सहमति दें",
        },
        summary: {
          en: "Grant recurring permission to debit ₹20 annually on or before May 31st.",
          hi: "प्रत्येक वर्ष 31 मई से पहले खाते से ₹20 स्वतः काटने की स्थायी अनुमति दें।",
        },
        actionItems: {
          en: [
            "Sign the auto-debit authorization clause on the form or accept the electronic consent prompt online.",
            "Confirm that ₹20 will be deducted annually from your account between May 25 and May 31.",
            "The insurance cover runs from June 1st to May 31st of the following year.",
          ],
          hi: [
            "फॉर्म पर ऑटो-डेबिट सहमति पर हस्ताक्षर करें या नेटबैंकिंग में सहमति बटन पर क्लिक करें।",
            "स्वीकार करें कि प्रत्येक वर्ष 25 से 31 मई के बीच आपके खाते से ₹20 कटेंगे।",
            "बीमा कवर की अवधि 1 जून से अगले वर्ष 31 मई तक की होती है।",
          ],
        },
        relatedJargonKey: "pmsby_autodebit",
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Collect Policy Acknowledgment & Maintain Annual Balance",
          hi: "चरण 5: पॉलिसी पावती प्राप्त करें और खाते में न्यूनतम शेष बनाए रखें",
        },
        summary: {
          en: "Keep the acknowledgment slip and ensure ₹20 balance in May to avoid policy lapse.",
          hi: "रसीद संभालकर रखें और मई में खाते में ₹20 अवश्य रखें ताकि बीमा बंद न हो।",
        },
        actionItems: {
          en: [
            "Collect the stamped counterfoil acknowledgment from the branch or save the online transaction reference.",
            "Check your bank statement in June to confirm the ₹20 premium deduction.",
            "Keep the acknowledgment with family members so they have the bank policy number for claims.",
            "Ensure your bank account always has at least ₹20 balance before May 31st every year.",
          ],
          hi: [
            "बैंक से मुहर लगी पावती रसीद लें अथवा ऑनलाइन ट्रांजैक्शन रसीद सुरक्षित रखें।",
            "जून माह में बैंक पासबुक में ₹20 प्रीमियम कटने की पुष्टि करें।",
            "पावती रसीद परिवार के पास सुरक्षित रखें ताकि आपातकाल में दावा किया जा सके।",
            "हर साल मई के अंत में खाते में कम से कम ₹20 जरूर रखें ताकि पॉलिसी स्वतः रिन्यू होती रहे।",
          ],
        },
      },
    ],
  },
  "swavlamban-udid-card": {
    serviceId: "swavlamban-udid-card",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Check RPwD Act Eligibility & Gather Documents",
          hi: "चरण 1: RPwD अधिनियम के तहत पात्रता जांचें और दस्तावेज एकत्र करें",
        },
        summary: {
          en: "Verify that disability is 40% or more under the 21 categories recognized by law.",
          hi: "जांचें कि दिव्यांगता कानून द्वारा मान्यता प्राप्त 21 श्रेणियों में 40% या अधिक है।",
        },
        actionItems: {
          en: [
            "Verify eligibility under any of the 21 recognized disabilities in the RPwD Act 2016.",
            "Keep a clear passport-size photograph ready (showing disability if physical/visible).",
            "Keep proof of identity and address ready (Aadhaar Card, Voter ID, or Ration Card).",
            "If you already hold a state-issued hospital disability certificate, keep a scanned copy ready.",
            "Keep a scanned specimen signature or thumb impression ready.",
          ],
          hi: [
            "पुष्टि करें कि दिव्यांगता RPwD कानून 2016 की 21 श्रेणियों में से किसी एक में आती है।",
            "पासपोर्ट साइज का स्पष्ट फोटो तैयार रखें (शारीरिक दिव्यांगता दिखने वाली)।",
            "पहचान और पते के प्रमाण के रूप में आधार कार्ड या वोटर आईडी तैयार रखें।",
            "यदि पुराना अस्पताल प्रमाण पत्र पहले से बना है, तो उसकी स्कैन कॉपी रखें।",
            "हस्ताक्षर अथवा अंगूठे के निशान की स्कैन कॉपी तैयार रखें।",
          ],
        },
        commonPitfallWarning: {
          en: "Make sure scanned files are under 2 MB and clearly legible in JPG or PDF format.",
          hi: "दस्तावेजों की स्कैन फाइलें स्पष्ट और 2 एमबी से कम आकार की होनी चाहिए।",
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Access Official Swavlamban Portal",
          hi: "चरण 2: आधिकारिक स्वावलंबन पोर्टल पर जाएं",
        },
        summary: {
          en: "Navigate to https://www.swavlambancard.gov.in/ and start online registration.",
          hi: "पोर्टल https://www.swavlambancard.gov.in/ पर जाएं और ऑनलाइन आवेदन शुरू करें।",
        },
        actionItems: {
          en: [
            "Open your web browser and navigate strictly to https://www.swavlambancard.gov.in/.",
            "Verify the .gov.in domain in the browser address bar.",
            "Click on the 'Apply for Disability Certificate & UDID Card' link on the homepage.",
          ],
          hi: [
            "ब्राउज़र में आधिकारिक वेबसाइट https://www.swavlambancard.gov.in/ खोलें।",
            "एड्रेस बार में सरकारी .gov.in डोमेन की पुष्टि करें।",
            "होमपेज पर 'Apply for Disability Certificate & UDID Card' लिंक पर क्लिक करें।",
          ],
        },
        commonPitfallWarning: {
          en: "UDID registration and smart card delivery are completely free; avoid any middlemen claiming to guarantee faster certification for a fee.",
          hi: "UDID कार्ड और सरकारी प्रमाण पत्र पूर्णतः निःशुल्क है; किसी भी दलाल को पैसे न दें।",
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Fill Application Form & Upload Proofs",
          hi: "चरण 3: आवेदन पत्र भरें और प्रमाण पत्र अपलोड करें",
        },
        summary: {
          en: "Enter personal, address, and disability details and upload documents.",
          hi: "व्यक्तिगत जानकारी, पता और दिव्यांगता का प्रकार दर्ज कर फाइलें अपलोड करें।",
        },
        actionItems: {
          en: [
            "Enter applicant's personal details (name, father/mother name, date of birth, gender, blood group).",
            "Provide complete residential address matching your proof of address.",
            "Select disability type from the drop-down (locomotor, visual, hearing, intellectual, etc.).",
            "Upload photograph, signature/thumb impression, and identity/address proofs.",
            "Submit the application and note down your 17-digit Enrolment / Application Number.",
          ],
          hi: [
            "आवेदक का पूरा नाम, माता-पिता का नाम, जन्मतिथि और रक्त समूह भरें।",
            "प्रमाण पत्र के अनुसार पूरा वर्तमान और स्थायी पता दर्ज करें।",
            "दिव्यांगता की श्रेणी चुनें (जैसे दृष्टिबाधित, श्रवणबाधित, अस्थि दिव्यांगता आदि)।",
            "फोटो, हस्ताक्षर/अंगूठे का निशान और पहचान पत्र अपलोड करें।",
            "आवेदन सबमिट करें और 17 अंकों की आवेदन संख्या (Enrolment Number) सुरक्षित लिख लें।",
          ],
        },
        relatedJargonKey: "udid_card",
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Hospital Assessment by Medical Board",
          hi: "चरण 4: मेडिकल बोर्ड द्वारा अस्पताल में परीक्षण",
        },
        summary: {
          en: "Visit designated district hospital on the scheduled date for medical evaluation.",
          hi: "निर्धारित तिथि पर जिला अस्पताल में मेडिकल बोर्ड के समक्ष परीक्षण के लिए उपस्थित हों।",
        },
        actionItems: {
          en: [
            "The portal assigns your application to your district Chief Medical Officer (CMO) or Civil Hospital.",
            "Check SMS notification or portal status for your allotted assessment date and time.",
            "Visit the designated government hospital with original documents and old medical records.",
            "The specialist medical board examines the applicant and determines the percentage of disability.",
          ],
          hi: [
            "पोर्टल आपके आवेदन को आपके जिले के मुख्य चिकित्सा अधिकारी (CMO) या सिविल अस्पताल को भेजता है।",
            "एसएमएस या पोर्टल द्वारा दी गई तारीख और समय पर अस्पताल जाएं।",
            "मूल दस्तावेज और पुराने इलाज की पर्चियां साथ लेकर जाएं।",
            "चिकित्सा बोर्ड द्वारा जांच कर दिव्यांगता का प्रतिशत तय किया जाता है।",
          ],
        },
        commonPitfallWarning: {
          en: "If you already possess a valid permanent disability certificate from an authorized government hospital, mention this during application to avoid re-examination.",
          hi: "यदि आपके पास पहले से स्थायी सरकारी प्रमाण पत्र है, तो फॉर्म में उसका उल्लेख करें ताकि दोबारा परीक्षण से बचा जा सके।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Download e-UDID & Receive Physical Smart Card",
          hi: "चरण 5: ई-यूडीआईडी डाउनलोड करें और डाक से स्मार्ट कार्ड प्राप्त करें",
        },
        summary: {
          en: "Download digitally signed certificate and receive national smart card via India Post.",
          hi: "डिजिटल प्रमाण पत्र तुरंत डाउनलोड करें और डाक द्वारा स्मार्ट कार्ड घर पर प्राप्त करें।",
        },
        actionItems: {
          en: [
            "Once approved by the CMO, log in to the Swavlamban portal using your enrolment number.",
            "Download your official e-Disability Certificate and e-UDID Card with tamper-proof QR code.",
            "The permanent physical UDID Smart Card is printed centrally and delivered free of charge to your address via India Post speed post.",
            "Use the card nationwide for railway concessions, education quotas, and state pension benefits.",
          ],
          hi: [
            "सीएमओ द्वारा स्वीकृति मिलने के बाद पोर्टल से अपना ई-दिव्यांगता प्रमाण पत्र डाउनलोड करें।",
            "क्यूआर कोड युक्त डिजिटल ई-यूडीआईडी कार्ड अपने फोन में रखें।",
            "प्लास्टिक स्मार्ट कार्ड भारत सरकार द्वारा भारतीय डाक (स्पीड पोस्ट) से आपके पते पर निःशुल्क भेजा जाएगा।",
            "पूरे देश में रेलवे पास, छात्रवृत्ति, पेंशन और आरक्षण के लिए इस एक कार्ड का उपयोग करें।",
          ],
        },
      },
    ],
  },
  "parivahan-rc-transfer": {
    serviceId: "parivahan-rc-transfer",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Step 1: Gather Statutory Documents & Form 29/30",
          hi: "चरण 1: आवश्यक वैधानिक दस्तावेज एवं फॉर्म 29/30 तैयार करें",
        },
        summary: {
          en: "Prepare original RC, insurance, PUC, and signed statutory transfer forms.",
          hi: "मूल आरसी, बीमा, प्रदूषण प्रमाण पत्र और हस्ताक्षरित फॉर्म 29 व 30 तैयार रखें।",
        },
        actionItems: {
          en: [
            "Keep the original vehicle Registration Certificate (RC book or smart card).",
            "Download and get Form 29 (Notice of Transfer) and Form 30 (Application for Transfer) signed by both buyer and seller.",
            "Ensure vehicle insurance and Pollution Under Control (PUC) certificate are both active and valid.",
            "If the vehicle had an active bank loan, obtain Form 35 and NOC from the financing bank.",
            "Keep buyer's Aadhaar card or valid address and identity proof ready.",
          ],
          hi: [
            "वाहन का मूल पंजीकरण प्रमाण पत्र (आरसी बुक या स्मार्ट कार्ड) पास रखें।",
            "फॉर्म 29 (बिक्री सूचना) और फॉर्म 30 (हस्तांतरण आवेदन) पर खरीदार और विक्रेता दोनों के हस्ताक्षर कराएं।",
            "जांच लें कि वाहन बीमा और प्रदूषण प्रमाण पत्र (PUC) दोनों चालू और वैध हैं।",
            "यदि गाड़ी पर बैंक लोन था, तो बैंक से एनओसी (NOC) और फॉर्म 35 अवश्य लें।",
            "खरीदार का आधार कार्ड या वैध पते का प्रमाण तैयार रखें।",
          ],
        },
        relatedJargonKey: "form_29_30",
        commonPitfallWarning: {
          en: "Always execute RC transfer within 30 days of sale. Delaying transfer exposes the seller to legal and challan liability for accidents caused by the buyer.",
          hi: "गाड़ी बेचने के 30 दिनों के भीतर आरसी ट्रांसफर की प्रक्रिया शुरू करें, अन्यथा चालान या दुर्घटना की जिम्मेदारी पुराने मालिक पर बनी रहेगी।",
        },
      },
      {
        stepNumber: 2,
        title: {
          en: "Step 2: Access Parivahan Sewa Portal",
          hi: "चरण 2: आधिकारिक परिवहन सेवा पोर्टल पर जाएं",
        },
        summary: {
          en: "Navigate to the MoRTH centralized Vahan citizen portal.",
          hi: "सड़क परिवहन मंत्रालय के एकीकृत वाहन पोर्टल पर जाएं।",
        },
        actionItems: {
          en: [
            "Navigate strictly to the official portal: https://parivahan.gov.in/parivahan/.",
            "Go to 'Online Services' -> 'Vehicle Related Services'.",
            "Select the State and the registering RTO authority where the vehicle is registered.",
          ],
          hi: [
            "केवल आधिकारिक वेबसाइट https://parivahan.gov.in/parivahan/ पर जाएं।",
            "'ऑनलाइन सेवाएं' में जाकर 'वाहन संबंधित सेवाएं' (Vehicle Related Services) चुनें।",
            "अपना राज्य और संबंधित आरटीओ (RTO) कार्यालय चुनें जहां गाड़ी दर्ज है।",
          ],
        },
        commonPitfallWarning: {
          en: "Beware of deceptive look-alike websites charging exorbitant consultancy fees; use only the official parivahan.gov.in portal.",
          hi: "निजी दलालों और नकली वेबसाइटों से बचें; केवल आधिकारिक सरकारी परिवहन पोर्टल का उपयोग करें।",
        },
      },
      {
        stepNumber: 3,
        title: {
          en: "Step 3: Enter Vehicle Details & Complete Aadhaar Authentication",
          hi: "चरण 3: वाहन विवरण दर्ज करें और आधार सत्यापन पूरा करें",
        },
        summary: {
          en: "Enter vehicle registration number and chassis details to initiate transfer.",
          hi: "गाड़ी नंबर और चेसिस नंबर दर्ज कर ऑनलाइन आवेदन शुरू करें।",
        },
        actionItems: {
          en: [
            "Enter the Vehicle Registration Number and the last 5 digits of the Chassis Number.",
            "Select 'Transfer of Ownership (TO)' from the list of citizen services.",
            "In participating states, opt for 'Aadhaar e-KYC (Faceless Service)' for instant paperless identity verification.",
            "Enter buyer details, sale consideration amount, and date of transfer as recorded in Form 29.",
          ],
          hi: [
            "वाहन संख्या और चेसिस नंबर के अंतिम 5 अंक दर्ज करें।",
            "सेवा सूची में से 'स्वामित्व का हस्तांतरण' (Transfer of Ownership) चुनें।",
            "उपलब्ध होने पर 'आधार e-KYC' चुनें ताकि आरटीओ के चक्कर न काटने पड़ें।",
            "खरीदार का विवरण, बिक्री मूल्य और बिक्री की तिथि दर्ज करें।",
          ],
        },
        relatedJargonKey: "ekyc",
      },
      {
        stepNumber: 4,
        title: {
          en: "Step 4: Pay Official Statutory Fees",
          hi: "चरण 4: आधिकारिक सरकारी शुल्क का भुगतान करें",
        },
        summary: {
          en: "Pay the prescribed central and state statutory transfer fees securely online.",
          hi: "पोर्टल पर निर्धारित सरकारी हस्तांतरण शुल्क का सुरक्षित ऑनलाइन भुगतान करें।",
        },
        actionItems: {
          en: [
            "Review the fee breakdown calculated as per Central Motor Vehicle Rule 81 (typically ₹150 for two-wheelers, ₹300-₹500 for cars, plus state smart card/postal charges).",
            "Pay the exact fee through the integrated government payment gateway (UPI, Net Banking, or Debit Card).",
            "Download and print the payment receipt (Form 29/30 e-receipt) and application acknowledgment slip.",
          ],
          hi: [
            "नियम 81 के तहत निर्धारित सरकारी शुल्क की जांच करें (दोपहिया ₹150, कार ₹300-500, साथ ही डाक व स्मार्ट कार्ड शुल्क)।",
            "सरकारी पेमेंट गेटवे द्वारा नेटबैंकिंग, यूपीआई या डेबिट कार्ड से भुगतान करें।",
            "भुगतान रसीद और आवेदन पावती पर्ची डाउनलोड कर प्रिंट कर लें।",
          ],
        },
        commonPitfallWarning: {
          en: "Always save and print the payment receipt; it contains the Application Number needed to track progress and serves as proof of statutory submission.",
          hi: "भुगतान रसीद अवश्य प्रिंट करें; इसमें आवेदन संख्या होती है जो स्टेटस चेक करने के काम आती है।",
        },
      },
      {
        stepNumber: 5,
        title: {
          en: "Step 5: Track Application & Receive Updated RC Smart Card",
          hi: "चरण 5: आवेदन की प्रगति ट्रैक करें और नई आरसी प्राप्त करें",
        },
        summary: {
          en: "Track RTO approval and receive the new RC smart card with updated owner name.",
          hi: "आरटीओ अनुमोदन ट्रैक करें और नए मालिक के नाम वाली आरसी प्राप्त करें।",
        },
        actionItems: {
          en: [
            "For non-faceless states, submit physical dossier (original RC, signed Form 29/30, fee receipt) at the RTO counter or book an appointment.",
            "For Aadhaar faceless applications, the RTO officer reviews and approves the application electronically.",
            "Track status under 'Status' -> 'Know Your Application Status' on the Parivahan portal.",
            "Upon approval, the new RC smart card is dispatched via Speed Post to the buyer's registered address, and the digital RC is instantly updated on DigiLocker and mParivahan.",
          ],
          hi: [
            "गैर-फेसलेस राज्यों में मूल दस्तावेज आरटीओ में जमा करें अथवा ऑनलाइन अपॉइंटमेंट लें।",
            "आधार फेसलेस सेवा में आरटीओ अधिकारी ऑनलाइन सत्यापन कर सीधे स्वीकृति देते हैं।",
            "परिवहन पोर्टल पर 'Know Your Application Status' से प्रगति देखें।",
            "स्वीकृति के बाद नया स्मार्ट कार्ड स्पीड पोस्ट से खरीदार के घर पहुंचेगा और डिजीलॉकर पर भी नया नाम तुरंत दिखने लगेगा।",
          ],
        },
      },
    ],
  },
};

export function getExplainerGuide(serviceId: string): ServiceExplainerGuide | undefined {
  return EXPLAINER_GUIDES[serviceId];
}
