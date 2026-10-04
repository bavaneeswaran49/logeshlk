# Sri Builders and Developers

A responsive construction homepage focused on family homes for Sri Builders in Tiruppur, Tamil Nadu. Built with React, Vite and Framer Motion, using a warm ivory, charcoal and bronze palette.

## Development

- `npm install` installs dependencies.
- `npm run dev` starts the development server.
- `npm run lint` checks source code.
- `npm run check` renders the homepage and checks navigation, local images, accessibility control references, metadata and enquiry encoding.
- `npm run build` creates production assets in `dist`.
- `npm run preview` serves the production build.

On Windows with PowerShell script execution restricted, use `npm.cmd`.

## Visitor flow

The homepage follows introduction → home styles → services → process → about → FAQs → enquiry. Navigation follows the same order and marks the current section. Each discovery section offers a next step, while visitors who are ready can go directly to an enquiry. Home design details carry the selected style into the form. Repeated brand sections are consolidated into the introduction and about section.

## Content

Business details and home design directions are in `src/siteContent.js`. Images are architectural concepts for inspiration, not completed Sri Builders projects. Original PNG assets remain available; the page uses compressed JPEG copies for faster downloads. The existing brand logo and favicon are retained. The social preview uses the home concept photograph without villa-specific wording.

The enquiry form validates details and prepares a WhatsApp message. Visitors review and send the message in WhatsApp. There is no enquiry database or backend submission.

The careers section accepts an applicant name and a PDF, DOC or DOCX résumé up to 5 MB. It prepares a message to the same business WhatsApp number. The selected file stays in browser memory; it is not uploaded or included in a `wa.me` URL. Applicants attach it in WhatsApp before sending. On devices supporting file sharing, a separate button passes the selected document to the native share sheet, where applicants choose WhatsApp and the Sri Builders contact. The page does not claim an application was sent.

## Motion and accessibility

Shared transitions and variants live in `src/motion`. Reveals run once, while scroll movement is limited to two large image sections. Motion respects the visitor's reduced-motion setting.

The mobile navigation supports Escape, focus containment and scroll locking. Home design details use a native modal dialog. FAQ controls expose expanded state and linked answer regions. All primary navigation links point to sections on the homepage.

## Hosting

The existing Sites configuration in `.openai/hosting.json` is preserved. Static output is published from `dist`.

