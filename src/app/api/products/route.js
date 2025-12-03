import { auth } from "@/auth";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category"; // Required for Mongoose .populate() hooks to work

export async function POST(req) {
  try {
    // Authorization Gate: Only Admins can create products
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    // Data Persistence
    const newProduct = await Product.create(data);
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error("Product Creation Error:", error);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // Authorization Check
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Query Parameter Extraction
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Database Operation
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    //Security Check
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    //Payload Extraction
    const { id, name, description, price, imageUrl, category, featured } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Atomic Update
    // { new: true } ensures we return the updated document, not the old one
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl, category, featured },
      { new: true } 
    );

    return NextResponse.json(updatedProduct, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    // Fetch Single Product
    const product = await Product.findById(id).populate('category');
    return NextResponse.json(product);
  } else {
    // Fetch All Products
    // .populate('category') joins the Category collection to include full category details (name, etc.) instead of just the ID
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    return NextResponse.json(products);
  }
}