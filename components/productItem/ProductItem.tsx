import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { ProductType } from "../../types/product.type";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineAddShoppingCart,
} from "react-icons/md";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import toast from "react-hot-toast";
import { Dispatch, MouseEvent, SetStateAction, useContext } from "react";
import { Store } from "../../utils/Store";

export default function ProductItem({
  product,
  setQuickModal,
}: {
  product: ProductType;
  setQuickModal?: Dispatch<
    SetStateAction<{
      modal: boolean;
      product: ProductType | null;
    }>
  >;
}) {
  const { dispatch, state } = useContext(Store);

  const quickViewHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    product: ProductType
  ) => {
    e.stopPropagation();
    setQuickModal!({ product, modal: true });
  };

  const addToCartHandler = (
    product: ProductType,
    e: MouseEvent<HTMLDivElement | HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      const existProduct = state.cart.cartItems.find(
        (item: ProductType) => item._id === product._id
      );
      const quantity = existProduct ? existProduct.quantity + 1 : 1;
      quantity > product.countInStock
        ? toast.error("No Available Product")
        : dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
          });
    } catch (error) {
      console.log(error);
    }
  };

  const wishListHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    product: ProductType
  ) => {
    e.stopPropagation();
    dispatch({
      type: "WISHLIST_ADD_ITEM",
      payload: product,
    });
  };

  return (
    <Box>
      <Card className="group/card">
        <CardActionArea className=" h-40 sm:h-48 md:h-56">
          <Box className="group/cardAction overflow-hidden relative ">
            <Link href={`shop/${product.slug}`}>
              <CardMedia
                className="duration-200 group-hover/cardAction:scale-110 h-40 sm:h-48 md:h-56"
                component="img"
                image={product.image}
                alt={product.name}
              />
            </Link>
            <Box className="flex flex-col w-auto h-auto space-y-2 absolute top-2 right-0 opacity-0 group-hover/cardAction:right-4 group-hover/cardAction:opacity-100 transition-all duration-300">
              <Tooltip title="Add to Wishlist">
                <Box
                  className="text-gray-500 bg-white rounded-full w-max h-auto flex items-center justify-center hover:bg-[#2196f3] hover:text-white p-[2px] transition-colors duration-500"
                  onClick={(e) => wishListHandler(e, product)}
                >
                  {state.wishList.withListItems.findIndex(
                    (item) => item._id === product._id
                  ) === -1 ? (
                    <MdFavoriteBorder size={22} />
                  ) : (
                    <MdFavorite color="red" size={22} />
                  )}
                </Box>
              </Tooltip>
              <Tooltip title="Add to Cart">
                <Box
                  className="text-gray-500 bg-white rounded-full w-max h-auto flex items-center justify-center hover:bg-[#2196f3] hover:text-white p-[2px] transition-colors duration-500"
                  onClick={(e) => addToCartHandler(product, e)}
                >
                  <MdOutlineAddShoppingCart size={22} />
                </Box>
              </Tooltip>
              <Tooltip title="Quick View">
                <Box
                  className="text-gray-500 bg-white rounded-full w-max h-auto flex items-center justify-center hover:bg-[#2196f3] hover:text-white p-[2px] transition-colors duration-500"
                  onClick={(e) => quickViewHandler(e, product)}
                >
                  <HiMiniMagnifyingGlass size={22} />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </CardActionArea>
        <Box className="p-2 pt-4">
          <Link
            href={`shop/${product.slug}`}
            className="text-[15px] font-bold hover:text-[#2196f3] transition-colors duration-200"
          >
            {product.name}
          </Link>
        </Box>

        <Box className="flex flex-row p-2 justify-between items-center relative">
          <Typography>$ {product.price} </Typography>
          <button
            onClick={(e) => addToCartHandler(product, e)}
            className="group-hover/card:opacity-100 text-[#2196f3] text-[14px] px-[6px] py-[2px] rounded-sm hover:bg-[#2195f331] opacity-0 absolute -right-10 bottom-2 group-hover/card:right-2 transition-all duration-500"
          >
            ADD TO CART
          </button>
          <span className="group-hover/card:opacity-0 opacity-100 absolute right-2 bottom-2 group-hover/card:-right-10 transition-all duration-500">
            <Rating
              value={product?.rating!}
              precision={0.1}
              readOnly
              size="small"
            />
          </span>
        </Box>
      </Card>
    </Box>
  );
}
