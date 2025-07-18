import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";
import { Menu } from "@/app/dbSchemas/menuSchema";
import { httpService } from "@/app/services/httpService";
import { API } from "../api";
import type { NextRequest } from 'next/server';

async function ensureCategoryUniqueIndex() {
  const indexes = await Menu.collection.indexes();
  const hasCategoryUnique = indexes.some(
    idx => idx.key && idx.key.firstCategory === 1 && idx.unique
  );
  if (!hasCategoryUnique) {
    await Menu.collection.createIndex({ firstCategory: 1 }, { unique: true });
  }
}

export async function GET(req: NextRequest) {
  await connectMongo();
  await ensureCategoryUniqueIndex(); 
  const { searchParams } = new URL( req.url, process.env.NEXT_PUBLIC_DOMAIN_LOCAL);
  const category = searchParams.get("category");
  const menus = await Menu.find(
    { firstCategory: category },
    { menu: 1, _id: 0 }
  );
    if (!menus || menus.length === 0) {
      return NextResponse.json([], { status: 404 });
    } else if (menus.length > 0) {
      return  NextResponse.json(menus[0]?.menu, { status: 200 });
    }
}

export async function POST(req: NextRequest) {
  const { request } = httpService();
  await connectMongo();
  await ensureCategoryUniqueIndex();
  const { firstCategory } = await req.json();
  const existingMenu = await Menu.findOne({ firstCategory });
  if (existingMenu) { 
    return NextResponse.json(existingMenu.menu, { status: 200 });
  } else {
    const menu = await request(API.topPage.find, 'POST', JSON.stringify({ firstCategory }));
    await Menu.create({ firstCategory, menu });
    return NextResponse.json(menu, { status: 200 });
  }
}
