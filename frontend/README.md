# GigSecure Chain — Enhanced Frontend v2.0
**Hackathon-ready. Mobile-first. Judge-winning.**

## Quick Start
```bash
npm install
npm run dev       # http://localhost:5173
```

## Production Build (already done → dist/)
```bash
npm run build
npm run preview   # preview the built app
```

## App Routes
| Route | Screen | Priority |
|---|---|---|
| `/` | Landing page | P0 |
| `/dashboard` | Home (open this for demo) | P0 |
| `/passport` | Gig Passport + ZK Proof | P0 |
| `/slump-shield` | AI Risk Shield | P0 |
| `/claims` | Claims stepper + history | P0 |
| `/profile` | Settings + language | P1 |

## Demo Script (3 minutes)
1. **0:00–0:20** — Open `/dashboard`. Gauge animates to 68/100. Amber alert shows.
2. **0:20–1:00** — Navigate to `/passport`. Show work entries. Click "Generate Secure Proof" → watch 6-step ZK animation.
3. **1:00–1:40** — Navigate to `/slump-shield`. Gauge sweeps to 67. AI insight card. Click "Join Peer Risk Pool."
4. **1:40–2:20** — Navigate to `/claims`. Click "▶ Advance step" 3x → confetti burst + "₹1,200 paid" toast.
5. **2:20–3:00** — Return to `/dashboard`. Score shows 84/100 green. Close with impact stat.

## Design System
- **Primary**: Teal `#0D9488` — trust, safety
- **Secondary**: Amber `#F59E0B` — attention, money
- **Font**: Sora (display) + DM Sans (body) + JetBrains Mono (data)
- **Mobile baseline**: 360×800px
- All tokens in `src/index.css` `:root` block

## Key Features Built
- ✅ Animated protection ring gauge (SVG, spring physics)
- ✅ Semi-circular income risk gauge with needle sweep
- ✅ Earnings area chart with slump-day red dots
- ✅ 6-step ZK proof generation animation
- ✅ 4-step claim stepper with pulse animation + confetti
- ✅ Live ticker on landing page
- ✅ Animated gradient border passport card
- ✅ Framer Motion page transitions
- ✅ Bottom nav with spring-physics active indicator
- ✅ Toast notifications via react-hot-toast
- ✅ Glass morphism nav + safe area inset
- ✅ Custom cursor (desktop)
- ✅ Demo wallet fallback (no MetaMask needed)
- ✅ Language switcher (EN/HI/KN/TA)
- ✅ Confetti celebration on claim paid
- ✅ Skeleton loading via CSS shimmer
- ✅ Mobile-first, 360px baseline tested

## Stack
React 18 · Vite · Tailwind CSS · Framer Motion · Recharts · Lucide Icons · react-hot-toast
