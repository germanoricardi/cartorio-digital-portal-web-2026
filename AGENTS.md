<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Commit Convention

Use Conventional Commits in English for every commit.

Format:
`type(scope): short imperative summary`

Rules:
- Use English only.
- Keep the summary concise and action-oriented.
- Use `portal-2026` as the scope for app-level changes.
- Prefer common types such as `feat`, `fix`, `refactor`, `chore`, `docs`, and `test`.

Examples:
- `fix(portal-2026): prevent MUI hydration issues in app router`
- `feat(portal-2026): add authentication flow`
- `docs(portal-2026): document local development setup`
