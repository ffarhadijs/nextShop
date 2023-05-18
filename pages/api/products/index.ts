import Product from "../../../models/Product";
import connectDB from "../../../utils/connectDB";

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
    const products = await Product.find({});
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Error in get products" });
    return;
  }
}
