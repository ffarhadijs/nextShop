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
} from "@mui/material";
import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { Store } from "../utils/Store";
import { ProductType } from "../types/product.type";
import Image from "next/image";
import Product from "../models/Product";

const cart = () => {
  const { state, dispatch } = useContext(Store);
  const cartItems = state?.cart?.cartItems || [];

  let totalQuantity = 0;
  for (const product of cartItems) {
    totalQuantity += product.quantity;
  }

  let totalPrice = 0;
  for (const product of cartItems) {
    totalPrice += product.quantity * product.price;
  }

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
                        <Select value={item.quantity}>
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
                        <Button variant="contained">Remove</Button>
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
