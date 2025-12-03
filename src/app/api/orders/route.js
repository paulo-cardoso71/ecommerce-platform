import { auth } from "@/auth"; 
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    // 1. Identity Verification
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectToDatabase();

    // 2. Payload Validation
    const { items, total } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cannot create order with empty cart" }, { status: 400 });
    }

    // 3. Order Creation (Snapshot Strategy)
    // We snapshot product details (name, price) at the time of purchase.
    // This prevents future product price changes from affecting historical order records.
    const newOrder = await Order.create({
      user: session.user.id,
      items: items.map(item => ({
        product: item._id, // Reference to the original product
        name: item.name,   // Snapshot of name
        price: item.price, // Snapshot of price
        quantity: item.quantity || 1
      })),
      totalAmount: total,
      status: 'paid', // Simulating successful payment state
    });

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}