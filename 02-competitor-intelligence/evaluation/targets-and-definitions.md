# Targets and definitions

Locked on 12 October 2026, before any AI output, and not changed since. The answer key behind them (49 facts and 47 dated changes, each triaged by hand) is kept private.

## Targets

| # | Measure | Target | Type |
|---|---|---|---|
| 1 | Fact accuracy | At least 95% of facts the agent states are correct | Target |
| 2 | Sourcing | 100% of facts carry a source URL and date seen | Hard gate |
| 3 | Fact recall | At least 80% of answer-key facts found, including the sign-up offer, trading fee and AUD deposit methods for every brand | Target |
| 4 | Material changes detected | At least 80% of material changes (real and seeded) | Target |
| 5 | False escalations | No more than 1 per run (a cosmetic or irrelevant change put in Brief) | Target |
| 6 | Triage agreement | At least 80% of changes put in the same bucket as me | Target |
| 7 | Fact versus inference | 100% of claims in the brief labelled as fact or inference | Hard gate |
| 8 | Discovery outside the watch list | At least 1 finding outside the watch list that I judge relevant, with its investigation steps in the log | Target |
| 9 | Investigation | At least 1 lead followed from anomaly to hypothesis, check and conclusion | Target |
| 10 | Consistency | Two runs on the same day agree on at least 90% of key facts | Target |
| 11 | Brief quality | Rubric average at least 4.0 (coverage, prioritisation, actionability, insight, calibration); every finding names a brand and an owner | Target |
| 12 | Budget | Within about 100 tool calls and 30 minutes, with every step logged | Hard gate |
| 13 | Time saved | Recorded only: manual time against agent time plus review time | Measure |

## Watch list

| ID | Group | Fact | What to record | Window |
|---|---|---|---|---|
| F1 | Offers | Sign-up offer | New-customer reward, conditions, end date | As of run date |
| F2 | Offers | Referral offer | Reward for referrer and for friend, conditions | As of run date |
| F3 | Offers | Current promotions or campaigns | Name, mechanic and dates | Live now or started in the last 30 days |
| F4 | Offers | Sponsorships and events | Partnerships, ambassadors; partner and date announced | Active or announced in the last 90 days |
| F5 | Pricing | Trading fee | Instant buy fee or spread disclosure, and order-book maker and taker fees at the base tier | As of run date |
| F6 | Pricing | AUD deposit methods and fees | Each method with its fee and any stated limit | As of run date |
| F7 | Product | New listings | Coins or tokens added; count and notable names | Last 30 days |
| F8 | Product | New products | New products or features; name and launch date | Last 30 days |
| M1 | Market | Regulatory and licensing | Regulator, court or industry news that affects the basket | Last 30 days |

## Triage buckets

| Bucket | Use when |
|---|---|
| Brief | Material and verified; the lens brand's Marketing Director should know this week |
| Investigate | Possibly material but the evidence is incomplete; needs more sources before a call |
| Monitor | Could matter if it continues or spreads to other brands; record it and check next week |
| Ignore | No effect on acquisition, retention or positioning: a cosmetic edit, a routine minor listing, or a wording change with no change in terms |

The triage rules in the [agent brief](../prompts/agent-brief-v3.md) were written from the reasons I gave when triaging the 47 baseline changes by hand: new product categories go to Brief; offer or terms changes we can't see go to Investigate; listings, campaigns and sponsorship activations go to Monitor; out-of-market or routine content goes to Ignore.

## Material or cosmetic

- **Material:** changes what a customer gets, pays or can do, or how the brand positions itself.
- **Cosmetic:** changes wording, design or layout with no change in terms or positioning.

## Evidence strength (the source-ownership rule)

- **Strong:** the owner source plus an independent confirmation.
- **Moderate:** the owner source alone (the exchange's own site, help centre or terms; the regulator for regulatory news).
- **Weak:** non-owner sources only (press, comparison sites, search snippets), however many; or an inference. **Weak never reaches Brief:** it goes to Investigate, tagged "Brief if confirmed", with the exact human check.

## Fact or inference

- **Fact:** observed on a source and linked to it.
- **Inference:** a conclusion drawn from facts; must name the facts it rests on.

## Definitions agreed after run 1

- **Memberships:** paid memberships and rewards hubs go under F3 as "always-on", after live time-limited promotions.
- **Non-crypto listings:** stock CFDs, tokenised stocks and TradFi perpetuals go under F7 as "non-crypto listings", separate from the coin count.
- **Global announcements:** recorded as "global; AU availability unconfirmed", not counted as Australian unless an Australian page or entity confirms.
- **Lens brand:** its own changes are context: recorded, at most Monitor, never a finding on their own.
- **Personalised pages:** record what was seen, flag "possibly personalised", list every version; never resolve by guessing.
