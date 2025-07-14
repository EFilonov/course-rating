import { ca } from "date-fns/locale";
import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
{
    category: String,
    products: Array
}, 
{ 
    strict: false,           // разрешает любые поля, даже не описанные в схеме
    collection: "products"     // явно указывает коллекцию
    }
);

export const Products = mongoose.models.Products || mongoose.model("Products", productsSchema);