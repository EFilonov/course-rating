import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";
import { Menu } from "@/app/dbSchemas/menuSchema";
import { httpService } from "@/app/services/httpService";
import { API } from "../api";

export async function GET(req: Request) {
  await connectMongo();
  const { searchParams } = new URL( req.url, process.env.NEXT_PUBLIC_DOMAIN_LOCAL);
  const category = searchParams.get("category");
  const menus = await Menu.find(
    { firstCategory: category },
    { menu: 1, _id: 0 }
  );
    if (!menus || menus.length === 0) {
      return NextResponse.json([], { status: 404 });
    } else if (menus.length > 0) {
      console.log('Меню получено c внутреннего API');
      return NextResponse.json(menus[0]?.menu, { status: 200 });
    }
}

export async function POST(req: Request) {
  const { request } = httpService();
  console.log('Меню получено c внешнего API');
  await connectMongo();
  const {firstCategory} = await req.json();
  const existingMenu = await Menu.findOne({ firstCategory });
    if (existingMenu) { 
     return Response.json(existingMenu.menu, { status: 200 });
    } else {
  const menu = await request(API.topPage.find, 'POST', JSON.stringify({ firstCategory }));
  Menu.insertOne({firstCategory, menu });
  return Response.json(menu, { status: 200 });
  }
}
