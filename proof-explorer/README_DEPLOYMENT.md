# OntoGuard Proof Explorer — Deployment

## Purpose
This folder is a static, public-safe interactive proof experience for `https://ontoguard.ai/proof-explorer/`.

It demonstrates the execution product, not protected engine internals:

- attempted AI-driven movement;
- authoritative `ALLOW / BLOCK / ESCALATE` result;
- release authorization and routing;
- eight-stage Governed Event Lifecycle;
- consequence/no-bind proof;
- controlled batch decision distribution;
- browser-side SHA-256 verification of the public packet;
- decision, release-status, and no-bind parity between public buyer JSON and decision receipt.

## Files

- `index.html` — deploy at `/proof-explorer/index.html`
- `proof-explorer.css` — page-specific responsive styling
- `proof-explorer.js` — case explorer, charts, analytics events, and browser verification
- `proof-explorer-data.json` — public-safe fallback data derived from current controlled outputs
- `INTEGRATION_SNIPPETS.md` — homepage CTA, sitemap, and schema additions

## Existing root-site dependencies

The page intentionally reuses these existing public paths:

- `/assets/Brand.png`
- `/favicon.ico`
- `/assets/boundary-proof-kit/buyer_portable.governance.public_sanitized.json`
- `/assets/boundary-proof-kit/governance.public_sanitized.pdf`
- `/assets/boundary-proof-kit/governance.sellable_lite.public_sanitized.pdf`
- `/assets/boundary-proof-kit/decision_receipt.public_sanitized.json`
- `/assets/boundary-proof-kit/artifact_manifest.public_sanitized.json`
- `/assets/boundary-proof-kit/controlled_runtime_seam_summary.public_sanitized.json`
- `/assets/boundary-proof-kit/semantic_projection_summary.public_sanitized.json`
- `/assets/boundary-proof-kit/OntoGuard_Boundary_Proof_Kit_Public_Sanitized.zip`

Do not rename those production assets unless every reference is updated.

## Deploy

1. Copy this entire directory to the website root as `/proof-explorer/`.
2. Preserve all filenames exactly.
3. Add the homepage and Proof Hub CTA from `INTEGRATION_SNIPPETS.md`.
4. Add the sitemap entry.
5. Deploy and purge the Cloudflare cache for `/proof-explorer/*`.
6. Open the direct URL in a private browser window.
7. Run `Run public packet verification` and confirm the current public manifest hashes match the files actually deployed.

## Truth and IP boundaries

Keep these claims unchanged:

- controlled event-level/no-bind proof is available;
- production L5 route completeness and non-bypassability require customer integration evidence;
- examples are synthetic/public-safe and contain no customer data;
- no live model training, weight update, ontology mutation, or policy mutation is claimed;
- hash verification is not an external digital signature;
- use the exact patent-application language already shown on the page.

## Updating the explorer

The page attempts to load current public summary JSON from `/assets/boundary-proof-kit/` at runtime. `proof-explorer-data.json` is only the fallback. When public proof assets are replaced at the same paths, the verification panel automatically uses the new manifest and hashes.
