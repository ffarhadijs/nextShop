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
  Modal,
} from "@mui/material";
import Link from "next/link";
import { ProductType } from "../../types/product.type";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import toast from "react-hot-toast";
import { MouseEvent, useContext, useState } from "react";
import { Store } from "../../utils/Store";
import QuickView from "../modals/quickView/QuickView";

export default function ProductItem({ product }: { product: ProductType }) {
  const { dispatch, state } = useContext(Store);
  const [quickViewModal, setQuickViewModal] = useState<boolean>(false);
  const [quickProduct, setQuickProduct] = useState<ProductType>();

  const quickViewHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    product: ProductType
  ) => {
    e.stopPropagation();
    setQuickViewModal(true);
    setQuickProduct(product);
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
      <Modal open={quickViewModal} onClose={() => setQuickViewModal(false)}>
        <QuickView product={quickProduct} />
      </Modal>
      <Card className="group/card">
        <CardActionArea>
          <Box className="group/cardAction overflow-hidden relative ">
            <Link href={`product/${product.slug}`}>
              <CardMedia
                className="duration-200 group-hover/cardAction:scale-110 h-64"
                component="img"
                image={product.image}
                alt={product.name}
              />
            </Link>
            <Box className="flex flex-col w-auto h-auto space-y-2 absolute top-2 right-0 opacity-0 group-hover/cardAction:right-4 group-hover/cardAction:opacity-100 transition-all duration-300">
              <Tooltip title="Add to Wishlist">
                <Box
                  className="text-gray-500 bg-white rounded-full hover:bg-[#2196f3] hover:text-white p-[1px] transition-colors duration-500"
                  onClick={(e) => wishListHandler(e, product)}
                >
                  {state.wishList.withListItems.findIndex(
                    (item) => item._id === product._id
                  ) === -1 ? (
                    <FavoriteBorderIcon />
                  ) : (
                    <FavoriteIcon color="error" />
                  )}
                </Box>
              </Tooltip>
              <Tooltip title="Add to Cart">
                <Box
                  className="text-gray-500 bg-white rounded-full hover:bg-[#2196f3] hover:text-white p-[1px] transition-colors duration-500"
                  onClick={(e) => addToCartHandler(product, e)}
                >
                  <AddShoppingCartIcon />
                </Box>
              </Tooltip>
              <Tooltip title="Quick View">
                <Box
                  className="text-gray-500 bg-white rounded-full hover:bg-[#2196f3] hover:text-white p-[1px] transition-colors duration-500"
                  onClick={(e) => quickViewHandler(e, product)}
                >
                  <SearchIcon />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </CardActionArea>
        <CardContent className="p-2 pt-4">
          <Typography
            component={Link}
            href={`product/${product.slug}`}
            className="text-[15px] font-bold"
            sx={{
              transition: "all 0.2s",
              ":hover": {
                color: "primary.main",
              },
            }}
          >
            {product.name}
          </Typography>
        </CardContent>

        <CardActions className="flex flex-row justify-between relative">
          <Typography>$ {product.price} </Typography>
          <Button
            onClick={(e) => addToCartHandler(product, e)}
            size="small"
            color="primary"
            className="group-hover/card:opacity-100 opacity-0 absolute -right-10 bottom-2 group-hover/card:right-2 transition-all duration-500"
          >
            Add To Cart
          </Button>
          <Rating
            value={product?.rating!}
            precision={0.1}
            readOnly
            size="small"
            className="group-hover/card:opacity-0 opacity-100 absolute right-2 bottom-3 group-hover/card:-right-10 transition-all duration-500"
          />
        </CardActions>
      </Card>
    </Box>
  );
}