# O-FOOTBALL contributor instructions
Read docs/HANDOFF.md, docs/STATUS.md and docs/DEVELOPMENT_PLAN.md first. Preserve existing functionality and user-defined economy. Work on the next incomplete milestone, test changes, update status honestly. Do not mark planned features complete. Keep secrets out of Git. Use original/licensed assets. Keep changes small and reviewable. See docs/architecture.svg for current versus planned stack.

## Mandatory GitHub-first workflow (owner requirement)
GitHub is the sole canonical project storage. Read the latest remote files before editing; commit all source, documentation, roadmap, status, and supported assets to the repository. Never rely on the owner's laptop for persistent project storage. Temporary build/test workspaces are allowed only as disposable copies; commit relevant outputs and verify remote writes before reporting completion. Keep setup reproducible on another computer. If GitHub access or asset upload is unavailable, report the blocker rather than silently saving only locally. Never commit secrets or private user data. Hosting, external services and large assets may require separate infrastructure; document dependencies and recovery steps.

## Living owner rules
Read [RULES.md](RULES.md) before every development session. When the owner adds or changes a project rule, update RULES.md and its history in GitHub, and reconcile conflicting project instructions.
