import {
  Box,
  FormControlLabel,
  Slider,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

export function FilterPanel({
  categoriesList,
  maxPrice,
  minPrice,
  setOpenDrawer,
  openDrawer,
}: {
  categoriesList: string[];
  maxPrice: number;
  minPrice: number;
  setOpenDrawer?: Dispatch<SetStateAction<boolean>>;
  openDrawer?: boolean;
}) {
  const { query, push, pathname } = useRouter();
  const [filterValue, setFilterValue] = useState<{
    searchQuery: string | string[];
    category: string | string[];
    price: number[];
  }>({
    searchQuery: query.searchQuery || "",
    category: query.category || "All",
    price:
      query.min && query.max ? [+query.min, +query.max] : [minPrice, maxPrice],
  });

  const filterHandler = () => {
    push({
      pathname,
      query,
    });
    openDrawer && setOpenDrawer!(false);
  };
  const resetFilterHandler = () => {
    push({
      pathname: pathname,
      query: null,
    });
    setFilterValue({
      searchQuery: "",
      category: "All",
      price: [minPrice, maxPrice],
    });
    openDrawer && setOpenDrawer!(false);
  };

  return (
    <>
      <Box>
        {" "}
        <Typography className="text-[18px] font-[600]">
          Filter Panel
        </Typography>{" "}
      </Box>
      <Box>
        <Box>
          <Typography className="mt-10 text-[16px] font-[600]">
            Product Name:
          </Typography>
          <Divider className="mb-5" />
          <TextField
            onChange={(e) => {
              query.searchQuery = e.target.value;
              setFilterValue({ ...filterValue, searchQuery: e.target.value });
            }}
            size="small"
            value={filterValue.searchQuery}
            label="Search"
            fullWidth
          />
        </Box>
        <Box>
          <Typography className=" mt-10 text-[16px] font-[600]">
            Category:
          </Typography>
          <Divider className="mb-5" />
          <RadioGroup defaultValue="All" value={filterValue.category}>
            {["All", ...categoriesList].map((item: string, index: number) => (
              <FormControlLabel
                value={item}
                onChange={(event) => {
                  setFilterValue({
                    ...filterValue,
                    category: (event.target as HTMLInputElement).value,
                  });
                  query.category = (event.target as HTMLInputElement).value;
                }}
                control={<Radio size="small" />}
                label={item}
                key={item + index}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Typography className="mt-10 text-[16px] font-[600]">
            Price:
          </Typography>
          <Divider className="mb-5" />
          <Slider
            defaultValue={[minPrice, maxPrice]}
            value={filterValue.price}
            valueLabelDisplay="auto"
            max={maxPrice}
            step={10}
            min={minPrice}
            onChange={(_, value: any) => {
              setFilterValue({ ...filterValue, price: value });
              query.min = String(value[0]);
              query.max = String(value[1]);
            }}
          />
        </Box>
        <Box className="flex flex-row w-full justify-between mt-10">
          <Button
            onClick={resetFilterHandler}
            variant="contained"
            className="bg-[#2196f3] "
          >
            Reset
          </Button>
          <Button
            onClick={filterHandler}
            variant="contained"
            className="bg-[#2196f3] "
          >
            Filter
          </Button>
        </Box>
      </Box>
    </>
  );
}
