# Runbook: weekly run

Followed every Monday at 6:56am Sydney time by a scheduled Claude task. Version 1, written 16 October 2026 for the v0.2 trial. Private file IDs and brand names have been removed from this public copy.

**Status.** On 16 October, v0.1 failed the locked targets on fact recall and material changes detected. It passed the gates, accuracy, false escalations, discovery, investigation, consistency (95%) and the brief rubric (4.2). Weekly runs started anyway, as a v0.2 trial, to build week-on-week evidence while access is worked on. Every weekly brief is unreviewed until I've scored it.

## Part A. What happens each Monday

- The scheduled task starts a fresh Claude session and follows Part B. The run takes about 30 to 45 minutes: about 25 for the agent, plus writing the results.
- It produces:
  - a brief, as a Google Doc in the workflow's Drive folder
  - the full agent output, as a second Google Doc
  - new rows in four workbook tabs: Agent log, Weekly changes, Weekly snapshot (replaced) and Scorecard (one row)
- Nothing is sent, posted or shared outside Drive.
- I review the brief on Monday (Part C, about 15 minutes).

## Part B. Steps for the scheduled run

**Ground rules for the whole run.** Public web pages only: no logins, sign-ups, forms or purchases. Do not send, post, email or share anything, and do not change sharing on any file. In the workbook, read only the Weekly prompt and Weekly snapshot tabs, and write only to Agent log, Weekly changes, Weekly snapshot and Scorecard. **Do not open any other tab: they hold the answer key and my judgements, and the run must stay independent of them.** Do not edit any prompt. If a step fails, record what failed and carry on with the steps that can still run. Never fill a gap with a guessed value.

### B1. Work out the dates

Today's date in Australia/Sydney is the run date. Work out, in code (Python datetime), not by hand: RUN_DATE ("Monday 19 October 2026"), RUN_DATE_SHORT ("19 October 2026"), WINDOW_START (run date minus 90 days), D30_START (run date minus 30 days) and ISO_DATE ("2026-10-19").

### B2. Read the prompt and last week's snapshot

1. Read the Weekly prompt tab: its rows are the prompt parts, in order (the [agent brief v3](prompts/agent-brief-v3.md) plus weekly mode, with {PLACEHOLDERS}).
2. Read the Weekly snapshot tab: one row per fact (snapshot date, ID, value, source URL(s), date seen, evidence, flags, status).
3. SNAP_DATE: the snapshot date of the first row. SNAPSHOT_ROWS: one line per row, "ID | value | source URL(s)".

### B3. Build the prompt

Join the prompt parts in order with one blank line between them, replace every placeholder, and check no {PLACEHOLDER} is left. Save the finished prompt next to the output path, for the record.

### B4. Run the agent

1. Note the start time.
2. Launch one agent: general-purpose, model Opus, in the foreground, prompt = the finished prompt. Add nothing to it.
3. When it replies, note the end time and the number of tool calls it reports.
4. Check the output file exists and has Parts 1 to 6. If not, launch the agent once more. If it fails again, record the failure in the Scorecard and finish.

### B5. Re-check pages the agent couldn't open

Background agents have sometimes been refused pages by an unanswered permission prompt, while the main session could read them.

1. In the step log, find every seed URL that was blocked by a permission prompt (not pages unreadable for other reasons, such as X or the script-built main site).
2. Read each once in the main session, 12 calls at most, counted separately from the agent's budget.
3. Compare what you see with that fact's snapshot value, using the agent's rule (what a customer gets, pays or can do is material; wording only is cosmetic).
4. Record the results in a "Main-session re-checks" section. Do not change the agent's brief.
5. Each difference becomes one row in Weekly changes, marked "main-session re-check (agent blocked)".

### B6. Check the output (no web calls)

1. **Sourcing gate:** every fact-table row has a source URL and a date seen, or says "none" and lists where it looked.
2. **Fact vs inference gate:** in the brief, the headline sentences, every "What happened" and "Why it matters" line, and every Monitor line end with (F) or (I).
3. **Budget gate:** 100 tool calls or fewer and 30 minutes or less.
4. **Word count:** the brief above the sources list, target 450 or fewer.
5. **Counts:** changes; changes found by snapshot comparison; changes outside the watch list; Brief items; leads investigated; pages blocked.

### B7. Write the results

1. **Brief doc:** first line in italics, "Weekly run, <date>. v0.2 trial; not yet reviewed." Then the brief exactly as the agent wrote it.
2. **Run output doc:** the full output, then the re-checks, then the checks, then the previous snapshot (so nothing is lost when it's replaced).
3. **Agent log:** one row per step, plus one per re-check.
4. **Weekly changes:** one row per change (run date, change ID, brand, fact ID, date of change, what changed, before, after, sources, how found, material or cosmetic, evidence, agent triage, agent reason). Leave my three columns blank.
5. **Weekly snapshot:** one row per fact (6 brands × F1 to F8, plus M1: 49 rows). Observed this run: the new value, status "Observed <date>". Not re-checked: last week's value, status "Carried forward". Replace the tab in one write and check there are 49 rows.
6. **Scorecard:** one row: run ID, date, model, prompt version, tool calls (plus re-checks and blocked pages), minutes, the three gate results, counts, and "Pending review" in the columns I fill.

### B8. Finish

Read back each range written and check the row counts match. Send one short message: the brief's headline, the number of Brief findings, links to the two docs, pages blocked or re-checked, and anything that failed.

## Part C. My Monday review (about 15 minutes)

1. Score the brief on the rubric (coverage, prioritisation, actionability, insight, calibration, 1 to 5 each).
2. In Weekly changes, for each of this week's rows: my triage; whether it's a real change ("Yes", "No" or "Snapshot error"); a note.
3. In the Scorecard row: accuracy (check 3 facts against their sources); false escalations (Brief items I marked "No" or cosmetic); triage agreement.
4. Do the brief's human checks if they look worth it.
5. Before any finding leaves Drive: Compliance review of every competitive claim.

## Part D. Known limits

- **Permission prompts.** A scheduled run has nobody to answer a permission prompt, so the task runs with automatic approval; B5 re-checks pages a background agent was refused.
- **Access gaps.** X, LinkedIn and one exchange's script-built main site can't be read. That is where most of the misses sat (23 of the original 42 material changes).
- **Missed reachable changes.** Even on pages it could reach, the agent found only 50% to 55% of changes in the v0.1 runs. The weekly snapshot comparison should help, because it re-reads each fact's source.
- **Carried-forward facts.** A fact carried forward for 3 weeks or more should be checked by hand.

## Part E. Changing the run

- **Change the agent brief:** edit the Weekly prompt tab (that's what the run sends), save the same change as a new prompt version, and log it.
- **Fix a wrong snapshot value:** edit that row in Weekly snapshot before Monday and mark it "Corrected by hand, <date>".
