import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Card,
  Paper,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { Store } from "../../utils/Store";
import { ProductType } from "../../types/product.type";
import Image from "next/image";
import { MdDeleteOutline, MdFavoriteBorder } from "react-icons/md";

const FavoriteList = () => {
  const { state, dispatch } = useContext(Store);

  const removeHandler = (item: ProductType) => {
    dispatch({ type: "WISHLIST_ADD_ITEM", payload: item });
  };

  return (
    <>
      {state?.wishList.withListItems.length ? (
        <Grid container spacing={3} alignItems={"start"}>
          <Grid item xs={12}>
            <Card component={Paper} sx={{ padding: 2, marginY: 4, width:"fit-content", marginLeft:"auto", marginRight:"auto" }}>
              <TableContainer>
                <Table sx={{ minWidth: "800px", width:"1000px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Product
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={4}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Price
                      </TableCell>

                      <TableCell
                        align="left"
                        colSpan={2}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Brand
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Category
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={1}
                        className="font-bold text-[16px] w-max"
                      >
                        Count In Stock
                      </TableCell>
                      <TableCell align="left" colSpan={1}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state?.wishList.withListItems.map((item: ProductType) => (
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" colSpan={1}>
                          <Image
                            width={100}
                            height={100}
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-auto"
                          />
                        </TableCell>
                        <TableCell
                          colSpan={4}
                          className="text-left text-[16px]"
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          className="text-left text-[16px]"
                        >
                          $ {item.price}
                        </TableCell>

                        <TableCell align="left" colSpan={2}>
                          {item.brand}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          className="text-left text-[16px]"
                        >
                          {item.category}
                        </TableCell>
                        <TableCell
                          colSpan={1}
                          className="text-left text-[16px]"
                        >
                          {item.countInStock}
                        </TableCell>
                        <TableCell align="right" colSpan={1}>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => removeHandler(item)}>
                              <MdDeleteOutline color="red" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box className="flex flex-col w-full h-auto text-center my-40">
          <p className="text-2xl font-bold">
            Add some products to your wish list
          </p>
          <MdFavoriteBorder className="mx-auto my-8 text-[50px]" />
        </Box>
      )}
    </>
  );
};

export default FavoriteList;

FavoriteList.title = "Favorite List Page|Shop Next";
