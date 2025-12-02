import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // 1. Segurança (Só logado compra)
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();

    // 2. Transforma nossos produtos no formato que o Stripe entende (Line Items)
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd", // Moeda
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : [], // O Stripe mostra a foto no checkout!
        },
        // O Stripe trabalha com centavos! $10.00 vira 1000.
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity || 1,
    }));

    // 3. Cria a Sessão de Pagamento no Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      // Para onde ir depois?
      success_url: `${process.env.AUTH_URL}/success`, 
      cancel_url: `${process.env.AUTH_URL}/cart`,
      // Metadados: Guardamos o ID do usuário para saber quem comprou depois (no Webhook)
      metadata: {
        userId: session.user.id,
      },
    });

    // 4. Retorna a URL segura do Stripe para o frontend
    return NextResponse.json({ url: stripeSession.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}