# Developer / AI handoff
Start with DEVELOPMENT_PLAN.md and STATUS.md. Existing runnable entry is root index.html with src/game.js (classic browser JavaScript, DOM-based 2D prototype). Preserve it while migrating incrementally. No npm dependency is required for the existing entry. Serve repository root with python -m http.server 8000 and open http://localhost:8000. Inspect actual script tags and existing code before changes. Do not replace working features with placeholders.
## Workflow
1. Clone private repository with authorized access; never share credentials. Read roadmap and status.
2. Create a feature branch for the next incomplete day. Inspect existing code and tests.
3. Implement one milestone, run smoke tests and node --test tests/*.test.mjs, record results.
4. Update STATUS.md and roadmap only after acceptance. Commit and review before merging. Keep GitHub as source of truth.
## Stage gates
Days 1–7: verify hosting and backup, menu navigation, 3D pitch/camera, 22 player models, movement and stamina, ball physics, AI and scoring. Day 3: choose Three.js/WebGL only after testing target devices; migrate rendering independently of simulation.
Days 8–14: test referee decisions, cards, VAR, offsides, restarts, substitutions, separate men's/women's competitions, World Cup country selection, group standings, knockout progression, final and trophy, selectable XI and formations. Prioritize World Cup over historical team selector.
Days 15–21: implement three-currency wallet, exact roadmap rewards and prices, deterministic Big Five collection and one-time jackpot, club customization and store. Prototype uses fictional currency only; no real payments or paid random rewards. Server-authoritative ledger before online release.
Days 22–28: original cinematic and audio, onboarding, replays, notifications, privacy, parental controls and career. Use licensed or original assets; no copied music or unlicensed club logos. Avoid collecting unnecessary personal data.
Days 29–30: multiplayer prototype, controller/device testing, security and performance checks, documented known bugs and release candidate. No promise of commercial-grade completion in 30 days.
## Migration
New ES modules under src/systems are isolated foundations, not wired into legacy game yet. Add modules incrementally; classic game.js globals must remain available to existing inline HTML handlers until those handlers are migrated. Use a separate renderer, fixed-step simulation, input abstraction and data-driven rules. Never expose secrets in browser code. Backend and database are future choices, not installed components.

Day 2: index.html owns the dashboard and ofCupEntry; src/world-cup.js binds that tile and uses matchDuration. Preserve the red theme, settings and trophy placeholder. Runtime acceptance pending.

- Day 2 build 2026.11.25.3: added global club search, session favourites, completed-match history (50 recent), streaks, in-app notices, quick Barcelona–Real Madrid setup, keyboard guide and roadmap tracker. src/home-extras.js loads after world-cup.js. Syntax and static ID checks passed; browser and deployment verification pending. Session data resets on reload; controller and account support remain planned.

- Build 2026.11.25.5: optional midnight menu theme, five session achievements, goals/conceded/clean sheets/win rate statistics and prototype kit preview. No rewards or images added. Syntax and static ID checks passed; runtime and deployment pending.

- Build 2026.11.25.6: custom cross-league fixture, random match, club rematch, recent five-match form, personal records, session challenges, database counts and searchable move guide. Session only, no rewards. Syntax and static ID checks passed; browser and deployment pending.

- Build 2026.11.25.7: match-tools.js adds pitch colors, weather overlays, arena styles, scoreboard styles, low effects, fullscreen, accessibility, goal messages, ceremonial coin toss, halftime stats, result summary and pause controls. Syntax checked; browser verification pending. Remaining requested extras: boot color, captain, man of match, penalty shootout, goalkeeper/free-kick/passing training, custom tournaments, league table, international friendlies, flags, countdown and custom keyboard controls. Keep on roadmap until implemented and tested.

- Builds .8–.9: international friendly setup, flags, captain and boot styling, session standings, direction guessing drills, tournament draw, team award, timed kickoff and configurable movement letters. Individual awards, playable custom tournaments, realistic drills, full action remapping and browser testing remain pending.

- Nov 25: Owner approved 30-feature wishlist and phased roadmap additions in IDEAS.md and docs/DEVELOPMENT_PLAN.md. Original milestones and economy preserved; no new gameplay implementation. Mobile overlay merged into main (9c9b23f2fabe95a87cceeecedbde84c2b6536f30); deployment unverified.
