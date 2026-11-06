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
};

export function getExplainerGuide(serviceId: string): ServiceExplainerGuide | undefined {
  return EXPLAINER_GUIDES[serviceId];
}
