import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Grid,
  Card,
  Paper,
  SelectChangeEvent,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { Store } from "../utils/Store";
import { ProductType } from "../types/product.type";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdDeleteOutline, MdOutlineAddShoppingCart } from "react-icons/md";
import { useGetUser } from "../hooks/users/user.hooks";

const Cart = () => {
  const { push } = useRouter();
  const { state, dispatch } = useContext(Store);
  const cartItems = state.cart.cartItems;
  const { data: user } = useGetUser();

  let totalQuantity = 0;
  for (const product of cartItems) {
    totalQuantity += product.quantity;
  }

  let totalPrice = 0;
  for (const product of cartItems) {
    totalPrice += product.quantity * product.price;
  }

  const changeHandler = (value: number, item: ProductType) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: value } });
  };

  const removeHandler = (item: ProductType) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    !!user ? push("/shipping") : push("/login");
  };

  return (
    <>
      {state?.cart.cartItems.length ? (
        <Grid container spacing={3} alignItems={"start"}>
          <Grid item xs={12} md={9}>
            <Card component={Paper} sx={{ padding: 2, marginY: 0 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        colSpan={2}
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
                        Unit Price
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        style={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        Total
                      </TableCell>
                      <TableCell align="left" colSpan={1}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state?.cart.cartItems.map((item: ProductType) => (
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" colSpan={2}>
                          <Image
                            width={200}
                            height={200}
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-auto max-h-20"
                          />
                        </TableCell>
                        <TableCell
                          colSpan={4}
                          style={{ textAlign: "left", fontSize: "16px" }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          style={{ textAlign: "left", fontSize: "16px" }}
                        >
                          $ {item.price}
                        </TableCell>
                        <TableCell align="left" colSpan={2}>
                          {" "}
                          <Select
                            value={item.quantity}
                            size="small"
                            MenuProps={{
                              PaperProps: { sx: { maxHeight: 150 } },
                            }}
                            onChange={(e: SelectChangeEvent<number>) =>
                              changeHandler(e?.target.value as number, item)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>{" "}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          style={{ textAlign: "left", fontSize: "16px" }}
                        >
                          $ {item.price * item.quantity}
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
          <Grid item xs={12} md={3}>
            <Card component={Paper} sx={{ padding: 2 }}>
              <Typography className="pb-4 font-bold text-[16px]">
                Cart Totals
              </Typography>
              <Typography className="text-[15px]">
                Subtotal ({totalQuantity} items): $ {totalPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                fullWidth
                onClick={() => checkoutHandler()}
                className="bg-[#2196f3]"
              >
                CHECK OUT
              </Button>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box className="flex flex-col w-full h-auto text-center my-40">
          <p className="text-2xl font-bold">Add some products to your cart</p>
          <MdOutlineAddShoppingCart className="mx-auto my-8 text-[50px]" />
        </Box>
      )}
    </>
  );
};

export default Cart;

Cart.title = "Cart Page|Shop Next";
