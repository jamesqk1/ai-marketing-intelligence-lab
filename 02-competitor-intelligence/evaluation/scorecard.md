# Scorecard: v0.1 runs (14 to 16 October 2026)

Every run used Claude Opus as a separate agent with web search and page reading only, and was scored against the private answer key. The verdict is mine.

| Run | Brief | Calls / minutes | Accuracy | Recall (of 49 facts) | Material changes detected | False escalations | Triage agreement | Brief rubric |
|---|---|---|---|---|---|---|---|---|
| Run 1 | v1 | 91 / 21.4 | Pass: 48 of 48 judged rows | Fail: 63–69% | Fail: 10 of 42 (24%); 10 of 19 reachable | 0 | Fail: 7 of 9 (78%) | Fail: 3.8 |
| Run 2a | v2 | 89 / 13.0 | Pass: 47 of 48 (98%) | Fail: 63–76% | Fail: 11 of 42 (26%); 10 of 19 reachable | 0 | Pass: 9 of 11 (82%) | Fail: 3.6 |
| Seeded test | v3 weekly | 85 / 21.9 | Pass | n/a | Pass: 3 of 3 planted changes | 0 | 1 to 2 of 3 | not scored |
| Run 3a | v3 | 87 / 23.1 | Pass | Fail: 53–65% | Fail: 12 of 43 (28%); 11 of 20 reachable | 0 | Fail: 8 of 11 (73%) | Pass: 4.2 |
| Run 3b | v3 | 88 / 22.1 | Pass: 1 error | Fail: 59–67% | Fail: 11 of 43 (26%); 10 of 20 reachable | 0 | Pass: 10 of 11 (91%) | not scored |

**Consistency (runs 3a and 3b, same day):** 36 of 38 comparable facts agree (95%). Pass.

**Gates:** sourcing passed in every run. Fact-vs-inference labelling failed in run 1 (headline and three Monitor lines unlabelled) and passed from run 2a. Budget held in every run.

**Discovery and investigation:** passed in every scored run. Discoveries outside the watch list included licence status as a trust gap after ASIC's 30 September deadline, and a competitor's leadership change.

## Verdict (16 October 2026)

**Fail on the locked targets.** Fact recall and material changes detected miss 80% in every run. Everything else passes, including the brief rubric (4.2 on v3) and same-day consistency (95%).

Why it failed:
- **Access:** 23 of the 42 material changes were only on X or on one exchange's script-built main site, which no public-web agent can read.
- **Method:** of the changes it could reach, the agent found 50% to 55%.

What the seeded test showed: given last week's snapshot, the agent caught all three planted material changes, marked the cosmetic ones as cosmetic, and flagged one planted value as a snapshot error, correctly: the exchange's own notice showed the fee had been in place for months.

**Decision:** weekly runs started on 19 October as a v0.2 trial, to build week-on-week evidence while access and search method are worked on.

## Overfitting note

Brief v2's search keywords came from run 1's misses against the answer key, and v3's seeds from run 2a's. So later change-detection scores partly reflect teaching to the test. The seeded-change test and the weekly runs are the out-of-sample checks.
