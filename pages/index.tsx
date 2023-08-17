import { Box, Button, Grid, Stack, Container, Typography } from "@mui/material";
import Link from "next/link";
import Product from "../models/Product";
import connectDB from "../utils/connectDB";
import { ProductsType } from "../types/products.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import c1 from "../public/images/carousel (1).jpg";
import c2 from "../public/images/carousel (2).jpg";
import c3 from "../public/images/carousel (3).jpg";
import { GiReturnArrow } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { TbWorldPin } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import SwiperSlider from "../components/swiper/SwiperSlider";
import ProductItem from "../components/productItem/ProductItem";

export const services = [
  {
    text: "Easy Return Policy",
    icon: <GiReturnArrow fontSize={50} />,
  },
  {
    text: "Secure Payment Methods",
    icon: <MdPayment fontSize={50} />,
  },
  {
    text: "24/7 Customer Support",
    icon: <BiSupport fontSize={50} />,
  },
  {
    text: "Free Shipping World Wide",
    icon: <TbWorldPin fontSize={50} />,
  },
  {
    text: "Weekend Discound Coupon",
    icon: <MdOutlineDiscount fontSize={50} />,
  },
  {
    text: "Track Your Package",
    icon: <FiPackage fontSize={50} />,
  },
];

export default function Home({ products }: { products: ProductsType }) {
  return (
    <Box>
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
              <ProductItem product={product} />
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
                <BsInstagram className="opacity-0 group-hover:opacity-100 absolute transition-all duration-500 text-[36px]" />
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
