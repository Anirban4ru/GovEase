/**
 * Unified Life Services Platform - Anti-Leak Sensitive Data Sanitizer
 *
 * Enforces Security Baseline & DPDP Act 2023 Guidelines:
 * Prevents accidental citizen leakage of Aadhaar numbers, phone numbers,
 * email addresses, or payment numbers into feedback and support forms.
 */

export interface LeakScanResult {
  hasLeak: boolean;
  detectedTypes: string[];
  warningMessage?: string;
}

// Aadhaar: 12 digits, first digit 2-9 (excluding 0 and 1)
const AADHAAR_REGEX = /\b[2-9]{1}[0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/;

// Indian mobile: 10 digits starting with 6-9, optional +91 prefix
const PHONE_REGEX = /\b(?:\+?91[\s-]?)?[6-9]\d{9}\b/;

// Standard email address pattern
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

// Payment Card / 16-digit sequences
const CARD_REGEX = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;

/**
 * Scans text for sensitive personal data identifiers before submission or export.
 */
export function scanForSensitiveData(text: string): LeakScanResult {
  if (!text || typeof text !== "string") {
    return { hasLeak: false, detectedTypes: [] };
  }

  const detected: string[] = [];

  if (AADHAAR_REGEX.test(text)) {
    detected.push("Aadhaar Number");
  }

  if (PHONE_REGEX.test(text)) {
    detected.push("Phone Number");
  }

  if (EMAIL_REGEX.test(text)) {
    detected.push("Email Address");
  }

  if (CARD_REGEX.test(text) && !detected.includes("Aadhaar Number")) {
    detected.push("Card or Account Number");
  }

  const hasLeak = detected.length > 0;

  return {
    hasLeak,
    detectedTypes: detected,
    warningMessage: hasLeak
      ? `Sensitive data detected: ${detected.join(", ")}. For your security and privacy, please remove all personal details.`
      : undefined,
  };
}

/**
 * Truncates and sanitizes text to enforce length limits.
 */
export function sanitizeFeedbackText(text: string, maxLength: number = 500): string {
  if (!text) return "";
  return text.trim().slice(0, maxLength);
}
