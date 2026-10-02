# Sri Builders and Developers

A responsive, villa-focused website for a construction company based in Tirupur, Tamil Nadu. Built with React and Vite, with a warm ivory, navy and muted gold design.

## Run locally

Install dependencies with `npm install`, then run `npm run dev`. In Windows PowerShell with script execution restricted, use `npm.cmd` instead of `npm`.

- `npm run build` creates the static production site in `dist`.
- `npm run lint` checks the JavaScript and React source.
- `npm run preview` serves the production build locally.

## Content and enquiries

Business contact details and villa concepts are in `src/siteContent.js`. The current phone and WhatsApp number is +91 99522 72769. The enquiry form validates the visitor's details and opens a prefilled WhatsApp conversation. The visitor reviews and sends the message in WhatsApp; the site does not store enquiries or claim they have been submitted.

Villa images are AI-generated architectural concepts, clearly labelled as inspiration rather than completed projects. Replace these with approved project photography when available. No invented project counts, testimonials, costs or delivery promises are included.

## Features

Responsive mobile navigation, villa style filters, accessible native villa-detail dialogs, service and process sections, FAQ disclosures, and direct phone/WhatsApp contact. Includes reduced-motion support, focus styles, search metadata, structured business information, and a branded social preview.

## Hosting

The Sites project is linked through `.openai/hosting.json`; the static output directory is `dist`. The canonical and social metadata currently reference the Sites origin in `index.html`; update them when connecting a different domain.

## Generated assets

Built-in ImageGen prompts: premium contemporary Tamil Nadu villa in warm evening light; limestone and timber courtyard villa; understated ivory and walnut villa interior; navy/ivory/gold social card with the headline “Extraordinary homes. Thoughtfully built.”

Assets: `public/images/villa-hero.png`, `public/images/villa-courtyard.png`, `public/images/villa-interior.png`, and `public/og.png`.
