import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Product from "../models/Product";
import connectDB from "../utils/connectDB";
import { ProductsType } from "../types/products.type";
import { useContext, useState } from "react";
import { Store } from "../utils/Store";
import { ProductType } from "../types/product.type";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

export default function Home({ products }: { products: ProductsType }) {
  const { push } = useRouter();
  const { dispatch, state } = useContext(Store);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const addToCartHandler = (product: ProductType) => {
    try {
      const existProduct = state.cart.cartItems.find(
        (item: ProductType) => item._id === product._id
      );
      const quantity = existProduct ? existProduct.quantity + 1 : 1;
      quantity > product.countInStock
        ? setOpenSnackbar(true)
        : dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
          });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
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
                <Button
                  onClick={() => addToCartHandler(product)}
                  size="small"
                  color="primary"
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          Out Of Stock!
        </Alert>
      </Snackbar>
    </Layout>
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
