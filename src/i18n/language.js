import tamil from './ta.json'

export const LANGUAGE_STORAGE_KEY = 'sri-builders-language'
export const isLanguage = value => value === 'en' || value === 'ta'

export function readLanguage() {
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return isLanguage(value) ? value : null
  } catch {
    return null
  }
}

export function saveLanguage(language) {
  if (!isLanguage(language)) return
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // Language switching still works when the browser blocks storage.
  }
}

export const translate = (language, text) => language === 'ta' ? tamil[text] ?? text : text
