/**
 * GovEase - In-Browser Civic Document Prep Studio Engine
 *
 * Implements 100% client-side, zero-knowledge image cropping, resizing,
 * and JPEG compression for government portal application uploads (UPSC, SSC, Parivahan, NHA).
 * Strictly zero network egress: all image bytes are processed exclusively in browser RAM.
 */

export interface DocumentPreset {
  id: string;
  name: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  description: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  targetWidth: number;
  targetHeight: number;
  minBytes: number;
  maxBytes: number;
  mimeType: "image/jpeg";
  aspectRatio: number;
}

export const CIVIC_PRESETS: Record<string, DocumentPreset> = {
  passport_photo: {
    id: "passport_photo",
    name: {
      en: "Passport-size Photograph",
      hi: "पासपोर्ट आकार का फोटो",
      bn: "পাসপোর্ট আকারের ছবি",
      ta: "பாஸ்போர்ட் அளவு புகைப்படம்",
    },
    description: {
      en: "Standard 3.5cm x 4.5cm Indian government portal standard (20 KB – 50 KB)",
      hi: "मानक 3.5 सेमी x 4.5 सेमी भारतीय पोर्टल मानक (20 KB – 50 KB)",
      bn: "মানক ৩.৫ সেমি x ৪.৫ সেমি ভারতীয় পোর্টাল মানক (২০ KB – ৫০ KB)",
      ta: "நிலையான 3.5 செமீ x 4.5 செமீ இந்திய போர்ட்டல் தரம் (20 KB – 50 KB)",
    },
    targetWidth: 413,
    targetHeight: 531,
    minBytes: 20 * 1024,
    maxBytes: 50 * 1024,
    mimeType: "image/jpeg",
    aspectRatio: 413 / 531,
  },
  signature: {
    id: "signature",
    name: {
      en: "Applicant Signature Scan",
      hi: "आवेदक के हस्ताक्षर की स्कैन कॉपी",
      bn: "আবেদনকারীর স্বাক্ষরের স্ক্যান",
      ta: "விண்ணப்பதாரர் கையொப்ப ஸ்கேன்",
    },
    description: {
      en: "Official 140px x 60px aspect ratio for UPSC, Parivahan, and SSC (10 KB – 20 KB)",
      hi: "यूपीएससी, परिवहन और एसएससी के लिए हस्ताक्षर मानक (10 KB – 20 KB)",
      bn: "ইউপিএসসি, পরিবহন এবং এসএসসির জন্য স্বাক্ষর মানক (১০ KB – ২০ KB)",
      ta: "யுபிஎஸ்சி மற்றும் பரிவாஹன் கையொப்ப தரம் (10 KB – 20 KB)",
    },
    targetWidth: 350,
    targetHeight: 150,
    minBytes: 10 * 1024,
    maxBytes: 20 * 1024,
    mimeType: "image/jpeg",
    aspectRatio: 350 / 150,
  },
  id_document: {
    id: "id_document",
    name: {
      en: "Aadhaar / ID Card Photocopy Scan",
      hi: "आधार / पहचान पत्र फोटोकॉपी स्कैन",
      bn: "আধার / পরিচয়পত্র ফটোকপি স্ক্যান",
      ta: "ஆதார் / அடையாள அட்டை நகல் ஸ்கேன்",
    },
    description: {
      en: "Legible document scan compressed below 100 KB for direct portal upload",
      hi: "पोर्टल अपलोड के लिए 100 KB से नीचे संपीड़ित स्पष्ट दस्तावेज़ स्कैन",
      bn: "পোর্টাল আপলোডের জন্য ১০০ KB-এর নিচে কম্প্রেস করা নথি",
      ta: "100 KB-க்கு கீழ் சுருக்கப்பட்ட தெளிவான ஆவண ஸ்கேன்",
    },
    targetWidth: 900,
    targetHeight: 1200,
    minBytes: 30 * 1024,
    maxBytes: 100 * 1024,
    mimeType: "image/jpeg",
    aspectRatio: 900 / 1200,
  },
};

export interface ProcessedDocumentResult {
  blob: Blob;
  dataUrl: string;
  sizeBytes: number;
  width: number;
  height: number;
  qualityUsed: number;
  isWithinTargetRange: boolean;
  filename: string;
}

/**
 * Resizes and compresses an image to fit government portal size constraints.
 * Uses iterative binary search on canvas JPEG quality to land within [minBytes, maxBytes].
 */
export async function processCivicImage(
  file: File,
  presetKey: keyof typeof CIVIC_PRESETS,
): Promise<ProcessedDocumentResult> {
  const preset = CIVIC_PRESETS[presetKey];
  if (!preset) {
    throw new Error(`Unknown preset: ${String(presetKey)}`);
  }

  // Read file into image element
  const image = await loadImageFromFile(file);

  // Setup offscreen canvas with target dimensions
  const canvas = document.createElement("canvas");
  canvas.width = preset.targetWidth;
  canvas.height = preset.targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to initialize canvas 2D context.");
  }

  // Draw image with smooth scaling and background fill
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Maintain aspect-ratio crop (center-crop)
  const sourceAspect = image.naturalWidth / image.naturalHeight;
  const targetAspect = preset.aspectRatio;

  let sx = 0;
  let sy = 0;
  let sWidth = image.naturalWidth;
  let sHeight = image.naturalHeight;

  if (sourceAspect > targetAspect) {
    // Source is wider than target: crop left & right
    sWidth = image.naturalHeight * targetAspect;
    sx = (image.naturalWidth - sWidth) / 2;
  } else {
    // Source is taller than target: crop top & bottom
    sHeight = image.naturalWidth / targetAspect;
    sy = (image.naturalHeight - sHeight) / 2;
  }

  ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);

  // Binary search for JPEG quality to fit within target byte budget
  let low = 0.1;
  let high = 0.95;
  let bestBlob: Blob | null = null;
  let bestQuality = 0.8;

  for (let i = 0; i < 6; i++) {
    const mid = (low + high) / 2;
    const blob = await canvasToBlob(canvas, preset.mimeType, mid);
    if (!blob) break;

    bestBlob = blob;
    bestQuality = mid;

    if (blob.size > preset.maxBytes) {
      high = mid; // Need higher compression (lower quality)
    } else if (blob.size < preset.minBytes) {
      low = mid; // Can afford higher quality
    } else {
      // Exactly within bounds!
      break;
    }
  }

  if (!bestBlob) {
    throw new Error("Failed to produce compressed image blob.");
  }

  const dataUrl = canvas.toDataURL(preset.mimeType, bestQuality);
  const isWithinTargetRange = bestBlob.size <= preset.maxBytes && bestBlob.size >= preset.minBytes;

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const filename = `${baseName}_${preset.id}.jpg`;

  return {
    blob: bestBlob,
    dataUrl,
    sizeBytes: bestBlob.size,
    width: preset.targetWidth,
    height: preset.targetHeight,
    qualityUsed: Math.round(bestQuality * 100),
    isWithinTargetRange,
    filename,
  };
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to decode uploaded image."));
      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      }
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

/**
 * Formats bytes to human-readable KB.
 */
export function formatBytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}
