/**
 * GovEase - Statutory Fee & Penalty Calculator Engine
 *
 * Implements statutory government fee schedules under:
 * - Motor Vehicles (Amendment) Act 2019 (Central Motor Vehicles Rules 1989, Rule 32)
 * - Income Tax Department (PAN reprint rules)
 * - UIDAI Aadhaar Regulations (Gazette Fee Schedule)
 * - Ministry of Labour & Employment (e-Shram zero-fee charter)
 */

export type FeeServiceType = "DRIVING_LICENCE_RENEWAL" | "PAN_REPRINT" | "AADHAAR_UPDATE" | "E_SHRAM_REGISTRATION";

export interface FeeCalculationInput {
  serviceType: FeeServiceType;
  /** For DL renewal: days or months since licence expiry. Negative means renewing prior to expiry */
  monthsSinceExpiry?: number;
  /** For PAN: physical dispatch vs electronic PDF */
  panDeliveryMode?: "PHYSICAL_INDIA" | "ELECTRONIC_PDF" | "PHYSICAL_INTERNATIONAL";
  /** For Aadhaar: demographic, biometric, or mandatory child update */
  aadhaarUpdateType?: "CHILD_MANDATORY_5_15" | "DEMOGRAPHIC" | "BIOMETRIC";
}

export interface FeeBreakdownItem {
  label: string;
  amountInr: number;
  statutoryRule: string;
}

export interface FeeCalculationResult {
  serviceName: string;
  statutoryTotalInr: number;
  marketToutEstimateInr: number;
  citizenSavingsInr: number;
  items: FeeBreakdownItem[];
  gracePeriodNotice?: {
    isWithinGrace: boolean;
    statusBadge: "WITHIN_GRACE" | "LATE_PENALTY_APPLIED" | "RETEST_MANDATORY";
    message: string;
    actionAdvice: string;
  };
  legalReference: string;
  officialPortalUrl: string;
}

/**
 * Calculates official statutory fees and highlights tout surcharges.
 */
