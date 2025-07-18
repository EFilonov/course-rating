import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";
import { Products } from "@/app/dbSchemas/productsSchema";
import type { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  await connectMongo();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const product = await Products.findOne({ "products._id": id }, { "products.$": 1 });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product.products[0].reviews, { status: 200 });
}



export async function POST(req: NextRequest) {
  await connectMongo();
  
  const { name, title, description, rating, createdAt, id} = await req.json();

  const addReview = await Products.findOneAndUpdate(
    { "products._id": id },
    {
      $push: {
        "products.$.reviews": { name, title, description, rating, createdAt }
      }
    },
    { new: true }
  );
  return NextResponse.json(addReview, { status: 200 });
}
