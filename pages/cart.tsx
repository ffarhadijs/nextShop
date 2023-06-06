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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Store } from "../utils/Store";
import { ProductType } from "../types/product.type";
import Image from "next/image";
import { useRouter } from "next/router";

const cart = () => {
  const { push } = useRouter();
  const { state, dispatch } = useContext(Store);
  const [user, setUser] = useState<any>();
  const cartItems = state?.cart?.cartItems || [];

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

  const fetchUser = async () => {
    const response = await fetch("/api/user").then(async (res) =>
      setUser(await res.json())
    );
  };

  
  const checkoutHandler = () => {
    user?.status === "success" && push("/shipping");
    user?.status === "failed" && push("/login");
    
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" component="h1">
        Shopping Cart
      </Typography>
      {state?.cart.cartItems.length ? (
        <Grid container spacing={3} alignItems={"start"}>
          <Grid item xs={12} md={9}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Image</TableCell>
                    <TableCell align="left" colSpan={4}>
                      Name
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      Quantity
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      Price
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state?.cart.cartItems.map((item: ProductType) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" colSpan={2}>
                        <Image
                          width={50}
                          height={50}
                          src={item.image}
                          alt={item.name}
                        />
                      </TableCell>
                      <TableCell align="left" colSpan={4}>
                        {item.name}
                      </TableCell>
                      <TableCell align="left" colSpan={2}>
                        {" "}
                        <Select
                          value={item.quantity}
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
                      <TableCell align="left" colSpan={2}>
                        {item.price}
                      </TableCell>
                      <TableCell align="left" colSpan={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeHandler(item)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card component={Paper} sx={{ padding: 2 }}>
              <Typography>
                Subtotal ({totalQuantity} items): $ {totalPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                fullWidth
                onClick={() => checkoutHandler()}
              >
                CHECK OUT
              </Button>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography>there isn't any item</Typography>
      )}
    </Layout>
  );
};

export default cart;
