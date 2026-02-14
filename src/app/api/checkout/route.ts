import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, selections } = await req.json();

    // Create line items for Stripe
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Doberman Puppy Reservation',
            description: `${selections.color} | ${selections.ears} ears | ${selections.tail} tail | ${selections.gender}`,
            images: ['https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?w=800&q=80'],
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ];

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      metadata: {
        color: selections.color,
        ears: selections.ears,
        tail: selections.tail,
        dewClaw: selections.dewClaw || 'natural',
        gender: selections.gender,
        pickType: selections.pickType || 'none',
        training: selections.training || 'no',
        location: selections.location,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
