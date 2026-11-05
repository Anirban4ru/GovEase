# Open Questions & Decisions Register

**Project:** Unified Life Services Platform  
**Purpose:** Tracks open design, legal, and operational questions with current status and next actions.  
**Owner:** Founder  
**Status:** active (M0 Foundation)  
**Last updated:** 2026-11-05

Sourced directly from Appendix A of `PROMPT_FINAL.md`.

---

| ID     | Question                                                                                 | Impacted Area         | Context / Options                                                                                                         | Current Status                     |
| ------ | ---------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| OQ-001 | Final product name, branding, and domain name                                            | Branding, URLs, Trust | Must not imply government endorsement or affiliation. Options: neutral civic brand.                                       | Pending Human Decision             |
| OQ-002 | Legal entity or institutional sponsor for provider onboarding                            | Integrations (M6+)    | Most official APIs (API Setu, DigiLocker, ABDM) require a registered organisation email domain and senior representative. | Open                               |
| OQ-003 | Final launch languages beyond English and Hindi                                          | Localisation (M2+)    | Candidate languages: Bengali, Tamil, Telugu, Marathi. Requires fluent human reviewers before release.                     | Deferred to Beta 0.2               |
| OQ-004 | Number and selection of Beta 0.1 catalogue entries; specific states/cities for utilities | Catalogue (M2)        | Target 40-80 high-value services across 6 ecosystems. Recommend starting with Delhi / Maharashtra for utilities.          | Pending Human Decision             |
| OQ-005 | Is aggregate, privacy-preserving, cookie-less measurement acceptable?                    | Privacy, Analytics    | Option: zero analytics (default for Beta 0.1) vs self-hosted cookieless aggregate page view counters.                     | Defaulting to Zero Analytics       |
| OQ-006 | Hosting and domain budget; acceptable free-tier trade-offs                               | Deployment (M5)       | Local development is ₹0. Cloudflare Pages vs Vercel Pro (Vercel Hobby prohibits commercial use).                          | Pending Human Decision             |
| OQ-007 | Who will provide qualified legal and security review, and when?                          | Security, Legal       | Pre-launch requirement before Beta 0.1 public release.                                                                    | Open / Pre-launch Action           |
| OQ-008 | Whether and when to submit ABDM Sandbox or API Setu partner registration                 | Integrations          | Beta 0.1 is official external-link only. Sandbox registration to be assessed post-Beta.                                   | Class 5 (Link Only) in Beta 0.1    |
| OQ-009 | How will the catalogue be maintained over time?                                          | Governance            | Verification interval is 90 days. Cadence: weekly automated link checks, monthly manual content audit.                    | Governance Framework defined in M0 |
