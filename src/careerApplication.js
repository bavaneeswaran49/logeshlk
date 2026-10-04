export const MAX_RESUME_BYTES = 5 * 1024 * 1024
export const RESUME_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export function validateCareerApplication(name, resume) {
  if (!name.trim() || name.trim().length > 80) return 'Please enter your full name.'
  if (!resume) return 'Please select your résumé.'
  if (!/\.(pdf|doc|docx)$/i.test(resume.name)) return 'Please choose a PDF, DOC or DOCX résumé.'
  if (!resume.size || resume.size > MAX_RESUME_BYTES) return 'Please choose a résumé between 1 byte and 5 MB.'
  return ''
}

export function careerMessage(name, resume, t) {
  return `${t('Hello Sri Builders, I would like to apply for a career opportunity.')}\n\n${t('Name')}: ${name.trim()}\n${t('Résumé')}: ${resume.name}\n\n${t('I will attach my résumé in this chat.')}`
}

export function canShareResume(resume) {
  try {
    return Boolean(resume && navigator.share && navigator.canShare?.({ files: [resume] }))
  } catch {
    return false
  }
}
