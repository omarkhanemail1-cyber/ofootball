# Feature tracker
Status labels: existing/unverified, starter/unintegrated, planned, verified complete.

| Feature | Status |
|---|---|
| Browser menu, league selection, kits, lineup UI, 2D match | Existing/unverified |
| Economy helpers and group standings | Starter/unintegrated |
| 3D renderer, models, movement and physics upgrades | Planned |
| Referee, VAR and complete rules | Planned |
| World Cup groups, knockouts and final | Planned — priority |
| Women's leagues and squad builder upgrades | Planned |
| Wallet, transfer market, Big Five and jackpot integration | Planned |
| Cinematic, audio, career, safety and multiplayer | Planned |

See docs/DEVELOPMENT_PLAN.md for all milestones. Mark complete only after testing.

- Home soundtrack shortcut: implemented, runtime unverified. Integrated licensed soundtrack remains planned.

- Broadcast scoreboard, derby labels and day/night pitch toggle: implemented in browser prototype, runtime unverified; not full 3D lighting.

- Settings centre, random opponent and club match duration: implemented, runtime unverified. Trophy cabinet: placeholder, no award integration yet.

- Day 2 dashboard and direct World Cup tile implemented in source; runtime verification pending.

- Day 2 build 2026.11.25.3: added global club search, session favourites, completed-match history (50 recent), streaks, in-app notices, quick Barcelona–Real Madrid setup, keyboard guide and roadmap tracker. src/home-extras.js loads after world-cup.js. Syntax and static ID checks passed; browser and deployment verification pending. Session data resets on reload; controller and account support remain planned.

- Build 2026.11.25.5: optional midnight menu theme, five session achievements, goals/conceded/clean sheets/win rate statistics and prototype kit preview. No rewards or images added. Syntax and static ID checks passed; runtime and deployment pending.

- Build 2026.11.25.6: custom cross-league fixture, random match, club rematch, recent five-match form, personal records, session challenges, database counts and searchable move guide. Session only, no rewards. Syntax and static ID checks passed; browser and deployment pending.

- Build 2026.11.25.7: match-tools.js adds pitch colors, weather overlays, arena styles, scoreboard styles, low effects, fullscreen, accessibility, goal messages, ceremonial coin toss, halftime stats, result summary and pause controls. Syntax checked; browser verification pending. Remaining requested extras: boot color, captain, man of match, penalty shootout, goalkeeper/free-kick/passing training, custom tournaments, league table, international friendlies, flags, countdown and custom keyboard controls. Keep on roadmap until implemented and tested.
