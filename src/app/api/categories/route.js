import { auth } from "@/auth";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";

export async function POST(req) {
  try {
    // 1. Admin Guard
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { name, description } = await req.json();

    // Basic Validation
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    // 2. Create Category
    const newCategory = await Category.create({
      name,
      description,
    });

    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    console.error("Category Creation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // 1. Admin Guard
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    // 2. Delete Operation
    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // 1. Admin Guard
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id, name, description } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    // 2. Update Operation
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true } 
    );

    return NextResponse.json(updatedCategory, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error updating category" }, { status: 500 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    // Fetch Single Category
    const category = await Category.findById(id);
    return NextResponse.json(category);
  } else {
    // Fetch All Categories
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
  }
}