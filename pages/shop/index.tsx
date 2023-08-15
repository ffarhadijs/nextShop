import { useState } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import Product from "../../models/Product";
import { ProductType } from "../../types/product.type";
import { ProductsType } from "../../types/products.type";
import connectDB from "../../utils/connectDB";
import {
  Box,
  FormControlLabel,
  Slider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useTheme,
  TextField,
  Pagination,
  Container,
} from "@mui/material";
import { TbColumns1, TbColumns2, TbColumns3 } from "react-icons/tb";
import { useRouter } from "next/router";
import SwiperSlider from "../../components/swiper/SwiperSlider";
import { SwiperSlide } from "swiper/react";
import InstagramIcon from "@mui/icons-material/Instagram";

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
  categoriesList: any;
  maxPrice: number;
  minPrice: number;
  countProducts: number;
}) {
  const { query, push, pathname } = useRouter();
  const theme = useTheme();
  const [columns, setColumns] = useState<number>(4);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const viewHandler = (column: number) => {
    setColumns(column);
  };
  const changeHandler = ({
    searchQuery,
    category,
    price,
    sort,
    page,
  }: {
    searchQuery?: string;
    category?: string;
    price?: number[];
    sort?: string;
    page?: number;
  }) => {
    if (searchQuery) query.searchQuery = searchQuery;
    if (!searchQuery) delete query.searchQuery;
    if (price) {
      query.min = String(price[0]);
      query.max = String(price[1]);
    }
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (page) query.page = String(page);
    push({
      pathname: pathname,
      query: query,
    });
  };

  return (
    <Grid container>
      <Container maxWidth="lg">
        <Grid container className="my-5 items-end">
          <Grid item xs={3}>
            {" "}
            Filter Panel
          </Grid>
          <Grid
            container
            xs={3}
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
            className="items-center"
          >
            <Typography>View:</Typography>
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
          <Grid item xs={3}>
            Showing:
            {countProducts === 0
              ? "No Product"
              : countProducts === 1
              ? "1 Product"
              : countProducts + " Products"}
          </Grid>
          <Grid item xs={3} className="flex flex-row">
            <InputLabel className=" text-white text-[16px] w-16">
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
              <MenuItem value={"price-highToLow"}>price:Hight to Low</MenuItem>
              <MenuItem value={"rated"}>Top Rated</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} pr={"0px"}>
            <Box>
              <Typography className="border-b border-white mb-5">
                Product Name:
              </Typography>
              <TextField
                onChange={(e) => changeHandler({ searchQuery: e.target.value })}
                size="small"
                label="Search"
                fullWidth
              />
            </Box>
            <Box>
              <Typography className="border-b border-white mb-5 mt-10">
                Category:
              </Typography>
              <RadioGroup
                defaultValue="All"
                value={query.category ? query.category : "All"}
              >
                {["All", ...categoriesList].map(
                  (item: string, index: number) => (
                    <FormControlLabel
                      value={item}
                      onChange={(event) =>
                        changeHandler({
                          category: (event.target as HTMLInputElement).value,
                        })
                      }
                      control={<Radio size="small" />}
                      label={item}
                      key={item + index}
                    />
                  )
                )}
              </RadioGroup>
            </Box>
            <Box>
              <Typography className="border-b border-white mb-5 my-10">
                Price:
              </Typography>

              <Slider
                defaultValue={[minPrice, maxPrice]}
                valueLabelDisplay="auto"
                max={maxPrice}
                step={10}
                min={minPrice}
                onChange={(_, value) => {
                  changeHandler({ price: value as number[] });
                }}
              />
            </Box>
          </Grid>
          <Grid container xs={9} spacing={3}>
            {products.map((product: ProductType, index: number) => (
              <Grid item xs={6} sm={columns} key={product.slug + index}>
                <ProductItem product={product} />
              </Grid>
            ))}
            {products.length !== 0 && (
              <Grid
                item
                xs={12}
                className="flex flex-row justify-center mx-auto"
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
      </Container>

      <Grid item xs={12}>
        <Typography
          textAlign={"center"}
          mb={"35px"}
          mt={"80px"}
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
      </Grid>
    </Grid>
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
