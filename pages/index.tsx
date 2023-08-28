import {
  Box,
  Button,
  Grid,
  Stack,
  Container,
  Typography,
  useTheme,
  Modal,
} from "@mui/material";
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
import { FiDivideSquare, FiPackage } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import SwiperSlider from "../components/swiper/SwiperSlider";
import ProductItem from "../components/productItem/ProductItem";
import QuickView from "../components/modals/quickView/QuickView";
import { useState } from "react";
import { ProductType } from "../types/product.type";

Home.title = "Home Page|Shop Next";
Home.description = "Next shop is the best online shop for buy clothes";
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
  const theme = useTheme();
  const [quickModal, setQuickModal] = useState<{
    modal: boolean;
    product: ProductType | null;
  }>({
    modal: false,
    product: null,
  });

  return (
    <Box>
      <QuickView
        product={quickModal.product}
        quickModal={quickModal}
        setQuickModal={setQuickModal}
      />
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
        <SwiperSlide className="!relative !w-full !h-[400px] sm:!h-[500px] md:!h-[600px] lg:!h-[700px] ">
          <Image
            src={c1}
            alt="c1"
            className="absolute w-full h-full object-cover"
          />
          <Box className="flex flex-col items-center justify-center space-y-4 w-full h-full absolute">
            <Typography fontSize={17} fontWeight={700} color={"black"}>
              Limited Time Offer
            </Typography>
            <p className="text-[30px] text-black font-[700] sm:text-[40px] md:text-[50px]">
              Winter-Spring!
            </p>
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
          </Box>
        </SwiperSlide>
        <SwiperSlide className="!relative !w-full !h-[400px] sm:!h-[500px] md:!h-[600px] lg:!h-[700px] ">
          <Image
            src={c2}
            alt="c2"
            className="absolute w-full h-full object-cover"
          />
          <Box className="flex flex-col items-start justify-center space-y-3 w-full h-full absolute left-[50px]">
            <Typography fontSize={18} fontWeight={700} color={"black"}>
              Buy Now From This Shop
            </Typography>
            <p className="text-[30px] font-[700] text-black sm:text-[40px] md:text-[50px]">
              New Season Canvas
            </p>
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
          </Box>
        </SwiperSlide>
        <SwiperSlide className="!relative !w-full !h-[400px] sm:!h-[500px] md:!h-[600px] lg:!h-[700px] ">
          <Image
            src={c3}
            alt="c3"
            className="absolute w-full h-full object-cover"
          />
          <Box className="flex flex-col items-start justify-center space-y-3 w-full h-full absolute left-[50px]">
            <Typography fontSize={18} fontWeight={700} color={"black"}>
              Exclusive Offer
            </Typography>
            <p className="text-[30px] text-black font-[700] sm:text-[40px] md:text-[50px]">
              Spring-Show!
            </p>
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
          </Box>
        </SwiperSlide>
      </Swiper>

      <Container sx={{ minHeight: "85vh", paddingY: "20px" }} maxWidth="lg">
        <Stack className="flex flex-col justify-center items-center mt-16 mb-10">
          <Typography color={"primary"} fontWeight={700} pb={"16px"}>
            See Our Collection
          </Typography>
          <p className="font-[500] text-[24px] sm:text-[30px]">
            Recent Products
          </p>
        </Stack>
        <Grid container spacing={3} mb={"60px"}>
          {products.map((product, index) => (
            <Grid item xs={6} sm={4} md={3} key={product.slug + index}>
              <ProductItem product={product} setQuickModal={setQuickModal} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box className="bg-[url('/images/banner.jpg')] bg-cover bg-no-repeat bg-fixed w-full !h-[400px] sm:!h-[500px] md:!h-[600px] lg:!h-[700px] relative flex flex-col justify-center items-start">
        <Box
          className={`border ${
            theme.palette.mode === "dark" ? "border-[#121212]" : "border-white"
          } rounded-lg w-[268px] sm:w-[348px] md:w-[388px] lg:w-[448px] h-[268px] sm:h-[328px] absolute  left-10 flex flex-col justify-center items-center`}
        >
          <Box
            className={`${
              theme.palette.mode === "dark" ? "bg-[#121212]" : "bg-white"
            } w-60 sm:w-80 md:w-[360px] lg:w-[420px] h-[240px] sm:h-[300px] absolute rounded-lg flex flex-col justify-center items-center p-8`}
          >
            <Typography fontSize={"16px"} fontWeight={600} color="primary.main">
              Limited Time Offer!
            </Typography>
            <p className="text-[32px] md:text-[42px] font-[600]">-40% OFF </p>
            <Typography fontSize={"14px"} fontWeight={500}>
              Get The Best Deals Now
            </Typography>
            <Button
              variant="contained"
              color={"primary"}
              style={{ marginTop: "16px" }}
              LinkComponent={Link}
              href="/shop"
            >
              Discover Now
            </Button>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <p className="text-[24px] sm:text-[30px] mb-[35px] mt-[80px] text-center">
          Our Services
        </p>
        <SwiperSlider
          {...{
            spaceBetween: 30,
            breakpoints: {
              1024: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
            },
          }}
          items={services.map((item, index) => (
            <SwiperSlide key={item.text + index}>
              <Box className="flex flex-col justify-center items-center ">
                <Box className="bg-gray-200 mb-4  rounded-full w-24 h-24 hover:bg-[#2196f3] hover:text-white transition-colors duration-700 text-slate-700 flex flex-col justify-center items-center ">
                  {item.icon}
                </Box>
                <Typography fontSize={"18px"} className="text-center">
                  {item.text}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        />

        <p className="text-[24px] sm:text-[30px] mt-[80px] mb-[35px] text-center">
          FOLLOW US ON INSTAGRAM
        </p>
      </Container>

      <SwiperSlider
        {...{
          spaceBetween: 0,
          breakpoints: {
            1024: {
              slidesPerView: 8,
            },
            768: {
              slidesPerView: 6,
            },
            640: {
              slidesPerView: 4,
            },
            400: {
              slidesPerView: 2,
            },
          },
        }}
        items={Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11).map((item, index) => (
          <SwiperSlide key={item + index}>
            <div
              style={{
                backgroundImage: `url(/images/instagram/img${item}.jpg)`,
              }}
              className={`bg-cover bg-no-repeat h-[200px] group`}
            >
              <Box className="w-full h-full bg-black/0 group-hover:bg-black/50 relative flex flex-col justify-center items-center transition-all duration-500">
                <BsInstagram className="opacity-0 group-hover:opacity-100 absolute transition-all duration-500 text-[36px]" />
              </Box>
            </div>
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
