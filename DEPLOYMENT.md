# Deployment Guide

This project is a static website. It can be hosted on Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any static web host.

## Files To Deploy

Include these active runtime files and folders:

```text
index.html
invitation.html
styles.css
script.js
assets/
README.md
```

`server.mjs` is only for local testing and is not required for hosting.

## Recommended: Netlify Drop

1. Open `https://app.netlify.com/drop`
2. Log in or create a Netlify account.
3. Drag the full project folder into the upload area.
4. Wait for upload.
5. Netlify gives you a live URL.

If Netlify asks for build settings:

```text
Build command: leave empty
Publish directory: .
```

## Vercel

Use these settings:

```text
Framework Preset: Other
Build Command: leave empty
Output Directory: .
```

## GitHub Pages

1. Upload the project files to a GitHub repository.
2. Open repository `Settings`.
3. Go to `Pages`.
4. Choose:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

## Local Test Before Deploy

```powershell
cd D:\Invitation
node server.mjs
```

Open:

```text
http://127.0.0.1:4173/
http://127.0.0.1:4173/invitation.html
```

## Before Deploy Checklist

- Homepage opens correctly.
- `បើកធៀប` opens `invitation.html`.
- Gallery images load from `assets/photo-1.png` to `assets/photo-6.png`.
- QR code loads from `assets/qr.png`.
- `styles.css` loads correctly.
- Website works on phone and desktop.
- File and folder names are lowercase/case-correct.

## Custom Domain

1. Buy a domain.
2. Add the domain in your hosting dashboard.
3. Copy the DNS records shown by the host.
4. Add those records in your domain provider dashboard.
5. Wait for DNS propagation.
6. Enable HTTPS/SSL if it is not automatic.
