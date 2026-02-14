# Dundobi Kennel - Doberman Puppy Reservation System

A premium Next.js web application for reserving Doberman puppies with dynamic image switching, form validation, and Stripe payment integration.

## Features

### ✅ Completed Features

1. **Product Images**
   - Sample Doberman images for different colors (Black & Rust, Red & Rust, Blue & Rust)
   - Multiple ear style variations (Natural, Long Show, Medium, Short Military)
   - Images stored in `/public/images/`

2. **Dynamic Image Switching**
   - Real-time image updates based on color selection
   - Smooth CSS transitions between images
   - Ear style overlay indicator
   - Fallback handling for missing images

3. **Form Validation**
   - Required fields: Color, Ears, Tail, Gender, Location
   - Visual error states with red borders
   - Error messages below each field
   - Summary of all errors before checkout
   - Auto-scroll to first error field
   - "Reserve Now" button disabled until form is valid

4. **Stripe Payment Integration (Test Mode)**
   - Secure checkout with Stripe Checkout
   - Dynamic price calculation
   - Payment metadata includes all selections
   - Success page with confirmation details
   - Cancel page for abandoned checkouts
   - Loading state during payment processing

5. **Pricing System**
   - Base price: $2,000
   - Gender: Male (+$2,000), Female (-$1,000)
   - Dew Claw Removal: +$250
   - Alpha pick: +$2,000
   - First of litter: +$4,000
   - Training: +$2,500
   - Real-time price updates

## Installation

### Prerequisites

- Node.js 18+ installed
- Git installed
- Stripe account (for payment testing)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suefyawn/dundobi-clone.git
   cd dundobi-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Stripe**
   - Create a Stripe account at [stripe.com](https://stripe.com)
   - Get your test API keys from the Stripe Dashboard
   - Update `.env.local` with your keys:
   
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing Payment Flow

### Test Cards (Stripe Test Mode)

Use these test card numbers in Stripe Checkout:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

### Testing Workflow

1. Fill out all required fields (marked with *)
2. Select optional features (litter pick, training)
3. Enter a location
4. Click "Reserve Now"
5. Complete Stripe Checkout with test card
6. View success page with confirmation

## Project Structure

```
dundobi-clone/
├── public/
│   └── images/              # Doberman images
│       ├── black-rust-natural.jpg
│       ├── black-rust-long-show.jpg
│       ├── black-rust-medium.jpg
│       ├── black-rust-short.jpg
│       ├── red-rust.jpg
│       └── blue-rust.jpg
├── src/
│   └── app/
│       ├── api/
│       │   └── checkout/
│       │       └── route.ts  # Stripe API endpoint
│       ├── success/
│       │   └── page.tsx      # Success page
│       ├── cancel/
│       │   └── page.tsx      # Cancel page
│       ├── globals.css       # Global styles
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Main reservation page
├── .env.local               # Environment variables (not in git)
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Image Asset Details

### Available Images

The app includes sample Doberman images for:

- **Colors**: Black & Rust, Red & Rust, Blue & Rust
- **Ear Styles**: Natural, Long Show Cut, Medium Cut, Short Military Cut

### Image Naming Convention

Images follow this pattern:
```
{color}-{ear-style}.jpg

Examples:
- black-rust-natural.jpg
- black-rust-long-show.jpg
- red-rust.jpg
```

### Fallback Strategy

1. Try to load specific image (color + ear style)
2. Fall back to color-only image (natural ears)
3. Fall back to default Unsplash image

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Complete dundobi-clone app"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`

3. **Deploy**
   - Vercel will automatically deploy on every push to main

### Environment Variables

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_SECRET_KEY` - Your Stripe secret key

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payment**: Stripe + @stripe/stripe-js
- **Icons**: Custom SVG components
- **Images**: Local files + Unsplash fallback

## Features Breakdown

### Image Switching

The `getImageSrc()` function handles dynamic image loading:
- Maps color selections to image filenames
- Maps ear styles to image variations
- Returns appropriate image path
- Handles missing images with fallbacks

### Form Validation

Validation rules:
- **Color**: Required
- **Ears**: Required
- **Tail**: Required
- **Gender**: Required
- **Location**: Required, must not be empty
- **Other fields**: Optional

### Price Calculator

Real-time price updates using `useEffect`:
```typescript
useEffect(() => {
  let price = PRICES.base;
  
  if (dewClaw === "removed") price += PRICES.dewClaw;
  if (gender === "male") price += PRICES.gender.male;
  if (gender === "female") price += PRICES.gender.female;
  // ... more conditions
  
  setTotalPrice(price);
}, [dewClaw, gender, pickType, training]);
```

### Stripe Integration

Checkout flow:
1. Validate form
2. Create checkout session via `/api/checkout`
3. Redirect to Stripe Checkout
4. Handle success/cancel redirects
5. Display confirmation

## Future Enhancements

Potential improvements:
- [ ] Admin dashboard for managing reservations
- [ ] Email notifications (SendGrid/Resend)
- [ ] Real-time availability checking
- [ ] Photo gallery for past litters
- [ ] Customer portal to track puppy development
- [ ] Webhook handling for payment events
- [ ] Multi-language support
- [ ] Dark/light mode toggle

## License

This project is for educational purposes. All rights reserved by Dundobi Kennel.

## Support

For questions or issues:
- Email: info@dundobi.com
- Phone: (555) 123-4567

---

**Built with ❤️ for Dundobi Kennel**
