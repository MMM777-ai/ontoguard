# OntoGuard Boundary Proof Kit - Public Sanitized v4

Protected by U.S. Patent Application 19/444,521 - Track I prioritized examination granted May 2026.

## What this kit is

This is a public-safe proof kit for OntoGuard's current maturity surface. It is designed for website posting, GTM conversations, partner diligence, buyer education, and early technical review without disclosing source code, protected implementation logic, private ontology internals, raw legal registries, scoring formulas, or customer data.

OntoGuard is not presented here as generic AI governance software. The kit demonstrates four connected commercial wedges:

1. **AI Output Risk Scan** - identify risky, unsupported, review-heavy, overconfident, or inadmissible AI outputs before they enter a business workflow.
2. **Runtime Decision Authorization** - determine ALLOW, BLOCK, or ESCALATE before consequence.
3. **Execution Boundary + No-Bind Proof** - prove what the AI attempted to move, what was refused or routed, and whether a protected downstream effect formed.
4. **Strict-Six / Batch DAP proof** - package single-event or controlled-corridor batch proof into buyer-readable and machine-readable artifacts.

## What the current proof surface shows

### Single-event execution-boundary proof

- Attempted movement: `AI_OUTPUT_RELEASE`
- Control point: `DIRECT_BACKEND_GOVERNANCE`
- Gate mode: `SHADOW_MODE`
- Decision: `ESCALATE`
- Release authorized: `False`
- Release status: `WITHHELD_PENDING_REVIEW`
- Routed to: `HUMAN_REVIEW`
- Refused operation: `AUTONOMOUS_OUTPUT_RELEASE`
- Authorization token issued: `False`
- Downstream commit status: `NOT_COMMITTED`
- Protected effect formed: `False`
- No-bind status: `NO_PROTECTED_EFFECT_FORMED`
- Public maturity label: `L1+ event-governed no-bind proof`
- Raw route maturity level: `L1_PLUS_EVENT_GOVERNED_NO_BIND_PARTIAL`
- Production enforcement asserted: `False`

### Batch DAP / Controlled Corridor Mode

- Batch ID: `corr_batch_e4ea21a3a007`
- Aggregate action: `BLOCK`
- Case count: `4`
- Case roll-up: `1` ALLOW / `1` BLOCK / `2` ESCALATE
- Release status: `WITHHELD_PENDING_REVIEW`
- Route maturity level: `L1_PLUS_EVENT_GOVERNED_NO_BIND_PARTIAL`
- Production enforcement asserted: `False`

## What is new in v4

v4 updates the public kit to reflect the current maturity and the updated website framing:

- Semantic Control Plane / runtime authorization of proposed AI-driven state transitions.
- Execution Boundary + No-Bind Proof as the central proof surface.
- Public label corrected to event-level / L1+ no-bind proof where production route evidence is not attached.
- Strict-six offline audit credential elevated as a buyer-facing proof asset.
- Batch Decision Authorization Packet / Controlled Corridor Mode added as a first-class working capability.
- ROI KPI framework added with Opex Takeout, Loss Prevention, Working Capital, measured_run_values, and baseline-required hard-dollar calculations.
- Runtime-safe training-signal export clarified as review-gated and non-mutating.

## Important boundaries

This kit intentionally does not claim production L5 non-bypassability. Production L5 requires customer route integration, endpoint token checks, fail-closed production topology, replay records, bypass-attempt logs, and outcome closure.

This kit also does not claim hard-dollar ROI without buyer baselines. OntoGuard provides measured_run_values and KPI buckets; buyer-supplied assumptions are required for dollar calculations.

This kit does not claim live model-weight mutation, production memory-write enforcement, production tool-call enforcement, or customer-specific multi-agent handoff enforcement without integration evidence.

## File guide

- `governance.public_sanitized.pdf` - primary buyer-facing proof brief.
- `one_page_refusal_escalation_receipt.public_sanitized.pdf` - one-page receipt showing refusal/no-bind proof.
- `ontoguard-layer-facts.pdf` - public Layer Facts Brief explaining OntoGuard layers safely.
- `buyer_portable.governance.public_sanitized.json` - buyer-readable machine summary of current maturity and selected proof surfaces.
- `controlled_runtime_seam_summary.public_sanitized.json` - legacy filename retained; content now reflects Execution Boundary + No-Bind Proof.
- `semantic_projection_summary.public_sanitized.json` - read-only semantic projection and coherent governance loading summary.
- `decision_receipt.public_sanitized.json` - decision/no-bind receipt summary.
- `full_audit.governance.public_sanitized_summary.json` - public-safe summary of the full audit posture.
- `artifact_manifest.public_sanitized.json` - manifest for the strict-six public-safe governance package.
- `governance.public_sanitized.zip` - inner public-safe strict-six governance package.
- `boundary_proof_kit_manifest.public_sanitized.json` - outer kit manifest and checksum list.

## Buyer reading order

1. `governance.sellable_lite.public_sanitized.pdf`
2. `one_page_refusal_escalation_receipt.public_sanitized.pdf`
3. `governance.public_sanitized.pdf`
4. `ontoguard-layer-facts.pdf`
5. `buyer_portable.governance.public_sanitized.json`
6. `controlled_runtime_seam_summary.public_sanitized.json`
7. `semantic_projection_summary.public_sanitized.json`

## Source run references

- Single-event source trace: `678a7599-4cc3-4112-9818-0831673ba270`
- Batch source: `corr_batch_e4ea21a3a007`
- Generated for public replacement: `2026-07-07T20:30:05Z`
