import { downloadImages } from "@/app/utils/downloadImages";
import { getImageLinks } from "@/app/utils/getImageLinks";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const imagesDir = path.join(process.cwd(), "public", "Images", "products");
const flagPath = path.join(imagesDir, ".images_downloaded");

export async function GET() {
    // Если папка уже существует и не пуста, ничего не делаем
    if (fs.existsSync(imagesDir) && fs.readdirSync(imagesDir).length > 0) {
        return NextResponse.json({ success: false, message: "Images folder already exists and is not empty" });
    }
    if (fs.existsSync(flagPath)) {
        return NextResponse.json({ success: false, message: "Images already downloaded" });
    }
    const links = await getImageLinks();
    await downloadImages(links, imagesDir);
    fs.writeFileSync(flagPath, "done");
    return NextResponse.json({ success: true });
}