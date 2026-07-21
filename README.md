# Navaneeth Krishnan — Portfolio Website

A premium, fully responsive personal portfolio built with **vanilla HTML5, CSS3, and JavaScript (ES6)** — no frameworks, no build step. Deploy it by dragging the folder straight into Vercel.

## ✨ Features

- Glassmorphism UI with a blue → purple → cyan gradient system
- Dark mode by default, with a light mode toggle (persisted in `localStorage`)
- Animated particle background (particles.js) in the hero section
- Typing animation (Typed.js) cycling through roles
- Scroll-triggered reveal animations (AOS)
- Animated skill progress bars and counters
- Sticky navbar with scroll-spy active states and a mobile menu
- Scroll progress bar and "back to top" button
- Fully responsive: desktop, tablet, and mobile
- Accessible: semantic HTML, visible focus states, `prefers-reduced-motion` respected
- Contact form (client-side validation — see note below to wire up delivery)

## 📁 Folder structure

```
portfolio/
│── index.html
│── style.css
│── script.js
│── assets/
│   ├── images/        # add profile photo / project screenshots here
│   ├── resume.pdf      # downloadable resume (already included)
│   └── icons/
│── README.md
```

## 🚀 Deploy to Vercel

**Option A — Drag and drop**
1. Go to [vercel.com/new](https://vercel.com/new).
2. Drag the `portfolio` folder onto the upload area.
3. Vercel auto-detects it as a static site — click **Deploy**. Done.

**Option B — Vercel CLI**
```bash
npm i -g vercel
cd portfolio
vercel
```

**Option C — GitHub**
1. Push this folder to a GitHub repo.
2. Import the repo in Vercel → Framework Preset: **Other** → Deploy.

No environment variables or build commands are required — this is a static site.

## 🛠 Customize

| What | Where |
|---|---|
| Colors / gradients | CSS custom properties at the top of `style.css` (`:root`) |
| Fonts | `<link>` tags in `index.html` `<head>` + `--font-*` variables in `style.css` |
| Typed.js roles | `initTyped()` in `script.js` |
| Particle density/colors | `initParticles()` in `script.js` |
| Profile photo | Replace the `.about-photo-placeholder` block in `index.html` with an `<img>` pointing to `assets/images/your-photo.jpg` |
| Project screenshots | Replace the icon in `.project-media` with an `<img>` |
| Resume file | Swap `assets/resume.pdf` with an updated export |

## ✉️ Wiring up the contact form

The form currently validates on the client only (see `initContactForm()` in `script.js`) — no messages are sent anywhere yet. To make it functional without a custom backend, pick one:

- **[Formspree](https://formspree.io/)** — add `action="https://formspree.io/f/your-id"` and `method="POST"` to the `<form>`, remove the `preventDefault()` in `script.js`, or keep it and `fetch()` the endpoint instead.
- **[EmailJS](https://www.emailjs.com/)** — call their SDK inside the `submit` handler.
- **Vercel Serverless Function** — add an `/api/contact.js` function and `fetch('/api/contact', { method: 'POST', body: ... })` from the handler.

## 🌐 Browser support

Tested against the latest two versions of Chrome, Firefox, Safari, and Edge. Uses `backdrop-filter` (glassmorphism) and `color-mix()` — both are supported in all evergreen browsers as of 2026; add fallbacks if you need to support older browsers.

## 📄 License

Personal project — feel free to fork and adapt for your own portfolio.
