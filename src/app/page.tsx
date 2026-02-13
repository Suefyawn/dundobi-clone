"use client";
import { useState } from "react";

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

const PICK_TYPES = [
  { id: "runt", label: "RUNT", desc: "Smallest of the litter" },
  { id: "alpha", label: "ALPHA", desc: "Leaders of the pack" },
  { id: "first", label: "FIRST OF LITTER", desc: "Skip the line and get the first pick on upcoming litter" },
];

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

export default function Home() {
  const [color, setColor] = useState("");
  const [ears, setEars] = useState("");
  const [tail, setTail] = useState("");
  const [pick, setPick] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

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
          {/* Image */}
          <div className="relative aspect-square bg-neutral-900 rounded-sm overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?w=800&q=80"
              alt="Doberman puppy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Dundobi Kennel</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Reserve Your Puppy</h1>
            <p className="text-3xl font-light text-gold mb-8">$2,000.00 <span className="text-sm text-neutral-500 ml-2">Regular price</span></p>

            <div className="border-t border-neutral-800 pt-6 mb-8">
              <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-4">Base Price: $2,000 includes</h3>
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
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Color</label>
                <select value={color} onChange={(e) => setColor(e.target.value)}>
                  <option value="">Select Color</option>
                  <option>Black & Rust</option>
                  <option>Red & Rust</option>
                  <option>Blue & Rust</option>
                  <option>Fawn & Rust</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Ears</label>
                  <select value={ears} onChange={(e) => setEars(e.target.value)}>
                    <option value="">Select</option>
                    <option>Natural</option>
                    <option>Cropped</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Tail</label>
                  <select value={tail} onChange={(e) => setTail(e.target.value)}>
                    <option value="">Select</option>
                    <option>Natural</option>
                    <option>Docked</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pick Type */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-3">Pick Type</label>
              <div className="space-y-3">
                {PICK_TYPES.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                      pick === p.id ? "border-gold bg-gold/5" : "border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <input type="radio" name="pick" value={p.id} checked={pick === p.id} onChange={() => setPick(p.id)}
                      className="mt-1 accent-[#c9a84c]" />
                    <div>
                      <span className="font-semibold text-sm tracking-wider">{p.label}</span>
                      <p className="text-xs text-neutral-500 mt-0.5">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest py-4 text-sm transition-colors mb-6">
              Reserve Now — $2,000.00
            </button>

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
                <button className="bg-gold text-black font-bold text-xs uppercase tracking-wider px-6 hover:bg-gold-light transition-colors">Join</button>
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
