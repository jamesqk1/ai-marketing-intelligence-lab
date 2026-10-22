# Runbook: weekly run

Followed every Monday by a scheduled Claude task, about an hour after the [collector](collector/) runs at 6am Sydney time. A person can follow it by hand too. Private file IDs have been removed from this public copy.

## What it does

Takes the reviews the collector added to the workbook this morning, labels them with AI, routes player-welfare signals away from marketing, writes the weekly brief with AI, checks it in code, and saves a Google Doc plus a one-page PDF to Drive. No human step is needed. The reader spends about 5 minutes on the one-pager.

## References

- **Workbook** (Google Sheet). Tabs: Raw, Run log, Labels, Welfare review, Spot check, Scorecard.
- **Classification prompt:** [prompts/classification-v3.md](prompts/classification-v3.md). Use the text after the dashed line.
- **Brief prompt:** [prompts/brief-v5.md](prompts/brief-v5.md). Use the text after the dashed line; fill its {placeholders}.
- **One-pager builder:** a small private Python script (Playwright and Chromium) that renders a content.json file to one branded A4 page. Not included here, because it carries the test brand's styling.

## Step 1: check collection ran

Read "Run log". Find rows whose run_at is today (UTC date of the Monday morning run, usually the Sunday UTC date because 6am Sydney = 19:00 UTC Sunday). If there are none, or "added" is 0 for every source, stop: report "Collection did not run" with the latest Run log rows, and do nothing else.

## Step 2: new rows

Read Raw (A:L: item_id, source, channel, brand, kind, post_date, url, rating, score, text, collected_at, welfare_check). New rows = collected_at on the date of this morning's run. Skip any item_id already in Labels column A.

Give each new row a run ID continuing the sequence in Labels column R (the last used ID + 1, then upward, in Raw order). Example: if the last Labels row shows R371, the first new row is R372.

## Step 3: label (classification prompt v3)

Build the table "signal_id | source | brand | rating | text", one line per new row. For App Store and Trustpilot, the text is title + " // " + body (Raw text holds the title, a blank line, then the body). Collapse whitespace.

Run the prompt in batches of about 50 rows (Sonnet), each batch: prompt text + "SIGNALS" + header + rows. Expect a JSON array, one object per row in the same order.

Validate: every signal_id present once; theme, type and sentiment only from the allowed values; severity 1 to 3. Re-run a batch that fails.

## Step 4: welfare double-check

Run a second, independent pass on all new rows asking only for welfare (Y/N) and a short neutral reason, using the same welfare definition as prompt v3: heavy losses, chasing losses, relying on play for income, being in financial trouble when they played, or heavy repeated spending they regret. Text only.

Final welfare = Y if either pass says Y. Welfare Y forces severity 3. If relevant = N, clear the other fields and set welfare N.

## Step 5: write to the workbook

- **Labels:** append from the first empty row in column A, columns A to K: item_id, relevant, type, theme, feature, sentiment, competitor, severity, welfare, welfare_review ("Yes" when welfare Y, else blank), note. Do not write columns L to P or R (formulas fill them). In column Q of the first new row write: "Run <n> · <date> · Classification v3 · welfare = Y if either of two independent runs said Y".
- **Welfare review:** append a heading row "Run <n> · <date>", then one row per welfare Y: run_id, item_id, brand, source, theme, run 1 (Y/N), run 2 (Y/N), a neutral description in your own words. Never quote the review.

## Step 6: brief (brief prompt v5)

Input table: relevant rows with welfare N only. Columns: signal_id | source | brand | rating | engagement (Raw score) | type | theme | sentiment | severity | text.

Fill the prompt's placeholders from this table: post-date window, collection date, week number N (count of earlier briefs in the folder + 1), counts per brand and source, welfare count.

Run with Opus. Ask for Markdown: "## " headings, a bold title line per finding with a blank line after it.

## Step 7: gates (in code, all must pass)

1. Every signal ID in the brief exists in the input table.
2. Every quote is copied exactly from that signal's text (cuts marked "..." allowed), and its "(Brand, Source)" matches that signal.
3. Every count matches the IDs listed (total, per source, per brand); brand comparison counts match the table.
4. No trend words: rise, spike, growing, increasing, declining, usual, more than before, less than before.
5. Under 750 words before the evidence index.
6. No names of people from inside reviews.

If a gate fails, send the brief back to the writer once with the exact failures. If it still fails, save it anyway with "DRAFT – failed checks: ..." at the top and say so in the report.

## Step 8: save

- **Google Doc** "<prefix> – Brief <YYYY-MM-DD>" (the collection date) in the Drive folder, from Markdown: title, a line "<window> · App Store, Trustpilot and YouTube · Prepared by <author>", the brief, then an "Evidence index": one line per cited ID: ID · brand · source · stars · [source](url).
- **One-page PDF:** write content.json for the one-pager builder (FINDINGS owner = marketing for "Marketing actions", competitor for "Competitor opportunities", escalation for escalations; attrib = "Brand, Source" of the quote; LIMITATIONS = 5 short sentences from the brief's Limitations; keep each finding to the brief's own words). Build the PDF. It must be ONE page: if it spills, shorten the longest finding texts and limitations (never change quotes or counts) and rebuild.

## Step 9: spot check (monthly, not weekly)

Only on the first Monday of each month: add a block to the Spot check tab below the last one: a heading row "Monthly spot check (<date>): label these blind, before looking at the Labels tab", then 15 of this week's rows balanced by star band (about 6 one- or two-star, 3 three-star, 5 four- or five-star, 1 YouTube), with the text pulled from Raw by formula. Other weeks: skip this step.

## Step 10: report

Finish with a short message: collection counts, rows labelled, welfare count, findings count, whether all gates passed, the Doc and PDF names, and whether a spot check was set up. Never email or message anyone.

## Rules that always apply

- Public data only. No usernames, names or account IDs anywhere in outputs.
- Welfare signals never appear or are quoted in the brief; they go to the Welfare review tab only.
- Do not edit earlier rows, earlier briefs, prompts or this runbook.
