import { downloadImages } from "@/app/utils/downloadImages";
import { getImageLinks } from "@/app/utils/getImageLinks";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const flagPath = path.join(process.cwd(), "public", "Images", "products", ".images_downloaded");

export async function GET() {
    if (fs.existsSync(flagPath)) {
        return NextResponse.json({ success: false, message: "Images already downloaded" });
    }
    const links = await getImageLinks();
    await downloadImages(links, path.join(process.cwd(), 'public', 'Images', 'products'));
    fs.writeFileSync(flagPath, "done");
    return NextResponse.json({ success: true });
}