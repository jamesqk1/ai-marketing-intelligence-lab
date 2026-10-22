/**
 * Player Feedback Digest: collector settings.
 *
 * Edit this file to change what is collected.
 * Secrets do NOT go here. Set them in Project Settings > Script properties.
 * A source whose keys are missing is skipped (and noted in the Run log), so you can add sources one at a time.
 *   Reddit:                  REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME
 *   Trustpilot, App Store:   DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
 *   YouTube:                 YOUTUBE_API_KEY
 */
const CONFIG = {
  sheetName: 'Raw',          // tab the collector writes to (created if missing)
  logSheetName: 'Run log',   // one row per source per run

  lookbackDays: 8,           // weekly run plus one day of overlap; duplicates are skipped
  minWords: 10,              // skip very short posts, reviews and comments
  maxTextChars: 5000,        // truncate very long text

  // Rows are deleted this many days after collection.
  // YouTube's API policies don't allow keeping data longer than 30 days without refreshing it.
  retentionDays: { Reddit: 90, YouTube: 30, 'App Store': 90, Trustpilot: 90 },

  // Brands are matched by keyword in text (case-insensitive). Per-source identifiers live here too.
  brands: [
    // Replace these placeholders with your own focal brand and competitors.
    // The public version is anonymised; the test case was a US sweepstakes casino brand and two competitors.
    {
      name: 'Focal Brand',
      keywords: ['focal brand'],
      trustpilotDomain: 'focal-brand.example.com',
      appStoreId: null,                        // no app
      youtubeQuery: '"focal brand"',
    },
    {
      name: 'Competitor A',
      keywords: ['competitor a'],
      trustpilotDomain: 'competitor-a.example.com',
      appStoreId: '0000000000',                // App Store numeric ID
      youtubeQuery: '"competitor a"',
    },
    {
      name: 'Competitor B',
      keywords: ['competitor b'],
      trustpilotDomain: 'competitor-b.example.com',
      appStoreId: '0000000000',
      youtubeQuery: '"competitor b"',
    },
  ],

  reddit: {
    enabled: true,               // also skipped automatically until Reddit API keys are added
    maxRequestsPerRun: 90,       // hard cap, including auth and deletion checks
    requestDelayMs: 1000,        // at most about 60 requests a minute
    // Subreddits whose new posts are read each run.
    // defaultBrand applies when no brand keyword appears; null means keep only posts that mention a brand.
    subreddits: [
      { name: 'FocalBrandSubreddit', defaultBrand: 'Focal Brand' },
      { name: 'DailyCashList', defaultBrand: null },
    ],
    searchQueries: ['"focal brand"', '"competitor a"', '"competitor b"'],
    maxPostsForComments: 30,
    maxCommentsPerPost: 50,
  },

  appStore: {                    // via DataForSEO
    enabled: true,
    country: 'us',               // used in review links
    locationCode: 2840,          // DataForSEO location code for the United States
    languageCode: 'en',
    depth: 200,                  // most recent reviews requested per brand (max 500; charged per 25)
  },

  trustpilot: {                  // via DataForSEO
    enabled: true,
    depth: 200,                  // most recent reviews requested per brand (max 200; charged per 20)
  },

  youtube: {
    enabled: true,
    videoWindowDays: 30,         // search videos published in the last N days
    videosPerBrand: 10,          // search costs 100 quota units per brand; comment pages cost 1 unit each
    maxCommentsPerVideo: 100,
  },
};
