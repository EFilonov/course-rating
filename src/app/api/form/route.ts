import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";
import { Products } from "@/app/dbSchemas/productsSchema";
import type { NextRequest } from 'next/server';


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
