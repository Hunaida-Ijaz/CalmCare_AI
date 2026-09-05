// Local engine — synchronous, no network calls.
// Provides: emergency keyword detection, specialist suggestion,
// and a canned fallback reply for when both Groq and Gemini are unreachable.

// ---- Emergency detection -------------------------------------------------
// Keep this list conservative but broad — false positives (flagging a
// non-emergency) are far safer than false negatives here.
const EMERGENCY_KEYWORDS = [
  // English
  'chest pain', 'cant breathe', "can't breathe", 'difficulty breathing',
  'shortness of breath', 'severe bleeding', 'heavy bleeding', 'unconscious',
  'not breathing', 'stroke', 'heart attack', 'seizure', 'suicidal',
  'want to die', 'kill myself', 'overdose', 'severe burn', 'choking',
  'anaphylaxis', 'allergic reaction throat', 'poisoning',
  // Roman Urdu
  'saans nahi', 'dil ka dora', 'behosh', 'zyada khoon', 'khudkushi',
  'zeher', 'zehar',
]

export function isEmergency(lowerText) {
  return EMERGENCY_KEYWORDS.some((kw) => lowerText.includes(kw))
}

// Same check, but also returns which keyword triggered it — used to power
// the "Why?" explanation in the chat UI.
export function getEmergencyMatch(lowerText) {
  return EMERGENCY_KEYWORDS.find((kw) => lowerText.includes(kw)) || null
}

// ---- Specialist suggestion ------------------------------------------------
const SPECIALIST_MAP = [
  { keywords: ['skin', 'rash', 'acne', 'khaarish', 'jild'], specialty: 'Dermatologist' },
  { keywords: ['heart', 'chest', 'dil', 'blood pressure', 'bp'], specialty: 'Cardiologist' },
  { keywords: ['tooth', 'teeth', 'gum', 'daant'], specialty: 'Dentist' },
  { keywords: ['child', 'baby', 'bacha', 'bachi'], specialty: 'Pediatrician' },
  { keywords: ['bone', 'joint', 'fracture', 'haddi'], specialty: 'Orthopedist' },
  { keywords: ['eye', 'vision', 'aankh'], specialty: 'Ophthalmologist' },
  { keywords: ['pregnan', 'hamal'], specialty: 'Gynecologist' },
  { keywords: ['stomach', 'digestion', 'pet', 'maida'], specialty: 'Gastroenterologist' },
  { keywords: ['anxiety', 'depress', 'stress', 'mental'], specialty: 'Psychiatrist' },
]

export function suggestSpecialist(lowerText) {
  const match = SPECIALIST_MAP.find(({ keywords }) =>
    keywords.some((kw) => lowerText.includes(kw))
  )
  return match ? match.specialty : null
}

// Same lookup, but also returns which keyword triggered the suggestion —
// used to power the "Why?" explanation in the chat UI.
export function getSpecialistMatch(lowerText) {
  for (const { keywords, specialty } of SPECIALIST_MAP) {
    const keyword = keywords.find((kw) => lowerText.includes(kw))
    if (keyword) return { specialty, keyword }
  }
  return null
}

// ---- Local fallback reply --------------------------------------------------
// Used only when both Groq and Gemini calls fail (e.g. no internet, both
// APIs down, or missing keys). Keeps the app usable instead of showing
// a blank error screen.
export function localFallbackReply(userMessage) {
  return {
    type: 'info',
    message:
      "I'm having trouble connecting to my AI service right now. Please check your internet connection and try again in a moment. If this is urgent, please contact a doctor or call 1122.",
  }
}