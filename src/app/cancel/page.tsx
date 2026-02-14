"use client";
import Link from "next/link";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Cancel Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-800 border-2 border-neutral-600">
          <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Cancel Message */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Reservation Cancelled</h1>
        <p className="text-lg text-neutral-400 mb-8">
          Your reservation was not completed. No charges have been made.
        </p>

        {/* Reassurance */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-sm p-8 mb-8">
          <p className="text-sm text-neutral-300 leading-relaxed">
            Your selections have not been saved. If you experienced any issues during checkout or have questions 
            about the reservation process, please don't hesitate to contact us. We're here to help make your 
            experience as smooth as possible.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-gold hover:bg-[#d4b55f] text-black font-bold uppercase tracking-widest py-4 px-8 text-sm transition-colors"
          >
            Try Again
          </Link>
          <a 
            href="mailto:info@dundobi.com"
            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold uppercase tracking-widest py-4 px-8 text-sm transition-colors"
          >
            Get Help
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Need Assistance?</h3>
          <p className="text-sm text-neutral-400">
            Email: <a href="mailto:info@dundobi.com" className="text-gold hover:underline">info@dundobi.com</a>
            <br />
            Phone: <a href="tel:5551234567" className="text-gold hover:underline">(555) 123-4567</a>
          </p>
        </div>
      </div>
    </div>
  );
}
