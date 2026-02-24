import CryptoJS from "crypto-js"

const SECRET_KEY = "xmlgacor_2026"

// Encrypt & Save
export const setSecure = (key, data) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString()

  localStorage.setItem(key, encrypted)
}

// Get & Decrypt
export const getSecure = (key) => {
  const encrypted = localStorage.getItem(key)
  if (!encrypted) return null

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch {
    return null
  }
}

// Hash Password
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString()
}

// Remove
export const removeSecure = (key) => {
  localStorage.removeItem(key)
}
