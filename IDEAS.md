# Idea backlog
Record new owner ideas here with date, priority, acceptance criteria and roadmap day. Do not treat ideas as approved scope changes.

- Realistic 3D football, stadium and player models.
- World Cup country selection, starting XI, groups, knockouts and final (priority).
- Historical year/team selector (secondary).
- Referee, VAR, cards, substitutions, original commentary and crowd audio.
- See docs/DEVELOPMENT_PLAN.md for full approved roadmap and economy.

## Home soundtrack — owner request, 2026-11-24 (Day 24 audio)
Reference playlist: https://open.spotify.com/playlist/2DUuRUBdKxgUmYczGN28XF
Start music on launch when browser permits (otherwise first interaction), play tracks sequentially, wrap to first track after last, pause during matches, resume on return home, provide volume/mute/skip. Match transitions and controls are proposed defaults. Exact tracks require appropriate game music licenses and authorized audio files; Spotify developer policy prohibits game integration (https://developer.spotify.com/policy). Do not embed or rip Spotify audio. Licensed or original alternatives require owner approval. Status: planned, blocked on audio permissions/assets; no playback implementation yet.

YouTube alternative: https://www.youtube.com/watch?v=drkkGuzSCvw&list=PLVZVAbDipNFI — home shortcut implemented; embedded playback and automatic repeat not implemented; playlist validity unverified.

- Day 2 build 2026.11.25.3: added global club search, session favourites, completed-match history (50 recent), streaks, in-app notices, quick Barcelona–Real Madrid setup, keyboard guide and roadmap tracker. src/home-extras.js loads after world-cup.js. Syntax and static ID checks passed; browser and deployment verification pending. Session data resets on reload; controller and account support remain planned.

- Build 2026.11.25.6: custom cross-league fixture, random match, club rematch, recent five-match form, personal records, session challenges, database counts and searchable move guide. Session only, no rewards. Syntax and static ID checks passed; browser and deployment pending.

- Build 2026.11.25.7: match-tools.js adds pitch colors, weather overlays, arena styles, scoreboard styles, low effects, fullscreen, accessibility, goal messages, ceremonial coin toss, halftime stats, result summary and pause controls. Syntax checked; browser verification pending. Remaining requested extras: boot color, captain, man of match, penalty shootout, goalkeeper/free-kick/passing training, custom tournaments, league table, international friendlies, flags, countdown and custom keyboard controls. Keep on roadmap until implemented and tested.

## Distinctive game modes — owner requested backlog, 2026-11-25
Priority and roadmap dates TBD; these are ideas, not completed features. Preserve existing roadmap and economy.
1. Football Time Machine — recreate historic matches and eras.
2. Create Your Own Country — custom flag, kits, anthem and national team in World Cup.
3. Comeback Challenge — start 0–3 down with 15 minutes left.
4. Referee Mode — officiate matches, review VAR and issue cards.
5. Street to Superstar — progress from street football to professional clubs.
6. Friends' World Cup — invite friends to private tournaments, subject to safe multiplayer infrastructure.
7. Goal Celebration Creator — design signature celebrations.
8. AI Personal Coach — personalized practice recommendations based on gameplay.
9. Football Universe — create leagues, clubs and rivalries.
10. One Player, One Life — single-player career from academy to retirement.
11. Football Laboratory — separate sandbox with adjustable gravity, pitch and ball physics.
12. Create Your Own Training Drills — place mannequins, cones and defenders, and challenge friends.

## O-Coach chat — owner request Nov 25
Messenger/Snapchat-style mobile and iPad friendly chat, emoji buttons, conversation history, fictional manager personalities inspired by legendary coaches (real likenesses subject to rights). Consult coach before buying, selling or trading players; owner retains final decision. Coach advises on squad, formations and training. Start with local rule-based prototype; later secure conversational AI, privacy and age-appropriate safeguards. Proposed milestones: Day 17 transfer consultation, Day 26 chat UI, Day 27 safeguards, Day 28 integration. No paid services without approval.

## Owner-approved transfer market concept — November 25, 2026
Target Day 17 (December 10). Inspired by the owner's three FC Mobile market screenshots, but use original O-FOOTBALL card designs and appropriately licensed player images.
- Player cards with photos, overall ratings, positions and prices.
- Recommended, My Players, Watchlist and My Orders tabs.
- Search, filter and sort by rating, position, league and price.
- Buy and sell using existing in-game currency; purchase offers, quantities and order status.
- Market value, lowest/highest prices and price history graphs.
- O-Coach consultation before buying or selling players.
- Preserve existing economy rules; no new currency or pricing changes without owner approval. This is an idea, not an implemented feature.

## Owner gameplay feedback — Nov 25
Fix immediately on a preview branch, owner tests and approves before live merge: prevent instant repeated turnovers after J/L passes or keeper distribution; give first-touch time, vary supporting positions ahead/behind/beside carrier, small lateral steps and timed attacking runs, realistic opponent pressure, automatically select nearest suitable outfield defender when opponent attacks toward goal. Day 4: player-specific pace, playmaking and other attributes reflected in player cards and actual gameplay; real names, positions, ratings and selectable captain in squad builder. Use current-season kit colors. Preview branch day2-possession-fix; syntax checked, browser acceptance pending. No economy changes.

## AUTO PLAY — owner approved Nov 25
Mobile/iPad and PC manual AUTO button; optional PC automatic activation after seven seconds without gameplay input; immediate manual takeover on gameplay key or touch controls; visible active indicator; AI passing, dribbling, tackling and shooting. Explain in pre-match tutorial and Day 23 startup slideshow; refine during Days 5–7. Experimental implementation on day2-possession-fix branch, syntax checked only; owner browser testing and approval required before live merge. No economy changes.

### AUTO PLAY revision — owner feedback Nov 25
Supersedes manual button, indicator and optional idle setting above: seamless built-in auto after seven seconds idle on PC, iPad and mobile; no separate button, section or toggle. Gameplay key or touch immediately restores manual control; held inputs prevent activation. Preserve existing device selection. Explain in Day 23 slideshow, not current tutorial. Preview revision committed; syntax checked, owner retest and approval pending.

## Team Plan / tactical positioning — owner idea Nov 25
Selectable tactical styles affect both manual off-ball movement and AUTO PLAY decisions, without forcing the human to follow a rigid script.
- Tiki-Taka: short intelligent passes, passing triangles, players actively find gaps and open passing lanes, rotate positions and avoid repetitive two-player loops.
- Attacking: more players push forward, including selected defenders, creating shooting and passing options while retaining minimal defensive cover.
- Defending: most players drop back, compact coverage and approximately two advanced outlets for counterattacks.
- Suggested integration Days 5–7 (movement and AI), with squad tactics UI Day 14; allow tactical changes during matches. Planned, not implemented; test balance and preserve existing controls and economy.

### Day 2 gameplay feedback and roadmap follow-up
Owner requested true seven-second idle delay from match entry, immediate takeover, varied teammate support ahead/behind/wide with defensive cover, and smarter AUTO PLAY that avoids repeated two-player passing, carries into space and shoots intelligently. Preview patches committed and syntax checked; browser retest and owner approval pending. Team Plan tactics scheduled Days 5–7 and 14, slideshow Day 23, final testing Day 30; no live gameplay merge yet.
