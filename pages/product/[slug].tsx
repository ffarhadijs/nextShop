import {
  Button,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Box,
  useTheme,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Product from "../../models/Product";
import connectDB from "../../utils/connectDB";
import { ProductType } from "../../types/product.type";
import Layout from "../../components/layout/Layout";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import CropIcon from "@mui/icons-material/Crop";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { styled } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InstagramIcon from "@mui/icons-material/Instagram";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import SwiperSlider from "../../components/layout/swiper/SwiperSlider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function createData(name: string, feature: string) {
  return { name, feature };
}

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductDateils = ({ product }: { product: ProductType }) => {
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const { push } = useRouter();
  const { dispatch, state } = useContext(Store);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const addToCartHandler = () => {
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
    <>
      <Box
        bgcolor={theme.palette.mode === "dark" ? grey[900] : grey[300]}
        className="w-full py-8 mb-20 text-[24px]"
      >
        <Container maxWidth="lg">{product?.name!}</Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Image
              style={{ width: "100%" }}
              src={product?.image!}
              alt={product?.name!}
              width={450}
              height={450}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography fontWeight={700} component={"h1"} variant="h4" mb={3}>
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
            <Typography variant="h6" my={1} fontSize={"18px"} className="">
              Products Type:
              <Typography component="span" fontSize={"15px"}>
                {" "}
                {product?.category!}{" "}
              </Typography>
            </Typography>
            <Typography variant="h6" my={1} fontSize={"18px"}>
              Brand:
              <Typography component="span" fontSize={"15px"}>
                {" "}
                {product?.brand!}{" "}
              </Typography>
            </Typography>
            <Typography variant="h6" my={1} fontSize={"18px"}>
              Availability:
              <Typography component={"span"} fontSize={"15px"}>
                {" "}
                {product?.countInStock!}
              </Typography>
            </Typography>
            <Typography variant="h6" my={1} fontSize={"18px"}>
              Description:
              <Typography component={"span"} fontSize={"15px"}>
                {" "}
                {product?.description!}
              </Typography>
            </Typography>
            <Box className="flex flex-row space-x-4 text-[14px]">
              <Box className="flex flex-row items-start">
                <CropIcon className="mr-1" />
                Size Guide
              </Box>
              <Box className="flex flex-row items-start">
                <LocalShippingIcon className="mr-1" />
                Shipping
              </Box>
              <Box className="flex flex-row items-start">
                <MailOutlineIcon className="mr-1" />
                Ask About This Product
              </Box>
            </Box>
            <Box className="flex flex-row space-x-8 w-1/2 mt-8">
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
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginTop: "40px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
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
                <Grid
                  item
                  xs={6}
                  className="list-item list-inside text-[#2196f3]"
                >
                  <Typography
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    className="inline-block"
                  >
                    Fabric 1: 100% Polyester
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="list-item list-inside text-[#2196f3]"
                >
                  <Typography
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    className="inline-block"
                  >
                    Fabric 3: 100% Polyester, Lining: 100% Polyester{" "}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="list-item list-inside text-[#2196f3]"
                >
                  <Typography
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    className="inline-block"
                  >
                    Fabric 2: 75% Polyester, 20% Viscose, 5% Elastane
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="list-item list-inside text-[#2196f3]"
                >
                  <Typography
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    className="inline-block"
                  >
                    Fabric 2: 75% Polyester, 20% Viscose, 5% Elastane
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="list-item list-inside text-[#2196f3]"
                >
                  <Typography
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    className="inline-block"
                  >
                    Fabric 3: 100% Polyester, Lining: 100% Polyester
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="list-item list-inside text-[#2196f3]"
                >
                  <Typography
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    className="inline-block"
                  >
                    Fabric 1: 100% Polyester
                  </Typography>
                </Grid>
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
                          width={"500px"}
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
                  className="inline-block"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline-block"
                >
                  Lorem Ipsum has been the industry standard dummy text ever
                  since the 1500s.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline-block"
                >
                  When an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline-block"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </Box>
              <Box className="list-item list-inside text-[#2196f3] py-1">
                <Typography
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  className="inline-block"
                >
                  When an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </Typography>
              </Box>
            </Box>
          )}
        </div>
      
      <Typography textAlign={"center"} my={"35px"} fontSize={"24px"}>
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
        mt={"55px"}
        fontSize={"24px"}
      >
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
                <InstagramIcon className="opacity-0 group-hover:opacity-100 absolute transition-all duration-500 text-[36px]" />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      />

      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          Out Of Stock!
        </Alert>
      </Snackbar> */}
      </Container>
    </>
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
