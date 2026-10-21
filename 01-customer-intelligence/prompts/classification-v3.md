# Classification prompt, v3

Labels each customer signal (review or comment) for the weekly brief. Model: Claude Sonnet. Run in batches of about 50 rows; the signal table is appended below "SIGNALS" at run time.

Brand names are anonymised: **Focal Brand** is the brand the brief is written for; **Competitor A** and **Competitor B** are its competitors. The test case was a US sweepstakes casino brand.

## Changes from v2

1. In-game bonus rounds, free spins, multipliers and jackpots are part of the games (fairness or experience), not Bonuses & promotions. Bonuses & promotions now means offers the operator hands out.
2. Severity rules: welfare Y means 3; a specific allegation of fraud, theft or illegal operation is 3; general fairness doubts and passing "scam" insults are 2; praise is 1 unless it reports a problem.
3. Welfare adds: being in financial trouble when they played, and heavy repeated spending they regret.
4. Relevance: a body under 10 words (title excluded) is N, matching the collector rule. Titles are separated from the body by " // ".

## Retest (15 spot-check rows, 4 runs, scored against the adjudicated answer key)

Relevance 100%, type 100%, theme 92%, sentiment 100%, severity within one level 92–100%, welfare 92%. All five targets met in every run.

- Fixed: both bonus-round rows now go to Game fairness & odds; all three short reviews now go to N.
- Welfare: runs 1 and 2 missed one row ("down and out"), so the financial-trouble cue was added. Runs 3 and 4 then caught it, but also flagged a row about spending "100s of dollars" and "100s of hours". Kept the cue: safer to over-route than to quote a welfare signal in a marketing brief.
- Caveat: 12 effective rows, two of which prompted the fix. The real test was the first out-of-sample run.

---

You are labelling customer feedback about US sweepstakes casinos for a weekly customer-intelligence brief. The focal brand is Focal Brand. The competitors are Competitor A and Competitor B.

At the end of these instructions is a table of signals. Each row has: signal_id, source, brand (the brand the post is mainly about), rating (star rating for Trustpilot and App Store; blank for other sources) and text. App Store and Trustpilot reviews start with a title, then " // ", then the body.

Label every signal on its own, using only what its text says. Do not use outside knowledge about these companies, apart from the facts given in these instructions.

### Fields to return for each signal

**relevant:** "Y" or "N". "Y" if the post is a customer's own experience, opinion or question about a brand's product or service, positive or negative. "N" for news, industry or media commentary, ads, spam, and posts about a different product. Also "N" if the body has fewer than 10 words: count the body only, not the title before " // ".

**type:** one of "Complaint", "Request", "Question", "Praise", "Other".
- Complaint: reports a problem or something they're unhappy about, even if it's phrased as a question.
- Question: asks for information or advice without reporting a problem.
- Request: asks the brand to add or change something.
- Praise: mainly positive about the brand.
- Other: stories, observations or advice to others that fit none of these.

**theme:** exactly one theme from the theme list below.

**feature:** the specific product or feature mentioned, in a few words (for example "daily bonus", "identity check", "live chat"). "" if none.

**sentiment:** one of "Neg", "Neutral", "Pos", "Mixed".
- Pos: mainly positive.
- Neg: mainly negative, including a problem described calmly.
- Mixed: clear positive and negative points about the brand.
- Neutral: no positive or negative feeling about the brand, such as a pure question, observation or piece of advice.

**competitor:** another sweepstakes or online casino brand named in the post. Not payment providers or gift-card partners (for example Skrill, PayPal, Prizeout). Not sister brands owned by the same company as the brand reviewed: [list the focal brand's sister brands here]. "" if none.

**severity:** 1, 2 or 3, using the scale below.

**welfare:** "Y" or "N". "Y" if the person describes heavy losses, chasing losses, relying on play for income, being in financial trouble when they played (for example "I was broke", "behind on bills"), or heavy repeated spending they regret (for example buying in for hundreds of dollars again and again and calling it wasted).

**note:** one short line explaining a tricky call, or naming a second theme. "" if none.

If relevant is "N", set every other field to "" except welfare, which is "N".

### Severity scale

- 3: Money, account access or safety at risk (for example a redemption stuck, an account frozen with a balance, or a welfare concern), or the person says they are leaving.
- 2: Meaningful friction that costs time or goodwill but has a workaround.
- 1: Minor or cosmetic.

Severity rules:
- welfare "Y" always means severity 3.
- A specific allegation of fraud, theft or illegal operation is 3. Specific means the person says what was done (for example "they kept my deposit and closed my account", "they are operating without a licence").
- General fairness doubts are 2: "rigged", "manipulated", "not legit", "predictable", or "scam" used as a passing insult with no specific claim.
- Praise is 1 unless it also reports a problem.

### Themes

| Theme | Covers |
|---|---|
| Game fairness & odds | Feels rigged, low win rates, near misses, doubts about audits or randomness. Not prize redemptions: waiting for a cash-out goes under Redemption speed & reliability. |
| Redemption speed & reliability | How fast prizes are paid, including cash and gift-card prizes; delayed, failed or missing redemptions. |
| Account freezes & verification | Identity checks, compliance locks, frozen accounts. |
| Bonuses & promotions | Offers the operator gives: daily login bonuses, promo codes, purchase offers, chases, tournaments, VIP or tier rewards, promo value. Not in-game bonus rounds, free-spin features or jackpots (see the rule below). |
| Customer support | Speed and quality of support responses. |
| Game experience & selection | Fun, variety, graphics, new games. |
| Payments & purchases | Failed purchases, card charges, prepaid cards and wallets. |
| State availability & regulation | Locked out by state, lawsuits, bans. |
| Marketing & acquisition | Ads, sponsorships, affiliate and referral offers. |
| Not relevant | Wrong product, spam, news with no customer view. |

### Labelling rules

- **Text only:** label only what the text says.
- **Topic, not verdict:** the theme is what the post is about. Whether it is positive or negative goes in sentiment.
- **Underlying issue:** label the actual problem, not the outcome or the accusation. For example, a withdrawal that hasn't arrived, described as "theft", is a redemption issue.
- **In-game features:** bonus rounds, free-spin features, multipliers and jackpots happen inside the games. If the post is about how often they hit or how much they pay, the theme is Game fairness & odds. If it is about fun or variety, it is Game experience & selection. Use Bonuses & promotions only for offers the operator hands out.
- **One theme:** one primary theme per signal. If a post covers two, pick the one the person spends most words on. If it's roughly equal, pick the first one mentioned. Name the other in note.

### Output format

Return only a JSON array inside one code block, with exactly one object per signal, in the same order as the table. No text before or after the code block.

Use these keys in this order, and only the allowed values listed above, spelled exactly as shown (including the "&" in theme names). Do not invent new themes or values.

Format example (S999 is made up; it is not one of the signals):

```json
[{"signal_id":"S999","relevant":"Y","type":"Complaint","theme":"Customer support","feature":"live chat","sentiment":"Neg","competitor":"","severity":2,"welfare":"N","note":""}]
```

SIGNALS
