# Security

Security fixes target the current `main` branch. This project has no supported
long-term release branches.

Do not post exploitable vulnerabilities, credentials, or private workflow URLs
in public issues. Private vulnerability reporting is enabled: use
[Security → Report a vulnerability](https://github.com/infinuts/readme-flow-svg/security/advisories/new)
to send a private report to the repository maintainer.
There is no promised response-time SLA or bug bounty.

Include the affected commit, reproduction steps, browser/runtime, impact, and a
minimal example. Useful areas to review include SVG/XML escaping, URL parsing,
font fetching, dependency vulnerabilities, and API input validation.

Workflow URLs contain public settings. Do not put secrets in step labels or
shared links. Downloaded SVGs contain their labels too. The editor stores the
most recent configuration locally; clearing site data removes it.
