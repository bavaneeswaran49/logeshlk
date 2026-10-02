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
  for (const section of ['home', 'about', 'villas', 'services', 'process', 'faq', 'contact', 'main']) {
    assert(ids.includes(section), 'Missing section: ' + section)
  }
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(anchor), 'Broken anchor: ' + anchor)
  for (const [, target] of html.matchAll(/aria-controls="([^"]+)"/g)) assert(ids.includes(target), 'Missing accessible control target: ' + target)
  const sectionCount = (html.match(/<section\b/g) || []).length
  assert.equal(sectionCount, 7, 'Homepage narrative sections')
  const sectionOrder = [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(match => match[1])
  assert.deepEqual(sectionOrder, ['home', 'villas', 'services', 'process', 'about', 'faq', 'contact'], 'Visitor journey follows discovery through enquiry')
  const hero = html.slice(html.indexOf('id="home"'), html.indexOf('class="journey-strip"'))
  assert(hero.indexOf('href="#villas"') < hero.indexOf('href="#contact"'), 'Hero leads with exploration')
  const expectedLinks = ['villas', 'services', 'process', 'about', 'faq']
  const desktopNav = html.match(/class="desktop-links"[^>]*>(.*?)<\/div>/)?.[1]
  assert.deepEqual([...desktopNav.matchAll(/href="#([^"]+)"/g)].map(match => match[1]), expectedLinks, 'Navigation follows page order')
  for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const path = src.startsWith('/src/') ? src.slice(1) : 'public' + src
    assert(existsSync(resolve(path)), 'Missing image: ' + src)
  }
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert(match[0].includes('noopener'), 'External link needs noopener')
  }
  assert(html.includes('Architectural concepts for inspiration'), 'Villa disclosure missing')
  assert(html.includes('You review and send the message there'), 'Enquiry delivery must be clear')
  const { whatsappUrl } = await server.ssrLoadModule('/src/siteContent.js')
  const sample = 'Name: Test & Family\nVision: stone + wood'
  const url = new URL(whatsappUrl(sample))
  assert.equal(url.hostname, 'wa.me')
  assert.equal(url.searchParams.get('text'), sample, 'WhatsApp preserves enquiry text')
  const index = readFileSync('index.html', 'utf8')
  assert(index.includes('og:image') && existsSync('public/og.png'), 'Social preview missing')
  assert(!index.includes('Vite + React'), 'Starter metadata remains')
  console.log('PASS: rendered homepage, ordered 7-section journey, navigation order, discovery CTA, unique IDs, local images, external links, enquiry encoding and social preview.')
} finally { await server.close() }


