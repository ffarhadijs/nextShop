import Product from "../../models/Product";
import connectDB from "../../utils/connectDB";
import data from "../../utils/data";

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
    return;
  }
  try {
    await Product.deleteMany();
    await Product.insertMany(data.products);
    res.status(201).json({ status: "seeded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Error in get products" });
    return;
  }
}
