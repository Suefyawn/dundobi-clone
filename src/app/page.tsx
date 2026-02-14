"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const NAV_LINKS = ["Home", "RAW", "RESERVE", "SHOP", "Research Study", "FunDoggy", "FAQ"];

const INCLUDES = [
  "AKC registration",
  "Pedigree certification",
  "Micro-chip",
  "1st set Deworming vaccinations",
  "1st set DHLPP vaccinations",
  "Temperament testing",
  "Health certification",
  "Sale certification",
  "12 weeks vitamins and minerals supply",
  "12 hours training and Boarding",
  "Birth necessities",
];

// Pricing structure from extracted data
const PRICES = {
  base: 2000,
  dewClaw: 250,
  gender: {
    male: 2000,
    female: -1000
  },
  alpha: 2000,
  firstOfLitter: 4000,
  training: 2500
};

/* ── Icons ── */
const Facebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
const Twitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
);
const Pinterest = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
);
const Instagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const YouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);
const TikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
);

// Image mapping based on color and ear style
const getImageSrc = (color: string, ears: string) => {
  const colorMap: { [key: string]: string } = {
    "black-rust": "black-rust",
    "red-rust": "red-rust",
    "blue-rust": "blue-rust",
    "fawn-rust": "red-rust" // fallback to red-rust
  };

  const earMap: { [key: string]: string } = {
    "natural": "natural",
    "long-show": "long-show",
    "medium": "medium",
    "short-military": "short"
  };

  const colorKey = colorMap[color] || "black-rust";
  const earKey = earMap[ears] || "natural";

  // Try to load specific image, fallback to color-only
  const specificImage = `/images/${colorKey}-${earKey}.jpg`;
  const fallbackImage = `/images/${colorKey}-natural.jpg`;
  const defaultImage = "https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?w=800&q=80";

  // Return specific image if ears are selected, otherwise just color
  return ears ? specificImage : (color ? fallbackImage : defaultImage);
};

