import { auth } from "@/auth"; // Precisamos saber QUEM comprou
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    // 1. Verifica se o usuário está logado (pra saber quem é o dono do pedido)
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectToDatabase();

    // 2. Recebe os dados do carrinho
    const { items, total } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3. Cria o Pedido no Banco
    const newOrder = await Order.create({
      user: session.user.id, // ID do usuário logado
      items: items.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1
      })),
      totalAmount: total,
      status: 'paid', // Como é simulado, já nasce pago
    });

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}