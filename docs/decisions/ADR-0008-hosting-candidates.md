# ADR-0008: Hosting Infrastructure & Deployment Strategy

**Status:** Proposed (Awaiting Human Decision)  
**Date:** 2026-11-05  
**Decider:** Founder

---

## Context and Constraints

- Budget is ₹0.
- Production deployment must never expose citizen data.
- Must evaluate terms of service (TOS) restrictions, particularly commercial vs non-commercial rules on free tiers.

## Comparison of Candidate Platforms

| Platform              | Free Tier Quota                       | India Edge Presence                        | TOS / Commercial Restrictions                                                         | Assessment                                               |
| --------------------- | ------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Cloudflare Pages**  | Unlimited bandwidth, 500 builds/month | Yes (Edge nodes in Mumbai, Chennai, Delhi) | Permits personal and commercial use on free tier                                      | **Strong Candidate**                                     |
| **Vercel (Hobby)**    | 100 GB bandwidth, 6,000 build mins    | Yes                                        | **Strictly non-commercial**. Pro plan ($20/mo) required if monetised or institutional | Risk of TOS violation if project expands                 |
| **Netlify (Starter)** | 100 GB bandwidth, 300 build mins      | Yes                                        | Non-commercial focus on free plan                                                     | Viable alternative                                       |
| **GitHub Pages**      | 100 GB bandwidth                      | Standard CDN                               | Public repositories only                                                              | Good for open source, but lacks custom edge header rules |

## Decision & Current Posture

- **Milestone M0 & Local Development:** 100% local operation on localhost with `next build && next start` (or local static server). Zero external accounts or cloud resources provisioned.
- **Production Choice:** Recommended **Cloudflare Pages** for Beta 0.1 deployment due to India edge network presence and clear TOS. Final deployment account creation is a human-only action (HA-010).
