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

## Individual football awards — Nov 25 owner addition
Day 2: begin performance-based Man of the Match prototype and awards tracking. Day 13: integrate Player of the Tournament with completed competitions. Day 25: original Golden Ball ceremony inspired by Ballon d'Or, nominees, rankings and trophy presentation. Day 28: Player of the Year based on season performances and trophies, integrated with career mode. Track goals, assists, defending and saves; avoid random winners. Full ceremony and season integration remain planned; preserve economy and existing milestones.


### Team strength × difficulty (owner request, Day 2)
Combine club strength and selected difficulty independently. Elite opponents should be harder than lower-rated clubs at the same difficulty; even weaker clubs should challenge on Legendary. Use provisional ratings initially, then real roster attributes and current team data. Scale pressing, passing decisions, movement and finishing without guaranteeing results. Test in preview before release.


### Birthday setup and annual New Year event
Replace age selector with birth month, day and year (1950 through actual current calendar year, automatically extending each January). Reject invalid or future dates; keep date local and avoid storing exact birthdate unnecessarily. Preserve device selector. Add a recurring New Year event each January; event rewards and content to be decided by owner.


### O-FOOTBALL card packs and store (owner idea)
Owner proposes card ratings capped at 99, low cards around 70–78, premium tiers around 90–99, Champions League themed packs across participating clubs, pack upgrades using earned coins, and randomized card chances. Owner also proposes real-money credits and rubies, prices to discuss later. Suggested schedule: Day 15 currency foundation, Day 18 earned-coin pack prototypes and transparent odds, Day 21 store prototype. Safety proposal: keep randomized packs earned-only, no paid currency conversion into randomized packs; any future real-money store should offer clearly priced guaranteed items, with age safeguards, parental approval, spending limits, platform/legal review and owner approval before implementation. No prices or economy changes authorized yet.

## Big Five token fusion and seasonal cards — owner proposal, Nov 25
Days 18–19: collect distinct Barcelona, Real Madrid, Manchester City, Arsenal and Bayern Munich club tokens through free gameplay. Proposed rarity: one in a million per token (exact drop mechanics TBD). On obtaining the fifth distinct token, automatically trigger a cinematic: five tokens float together, fuse into a magnificent golden diamond crystal with colorful gems, become a golden key and unlock a treasure chest. Proposed revised reward: 1 billion O-Coins and 500 million O-Tokens; existing roadmap rewards remain unchanged pending explicit economy confirmation and balancing. No paid entry or paid random chances. Provide transparent odds and a collection area. Day 22: cinematic polish. Separate 99 OVR Ultimate card tier; AI-assisted position-aware ratings based on verified season performances; animated cards and seasonal events for winter, summer, New Year, Lunar New Year, Ramadan, Eid, Christmas, Easter and World Cup, with free national-team player access in World Cup event. Prices, event details and licensing TBD. Ideas only, not implemented.

## Mobile pitch controls — owner feedback, Nov 25 evening
Day 3 priority: move phone/iPad touch controls onto the pitch as an overlay, inspired by owner's screenshot: translucent circular joystick bottom left, PASS, THROUGH, SHOOT and SPRINT & SKILL circular buttons bottom right, radar bottom center. Responsive landscape layout, preserve keyboard controls and immediate manual takeover from Auto Play. Use original UI styling closely matching the reference layout. Test on mobile preview before release. Recorded after Day 2 wrap-up; implementation deferred to Day 3.


## Owner-approved 30-feature wishlist — Nov 25
Original milestones, dates, economy and World Cup priority remain unchanged. Balance by effort, not equal feature counts: early days protect core gameplay; complex features begin with design/local prototypes, with secure online functionality deferred until infrastructure, privacy and testing are ready. No pay-to-win, forced ads or unfair matchmaking. Real player likenesses and historical assets require rights. Day 30 tests available work; unfinished items remain backlog, not release promises.
1. Online Division Rivals — Day 29; planned.
2. Play with friends — Day 29; planned.
3. Player career — Day 28; planned.
4. Manager career — Day 28; planned.
5. Street football — Day 6; planned.
6. Pro Clubs — Day 29; planned.
7. Player evolution — Day 16; planned.
8. Football academy — Day 4; planned.
9. Live seasonal events — Day 18; planned.
10. Historic matches — Day 14; planned.
11. Custom celebrations — Day 25; planned.
12. Stadium builder — Day 3; planned.
13. Custom jerseys — Day 20; planned.
14. Custom club badges — Day 20; planned.
15. Global leaderboards — Day 27; planned.
16. Spectator mode — Day 23; planned.
17. Replay editor — Day 25; planned.
18. Goal of the Week — Day 26; planned.
19. Golden Boot — Day 13; planned.
20. Golden Glove — Day 13; planned.
21. Trophy room — Day 19; planned.
22. Football news center — Day 26; planned.
23. Press conferences — Day 28; planned.
24. Player chemistry — Day 14; planned.
25. Dynamic crowds — Day 24; planned.
26. Pitch invasion celebrations — Day 22; planned.
27. Last-minute drama — Day 24; planned.
28. Legendary players — Day 17; planned.
29. Referee career — Day 9; planned.
30. Custom World Cup — Day 12; planned.


## Safe Chat — owner requirement, Nov 25
Day 27 prerequisite for Day 29 multiplayer: server-side pre-delivery filtering of private/friend chat, blocking email addresses and requests for them, payment card numbers, passwords, verification codes, phone numbers, home/school addresses, requests for private information, suspicious links/scams, threats and bullying. Normalize obfuscated text and test bypass attempts, false positives and multilingual messages. Reject sensitive messages before recipient delivery; sender sees a generic privacy notice, never echo sensitive text. Do not retain raw blocked secrets in logs or moderation records. Provide mute/block/report, age-appropriate defaults, and parental controls. Fail closed if filtering unavailable; keep free-text chat disabled until secure backend and safety tests pass; offer preset football phrases as fallback. Filters cannot guarantee detection of every attempt. Planned, not implemented. Preserve economy and existing milestones.


## Nov 25 owner playtest feedback — Day 3 (Nov 26)
Owner reports penalty practice is random button guessing and cone dribbling is not playable. Prioritize fixing both alongside Day 3 stadium foundation: controllable aim/power/direction, goalkeeper saves/dives, playable cone course with movement, collision/checkpoints, timer and completion score. Begin with working gameplay and initial animations; full physics/AI integration remains Days 5–7. Test keyboard and touch; preserve existing modes until replacements work. Owner requested tomorrow, not implementation today. Bonus clubhouse preview remains unmerged and browser/deployment unverified.


Nov 25: Owner requested compact home navigation and 15 bonus features. Preview branch day2-clean-hub adds six mutually exclusive category panels, moves existing details without deleting them, and adds difficulty recommendation, derbies, predictions, IQ question, text tunnel preview, virtual ticket, prototype club comparison, manager profile, formation board, match report, goals, random challenge, daily club, Hall of Fame and sample trophy certificate. Syntax and remote writes verified; browser/deployment unverified; not merged. No pitch/controls/economy changes. Day 3 training fixes remain priority.
