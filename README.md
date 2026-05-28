# Bluepen Website

Static website voor Bluepen ramen en deuren.

## Lokaal bekijken

Open `index.html` direct in de browser, of gebruik:

```bash
npm start
```

## Deployen op Vercel

1. Upload/push deze map naar GitHub.
2. Maak een nieuw project aan in Vercel.
3. Kies deze repository en gebruik deze instellingen:
   - Framework Preset: `Other`
   - Build Command: leeg laten of `npm run build`
   - Output Directory: `.`
4. Klik op Deploy.

De `vercel.json` zorgt ervoor dat alle routes terugvallen op `index.html`.
