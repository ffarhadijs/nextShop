import { Box, Grid, Typography, Stack, Rating, Button } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import { Store } from "../../../utils/Store";
import { useRouter } from "next/router";

export default function QuickView({ product }: { product: any }) {
  const { dispatch, state } = useContext(Store);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const { push } = useRouter();

  const addToCartHandler = () => {
    try {
      const existProduct = state.cart.cartItems.find(
        (item: any) => item._id === product._id
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
  const buyItNowHandler = () => {
    try {
      const existProduct = state.cart.cartItems.find(
        (item: any) => item._id === product._id
      );
      const quantity = existProduct ? existProduct.quantity + 1 : 1;
      quantity > product.countInStock
        ? setOpenSnackbar(true)
        : dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
          });
      push("/shipping");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
    width={{xs:350 ,sm:500 ,md:800}}
      className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  border-[2px] border-solid border-black shadow-lg `}
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          className="flex flex-col justify-center items-center"
        >
          <Image
            className="w-full h-full object-fill"
            src={product?.image!}
            alt={product?.name!}
            width={450}
            height={450}
          />
        </Grid>
        <Grid item xs={12} md={6} p={3}>
          <Typography fontWeight={700} component={"h1"} variant="h5" mb={1}>
            {product?.name!}
          </Typography>
          <Typography
            fontWeight={700}
            fontSize={"16px"}
            color={"primary"}
            my={1}
          >
            $ {product?.price}
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"start"}
            columnGap={1}
            my={1}
          >
            <Rating
              value={product?.rating!}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography fontSize={"12px"}>
              {" "}
              ({product?.numReviews} Reviews){" "}
            </Typography>
          </Stack>
          <Typography variant="h6" my={1} fontSize={"16px"} className="">
            Products Type:
            <Typography component="span" fontSize={"14px"}>
              {" "}
              {product?.category!}{" "}
            </Typography>
          </Typography>
          <Typography variant="h6" my={1} fontSize={"16px"}>
            Brand:
            <Typography component="span" fontSize={"14px"}>
              {" "}
              {product?.brand!}{" "}
            </Typography>
          </Typography>
          <Typography variant="h6" my={1} fontSize={"16px"}>
            Availability:
            <Typography component={"span"} fontSize={"14px"}>
              {" "}
              {product?.countInStock!}
            </Typography>
          </Typography>
          <Typography variant="h6" my={1} fontSize={"16px"}>
            Description:
            <Typography component={"span"} fontSize={"14px"}>
              {" "}
              {product?.description!}
            </Typography>
          </Typography>

          <Box className="flex flex-row space-x-8 w-full mt-4">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addToCartHandler}
              className="bg-[#2196f3]"
            >
              Add To Cart
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={buyItNowHandler}
              className="bg-[#2196f3]"
            >
              Buy It Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
