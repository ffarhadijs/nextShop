import {
  Box,
  Button,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import Product from "../../models/Product";
import connectDB from "../../utils/connectDB";
import { product } from "../../types/product.type";

const ProductDateils = ({ product }: { product: product }) => {
  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Image
            style={{ width: "100%" }}
            src={product?.image!}
            alt={product?.name!}
            width={450}
            height={450}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight={700} component={"h1"} variant="h4" my={3}>
            {product?.name!}
          </Typography>
          <Typography variant="h6" my={1}>
            {" "}
            Category:{" "}
            <Typography component="span"> {product?.category!} </Typography>
          </Typography>
          <Typography variant="h6" my={1}>
            {" "}
            Brand: <Typography component="span"> {product?.brand!} </Typography>
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"start"}
            columnGap={1}
            my={1}
          >
            <Rating value={product?.rating!} precision={0.1} readOnly />{" "}
            <Typography> ({product?.numReviews} Reviews) </Typography>
          </Stack>
          <Typography variant="h6" my={1}>
            {" "}
            Description:{" "}
            <Typography component={"span"}>
              {" "}
              {product?.description!}{" "}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 1.5, marginY: 3 }}>
            <Grid container my={1}>
              <Grid item xs={6}>
                <Typography fontWeight={600}>Price:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>${product?.price!}</Typography>
              </Grid>
            </Grid>

            <Grid container my={1}>
              <Grid item xs={6}>
                <Typography fontWeight={600}>Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {product?.countInStock! > 0 ? "In stock" : "Unavailable"}
                </Typography>
              </Grid>
            </Grid>

            <Button fullWidth variant="contained" color="primary">
              Add To Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDateils;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  await connectDB();
  const product = await Product.findOne({ slug });

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
