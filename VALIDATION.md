# Validation · Railway public demo · 2026-11-09 UTC

**Scope:** local standalone public site, **not** Railway deployment or production audit.

- `node --check server.js`: PASS.
- `node --check` on inline browser script extracted from `public/index.html`: PASS.
- Local server on port 34567: `GET /healthz` → HTTP 200, `ANALYSIS_ONLY`: PASS.
- `GET /version` → `build_sha=UNKNOWN`, `runtime_data_connected=false`: PASS.
- `GET /` → HTTP 200, expected public-demo banner: PASS.
- `POST /` → HTTP 405: PASS.
- Static string scan for private repository owners and recorded internal SHA markers: no occurrences in public HTML.
- Security headers present: CSP with `connect-src 'none'`, `no-store`, `nosniff`, `X-Frame-Options: DENY`: PASS.

**Not tested:** Railway image build or deployment, external HTTPS, real connector/skill integration, authenticated financial data, comprehensive browser E2E. The bundled page contains strictly synthetic examples. Production readiness: `NOT_DEPLOYED`.
