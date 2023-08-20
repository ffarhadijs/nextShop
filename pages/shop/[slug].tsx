import {
  Button,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  Box,
  useTheme,
  Container,
  Tabs,
  Tab,
  ButtonBase,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Product from "../../models/Product";
import connectDB from "../../utils/connectDB";
import { ProductType } from "../../types/product.type";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import { MdOutlineLocalShipping, MdOutlineEmail } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BsInstagram } from "react-icons/bs";
import SwiperSlider from "../../components/swiper/SwiperSlider";
import Shipping from "../../components/modals/shipping/Shipping";
import AskAboutProduct from "../../components/modals/askAboutProduct/AskAboutProduct";
import toast from "react-hot-toast";
import { GetServerSidePropsContext } from "next";
import { services } from "..";
import { tabsClasses } from "@mui/material/Tabs";
import Head from "next/head";
import BreadCrumbs from "../../components/breadCrumbs/BreadCrumbs";

const description = [
  "Fabric 1: 100% Polyester",
  "Fabric 3: 100% Polyester, Lining: 100% Polyester",
  "Fabric 2: 75% Polyester, 20% Viscose, 5% Elastane",
  "Fabric 2: 75% Polyester, 20% Viscose, 5% Elastane",
  "Fabric 3: 100% Polyester, Lining: 100% Polyester",
  "Fabric 1: 100% Polyester",
];
function createData(name: string, feature: string) {
  return { name, feature };
}

const rows = [
  createData("Color", "Blue, Purple, White"),
  createData("Size", "20, 24"),
  createData("Material", "100% Polyester"),
  createData("Height", "180 cm"),
  createData("Bust", "83 cm"),
  createData("Waist", "57 cm"),
  createData("Hips", "88 cm"),
  createData("Shipping", "Free"),
];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductDateils = ({ product }: { product: ProductType }) => {
  const [value, setValue] = useState(0);
  const [shippingModal, setShippingModal] = useState(false);
  const [askModal, setAskModal] = useState(false);
  const theme = useTheme();
  const { push } = useRouter();
  const { dispatch, state } = useContext(Store);

  const addToCartHandler = () => {
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const buyItNowHandler = () => {
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
      push("/shipping");
    } catch (error) {
      console.log(error);
    }
  };
  const wishListHandler = (product: ProductType) => {
    dispatch({
      type: "WISHLIST_ADD_ITEM",
      payload: product,
    });
  };

  const shippingHandler = () => {
    setShippingModal(true);
  };
  const askProductHandler = () => {
    setAskModal(true);
  };

  const details = [
    { title: "Products Type:", detail: product?.category! },
    { title: "Brand:", detail: product?.brand! },
    { title: "Availability:", detail: product?.countInStock! },
    { title: "Description:", detail: product?.description! },
  ];
  return (
    <>
    <BreadCrumbs/>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Shipping open={shippingModal} setOpen={setShippingModal} />
      <AskAboutProduct open={askModal} setOpen={setAskModal} />
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Image
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={product?.image!}
              alt={product?.name!}
              width={450}
              height={450}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              fontWeight={700}
              component={"h1"}
              mb={3}
              className="text-[24px] sm:text-[30px] "
            >
              {product?.name!}
            </Typography>
            <Typography
              fontWeight={700}
              fontSize={"16px"}
              color={"primary"}
              my={3}
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
              <Typography fontSize={"14px"}>
                {" "}
                ({product?.numReviews} Reviews){" "}
              </Typography>
            </Stack>
            {details.map((item, index) => (
              <Typography
                key={index}
                variant="h6"
                my={1}
                fontSize={"18px"}
                className=""
              >
                {item.title}
                <Typography component="span" fontSize={"15px"}>
                  {item.detail}
                </Typography>
              </Typography>
            ))}

            <Box className="flex flex-row space-x-4 text-[14px]">
              <ButtonBase
                onClick={shippingHandler}
                className="flex flex-row items-start"
              >
                <MdOutlineLocalShipping className="mr-1 text-[20px]" />
                Shipping
              </ButtonBase>
              <ButtonBase
                onClick={askProductHandler}
                className="flex flex-row items-start"
              >
                <MdOutlineEmail className="mr-1 text-[20px]" />
                Ask About This Product
              </ButtonBase>
            </Box>
            <Box className="flex flex-row space-x-8 w-full mt-8">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={addToCartHandler}
                className="bg-[#2196f3] w-max"
              >
                Add To Cart
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => wishListHandler(product)}
                className="bg-[#2196f3] w-max"
              >
                Add To Wishlist
              </Button>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={buyItNowHandler}
              className="bg-[#2196f3] mt-6"
            >
              Buy It Now
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginTop: "40px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { display: "none" },
              },
            }}
          >
            <Tab label="Description" id="simple-tab-0" />
            <Tab label="Additional Information" id="simple-tab-1" />
            <Tab label="Why Buy From Us" id="simple-tab-2" />
          </Tabs>
        </Box>
        <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-0`}>
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography pb={"10px"}>
                Design inspiration lorem ipsum dolor sit amet, consectetuer
                adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci
                magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam
                sit amet enim. Suspendisse id velit vitae ligula volutpat
                condimentum. Aliquam erat volutpat. Sed quis velit. Nulla
                facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam
                consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus
                nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum.
                Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper,
                lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget
                ipsum. Nulla libero. Vivamus pharetra posuere sapien.
              </Typography>
              <Grid container spacing={"10px"}>
                {description.map((item: string, index: number) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={index}
                    className="list-item list-inside text-[#2196f3]"
                  >
                    <Typography
                      color={theme.palette.mode === "dark" ? "white" : "black"}
                      className="inline"
                    >
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </div>
        <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-1`}>
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }}>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          sx={{
                            width: { xs: 120, sm: 500 },
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.feature}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </div>
        <div role="tabpanel" hidden={value !== 2} id={`simple-tabpanel-2`}>
          {value === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography className="block">
                Here are 5 more great reasons to buy from us:
              </Typography>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline"
                >
                  Lorem Ipsum has been the industry standard ever since the
                  1500s.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline"
                >
                  When an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline"
                >
                  When an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </Typography>
              </Box>
            </Box>
          )}
        </div>

        <Typography className="text-[24px] sm:text-[30px] my-[35px]  text-center">
          Our Services
        </Typography>
        <SwiperSlider
          {...{
            breakpoints: {
              1024: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 3,
              },
              641: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 1,
              },
            },
            spaceBetween: 30,
          }}
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
      </Container>
      <Typography className="text-[24px] sm:text-[30px] mt-[80px] mb-[35px] text-center">
        FOLLOW US ON INSTAGRAM
      </Typography>
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
    </>
  );
};

export default ProductDateils;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params!;
  await connectDB();
  const product = await Product.findOne({ slug });

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
