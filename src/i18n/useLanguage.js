import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

export default function useLanguage() {
  return useContext(LanguageContext)
}
