import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";

// Initialize Stripe SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Authentication Guard: Ensure user is logged in
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();

    // Data Transformation (DTO)
    // Converts internal product structure to Stripe's "Line Items" format
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : [], // Stripe displays this image on the hosted checkout page
        },
        // Currency Normalization: Stripe expects amounts in cents (e.g., $10.00 = 1000)
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity || 1,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_URL
      ? process.env.NEXT_PUBLIC_URL
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      // Redirect Hooks
      success_url: `${process.env.AUTH_URL}/success`, 
      cancel_url: `${process.env.AUTH_URL}/cart`,
      // Metadata Tagging: Attaches internal User ID to the transaction for Webhook reconciliation later
      metadata: {
        userId: session.user.id,
      },
    });

    // 4. Return Session URL for Client Redirect
    return NextResponse.json({ url: stripeSession.url });

  } catch (error) {
    console.error("Stripe Session Error:", error);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}