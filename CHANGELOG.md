# Changelog
## 2026-11-24 — Foundation
- Saved 30-day roadmap, project structure, architecture diagram, handoff and owner rules.
- Added isolated economy and standings modules and starter tests; integration and runtime verification pending.
- Added project tracking documents.

- Added home-menu YouTube soundtrack shortcut; external playback, not an integrated soundtrack. Browser smoke test pending.

- Removed old generated eight-note home melody at owner request; retained button sound effects and YouTube shortcut. Browser verification pending.

- Added visible build identifier 2026.11.24.1 to the header to help verify Cloudflare deployments. Update identifier on future game releases. Live deployment not verified.

- Build 2026.11.24.2: added broadcast scoreboard styling, four derby labels and day/night pitch lighting toggle. Runtime testing pending.

- Build 2026.11.24.3: added home settings, 3/5/10-minute club match duration, random opponent within selected league, and empty trophy cabinet. Runtime testing pending; settings session-only, trophies not connected.

- Removed visible home soundtrack card at owner's request; Day 24 audio plans unchanged.

- 2026.11.25.1: Day 2 dashboard refresh, World Cup entry, settings/trophy navigation, responsive styling and tournament integration fixes. Browser tests pending.

- Build 2026.11.25.2: restored introduction and button sound controls mount; static navigation checks passed.

- Day 2 build 2026.11.25.3: added global club search, session favourites, completed-match history (50 recent), streaks, in-app notices, quick Barcelona–Real Madrid setup, keyboard guide and roadmap tracker. src/home-extras.js loads after world-cup.js. Syntax and static ID checks passed; browser and deployment verification pending. Session data resets on reload; controller and account support remain planned.

- Build 2026.11.25.4: compact home tiles, 16–20px dashboard gaps, responsive spacing; no images added. Browser verification pending.

- Build 2026.11.25.5: optional midnight menu theme, five session achievements, goals/conceded/clean sheets/win rate statistics and prototype kit preview. No rewards or images added. Syntax and static ID checks passed; runtime and deployment pending.

- Build 2026.11.25.6: custom cross-league fixture, random match, club rematch, recent five-match form, personal records, session challenges, database counts and searchable move guide. Session only, no rewards. Syntax and static ID checks passed; browser and deployment pending.

- Build 2026.11.25.7: match-tools.js adds pitch colors, weather overlays, arena styles, scoreboard styles, low effects, fullscreen, accessibility, goal messages, ceremonial coin toss, halftime stats, result summary and pause controls. Syntax checked; browser verification pending. Remaining requested extras: boot color, captain, man of match, penalty shootout, goalkeeper/free-kick/passing training, custom tournaments, league table, international friendlies, flags, countdown and custom keyboard controls. Keep on roadmap until implemented and tested.

- Builds .8–.9: international friendly setup, flags, captain and boot styling, session standings, direction guessing drills, tournament draw, team award, timed kickoff and configurable movement letters. Individual awards, playable custom tournaments, realistic drills, full action remapping and browser testing remain pending.

- Nov 25 evening preview: mobile controls moved inside pitch, circular translucent joystick and four action buttons, centered radar; desktop controls preserved. Preview only, phone testing pending.

- Nov 25: Owner approved 30-feature wishlist and phased roadmap additions in IDEAS.md and docs/DEVELOPMENT_PLAN.md. Original milestones and economy preserved; no new gameplay implementation. Mobile overlay merged into main (9c9b23f2fabe95a87cceeecedbde84c2b6536f30); deployment unverified.


## Safe Chat — owner requirement, Nov 25
Day 27 prerequisite for Day 29 multiplayer: server-side pre-delivery filtering of private/friend chat, blocking email addresses and requests for them, payment card numbers, passwords, verification codes, phone numbers, home/school addresses, requests for private information, suspicious links/scams, threats and bullying. Normalize obfuscated text and test bypass attempts, false positives and multilingual messages. Reject sensitive messages before recipient delivery; sender sees a generic privacy notice, never echo sensitive text. Do not retain raw blocked secrets in logs or moderation records. Provide mute/block/report, age-appropriate defaults, and parental controls. Fail closed if filtering unavailable; keep free-text chat disabled until secure backend and safety tests pass; offer preset football phrases as fallback. Filters cannot guarantee detection of every attempt. Planned, not implemented. Preserve economy and existing milestones.


Nov 25: Owner approved bonus clubhouse release; PR #4 merged into main (88431d5105f1997dfeeb9ea1870a960e384f2714). Main index verified loading bonus script. Syntax checked; browser and Cloudflare deployment unverified. Local profiles/statistics, preset nicknames, clubhouse themes, draft feedback; existing countdown preserved. Day 3 training fixes remain pending.


Nov 25: Owner requested compact home navigation and 15 bonus features. Preview branch day2-clean-hub adds six mutually exclusive category panels, moves existing details without deleting them, and adds difficulty recommendation, derbies, predictions, IQ question, text tunnel preview, virtual ticket, prototype club comparison, manager profile, formation board, match report, goals, random challenge, daily club, Hall of Fame and sample trophy certificate. Syntax and remote writes verified; browser/deployment unverified; not merged. No pitch/controls/economy changes. Day 3 training fixes remain priority.


Nov 25: Owner approved NEW ERA home menu; PR #5 merged into main at 336e7977c522dea962a9e8063212d7f0057d090a. Main index verified. Six colorful category buttons from Explore downward, original upper dashboard colors, 15 lightweight prototypes. Browser and Cloudflare deployment unverified. Day 3 training fixes and 3D foundation remain next.


Nov 25: Owner approved separate full-width Matchday Extras and Quick Access tiles below Explore. PR #6 merged at 49af8817d33485bbc2b5db2d832c5d5be36b4928; main script verified. Syntax passed; browser and Cloudflare deployment unverified. No gameplay/economy changes.


Nov 25 owner decision: defer birthday selector (DD/YYYY/MM, 1950 through current year, valid dates only, no exact birthday storage) to Day 30 (Dec 23) release testing/integration. Existing implementation is on day2-page-navigation preview, not main; do not merge birthday change early. Preserve existing Day 30 release checks. Navigation preview remains pending separate approval.


Day 3 Nov 26 preview: day3-stadium-training adds 105:68 pitch rendering, five-times visible world area zoom (sqrt(5) linear scale), ball-follow camera, shaded DOM players and stadium surround, varied marking/support, separate swipe/keyboard penalty shootout and playable cone course with custom cone layouts, checkpoints, collision count and timer. Syntax and remote source verified; browser, touch, deployment and gameplay acceptance not tested. This is 2.5D, not true 3D; world physics remain normalized, full 3D and animation work outstanding. No merge to main. Birthday remains Day 30; navigation preview separate.


Nov 26 Day 3 preview: added original WebGL corner flags, 1120 instanced low-poly spectators, benches, tunnel structures and O-FOOTBALL advertising boards. Earlier corner recovery, movement smoothing, 200x classic rendered area and 25% camera range changes remain preview-only. Syntax/source verification only; browser performance and deployment pending.
