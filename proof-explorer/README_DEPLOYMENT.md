# OntoGuard Proof Explorer — Deployment

## Purpose
This folder is the static, public-safe Proof Explorer for `https://ontoguard.ai/proof-explorer/`. It demonstrates the current accepted Goal 3 Decision Authorization product without exposing protected engine internals.

The release makes four boundaries explicit:

- Goal 3 code-now implementation: **COMPLETE (15 / 15)**.
- Current governed event: event-level Decision Authorization and no-bind/release proof.
- Controlled Full Seam: **PASS — `L4_ROUTE_ENFORCED` for the bounded controlled route**.
- Customer-production L5/non-bypassability: **not asserted without connected customer topology evidence**.

## Release sources
`proof-explorer-data.json` is a public-safe fallback derived from the latest accepted strict-six artifacts at release time:

- accepted single: `83b5bdd9-7b5f-40c1-9e34-75573e0aac54`
- accepted batch: `corr_batch_eb331c8dd974`
- fallback schema: `ontoguard.proof_explorer@2.1.0`

The fallback contains bounded projections of R7 Intent Horizon, Governing Basis Continuity, Retrieval Source Authority, Tool Capability Authority, Evidence Custody, External Runtime-State Attestation, Consequence Custody, Semantic Curvature, Governance Spectrum, event/fixture maturity, and per-case batch R7 posture. Raw embeddings, prompt chains, private scoring weights and customer data are not exported.

## Runtime precedence
The data-authority order is:

1. current deployed public proof manifest and same-version public assets;
2. normalized runtime object created from those assets;
3. packaged `proof-explorer-data.json` only when the public assets cannot load.

A successfully loaded current public packet always wins over fallback values.

## Files

- `index.html` — existing page architecture and four workspaces
- `proof-explorer.css` — existing page-specific responsive styling plus compact capability rows
- `proof-explorer.js` — runtime loader, canonical normalization, rendering, batch view and browser verifier
- `proof-explorer-data.json` — public-safe fallback
- `INTEGRATION_SNIPPETS.md` — existing root-site integration references
- `CHECKSUMS.sha256` — six-member release integrity contract

## Existing public dependencies
The Explorer continues to use the existing `/assets/boundary-proof-kit/` manifest, buyer JSON, receipt, seam summary, semantic-projection summary, public PDFs and proof ZIP at their unchanged paths.

## Hard truth boundaries

- The Decision API is the sole authority for `ALLOW`, `BLOCK`, and `ESCALATE`.
- R7 is pre-decision and decision-driving; R7 is not Semantic Curvature.
- R7 uses semantic distance to one immutable original intent; high distance alone does not automatically create `BLOCK`.
- Source availability is not Source Authority.
- Tool availability is not Capability Authority.
- Provenance, integrity and custody remain distinct.
- External runtime-state attestation is bounded context, not an authorization engine or proof of an upstream scientific claim.
- Current event maturity is separate from controlled-fixture maturity.
- Controlled Full-Seam L4 does not establish customer-production L5.
- Semantic Curvature requires comparable longitudinal history; controlled batch membership is not longitudinal history.
- Learning output remains review-gated; a pending candidate is not model training and no live weight mutation occurs.

## Release refresh procedure

1. Identify the accepted single strict-six packet.
2. Identify the accepted batch strict-six packet.
3. Confirm the acceptance/harness state required for the release.
4. Rebuild only the public-safe fallback from those accepted packet bytes.
5. Test runtime normalization against the current public artifact shape.
6. Run browser-side integrity/parity verification.
7. Regenerate `CHECKSUMS.sha256` after all six bound members reach final bytes.
8. Run `sha256sum -c CHECKSUMS.sha256` and require 6/6 OK.
9. Deploy the seven-file Explorer directory without renaming files or routes.

## Browser verifier scope
The browser verifier checks the public manifest, listed SHA-256 values, Decision API parity, release parity and no-bind parity. When public artifacts expose the necessary fields, it additionally checks event maturity, controlled-fixture maturity, R7 status/threshold, governing-basis identity and Consequence Custody status. Optional absent fields are shown as `NOT PRESENT`, not as fabricated passes.

This browser check is not the complete independent OntoGuard DAP verification harness and is not an external digital signature.
