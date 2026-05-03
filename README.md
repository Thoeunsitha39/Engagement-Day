# Khmer Engagement Invitation Website

This project is a two-page static engagement invitation website.

- `index.html` is the cover page.
- `invitation.html` is the opened invitation page.
- `styles.css` is the single shared stylesheet for both pages.
- `script.js` handles the cover transition, countdown timer, and gallery lightbox.
- `server.mjs` is only for local preview.

## Run Locally

```powershell
cd D:\Invitation
node server.mjs
```

Open:

```text
http://127.0.0.1:4173/
```

## Active Runtime Files

```text
index.html
invitation.html
styles.css
script.js
server.mjs
assets/images/khmer-invitation-bg.png
assets/photo-1.png
assets/photo-2.png
assets/photo-3.png
assets/photo-4.png
assets/photo-5.png
assets/photo-6.png
assets/qr.png
```

## Change Cover Image

Replace:

```text
assets/images/khmer-invitation-bg.png
```

Keep the same filename so `styles.css` loads it automatically.

## Change Gallery Photos

Replace:

```text
assets/photo-1.png
assets/photo-2.png
assets/photo-3.png
assets/photo-4.png
assets/photo-5.png
assets/photo-6.png
```

Keep the same filenames.

## Change QR Code

Replace:

```text
assets/qr.png
```

## Edit Text

Open:

- Cover text: `index.html`
- Invitation details: `invitation.html`

Search for the Khmer text you want to edit.

## Notes

- The project no longer needs Tailwind build files.
- The project uses one CSS file: `styles.css`.
- If changes do not show, press `Ctrl + F5` in the browser.
