import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";

import { httpService } from "@/app/services/httpService";
import { API } from "../api";
import { Page } from "@/app/dbSchemas/pageSchema";

export async function GET(req: Request) {
  await connectMongo();
  const { searchParams } = new URL( req.url, process.env.NEXT_PUBLIC_DOMAIN_LOCAL);
  const alias = searchParams.get("alias");
  const page = await Page.find(
    { alias: alias },
    { page: 1, _id: 0 }
  );
    if (!page || page.length === 0) {
      return NextResponse.json([], { status: 404 });
    } else if (page.length > 0) {
      return NextResponse.json(page[0]?.page, { status: 200 });
    }
}

export async function POST(req: Request) {
  const { request } = httpService();
  await connectMongo();
  const { alias } = await req.json();
  console.log('alias из POST', alias);

  // Создаем уникальный индекс для поля alias, если еще не создан
  await Page.collection.createIndex({ alias: 1 }, { unique: true });

  const page = await Page.findOne({ alias });
  if (page) {
    return Response.json(page.page, { status: 200 });
  } else {
    const fetchedPage = await request(API.topPage.byAlias + alias);
    const result = await Page.findOneAndUpdate(
      { alias },
      { $set: { alias, page: fetchedPage } },
      { upsert: true, new: true }
    );
    return Response.json(result.value?.page || fetchedPage, { status: 200 });
  }
}
