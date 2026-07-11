# Proof Explorer integration snippets

## Homepage / hero CTA

Add this as the primary proof-experience CTA without removing the current Risk Scan or Proof Hub destinations:

```html
<a class="btn btn-secondary" href="/proof-explorer/" onclick="trackClick('Explore Governed Decision CTA')">Explore a Governed Decision</a>
```

Recommended hero order:

1. Request an AI Output Risk Scan
2. Explore a Governed Decision
3. Inspect the Proof
4. Watch Product Video

## Proof Hub card

```html
<article class="card proof-explorer-card">
  <p class="eyebrow">Interactive proof</p>
  <h3>Explore a governed decision</h3>
  <p>Choose a controlled AI-proposed movement and inspect the Decision API result, release state, consequence proof, route maturity, and browser-verifiable packet.</p>
  <a class="text-link" href="/proof-explorer/">Open the Proof Explorer</a>
</article>
```

## Sitemap entry

```xml
<url>
  <loc>https://ontoguard.ai/proof-explorer/</loc>
  <lastmod>2026-07-12</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

## Schema graph entry

```json
{
  "@type": "WebApplication",
  "@id": "https://ontoguard.ai/proof-explorer/#application",
  "url": "https://ontoguard.ai/proof-explorer/",
  "name": "OntoGuard Governed Decision Proof Explorer",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "isAccessibleForFree": true,
  "description": "Interactive public-safe demonstration of OntoGuard Decision Authorization, release control, consequence proof, route maturity, and packet verification.",
  "provider": {"@id": "https://ontoguard.ai/#organization"}
}
```

## Analytics events emitted by the page

- `Proof Explorer Case Selected`
- `Proof Explorer Why Toggled`
- `Proof Explorer Batch Filter`
- `Proof Explorer Verification Completed`
- `Proof Explorer Verification Error`
- Existing download/open events through `data-track`
