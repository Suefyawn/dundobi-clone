# Deployment Guide

## Quick Start

```bash
npm install
npm run dev
```

Local dev server: http://localhost:3000

## Features Implemented

✅ Dynamic price calculation based on selections:
- Base: $2,000
- Dew Claw Removed: +$250
- Male: +$2,000 (total $4,000)
- Female: -$1,000 (total $1,000)
- Alpha: +$2,000
- First of Litter: +$4,000
- Obedience Training: +$2,500

✅ Complete form fields:
- Color (Black & Rust, Red, Blue, Fawn)
- Ears (Natural, Long Show Cut, Medium Cut, Short Military Cut)
- Tail (Natural, Medium Cut, Short Military Cut)
- Dew Claw (Natural, Removed)
- Gender (Male, Female)
- Pick Type (Runt, Alpha, First of Litter)
- Training (Yes/No)
- Location (text input)

✅ Design:
- Matches dundobi.com aesthetic
- Black/gold color scheme
- Responsive layout
- Smooth transitions

## Vercel Deployment

This repo is already connected to Vercel at: https://dundobi-clone.vercel.app

Push to main branch to auto-deploy.

## Next Steps

- [ ] Add real product images
- [ ] Implement image switching based on color/ears/tail selections
- [ ] Connect to Shopify backend (if needed)
- [ ] Add form validation
- [ ] Integrate payment gateway
