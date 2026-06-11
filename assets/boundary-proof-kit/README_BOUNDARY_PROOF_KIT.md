# OntoGuard Boundary Proof Kit - Public Sanitized Demo

This kit is a public-facing, sanitized proof surface for the OntoGuard Boundary Proof Demo.
It is designed to show boundary behavior without releasing protected OntoGuard implementation logic.

## What this kit demonstrates

- A plausible high-stakes AI output is evaluated before release.
- OntoGuard returns `ESCALATE` rather than allowing autonomous release.
- The business effect is `WITHHELD_PENDING_REVIEW`.
- A Decision Authorization Packet and related artifacts are generated.
- Public proof is shown through artifacts, not source code disclosure.

## Scenario

- Scenario ID: `PUBLIC-DEMO-CLAIMS-ESCALATE-001`
- Industry: Insurance
- Workflow: Claims adjudication
- Decision: ESCALATE
- Release authorized: false
- Routed to: HUMAN_REVIEW

## Files

- `buyer_portable.governance.public_sanitized.json` - buyer-facing sanitized JSON proof artifact.
- `governance.public_sanitized.pdf` - buyer-readable governance packet.
- `decision_receipt.public_sanitized.json` - compact decision receipt.
- `artifact_manifest.public_sanitized.json` - file integrity and package manifest.
- `governance.public_sanitized.zip` - bundled governance package.
- `one_page_refusal_escalation_receipt.public_sanitized.pdf` - one-page refusal/escalation receipt.

## What is intentionally not included

- Source code
- Semantic routing internals
- Proprietary scoring formulas
- Private ontology mappings
- Raw legal citation maps
- Runtime deployment configuration
- Real customer, patient, claim, insurer, or provider data

## Intended public message

The market does not need OntoGuard source code to see the proof surface.
The proof surface is the running behavior, verdict, refusal/escalation receipt, packet, and portable artifacts.
