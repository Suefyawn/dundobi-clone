"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch session details from Stripe
      // For now, we'll just show a success message
      console.log('Payment successful! Session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/10 border-2 border-gold">
          <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-gold">Reservation Confirmed!</h1>
        <p className="text-lg text-neutral-300 mb-8">
          Thank you for reserving your Doberman puppy with Dundobi Kennel.
        </p>

        {/* Details */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-sm p-8 mb-8 text-left">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">What Happens Next</h2>
          <ul className="space-y-4 text-sm text-neutral-300">
            <li className="flex items-start gap-3">
              <span className="text-gold mt-0.5">✦</span>
              <span>You will receive a confirmation email with your reservation details and receipt.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-0.5">✦</span>
              <span>Our team will contact you within 24-48 hours to discuss your puppy selection and next steps.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-0.5">✦</span>
              <span>You'll receive regular updates on your puppy's development with photos and videos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-0.5">✦</span>
              <span>We'll coordinate pickup or delivery arrangements as your puppy approaches 8 weeks of age.</span>
            </li>
          </ul>
        </div>

        {/* Session ID */}
        {sessionId && (
          <p className="text-xs text-neutral-500 mb-8">
            Reference ID: {sessionId}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-gold hover:bg-[#d4b55f] text-black font-bold uppercase tracking-widest py-4 px-8 text-sm transition-colors"
          >
            Return Home
          </Link>
          <a 
            href="mailto:info@dundobi.com"
            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold uppercase tracking-widest py-4 px-8 text-sm transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-neutral-500 mt-12 leading-relaxed">
          If you have any questions or concerns, please don't hesitate to reach out to us at{' '}
          <a href="mailto:info@dundobi.com" className="text-gold hover:underline">info@dundobi.com</a>
          {' '}or call us at (555) 123-4567.
        </p>
      </div>
    </div>
  );
}
