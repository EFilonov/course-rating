import { Products } from "../dbSchemas/productsSchema";
import { fixDoubleHttp } from "../helpers/fixDoubleHttp";
import { connectMongo } from "../services/mongoService";

export const getImageLinks = async (): Promise<string[]> => {
    await connectMongo();
    const imgLinks = await Products.aggregate([
        { $unwind: "$products" },
        { $group: { _id: "$products.image" } }
    ]);
    const linkArray = imgLinks.map(link => fixDoubleHttp(link._id));
    return linkArray;
};   