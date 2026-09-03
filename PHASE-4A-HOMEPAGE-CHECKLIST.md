# Phase 4A — Homepage conversion checklist

## Completed
- [x] Existing Noir Cut visual language preserved
- [x] Homepage shop conversion section integrated after listener discovery
- [x] Direct shop entry
- [x] Direct category entries for T-Shirts, Hoodies and Caps
- [x] Mobile responsive layout
- [x] Reduced-motion fallback
- [x] Copy avoids unsupported bestseller / popularity claims
- [x] Existing external shop URL remains the source of truth

## Validation notes
- Shop destination is resolved through `client/src/lib/shopLink.ts`.
- Category routes mirror the existing shop catalog routes.
- No product prices, stock, bestseller rankings, reviews or popularity claims are fabricated on the artist homepage.
- CI workflow runs were not available for the feature commit at the time of review, so merge should remain gated on the repository's normal build/deploy validation.
