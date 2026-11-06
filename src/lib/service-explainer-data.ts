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
};

export function getExplainerGuide(serviceId: string): ServiceExplainerGuide | undefined {
  return EXPLAINER_GUIDES[serviceId];
}
