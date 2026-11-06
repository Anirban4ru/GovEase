import rawCatalogue from "../data/catalogue.json";

export type EcosystemId =
  | "government-and-citizen"
  | "healthcare"
  | "education"
  | "finance-and-welfare"
  | "mobility-and-transport"
  | "utilities-and-local";

export type LifeEcosystem = EcosystemId;

export interface LocalizedString {
  en: string;
  hi?: string;
}

export interface ServiceSource {
  url: string;
  title: string;
  verified_on: string;
}

export interface ServiceVerification {
  last_verified_on: string;
  verified_by: string;
  next_review_due: string;
  notes?: string;
}

export interface ServiceFees {
  is_fee_required: boolean;
  details: string;
  source_url: string;
  last_verified_on?: string;
}

export interface CatalogueService {
  id: string;
  ecosystem: EcosystemId;
  category: string;
  title: LocalizedString;
  goal: LocalizedString;
  summary: LocalizedString;
  provider: {
    name: string;
    type: "central" | "state" | "municipal" | "private-utility" | "other";
    state_or_ut?: string;
  };
  official_url: string;
  geographic_scope: {
    level: "national" | "state" | "city" | "district";
    state_or_ut?: string;
    city_or_district?: string;
  };
  eligibility_summary: {
    text: LocalizedString;
    is_informational_only: boolean;
  };
  documents_required: string[];
  fees: ServiceFees;
  sources: ServiceSource[];
  verification: ServiceVerification;
  integration_classification: 1 | 2 | 3 | 4 | 5 | 6;
  feature_state:
    | "implemented-and-tested"
    | "implemented-not-fully-verified"
    | "sandbox-only"
    | "official-link-only"
    | "awaiting-approval"
    | "planned"
    | "blocked";
  languages_at_destination: string[];
  accessibility_notes?: string;
  status: "draft-pending-human-review" | "active" | "needs-review" | "retired";
}

export const servicesCatalogue: CatalogueService[] = rawCatalogue as CatalogueService[];

export function getAllServices(): CatalogueService[] {
  return servicesCatalogue;
}

export function getServiceById(id: string): CatalogueService | undefined {
  return servicesCatalogue.find((s) => s.id === id);
}

export function getServicesByEcosystem(ecosystem: EcosystemId): CatalogueService[] {
  return servicesCatalogue.filter((s) => s.ecosystem === ecosystem);
}

export interface EcosystemMeta {
  id: EcosystemId;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
}

export const ECOSYSTEMS: EcosystemMeta[] = [
  {
    id: "government-and-citizen",
    titleEn: "Identity & Civil Rights",
    titleHi: "पहचान और नागरिक अधिकार",
    descEn: "Aadhaar, civil registration, legal identity, and essential citizen documentation.",
    descHi: "आधार, नागरिक पंजीकरण, कानूनी पहचान और आवश्यक दस्तावेज।",
  },
  {
    id: "healthcare",
    titleEn: "Health & Well-being",
    titleHi: "स्वास्थ्य और चिकित्सा",
    descEn: "ABHA digital health accounts, public health schemes, and wellness access.",
    descHi: "आयुष्मान भारत डिजिटल स्वास्थ्य खाता (ABHA) और स्वास्थ्य योजनाएं।",
  },
  {
    id: "education",
    titleEn: "Education & Skilling",
    titleHi: "शिक्षा और कौशल विकास",
    descEn: "Scholarships, school admissions, vocational training, and academic credentials.",
    descHi: "राष्ट्रीय छात्रवृत्ति, स्कूल प्रवेश और अकादमिक प्रमाणपत्र।",
  },
  {
    id: "finance-and-welfare",
    titleEn: "Livelihood & Agriculture",
    titleHi: "आजीविका और किसान कल्याण",
    descEn: "Farmer income support, pensions, rural welfare, and social safety nets.",
    descHi: "पीएम-किसान सम्मान निधि, सामाजिक सुरक्षा और किसान सहायता।",
  },
  {
    id: "mobility-and-transport",
    titleEn: "Mobility & Transport",
    titleHi: "परिवहन और यात्रा",
    descEn: "Driving licence renewal, vehicle registration, and transport navigation.",
    descHi: "ड्राइविंग लाइसेंस नवीनीकरण, वाहन पंजीकरण और सारथी सेवाएं।",
  },
  {
    id: "utilities-and-local",
    titleEn: "Consumer & Public Utilities",
    titleHi: "उपभोक्ता अधिकार और नागरिक सेवाएं",
    descEn: "Consumer grievance redressal, municipal utilities, and public assistance.",
    descHi: "राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH) और नागरिक शिकायत निवारण।",
  },
];