export default function Home() {
  const [color, setColor] = useState("");
  const [ears, setEars] = useState("");
  const [tail, setTail] = useState("");
  const [dewClaw, setDewClaw] = useState("");
  const [gender, setGender] = useState("");
  const [pickType, setPickType] = useState("");
  const [training, setTraining] = useState("");
  const [location, setLocation] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [totalPrice, setTotalPrice] = useState(PRICES.base);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  // Calculate total price
  useEffect(() => {
    let price = PRICES.base;
    
    if (dewClaw === "removed") price += PRICES.dewClaw;
    if (gender === "male") price += PRICES.gender.male;
    if (gender === "female") price += PRICES.gender.female;
    if (pickType === "alpha") price += PRICES.alpha;
    if (pickType === "first") price += PRICES.firstOfLitter;
    if (training === "yes") price += PRICES.training;

    setTotalPrice(price);
  }, [dewClaw, gender, pickType, training]);

  // Update image when color or ears change (with smooth transition)
  useEffect(() => {
    setImageKey(prev => prev + 1);
  }, [color, ears]);

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!color) newErrors.color = "Please select a color";
    if (!ears) newErrors.ears = "Please select ear style";
    if (!tail) newErrors.tail = "Please select tail style";
    if (!gender) newErrors.gender = "Please select gender";
    if (!location.trim()) newErrors.location = "Please enter your location";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Stripe checkout
  const handleReserve = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsProcessing(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          selections: {
            color,
            ears,
            tail,
            dewClaw,
            gender,
            pickType,
            training,
            location
          }
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const currentImage = getImageSrc(color, ears);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Navbar ── */}
      <nav className="border-b border-neutral-800 sticky top-0 z-50 bg-black/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="font-serif text-2xl font-bold tracking-widest text-gold">DUNDOBI</a>
            <div className="hidden md:flex space-x-8">
              {NAV_LINKS.map((l) => (
                <a key={l} href="#" className="text-sm uppercase tracking-wider text-neutral-300 hover:text-gold transition-colors">{l}</a>
              ))}
            </div>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-neutral-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileNav ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
          {mobileNav && (
            <div className="md:hidden pb-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <a key={l} href="#" className="block text-sm uppercase tracking-wider text-neutral-300 hover:text-gold py-1">{l}</a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image with smooth transitions */}
          <div className="relative aspect-square bg-neutral-900 rounded-sm overflow-hidden group">
            <img
              key={imageKey}
              src={currentImage}
              alt={`Doberman puppy ${color} ${ears}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
              onError={(e) => {
                // Fallback to default image if specific image not found
                e.currentTarget.src = "https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Ear style indicator overlay */}
            {ears && (
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-2 rounded text-xs uppercase tracking-wider text-gold border border-gold/30">
                {ears.replace('-', ' ')}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Dundobi Kennel</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Reserve Dobermann Puppy</h1>
            <p className="text-3xl font-light text-gold mb-8">
              ${totalPrice.toLocaleString()}.00 
              {totalPrice !== PRICES.base && (
                <span className="text-sm text-neutral-400 ml-2 line-through">${PRICES.base}.00</span>
              )}
            </p>

            <div className="border-t border-neutral-800 pt-6 mb-8">
              <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-4">Base Price: ${PRICES.base.toLocaleString()} includes</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-300">
                    <span className="text-gold mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Note */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-sm mb-8">
              <p className="text-sm text-neutral-400 leading-relaxed italic">
                &ldquo;We, at Dundobi, strongly believe in giving back to our community. Being a small business entrenched in the community, we believe that this is an essential part of our mission. We are offering special rates and perks for law-enforcement, medical professionals and first responders, veterans and senior citizens. Please inquire for further details.&rdquo;
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {/* Color */}
              <div id="color">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <select 
                  value={color} 
                  onChange={(e) => { setColor(e.target.value); setErrors({...errors, color: ''}); }}
                  className={`w-full bg-neutral-900 border ${errors.color ? 'border-red-500' : 'border-neutral-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors`}
                >
                  <option value="">Select Color</option>
                  <option value="black-rust">Black & Rust</option>
                  <option value="red-rust">Red & Rust</option>
                  <option value="blue-rust">Blue & Rust</option>
                  <option value="fawn-rust">Fawn & Rust</option>
                </select>
                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
              </div>

              {/* Ears & Tail */}
              <div className="grid grid-cols-2 gap-4">
                <div id="ears">
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    Ears <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={ears} 
                    onChange={(e) => { setEars(e.target.value); setErrors({...errors, ears: ''}); }}
                    className={`w-full bg-neutral-900 border ${errors.ears ? 'border-red-500' : 'border-neutral-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors`}
                  >
                    <option value="">Select</option>
                    <option value="natural">Natural</option>
                    <option value="long-show">Long Show Cut</option>
                    <option value="medium">Medium Cut</option>
                    <option value="short-military">Short Military Cut</option>
                  </select>
                  {errors.ears && <p className="text-red-500 text-xs mt-1">{errors.ears}</p>}
                </div>
                <div id="tail">
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    Tail <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={tail} 
                    onChange={(e) => { setTail(e.target.value); setErrors({...errors, tail: ''}); }}
                    className={`w-full bg-neutral-900 border ${errors.tail ? 'border-red-500' : 'border-neutral-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors`}
                  >
                    <option value="">Select</option>
                    <option value="natural">Natural</option>
                    <option value="medium">Medium Cut</option>
                    <option value="short-military">Short Military Cut</option>
                  </select>
                  {errors.tail && <p className="text-red-500 text-xs mt-1">{errors.tail}</p>}
                </div>
              </div>

              {/* Dew Claw & Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Dew Claw</label>
                  <select 
                    value={dewClaw} 
                    onChange={(e) => setDewClaw(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="natural">Natural</option>
                    <option value="removed">Removed (+$250)</option>
                  </select>
                </div>
                <div id="gender">
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={gender} 
                    onChange={(e) => { setGender(e.target.value); setErrors({...errors, gender: ''}); }}
                    className={`w-full bg-neutral-900 border ${errors.gender ? 'border-red-500' : 'border-neutral-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors`}
                  >
                    <option value="">Select</option>
                    <option value="male">Male (+$2,000)</option>
                    <option value="female">Female (-$1,000)</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
              </div>
            </div>

            {/* Special Picks */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-3">Place on Litter (Optional)</label>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  pickType === "runt" ? "border-gold bg-gold/5" : "border-neutral-800 hover:border-neutral-600"
                }`}>
                  <input 
                    type="radio" 
                    name="pickType" 
                    value="runt" 
                    checked={pickType === "runt"} 
                    onChange={() => setPickType("runt")}
                    className="mt-1 accent-[#c9a84c]" 
                  />
                  <div>
                    <span className="font-semibold text-sm tracking-wider">RUNT</span>
                    <p className="text-xs text-neutral-500 mt-0.5">Smallest of the litter</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  pickType === "alpha" ? "border-gold bg-gold/5" : "border-neutral-800 hover:border-neutral-600"
                }`}>
                  <input 
                    type="radio" 
                    name="pickType" 
                    value="alpha" 
                    checked={pickType === "alpha"} 
                    onChange={() => setPickType("alpha")}
                    className="mt-1 accent-[#c9a84c]" 
                  />
                  <div>
                    <span className="font-semibold text-sm tracking-wider">ALPHA (+$2,000)</span>
                    <p className="text-xs text-neutral-500 mt-0.5">Leaders of the pack</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  pickType === "first" ? "border-gold bg-gold/5" : "border-neutral-800 hover:border-neutral-600"
                }`}>
                  <input 
                    type="radio" 
                    name="pickType" 
                    value="first" 
                    checked={pickType === "first"} 
                    onChange={() => setPickType("first")}
                    className="mt-1 accent-[#c9a84c]" 
                  />
                  <div>
                    <span className="font-semibold text-sm tracking-wider">FIRST OF LITTER (+$4,000)</span>
                    <p className="text-xs text-neutral-500 mt-0.5">Skip the line and get the first pick on upcoming litter</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Training */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">Breeders Obedience Training</label>
              <select 
                value={training} 
                onChange={(e) => setTraining(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              >
                <option value="">Select</option>
                <option value="yes">Yes (+$2,500)</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-8" id="location">
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                value={location}
                onChange={(e) => { setLocation(e.target.value); setErrors({...errors, location: ''}); }}
                placeholder="Enter your location"
                className={`w-full bg-neutral-900 border ${errors.location ? 'border-red-500' : 'border-neutral-700'} text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-600`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Reserve Button */}
            <button 
              onClick={handleReserve}
              disabled={isProcessing}
              className={`w-full ${isProcessing ? 'bg-neutral-700 cursor-not-allowed' : 'bg-gold hover:bg-[#d4b55f]'} text-black font-bold uppercase tracking-widest py-4 text-sm transition-colors mb-6`}
            >
              {isProcessing ? 'Processing...' : `Reserve Now — $${totalPrice.toLocaleString()}.00`}
            </button>

            {/* Validation reminder */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded text-sm mb-6">
                <p className="font-semibold mb-1">Please complete all required fields:</p>
                <ul className="list-disc list-inside text-xs space-y-1">
                  {Object.values(errors).map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
              <span className="text-xs uppercase tracking-widest text-neutral-500">Share</span>
              <div className="flex gap-3 text-neutral-400">
                <button className="hover:text-gold transition-colors"><Facebook /></button>
                <button className="hover:text-gold transition-colors"><Twitter /></button>
                <button className="hover:text-gold transition-colors"><Pinterest /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-serif text-xl font-bold text-gold mb-4">DUNDOBI</h4>
              <p className="text-sm text-neutral-500 leading-relaxed">Premium Doberman breeding with excellence, integrity, and community at heart.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Stay Updated</h4>
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="flex-1 bg-neutral-900 border border-neutral-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                <button className="bg-gold text-black font-bold text-xs uppercase tracking-wider px-6 hover:bg-[#d4b55f] transition-colors">Join</button>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Follow Us</h4>
              <div className="flex gap-4 text-neutral-400">
                <a href="#" className="hover:text-gold transition-colors"><Instagram /></a>
                <a href="#" className="hover:text-gold transition-colors"><Facebook /></a>
                <a href="#" className="hover:text-gold transition-colors"><YouTube /></a>
                <a href="#" className="hover:text-gold transition-colors"><TikTok /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-600">
            © {new Date().getFullYear()} Dundobi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
