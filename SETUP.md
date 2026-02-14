# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Stripe (Required for Payment)

**Get your Stripe test keys:**
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create an account (or log in)
3. Click "Developers" in the top menu
4. Click "API keys"
5. Copy your keys (use TEST mode, not LIVE)

**Update `.env.local`:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### 3. Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing Payments

Use these test cards in Stripe Checkout:

**✅ Successful Payment**
```
Card: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
ZIP: 12345
```

**❌ Declined Payment**
```
Card: 4000 0000 0000 0002
Expiry: 12/34
CVC: 123
ZIP: 12345
```

## 📋 Features to Test

1. **Image Switching**
   - Select different colors → image changes
   - Select different ear styles → image updates
   - Watch the smooth transition

2. **Form Validation**
   - Try clicking "Reserve Now" without filling fields
   - See error messages appear
   - Fill all required fields (marked with *)

3. **Price Calculator**
   - Watch price update as you select options
   - Base: $2,000
   - Male: +$2,000
   - Female: -$1,000
   - Alpha: +$2,000
   - First of Litter: +$4,000
   - Training: +$2,500
   - Dew Claw Removal: +$250

4. **Payment Flow**
   - Fill out form completely
   - Click "Reserve Now"
   - Complete Stripe checkout
   - See success page

## ⚠️ Important Notes

- **Stripe Keys**: The app won't work without valid Stripe keys in `.env.local`
- **Test Mode**: Always use TEST keys (pk_test_... and sk_test_...)
- **Security**: Never commit `.env.local` to git (it's in .gitignore)
- **Images**: Some color/ear combinations may not have images (fallback used)

## 🐛 Troubleshooting

**"Reserve Now" button does nothing**
→ Check browser console for errors
→ Make sure all required fields are filled

**Payment fails**
→ Check Stripe keys in `.env.local`
→ Make sure you're using test keys (not live keys)

**Images not loading**
→ Normal for some combinations (fallback image shows)
→ Check `/public/images/` folder has images

**Build errors**
→ Run `npm install` again
→ Delete `.next` folder and restart

## 📦 What's Included

✅ Dynamic image switching
✅ Form validation with error states
✅ Real-time price calculation
✅ Stripe payment integration
✅ Success/cancel pages
✅ Responsive design
✅ Smooth transitions

## 🎨 Customization

**Colors** → `tailwind.config.ts`
**Pricing** → `src/app/page.tsx` (PRICES object)
**Images** → Add to `/public/images/`
**Text** → `src/app/page.tsx`

## 📧 Support

Questions? Email: info@dundobi.com
