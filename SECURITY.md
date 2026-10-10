# Security

Security fixes target the current `main` branch. This project has no supported
long-term release branches.

Do not post exploitable vulnerabilities, credentials, or private workflow URLs
in public issues. If enabled, use the repository's **Security → Report a
vulnerability** action. Otherwise, contact the maintainer through a private
contact method on [their profile](https://github.com/infinuts) to arrange a report.
There is no promised response-time SLA or bug bounty.

Include the affected commit, reproduction steps, browser/runtime, impact, and a
minimal example. Useful areas to review include SVG/XML escaping, URL parsing,
font fetching, dependency vulnerabilities, and API input validation.

Workflow URLs contain public settings. Do not put secrets in step labels or
shared links. Downloaded SVGs contain their labels too. The editor stores the
most recent configuration locally; clearing site data removes it.
