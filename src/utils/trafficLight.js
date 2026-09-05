// Traffic-light health-status helper.
// Maps a value/context to one of four levels so results are easy to read
// at a glance, without needing medical knowledge.
//
// Levels (in increasing order of concern):
//   green  — healthy / no immediate concern
//   yellow — needs attention
//   orange — consider professional consultation
//   red    — seek urgent medical attention

export const STATUS_LEVELS = {
  green: { emoji: '🟢', label: 'Healthy', order: 0 },
  yellow: { emoji: '🟡', label: 'Needs attention', order: 1 },
  orange: { emoji: '🟠', label: 'Consider consultation', order: 2 },
  red: { emoji: '🔴', label: 'Seek urgent care', order: 3 },
}

export function getStatus(level) {
  return STATUS_LEVELS[level] || STATUS_LEVELS.green
}

// ---- Simple threshold helpers for common dashboard stats ------------------
// These are intentionally conservative, general-audience rules of thumb —
// not diagnostic thresholds. Kept in one place so they're easy to tune.

export function bmiStatus(bmi) {
  if (bmi < 16 || bmi >= 35) return 'red'
  if (bmi < 18.5 || bmi >= 30) return 'orange'
  if (bmi >= 25) return 'yellow'
  return 'green'
}

export function sleepStatus(hours) {
  if (hours < 4) return 'red'
  if (hours < 6) return 'orange'
  if (hours < 7) return 'yellow'
  return 'green'
}

export function moodStatus(scoreOutOf10) {
  if (scoreOutOf10 <= 2) return 'red'
  if (scoreOutOf10 <= 4) return 'orange'
  if (scoreOutOf10 <= 6) return 'yellow'
  return 'green'
}

export function waterIntakeStatus(liters, targetLiters = 2.5) {
  const pct = liters / targetLiters
  if (pct < 0.4) return 'red'
  if (pct < 0.6) return 'orange'
  if (pct < 0.85) return 'yellow'
  return 'green'
}
