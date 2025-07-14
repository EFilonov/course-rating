import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
{
    firstCategory: Number,
    menu: Array
  }, 
{ 
    strict: false,           // разрешает любые поля, даже не описанные в схеме
    collection: "menu"     // явно указывает коллекцию
    }
);

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);