export function calculateCivicFee(input: FeeCalculationInput): FeeCalculationResult {
  switch (input.serviceType) {
    case "DRIVING_LICENCE_RENEWAL": {
      const months = input.monthsSinceExpiry ?? 0;
      const baseRenewal = 200;
      const smartCardFee = 200;
      const items: FeeBreakdownItem[] = [
        { label: "Driving Licence Renewal Fee", amountInr: baseRenewal, statutoryRule: "CMVR 1989 Rule 32, Item 9" },
        { label: "Form 7 Smart Card / Form Fee", amountInr: smartCardFee, statutoryRule: "Rule 32 (Issue of Licence in Form 7)" },
      ];

      let lateFee = 0;
      let statusBadge: "WITHIN_GRACE" | "LATE_PENALTY_APPLIED" | "RETEST_MANDATORY" = "WITHIN_GRACE";
      let statusMessage = "Your licence is within the standard renewal or grace period.";
      let actionAdvice = "Apply directly on Parivahan Sarathi. No driving re-test is required.";

      if (months > 12) {
        // Expired > 1 year: Rule 32 late fee of ₹1,000 per year or part thereof + re-test
        const yearsLate = Math.ceil((months - 12) / 12);
        lateFee = yearsLate * 1000;
        statusBadge = "RETEST_MANDATORY";
        statusMessage = `Licence expired over 1 year ago (${Math.floor(months / 12)}y ${months % 12}m). Late penalty: ₹${lateFee}.`;
        actionAdvice = "Under Section 15(4) of MV Act, a driving test re-test is mandatory before renewal.";
        items.push({
          label: `Late Renewal Penalty (${yearsLate} year/part after grace period)`,
          amountInr: lateFee,
          statutoryRule: "MV (Amendment) Act 2019 Sec 15 & CMVR Rule 32 (₹1,000/year late fee)",
        });
      } else if (months > 0) {
        statusBadge = "WITHIN_GRACE";
        statusMessage = `Within 1-year statutory grace window (${months} months expired).`;
        actionAdvice = "Renew immediately online via Parivahan Sarathi without driving re-test.";
      } else {
        statusBadge = "WITHIN_GRACE";
        statusMessage = `Advance renewal (${Math.abs(months)} months until expiry). Allowed up to 1 year prior.`;
        actionAdvice = "Apply online ahead of time to avoid interruption in valid driving status.";
      }

      const total = baseRenewal + smartCardFee + lateFee;
      const toutEstimate = total + (months > 12 ? 3500 : 1500);

      return {
        serviceName: "Driving Licence Renewal (Parivahan Sarathi)",
        statutoryTotalInr: total,
        marketToutEstimateInr: toutEstimate,
        citizenSavingsInr: Math.max(0, toutEstimate - total),
        items,
        gracePeriodNotice: {
          isWithinGrace: months <= 12,
          statusBadge,
          message: statusMessage,
          actionAdvice,
        },
        legalReference: "Motor Vehicles (Amendment) Act 2019, Section 15 read with Central Motor Vehicles Rules 1989 Rule 32",
        officialPortalUrl: "https://sarathi.parivahan.gov.in",
      };
    }

    case "PAN_REPRINT": {
      const mode = input.panDeliveryMode ?? "PHYSICAL_INDIA";
      let fee = 50;
      let label = "Reprint of Physical PAN Card (Delivery within India)";

      if (mode === "ELECTRONIC_PDF") {
        fee = 8.26; // Statutory fee with GST
        label = "e-PAN Download (PDF via NSDL / Protean / UTIITSL)";
      } else if (mode === "PHYSICAL_INTERNATIONAL") {
        fee = 959;
        label = "Physical PAN Card Dispatch to Foreign Address (inclusive of dispatch fee)";
      }

      const toutEstimate = mode === "ELECTRONIC_PDF" ? 100 : mode === "PHYSICAL_INDIA" ? 350 : 1500;

      return {
        serviceName: "PAN Card Reprint / Correction (Protean / UTIITSL)",
        statutoryTotalInr: Math.round(fee),
        marketToutEstimateInr: toutEstimate,
        citizenSavingsInr: Math.max(0, toutEstimate - Math.round(fee)),
        items: [
          {
            label,
            amountInr: Math.round(fee),
            statutoryRule: "Income Tax Department Notification & CBDT Fee Schedule",
          },
        ],
        legalReference: "Income Tax Rules 1962, Rule 114 read with CBDT Guidelines",
        officialPortalUrl: "https://www.onlineservices.nsdl.com",
      };
    }

    case "AADHAAR_UPDATE": {
      const type = input.aadhaarUpdateType ?? "DEMOGRAPHIC";
      let fee = 50;
      let label = "Demographic Update (Name, Address, Mobile, Gender, DoB)";

      if (type === "CHILD_MANDATORY_5_15") {
        fee = 0;
        label = "Mandatory Biometric Update for Children (Ages 5 and 15)";
      } else if (type === "BIOMETRIC") {
        fee = 100;
        label = "Biometric Update with/without Demographic Update (Fingerprint, Iris, Photo)";
      }

      const toutEstimate = type === "CHILD_MANDATORY_5_15" ? 200 : type === "DEMOGRAPHIC" ? 250 : 350;

      return {
        serviceName: "Aadhaar Information Update (UIDAI / ASK Kendra)",
        statutoryTotalInr: fee,
        marketToutEstimateInr: toutEstimate,
        citizenSavingsInr: Math.max(0, toutEstimate - fee),
        items: [
          {
            label,
            amountInr: fee,
            statutoryRule: fee === 0 ? "UIDAI Circular: Mandatory Child Biometric Update is 100% Free" : "UIDAI Gazette Notification on Aadhaar Enrolment & Update Regulations",
          },
        ],
        legalReference: "Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act 2016",
        officialPortalUrl: "https://myaadhaar.uidai.gov.in",
      };
    }

    case "E_SHRAM_REGISTRATION": {
      return {
        serviceName: "e-Shram Worker UAN Registration",
        statutoryTotalInr: 0,
        marketToutEstimateInr: 200,
        citizenSavingsInr: 200,
        items: [
          {
            label: "Self-Registration / CSC Assistance for e-Shram",
            amountInr: 0,
            statutoryRule: "Ministry of Labour & Employment: 100% Free for Unorganised Workers",
          },
        ],
        legalReference: "Unorganised Workers' Social Security Act, 2008 & Ministry of Labour Notifications",
        officialPortalUrl: "https://eshram.gov.in",
      };
    }
  }
}

