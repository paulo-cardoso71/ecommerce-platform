import { auth } from "@/auth";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category"; // Importante importar para o populate funcionar!

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    // Cria o produto
    const newProduct = await Product.create(data);
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // 1. Verificar Segurança
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Pegar o ID da URL (Ex: /api/categories?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    // 3. Deletar do Banco
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // 1. Segurança
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Conectar
    await connectToDatabase();

    // 3. Pegar os dados novos
    const { id, name, description, price, imageUrl, category } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // 4. Atualizar no Banco
    // findByIdAndUpdate(QUEM, O_QUE_MUDAR, { new: true }) -> o new: true retorna o dado atualizado
    const updatedCategory = await Product.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl, category },
      { new: true } 
    );

    return NextResponse.json(updatedCategory, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const product = await Product.findById(id).populate('category');
    return NextResponse.json(product);
  } else {
    // .populate('category') -> Troca o ID "65a..." pelo objeto real da categoria { name: "Sneakers" }
    // Isso é mágico na hora de mostrar a tabela!
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    return NextResponse.json(products);
  }
}