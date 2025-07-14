import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
{
    alias: String,
    page: Object
}, 
{ 
    strict: false,           // разрешает любые поля, даже не описанные в схеме
    collection: "page"     // явно указывает коллекцию
    }
);

export const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);