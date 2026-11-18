# Security policy

## Dependency audit

Run `npm audit` to inspect the full development and production dependency tree. Run `npm run audit:runtime` to verify the production dependency tree independently.

As of 2026-11-18, the build toolchain resolves `picomatch@4.0.7` through Vite's `tinyglobby` dependency. GitHub advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) describes a ReDoS issue affecting versions through 4.0.7, but the public npm registry has no fixed release. The issue is disputed by the upstream maintainer and is limited here to developer-controlled build tooling; the package has no production dependency on picomatch. Do not expose build/dev servers to untrusted networks or accept untrusted glob patterns in build configuration. Reassess and update as soon as a fixed release or advisory clarification is published.

Report security issues privately to the repository maintainers rather than opening a public issue with exploit details.
