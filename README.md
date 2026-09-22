# OntoGuard AI — Public Website

**Decision Authorization for Agentic AI**

This repository contains the public static website for **OntoGuard AI** (`ontoguard.ai`).

It is a public-facing marketing, proof, research, and technical-diligence surface. It **does not contain the OntoGuard Headless Decision Authorization Runtime source code, proprietary decision logic, private schemas, signing material, customer configuration, or other protected implementation details**.

## Current public product model

OntoGuard evaluates an exact proposed AI action before protected execution and returns one of three authorization states:

- **ALLOW**
- **BLOCK**
- **ESCALATE**

A prior authorization does not silently carry over to a materially changed action.

The website also describes the current **Headless Decision Authorization Runtime** and public-safe decision/consequence evidence. Product and evidence version numbers are separate namespaces; use the live site as the authoritative source for current release and proof claims.

## Main public surfaces

- `index.html` — homepage
- `headless-decision-authorization-runtime.html` — headless runtime
- `agentrust-decision-authorization-integration.html` — AgenTrust integration
- `financial-services-ai-decision-authorization.html` — financial-services proof
- `cybersecurity-ai-decision-authorization.html` — cybersecurity solution
- `cybersecurity-ai-decision-authorization-proof.html` — cybersecurity proof
- `deep-diligence-appendix.html` — public technical diligence
- `resources.html` — public resources, research, video, and evidence
- `proof-explorer/` — public-safe interactive proof
- `assets/` — public PDFs, images, and evidence artifacts
- `videos/` — public product video and captions
- `sitemap.xml` — indexable URL inventory
- `robots.txt` — crawler directives
- `_redirects` — legacy URL redirects
- `_headers` — hosting/security headers

## Public-evidence policy

Only material explicitly intended for anonymous public disclosure should be committed to this repository.

Do **not** commit:

- OntoGuard runtime/backend source code
- private or customer-specific JSON
- raw prompts or model outputs
- credentials, API keys, certificates, or private keys
- private decision/run identifiers or internal hashes
- proprietary thresholds, scoring logic, or algorithm details
- customer route topology or enforcement configuration
- internal technical-diligence packages not approved for public release

## Deployment

The site is static and should be deployed from the website root.

Before production deployment:

1. Verify all local links, fragments, and redirect destinations.
2. Validate every JSON-LD block.
3. Validate `sitemap.xml` against the set of indexable pages.
4. Verify the public evidence and Proof Explorer checksum manifests.
5. Confirm the current product video, poster, captions, and transcript are synchronized.
6. Test the contact form end-to-end.
7. Verify production security/crawler headers.
8. Crawl the deployed domain for HTTP 404/500 responses and redirect loops.
9. Submit the sitemap and important changed URLs to search engines after material releases.

## Structured data

Structured data is maintained **inline on the relevant HTML pages** so that each page can describe its own current content accurately.

There is intentionally **no standalone `schema.json` file** in the production website.

## Repository note

This README is repository/deployment documentation only. It is not the canonical source for product claims, proof status, release maturity, or deployment assurances. Those should remain synchronized with the current public website and approved evidence.
