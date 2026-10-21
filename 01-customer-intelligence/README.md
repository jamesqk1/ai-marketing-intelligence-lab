# 01 Customer Intelligence

A weekly pipeline that turns public customer feedback into a one-page, evidence-backed brief a Marketing Director can act on each Monday.

**Test case:** a US sweepstakes casino brand and two competitors (anonymised here as Focal Brand, Competitor A and Competitor B). Public data only.

## The job

In every marketing team I've led, someone spent hours a week reading reviews to spot problems and competitor weaknesses. It was slow, inconsistent and rarely reached the people who could act. The goal was a working end-to-end system in one week, not a set of prompts, with every claim traceable to its source.

- **Reader:** a Marketing Director (or Head of Growth / CRM lead) at a consumer brand with lots of public reviews.
- **Decisions it informs:** CRM and acquisition messaging; competitive positioning; escalations to Payments, Support or Product, with a named owner on every finding; tracked topics the reader sets.
- **Not for:** sentiment dashboards; welfare monitoring (welfare signals are routed to a separate review list and never appear in the brief).

## How it works every Monday

```
Collect ──► Clean ──► Label ──► Safeguard ──► Brief ──► Read & act
Apps Script   de-dupe,   AI tags      second AI pass   one page,     marketing reads
pulls App     strip      theme,       routes welfare   owner and     one page; labels
Store,        personal   sentiment,   signals away     evidence on   re-checked
Trustpilot,   data       severity     from marketing   every action  monthly
YouTube
```

Code does the routine; AI only labels and writes. Every brief passes checks in code before it's saved: every ID exists, every quote is verbatim, every count matches, no trend words, under 750 words.

## Results

| Measure | Result |
|---|---|
| Human time per week | about 4 hours by hand → about 5 minutes to read, plus a 15-minute monthly spot check |
| Feedback analysed | 5× more: 45 items by hand → 225 automated |
| Labelling speed | 90 seconds for 225 reviews; 45 took 1.5 hours by hand |
| Data cost | under 5 cents a week |
| Labelling accuracy | 5 of 5 targets met against my own blind labels, after one rewrite of the guide. On disagreements, the AI was right 10 times out of 13 |
| Brief quality (rubric, out of 5; pass 4.0) | run 1 3.8 → run 2 4.4 → run 3 3.6 (first automated) → run 4 4.4 (one scored fix) |
| Reader feedback | a CMO in the category said he'd want it weekly and preferred the one-page format |
| Bias check | I assumed payouts were the brand's top complaint. The data said game fairness |

## What I learned

- **Measure before you automate.** The manual baseline caught my own bias. Clear definitions lifted accuracy more than a bigger model.
- **Data access is the bottleneck.** Reddit declined my API application. I designed around it and state the gap in every brief.
- **Leaders want the summary.** Big brands own listening tools, but their CMOs don't read reviews. The value is the one page on top.

## Files

| Path | What it is |
|---|---|
| [collector/](collector/) | Google Apps Script collector (App Store and Trustpilot via DataForSEO, YouTube Data API; Reddit code kept but unused) |
| [prompts/classification-v3.md](prompts/classification-v3.md) | Labelling prompt, with the changes and retest results that led to v3 |
| [prompts/brief-v5.md](prompts/brief-v5.md) | Brief-writing prompt |
| [runbook.md](runbook.md) | The steps the scheduled weekly run follows |

## Known limits

Thin evidence for brands with few reviews; no Reddit, Facebook groups or Discord; one competitor's Trustpilot volume is driven by its own review invitations, which affects comparisons.
