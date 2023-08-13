import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Container,
  Typography,
  Rating,
  Tooltip,
  Modal,
} from "@mui/material";
import Link from "next/link";
import Product from "../models/Product";
import connectDB from "../utils/connectDB";
import { ProductsType } from "../types/products.type";
import { MouseEvent, useContext, useState } from "react";
import { Store } from "../utils/Store";
import { ProductType } from "../types/product.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import c1 from "../public/images/carousel (1).jpg";
import c2 from "../public/images/carousel (2).jpg";
import c3 from "../public/images/carousel (3).jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import SwiperSlider from "../components/swiper/SwiperSlider";
import QuickView from "../components/modals/quickView/QuickView";
import toast from "react-hot-toast";

const services = [
  {
    text: "Easy Return Policy",
    icon: <AssignmentReturnOutlinedIcon style={{ fontSize: "50px" }} />,
  },
  {
    text: "Secure Payment Methods",
    icon: <PaymentOutlinedIcon style={{ fontSize: "50px" }} />,
  },
  {
    text: "24/7 Customer Support",
    icon: <SupportAgentOutlinedIcon style={{ fontSize: "50px" }} />,
  },
  {
    text: "Free Shipping World Wide",
    icon: <LocalShippingOutlinedIcon style={{ fontSize: "50px" }} />,
  },
  {
    text: "Weekend Discound Coupon",
    icon: <DiscountOutlinedIcon style={{ fontSize: "50px" }} />,
  },
  {
    text: "Track Your Package",
    icon: <PersonPinCircleOutlinedIcon style={{ fontSize: "50px" }} />,
  },
];

export default function Home({ products }: { products: ProductsType }) {
  const [quickViewModal, setQuickViewModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>();
  const { dispatch, state } = useContext(Store);

  const quickViewHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    product: ProductType
  ) => {
    e.stopPropagation();
    setQuickViewModal(true);
    setProduct(product);
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
        <QuickView product={product} />
      </Modal>
      <Swiper
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        slidesPerView={1}
      >
        <SwiperSlide
          style={{ position: "relative", width: "100%", height: "700px" }}
        >
          <Image
            src={c1}
            alt="c1"
            style={{
              position: "absolute",
              width: "100%",
              height: "700px",
            }}
          />
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={"15px"}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Typography fontSize={17} fontWeight={700} color={"black"}>
              Limited Time Offer
            </Typography>
            <Typography fontSize={50} fontWeight={700} color={"black"}>
              Winter-Spring!
            </Typography>
            <Typography fontSize={16} fontWeight={400} color={"black"}>
              Take 20% Off
            </Typography>
            <Button
              variant="contained"
              color={"primary"}
              LinkComponent={Link}
              href="/shop"
            >
              Go Shopping
            </Button>
          </Stack>
        </SwiperSlide>
        <SwiperSlide style={{ position: "relative" }}>
          <Image
            src={c2}
            alt="c2"
            style={{ position: "absolute", width: "100%", height: "700px" }}
          />
          <Stack
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            spacing={"10px"}
            style={{
              position: "absolute",
              top: "230px",
              left: "50px",
            }}
          >
            <Typography fontSize={18} fontWeight={700} color={"black"}>
              Buy Now From This Shop
            </Typography>
            <Typography fontSize={55} fontWeight={700} color={"black"}>
              New Season Canvas
            </Typography>
            <Typography fontSize={16} fontWeight={400} color={"black"}>
              Take 20% Off
            </Typography>
            <Button
              variant="contained"
              color="primary"
              LinkComponent={Link}
              href="/shop"
            >
              Go Shopping
            </Button>
          </Stack>
        </SwiperSlide>
        <SwiperSlide style={{ position: "relative" }}>
          <Image
            src={c3}
            alt="c3"
            style={{ position: "absolute", width: "100%", height: "700px" }}
          />
          <Stack
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            spacing={"10px"}
            style={{
              position: "absolute",
              top: "230px",
              left: "50px",
            }}
          >
            <Typography fontSize={18} fontWeight={700} color={"black"}>
              Exclusive Offer
            </Typography>
            <Typography fontSize={55} fontWeight={700} color={"black"}>
              Spring-Show!
            </Typography>
            <Typography fontSize={16} fontWeight={400} color={"black"}>
              Take 20% Off
            </Typography>
            <Button
              variant="contained"
              color="primary"
              LinkComponent={Link}
              href="/shop"
            >
              Go Shopping
            </Button>
          </Stack>
        </SwiperSlide>
      </Swiper>

      <Container sx={{ minHeight: "85vh", paddingY: "20px" }} maxWidth="lg">
        <Stack className="flex flex-col justify-center items-center mt-16 mb-10">
          <Typography color={"primary"} className="font-bold pb-4">
            See Our Collection
          </Typography>
          <Typography className="font-[500] text-[30px]">
            Recent Products
          </Typography>
        </Stack>
        <Grid container spacing={3} mb={"60px"}>
          {products.map((product, index) => (
            <Grid item xs={6} sm={4} md={3} key={product.slug + index}>
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
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box className="bg-[url('/images/banner.jpg')] bg-cover bg-no-repeat bg-fixed w-full h-[600px] relative">
        <Box className="border border-white rounded-lg w-[488px] h-[328px] absolute top-20 left-10 flex flex-col justify-center items-center">
          <Box className="bg-white w-[460px] h-[300px] absolute rounded-lg flex flex-col justify-center items-center p-8">
            <Typography fontSize={"16px"} fontWeight={600} color="primary.main">
              Limited Time Offer!
            </Typography>
            <Typography fontSize={"42px"} fontWeight={600} color="black">
              -40% OFF{" "}
            </Typography>
            <Typography fontSize={"14px"} fontWeight={500} color="black">
              Get The Best Deals Now
            </Typography>
            <Button
              variant="contained"
              color={"primary"}
              className="mt-4 bg-[#2196f3]"
            >
              Discover Now
            </Button>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Typography
          textAlign={"center"}
          mb={"35px"}
          mt={"80px"}
          fontSize={"24px"}
        >
          Our Services
        </Typography>
        <SwiperSlider
          {...{ slidesPerView: 4, spaceBetween: 30 }}
          items={services.map((item, index) => (
            <SwiperSlide key={item.text + index}>
              <Box className="flex flex-col justify-center items-center ">
                <Box className="bg-gray-200 mb-4 rounded-full w-24 h-24 hover:bg-[#2196f3] hover:text-white transition-colors duration-700 text-slate-700 flex flex-col justify-center items-center ">
                  {item.icon}
                </Box>
                <Typography fontSize={"18px"}>{item.text}</Typography>
              </Box>
            </SwiperSlide>
          ))}
        />

        <Typography
          textAlign={"center"}
          mb={"35px"}
          mt={"80px"}
          fontSize={"24px"}
        >
          FOLLOW US ON INSTAGRAM
        </Typography>
      </Container>

      <SwiperSlider
        {...{ slidesPerView: 6 }}
        items={Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11).map((item, index) => (
          <SwiperSlide key={item + index}>
            <Box
              className={`bg-[url('/images/instagram/img${item}.jpg')] bg-cover bg-no-repeat h-[200px] group`}
            >
              <Box className="w-full h-full bg-black/0 group-hover:bg-black/50 relative flex flex-col justify-center items-center transition-all duration-500">
                <InstagramIcon className="opacity-0 group-hover:opacity-100 absolute transition-all duration-500 text-[36px]" />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      />
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    await connectDB();
    const products = await Product.find({});
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)).reverse().splice(0, 8),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
