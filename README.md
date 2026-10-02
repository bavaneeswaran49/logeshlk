# Sri Builders and Developers

A responsive villa construction homepage for Sri Builders in Tiruppur, Tamil Nadu. Built with React, Vite and Framer Motion, using a warm ivory, charcoal and bronze palette.

## Development

- `npm install` installs dependencies.
- `npm run dev` starts the development server.
- `npm run lint` checks source code.
- `npm run check` renders the homepage and checks navigation, local images, accessibility control references, metadata and enquiry encoding.
- `npm run build` creates production assets in `dist`.
- `npm run preview` serves the production build.

On Windows with PowerShell script execution restricted, use `npm.cmd`.

## Content

Business details and villa design directions are in `src/siteContent.js`. Images are architectural concepts for inspiration, not completed Sri Builders projects. Original PNG assets remain available; the page uses compressed JPEG copies for faster downloads. The existing brand logo, favicon and social preview are retained.

The enquiry form validates details and prepares a WhatsApp message. Visitors review and send the message in WhatsApp. There is no enquiry database or backend submission.

## Motion and accessibility

Shared transitions and variants live in `src/motion`. Reveals run once, while scroll movement is limited to two large image sections. Motion respects the visitor's reduced-motion setting.

The mobile navigation supports Escape, focus containment and scroll locking. Villa details use a native modal dialog. FAQ controls expose expanded state and linked answer regions. All primary navigation links point to sections on the homepage.

## Hosting

The existing Sites configuration in `.openai/hosting.json` is preserved. Static output is published from `dist`.

