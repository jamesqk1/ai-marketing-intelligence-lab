# AI Marketing Intelligence Lab

A series of AI workflows that turn public customer, competitor and market signals into decision-ready intelligence for marketing leaders. Built and tested by James Quinn-Kumar, a marketing leader, to rebuild real marketing jobs with AI and measure whether they hold up.

## The method

Every workflow follows the same evaluation-first method:

1. **Do the job by hand first.** Time it, and write down what I expect to find before looking, to catch my own bias.
2. **Build an answer key** from the manual work.
3. **Lock the targets before any AI output.** Accuracy, coverage, quality and time, written down and never moved.
4. **Run the AI and score every run** against the answer key and a written rubric. Settle disagreements one by one; sometimes the AI is right.
5. **Automate only what passes,** and report what doesn't.

## The workflows

| | Workflow | What it does | Result |
|---|---|---|---|
| 01 | [Customer Intelligence](01-customer-intelligence/) | A weekly pipeline: collects public reviews, labels them with AI, and writes a one-page brief with an owner and evidence on every finding | Passed. About 4 hours a week by hand → 5 minutes to read. Labelling targets 5 of 5; brief rubric 4.4 |
| 02 | [Competitor Intelligence](02-competitor-intelligence/) | An AI agent given a goal, tools and a budget: it decides where to look, which competitor changes matter, and writes a short weekly brief | Failed the locked targets on recall and change detection, mainly on data access. 3 hours → 22 minutes; no false alarms; rubric 4.2 |

**Workflow 01 automated a job. Workflow 02 delegated a goal.**

## Repository layout

```
01-customer-intelligence/
  collector/          Google Apps Script collector (App Store, Trustpilot, YouTube)
  prompts/            labelling and brief prompts
  runbook.md          the weekly run, step by step
02-competitor-intelligence/
  prompts/            the agent brief
  evaluation/         locked targets, definitions and the scorecard
  runbook.md          the weekly run and the human review
```

## Anonymised

Brand names are replaced with placeholders throughout: Focal Brand and Competitors A and B in workflow 01; the Lens Brand and Exchanges A to E in workflow 02. Answer keys, labelled data and briefs stay private. Secrets are never stored in code: the collector reads them from Apps Script properties.

## Guardrails

Public data only; no logins, scrapers that break site terms, or personal data. AI outputs are reviewed by a person before anything leaves the private workspace, and any competitive claim used externally needs Compliance review. Player-welfare signals in workflow 01 are routed away from marketing and never quoted.

A personal, non-commercial project.
