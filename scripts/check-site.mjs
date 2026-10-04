import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToStaticMarkup(createElement(App))
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs')
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one page heading')
  for (const section of ['home', 'about', 'villas', 'services', 'process', 'faq', 'contact', 'careers', 'main']) {
    assert(ids.includes(section), 'Missing section: ' + section)
  }
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(anchor), 'Broken anchor: ' + anchor)
  for (const [, target] of html.matchAll(/aria-controls="([^"]+)"/g)) assert(ids.includes(target), 'Missing accessible control target: ' + target)
  const sectionCount = (html.match(/<section\b/g) || []).length
  assert.equal(sectionCount, 8, 'Homepage narrative sections')
  const sectionOrder = [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(match => match[1])
  assert.deepEqual(sectionOrder, ['home', 'villas', 'services', 'process', 'about', 'faq', 'contact', 'careers'], 'Visitor journey follows discovery through enquiry, then careers')
  const hero = html.slice(html.indexOf('id="home"'), html.indexOf('class="journey-strip"'))
  assert(hero.indexOf('href="#villas"') < hero.indexOf('href="#contact"'), 'Hero leads with exploration')
  const expectedLinks = ['villas', 'services', 'process', 'about', 'faq', 'careers']
  const desktopNav = html.match(/class="desktop-links"[^>]*>(.*?)<\/div>/)?.[1]
  assert.deepEqual([...desktopNav.matchAll(/href="#([^"]+)"/g)].map(match => match[1]), expectedLinks, 'Navigation follows page order')
  for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const path = src.startsWith('/src/') ? src.slice(1) : 'public' + src
    assert(existsSync(resolve(path)), 'Missing image: ' + src)
  }
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert(match[0].includes('noopener'), 'External link needs noopener')
  }
  assert(html.includes('Architectural concepts for inspiration'), 'Design inspiration disclosure missing')
  assert(html.includes('You review and send the message there'), 'Enquiry delivery must be clear')
  const { whatsappUrl } = await server.ssrLoadModule('/src/siteContent.js')
  const sample = 'Name: Test & Family\nVision: stone + wood'
  const url = new URL(whatsappUrl(sample))
  assert.equal(url.hostname, 'wa.me')
  assert.equal(url.searchParams.get('text'), sample, 'WhatsApp preserves enquiry text')
  const index = readFileSync('index.html', 'utf8')
  const socialImage = index.match(/property="og:image" content="([^"]+)"/)?.[1]
  assert(socialImage && existsSync(resolve('public' + new URL(socialImage).pathname)), 'Social preview missing')
  assert(!index.includes('Vite + React'), 'Starter metadata remains')
  const { LANGUAGE_STORAGE_KEY, readLanguage, saveLanguage, translate } = await server.ssrLoadModule('/src/i18n/language.js')
  assert.equal(readLanguage(), null, 'Language loading works without browser storage')
  const previousWindow = globalThis.window
  const storage = new Map()
  const mockWindow = { localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } }
  const { LanguageContext } = await server.ssrLoadModule('/src/i18n/LanguageContext.js')
  const localizedComponents = await Promise.all(['Home', 'Contact', 'Faq', 'VillaCollection', 'Careers'].map(name => server.ssrLoadModule(`/src/components/${name}.jsx`)))
  try {
    for (const language of ['ta', 'en']) {
      globalThis.window = mockWindow
      saveLanguage(language)
      assert.equal(storage.get(LANGUAGE_STORAGE_KEY), language, 'Language is persisted')
      assert.equal(readLanguage(), language, 'Saved language is restored')
      const restoredLanguage = readLanguage()
      delete globalThis.window
      const localized = renderToStaticMarkup(createElement(LanguageContext.Provider, { value: { language: restoredLanguage, t: text => translate(restoredLanguage, text) } }, localizedComponents.map(({ default: Component }, key) => createElement(Component, { key, preferredStyle: 'Let’s explore together' }))))
      assert(localized.includes(translate(language, 'Tell us about your project')), 'Form restores the saved language')
      assert(localized.includes(translate(language, 'What types of construction do you undertake?')), 'FAQ restores the saved language')
      assert(localized.includes(translate(language, 'Clean lines. Open possibilities.')), 'Design content restores the saved language')
      assert(localized.includes(translate(language, 'Upload your résumé')), 'Careers restores the saved language')
      assert(localized.includes(translate(language, 'Opens a message to Sri Builders with your name. Attach your résumé in WhatsApp, then review and send. Selecting a file here does not send it.')), 'Careers explains the résumé handoff in both languages')
      for (const value of ['Let’s explore together', 'Contemporary', 'Courtyard', 'Classic', 'Family home', 'I own a plot']) {
        assert(localized.includes(`value="${value}"`), 'Form option values remain stable across languages: ' + value)
      }
    }
    globalThis.window = mockWindow
    storage.set(LANGUAGE_STORAGE_KEY, 'invalid')
    assert.equal(readLanguage(), null, 'Unsupported saved values are ignored')
    saveLanguage('invalid')
    assert.equal(storage.get(LANGUAGE_STORAGE_KEY), 'invalid', 'Unsupported languages are not saved')
    globalThis.window = { get localStorage() { throw new Error('Storage blocked') } }
    assert.equal(readLanguage(), null, 'Blocked storage falls back safely')
    assert.doesNotThrow(() => saveLanguage('ta'), 'Blocked storage does not prevent language switching')
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
  const tamil = JSON.parse(readFileSync('src/i18n/ta.json', 'utf8'))
  const localizedFiles = ['src/App.jsx', 'src/Navbar/Navbar.jsx', ...['Home', 'About', 'Service', 'Process', 'Faq', 'Footer', 'Contact', 'Careers', 'VillaCollection', 'Brand'].map(name => `src/components/${name}.jsx`)]
  for (const file of localizedFiles) {
    for (const [, literal] of readFileSync(file, 'utf8').matchAll(/\bt\(("(?:[^"\\]|\\.)*")\)/g)) {
      const key = JSON.parse(literal)
      assert(tamil[key], 'Missing Tamil translation: ' + key)
    }
  }
  const { MAX_RESUME_BYTES, validateCareerApplication, careerMessage, canShareResume } = await server.ssrLoadModule('/src/careerApplication.js')
  const resume = { name: 'Resume & qualifications.pdf', size: 1024 }
  assert.equal(validateCareerApplication('  Candidate  ', resume), '')
  assert(validateCareerApplication('   ', resume), 'Whitespace names must be rejected')
  assert(validateCareerApplication('Candidate', null), 'Résumé is required')
  assert(validateCareerApplication('Candidate', { name: 'file.exe', size: 100 }), 'Unsupported file formats must be rejected')
  assert(validateCareerApplication('Candidate', { ...resume, size: 0 }), 'Empty files must be rejected')
  assert(validateCareerApplication('Candidate', { ...resume, size: MAX_RESUME_BYTES + 1 }), 'Oversized files must be rejected')
  for (const extension of ['PDF', 'doc', 'docx']) assert.equal(validateCareerApplication('Candidate', { name: `resume.${extension}`, size: MAX_RESUME_BYTES }), '', 'Valid document formats and size limit are accepted')
  for (const language of ['en', 'ta']) {
    const message = careerMessage('  பெயர் & Candidate  ', resume, text => translate(language, text))
    const link = new URL(whatsappUrl(message))
    assert.equal(link.pathname, '/919952272769', 'Career enquiries go to Sri Builders')
    assert.equal(link.searchParams.get('text'), message, 'Applicant names, Tamil and filenames are preserved in WhatsApp')
    assert(message.includes('பெயர் & Candidate'))
    assert(message.includes(resume.name))
    assert(message.includes(translate(language, 'I will attach my résumé in this chat.')))
  }
  assert.equal(canShareResume(null), false, 'No file sharing without a résumé')
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
  try {
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { share: () => {}, canShare: ({ files }) => files[0] === resume } })
    assert.equal(canShareResume(resume), true, 'Supported devices can share the selected file')
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { share: () => {}, canShare: () => { throw new Error('Blocked') } } })
    assert.equal(canShareResume(resume), false, 'Blocked sharing retains the WhatsApp attachment fallback')
  } finally {
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor)
    else delete globalThis.navigator
  }
  console.log('PASS: careers name and résumé validation, bilingual WhatsApp messages, recipient, file sharing detection and attachment fallback.')
  console.log('PASS: Tamil/English rendering, language persistence and restoration, stable form options, translation coverage, invalid preferences and blocked storage.')
  console.log('PASS: rendered homepage, ordered 8-section journey, navigation order, discovery CTA, unique IDs, local images, external links, enquiry encoding and social preview.')
} finally { await server.close() }


