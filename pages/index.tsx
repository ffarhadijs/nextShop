import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Product from "../models/Product";
import connectDB from "../utils/connectDB";
import { products } from "../types/products.type";

export default function Home({ products }: { products: products }) {
  return (
    <Box>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={4} md={3} key={product.slug + index}>
            <Card>
              <Link href={`product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="auto"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Typography>{product.price} $</Typography>
                <Button size="small" color="primary">
                  {" "}
                  Add To Cart{" "}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    await connectDB();
    const products = await Product.find({});
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
