// AI engine — calls a small serverless proxy (see /calmcare-proxy) that
// holds the Groq/Gemini API keys server-side. The browser never sees the
// keys, so they can never be exposed through GitHub or the deployed site.
//
// Emergency detection stays local and synchronous (see localEngine.js) —
// it must never wait on a network call.

import { isEmergency, getEmergencyMatch, getSpecialistMatch, localFallbackReply } from './localEngine'
export { localFallbackReply } from './localEngine'

// ---- Config -----------------------------------------------------------
// Set this to your deployed proxy's URL (see /calmcare-proxy/README.md).
// This is just an endpoint address, not a secret — safe to commit.
const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'https://calmcare-ai-proxy.vercel.app/api/chat'

export const SUGGESTED_PROMPTS = [
  'I have a fever and headache',
  'Mujhe pait dard ho raha hai',
  'What should I eat for a healthy diet?',
  'Vegetarian diet plan suggest karein',
  'What are the symptoms of dengue?',
  'Panadol ki dosage kya hai?',
]

// ---- Proxy call -----------------------------------------------------------
async function callProxy(userMessage, history = []) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage, history }),
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Proxy error:', res.status, errorData)
    throw new Error(`Proxy error ${res.status}: ${errorData}`)
  }

  const data = await res.json()
  if (!data.text) throw new Error('Proxy returned no content')
  return data.text
}

// ---- Public entry point --------------------------------------------------
// Returns the same shape as localFallbackReply: { type, message, specialty? }
export async function getAIReply(userMessage, history = []) {
  const t = userMessage.toLowerCase()

  // Emergency check first, always local, always instant.
  if (isEmergency(t)) {
    return {
      type: 'emergency',
      message:
        "This sounds like it could be a medical emergency. Please call your local emergency number (1122 in Pakistan) or go to the nearest emergency room right away. I'm not able to provide emergency care myself.",
      reason: getEmergencyMatch(t),
    }
  }

  // Try the proxy (Groq, with Gemini fallback, handled server-side).
  try {
    const reply = await callProxy(userMessage, history)
    return attachSpecialistIfRelevant(t, reply)
  } catch (err) {
    console.warn('Proxy unreachable, using local engine:', err.message)
  }

  // Proxy unreachable — use the local canned-response engine.
  return localFallbackReply(userMessage)
}

function attachSpecialistIfRelevant(lowerText, message) {
  const match = getSpecialistMatch(lowerText)
  return match
    ? { type: 'specialist', message, specialty: match.specialty, reason: match.keyword }
    : { type: 'info', message }
}