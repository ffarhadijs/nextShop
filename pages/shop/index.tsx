import { useState } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import Product from "../../models/Product";
import { ProductType } from "../../types/product.type";
import { ProductsType } from "../../types/products.type";
import connectDB from "../../utils/connectDB";
import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Pagination,
  Container,
  Drawer,
} from "@mui/material";
import { TbColumns1, TbColumns2, TbColumns3 } from "react-icons/tb";
import { useRouter } from "next/router";
import SwiperSlider from "../../components/swiper/SwiperSlider";
import { SwiperSlide } from "swiper/react";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FilterPanel } from "../../components/filterPanel/FilterPanel";

const productPerPage = 6;

const views = [
  { icon: <TbColumns1 />, columns: 12 },
  { icon: <TbColumns2 />, columns: 6 },
  { icon: <TbColumns3 />, columns: 4 },
];

export default function Shop({
  products,
  categoriesList,
  maxPrice,
  minPrice,
  countProducts,
}: {
  products: ProductsType;
  categoriesList: string[];
  maxPrice: number;
  minPrice: number;
  countProducts: number;
}) {
  const theme = useTheme();
  const [columns, setColumns] = useState<number>(4);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { query, push, pathname } = useRouter();
  const viewHandler = (column: number) => {
    setColumns(column);
  };

  const changeHandler = ({ sort, page }: { sort?: string; page?: number }) => {
    if (sort) query.sort = sort;
    if (page) query.page = String(page);
    push({
      pathname: pathname,
      query: query,
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <Drawer
          anchor={"left"}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{
            sx: {
              width: "260px",
              padding: "24px",
              position: "relative",
            },
          }}
        >
          <FilterPanel
            categoriesList={categoriesList}
            maxPrice={maxPrice}
            minPrice={minPrice}
            setOpenDrawer={setOpenDrawer}
            openDrawer={openDrawer}
          />
          <IconButton
            onClick={() => setOpenDrawer(false)}
            className="absolute top-4 right-4"
          >
            <AiOutlineClose />
          </IconButton>
        </Drawer>
        <Grid container>
          <Grid
            item
            sm={3}
            xs={0}
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
            className="my-5 pr-5"
          >
            <FilterPanel
              categoriesList={categoriesList}
              maxPrice={maxPrice}
              minPrice={minPrice}
            />
          </Grid>
          <Grid container item sm={9} xs={12} className="my-5 items-start">
            <Grid
              container
              item
              xs={4}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
              className="items-center pl-2"
            >
              <Typography className="text-[16px] font-[600]">View:</Typography>
              {views.map((item) => (
                <IconButton
                  key={item.columns}
                  onClick={() => viewHandler(item.columns)}
                  className={`p-[1px] text-[20px] ${
                    columns === item.columns && "text-[#2196f3]"
                  } transition-colors duration-500 hover:text-[#2196f3]`}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Grid>
            <Grid
              order={{ xs: 0 }}
              item
              xs={6}
              sx={{
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
              }}
              className="items-center pl-2"
            >
              <IconButton onClick={() => setOpenDrawer(true)}>
                <AiOutlineMenu />
              </IconButton>
            </Grid>
            <Grid
              item
              order={{ xs: 2, sm: 0 }}
              xs={6}
              sm={4}
              sx={{
                [theme.breakpoints.down("md")]: {
                  paddingLeft: "8px",
                  paddingTop: "8px",
                },
              }}
              mx={"auto"}
              textAlign={"center"}
            >
              <Typography className="text-[16px] font-[600] inline">
                Showing:
              </Typography>
              <Typography className="text-[14px] font-[500] inline">
                {countProducts === 0
                  ? "No Product"
                  : countProducts === 1
                  ? "1 Product"
                  : countProducts + " Products"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              order={{ xs: 1 }}
              className="flex flex-row pr-3 items-end"
            >
              <InputLabel className=" text-white text-[16px] font-[600] w-14">
                Sort:
              </InputLabel>
              <Select
                size="small"
                variant="standard"
                onChange={(e) =>
                  changeHandler({ sort: e.target.value as string })
                }
                className="w-full"
                defaultValue={"oldest"}
              >
                <MenuItem value={"oldest"}>Oldest</MenuItem>
                <MenuItem value={"newest"}>Newest</MenuItem>
                <MenuItem value={"price-lowToHigh"}>price:Low to High</MenuItem>
                <MenuItem value={"price-highToLow"}>price:High to Low</MenuItem>
                <MenuItem value={"rated"}>Top Rated</MenuItem>
              </Select>
            </Grid>
            <Grid
              order={{ xs: 3 }}
              container
              item
              xs={12}
              className="mt-4 mx-auto "
            >
              {products.map((product: ProductType, index: number) => (
                <Grid
                  item
                  xs={6}
                  sm={columns}
                  key={product.slug + index}
                  className="px-2 py-2"
                >
                  <ProductItem product={product} />
                </Grid>
              ))}
              {products.length !== 0 && (
                <Grid
                  item
                  xs={12}
                  className="flex flex-row justify-center mx-auto mt-8"
                >
                  <Pagination
                    className="mx-auto"
                    count={Math.ceil(countProducts / productPerPage)}
                    color="primary"
                    onChange={(e, value) => {
                      setPageNumber(value);
                      changeHandler({ page: value });
                    }}
                    page={pageNumber}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box>
        <Typography className="text-center mb-[35px] mt-[80px] text-[24px] sm:text-[30px]">
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
      </Box>
    </>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  const category = query.category || "";
  const min = query.min || "";
  const max = query.max || "";
  const searchQuery = query.searchQuery || "";
  const sort = query.sort || "";
  const page = query.page || 1;

  await connectDB();

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "All" ? { category } : {};
  const priceFilter =
    min && max
      ? {
          price: {
            $gte: min,
            $lte: max,
          },
        }
      : {};

  const order =
    sort === "price-lowToHigh"
      ? { price: 1 }
      : sort === "price-highToLow"
      ? { price: -1 }
      : sort === "rated"
      ? { rating: -1 }
      : sort === "oldest"
      ? { createdAt: 1 }
      : sort === "newest" && { createdAt: -1 };

  const categories = await Product.find().distinct("category");
  const prices = await Product.find().distinct("price");
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    },
    "-reviews"
  )
    .sort(order as any)
    .skip(productPerPage * (page - 1))
    .limit(productPerPage)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  });

  return {
    props: {
      categoriesList: categories,
      maxPrice,
      minPrice,
      countProducts,
      products: JSON.parse(JSON.stringify(productDocs)),
    },
  };
}

Shop.title = "Shop Page|Shop Next";
Shop.description = "List of Products Page with Filtering";
