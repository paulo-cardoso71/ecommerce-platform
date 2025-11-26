import { auth } from "@/auth"; // Para verificar quem é
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";

export async function POST(req) {

  try {

    // 1. Verificação de Segurança (Só Admin pode criar)
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Conectar ao Banco
    await connectToDatabase();

    // 3. Ler os dados que o formulário enviou
    const { name, description } = await req.json();

    // Validação simples
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // 4. Criar a Categoria no Banco
    const newCategory = await Category.create({
      name,
      description,
    });

    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
    await Category.findByIdAndDelete(id);

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
    const { id, name, description } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // 4. Atualizar no Banco
    // findByIdAndUpdate(QUEM, O_QUE_MUDAR, { new: true }) -> o new: true retorna o dado atualizado
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true } 
    );

    return NextResponse.json(updatedCategory, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  
  // Verifica se tem ?id=123 na URL
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    // Se tem ID, busca só um
    const category = await Category.findById(id);
    return NextResponse.json(category);
  } else {
    // Se não tem ID, busca todos (para outros usos se precisar)
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
  }
}