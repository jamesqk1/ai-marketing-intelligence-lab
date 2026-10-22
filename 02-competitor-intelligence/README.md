# 02 Competitor Intelligence

Workflow 01 automated a job. Workflow 02 delegated a goal: an AI agent that decides where to look, which competitor changes matter, and what one brand's marketing lead should respond to each Monday.

**Test case:** six Australian crypto exchanges, anonymised here as the **Lens Brand** (the brand the brief is written for) and **Exchanges A to E**. Public data only, every fact traced to the company that owns it.

## The job

Competitor tracking at a crypto exchange meant someone checking six websites, help centres and the news every week. It was manual, patchy, and the first thing dropped when things got busy. The goal was to go a step past a fixed pipeline: give an AI a goal, tools and a budget, and let it choose where to look.

- **Reader:** the Marketing Director at one brand in the market (the lens brand is a setting).
- **Decisions it informs:** whether to match, counter or ignore a competitor's offer or price change; positioning against competitors' product moves; claims affected by regulatory change; what to watch next.
- **Not for:** ads monitoring, social listening on X, offers that need an account, market share estimates.

## The agent's loop every Monday

```
Observe ──► Detect ──► Decide ──► Investigate ──► Verify ──► Brief
fixed watch   compare     triage each   chooses its own   press finds    450 words for
list: offers, with last   change with   searches to       leads; only    the marketing
fees,         week's      rules from    follow leads,     the owner's    lead; 15-minute
products,     snapshot    my own calls  within 100 calls  own page is    human review
sponsors,                                                 proof
regulation
```

I did it by hand first (3 hours: 49 facts and 47 dated changes, each triaged), locked 9 targets before any AI output, then ran the agent five times and scored every run against my answer key.

## Results: an honest fail

| Measure | Result |
|---|---|
| Time | 3 hours by hand → about 22 minutes per agent run, plus a 15-minute review |
| Planted changes caught | 3 of 3 (seeded-change test) |
| False alarms escalated to the brief | 0 across all scored runs |
| Same-day consistency | 95% of facts matched across two runs |
| Fact accuracy | 98% |
| Brief quality (rubric, out of 5; pass 4.0) | 3.8 → 3.6 → **4.2** after one scored rewrite |
| **Facts found (recall)** | **53–67%, against a target of 80%. Fail** |
| **Material changes detected** | **26–28%, against a target of 80%. Fail** |

**Why it failed:** 23 of the 42 material changes sat on X or on one exchange's script-built website: places no public-web agent can read. Of the changes it could reach, it found about half. Access sets the ceiling; search method is the next fix.

**Bias check:** from memory, I said rivals were racing on promotions. The data said product: leverage and derivatives, stocks and tokenised equities, crypto-backed lending, SMSF access.

Full results: [evaluation/scorecard.md](evaluation/scorecard.md).

## What I learned

- **Delegate the goal, keep the judgement.** The agent chose its own path, but triage rules written from my own calls kept it calibrated: no false alarms in any run.
- **Data access is the ceiling, again.** Half the market's moves were on X or behind scripts. Workflow 01 hit the same wall with Reddit.
- **Score it honestly.** Locked targets made the fail visible. The agent also caught three errors in my own answer key.

## Files

| Path | What it is |
|---|---|
| [prompts/agent-brief-v3.md](prompts/agent-brief-v3.md) | The full brief the agent receives: goal, ground rules, watch list, source ownership, triage rules, output format and weekly mode |
| [runbook.md](runbook.md) | The steps the scheduled weekly run follows, and my 15-minute review |
| [evaluation/targets-and-definitions.md](evaluation/targets-and-definitions.md) | The 13 measures locked before any AI output, and the definitions behind them |
| [evaluation/scorecard.md](evaluation/scorecard.md) | Every v0.1 run scored, the verdict and the overfitting note |

There's no code to run here: the agent is a brief plus a scheduled Claude task, and its outputs go to a private Google Sheet and Drive folder.

## Status

Running weekly since 19 October 2026 as a v0.2 trial. Next: test a real browser for the script-built site, and work out why the agent misses half of the changes it can reach.
