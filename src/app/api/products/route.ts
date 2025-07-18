import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";
import { Products } from "@/app/dbSchemas/productsSchema";
import { httpService } from "@/app/services/httpService";
import { API } from "../api";
import type { NextRequest } from 'next/server';

async function ensureCategoryUniqueIndex() {
  const indexes = await Products.collection.indexes();
  const hasCategoryUnique = indexes.some(
    idx => idx.key && idx.key.category === 1 && idx.unique
  );
  if (!hasCategoryUnique) {
    await Products.collection.createIndex({ category: 1 }, { unique: true });
  }
}

export async function GET(req: NextRequest) {
  await connectMongo();
  await ensureCategoryUniqueIndex(); 
  const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_DOMAIN_LOCAL);
  const category = searchParams.get("category");
  const products = await Products.find(
    { category: category },
    { products: 1, _id: 0 }
  );
  if (!products || products.length === 0) {
    return NextResponse.json([], { status: 404 });
  } else if (products.length > 0) {
    return NextResponse.json(products[0].products, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const { request } = httpService();

+  await connectMongo();
  await ensureCategoryUniqueIndex(); 
  const { category } = await req.json();
  const existingProducts = await Products.findOne({ category });
  if (existingProducts) { 
    return NextResponse.json(existingProducts.products, { status: 200 });
  } else {
    const products = await request(API.product.find, 'POST', JSON.stringify({ category: category, limit: 10 }));
    await Products.create({ category, products });
    return NextResponse.json(products, { status: 200 });
  }
}