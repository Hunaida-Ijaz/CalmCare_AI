// Saves the user's own results in this browser only (localStorage).
// No backend, no account: data never leaves the device.

const KEY = 'calmcare-health'

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

// type: 'water' | 'calorie' | 'sleep' | 'mood'
export function saveEntry(type, data) {
  const all = readAll()
  const list = all[type] || []
  list.push({ date: new Date().toISOString(), ...data })
  all[type] = list.slice(-30) // keep the last 30 entries per type
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage full or blocked: ignore */
  }
}

export function getEntries(type) {
  return readAll()[type] || []
}

export function getLatest(type) {
  const list = getEntries(type)
  return list.length ? list[list.length - 1] : null
}

export function clearAll() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}