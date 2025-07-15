import { NextResponse } from "next/server";
import { connectMongo } from "@/app/services/mongoService";
import { httpService } from "@/app/services/httpService";
import { API } from "../api";
import { Page } from "@/app/dbSchemas/pageSchema";

async function ensureAliasUniqueIndex() {
  const indexes = await Page.collection.indexes();
  const hasAliasUnique = indexes.some(
    (idx) => idx.key && idx.key.alias === 1 && idx.unique
  );
  if (!hasAliasUnique) {
    await Page.collection.createIndex({ alias: 1 }, { unique: true });
  }
}

export async function GET(req: Request) {
  await connectMongo();
  await ensureAliasUniqueIndex(); 
  const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_DOMAIN_LOCAL);
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
  await ensureAliasUniqueIndex(); 
  const { alias } = await req.json();
  console.log("alias из POST", alias);

  const page = await Page.findOne({ alias });
  if (page) {
    return NextResponse.json(page.page, { status: 200 });
  } else {
    const fetchedPage = await request(API.topPage.byAlias + alias);
    const result = await Page.findOneAndUpdate(
      { alias },
      { $set: { alias, page: fetchedPage } },
      { upsert: true, new: true }
    );
    return NextResponse.json(result?.page || fetchedPage, { status: 200 });
  }
}
