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
