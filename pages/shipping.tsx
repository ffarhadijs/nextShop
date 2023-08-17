import React, { useContext } from "react";
import {
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { Store } from "../utils/Store";
import { ProductType } from "../types/product.type";
import Image from "next/image";
import {MdDeleteOutline} from "react-icons/md";
import { useCreateOrder } from "../hooks/orders/orders.hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { useGetUser } from "../hooks/users/user.hooks";
import toast from "react-hot-toast";

const Shipping = () => {
  const { data: user, isLoading: userLoading } = useGetUser();
  const { push } = useRouter();
  const name = user?.data.data.name || "";
  const lastName = user?.data.data.lastName || "";
  const address = user?.data.data.address || "";
  const city = user?.data.data.city || "";
  const country = user?.data.data.country || "";

  const { state, dispatch } = useContext(Store);
  const cartItems = state?.cart?.cartItems || [];

  let totalQuantity = 0;
  for (const product of cartItems) {
    totalQuantity += product.quantity;
  }

  let itemsPrice = 0;
  for (const product of cartItems) {
    itemsPrice += product.quantity * product.price;
  }

  const shippingPrice = itemsPrice >= 200 ? 0 : 15;
  const taxPrice = Math.round(itemsPrice * 0.15);
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const shippingAddress = { name, lastName, address, city, country };

  const changeHandler = (value: number, item: ProductType) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: value } });
  };

  const removeHandler = (item: ProductType) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const { mutate, isLoading } = useCreateOrder(
    cartItems.map((item: ProductType) => {
      return {
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      };
    }),
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    {
      onSuccess: () => {
        toast.success("Order has been done");
        dispatch({ type: "CART_RESET", payload: [] as any });
        push("/");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    }
  );
  const shippingHandler = () => {
    mutate();
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Card component={Paper} sx={{ padding: 2 }}>
            <Typography variant="h5" component="h1" mb={2}>
              Shipping Address
            </Typography>
            {userLoading ? (
              <Box className="w-8 mx-auto">
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography fontSize={16} component="span">
                    Full Name:
                  </Typography>
                  <Typography fontSize={14} fontWeight={600} component="span">
                    {user?.data.data.name} {user?.data.data.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontSize={16} component="span">
                    Email:
                  </Typography>
                  <Typography fontSize={14} fontWeight={600} component="span">
                    {user?.data.data.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontSize={16} component="span">
                    Full Address:
                  </Typography>
                  <Typography fontSize={14} fontWeight={600} component="span">
                    {user?.data.data.country}, {user?.data.data.city},{" "}
                    {user?.data.data.address}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontSize={16} component="span">
                    Postal Code:
                  </Typography>
                  <Typography fontSize={14} fontWeight={600} component="span">
                    {user?.data.data.postalCode}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Card>
          <Card component={Paper} sx={{ padding: 2, marginY: 4 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold text-[16px]">
                      Product
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={4}
                      className="font-bold text-[16px]"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={2}
                      className="font-bold text-[16px]"
                    >
                      Unit Price
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={2}
                      className="font-bold text-[16px]"
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={2}
                      className="font-bold text-[16px]"
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" colSpan={2}>
                        <Image
                          width={100}
                          height={100}
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-auto"
                        />
                      </TableCell>
                      <TableCell colSpan={4} className="text-left text-[16px]">
                        {item.name}
                      </TableCell>
                      <TableCell colSpan={2} className="text-left text-[16px]">
                        $ {item.price}
                      </TableCell>
                      <TableCell align="left" colSpan={2}>
                        {" "}
                        <Select
                          value={item.quantity}
                          size="small"
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
                      <TableCell colSpan={2} className="text-left text-[16px]">
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
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>Items: </Typography>
              <Typography>$ {itemsPrice}</Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>Tax:</Typography>
              <Typography>$ {taxPrice}</Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>Shipping:</Typography>
              <Typography>$ {shippingPrice}</Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>Total:</Typography>
              <Typography>$ {itemsPrice + taxPrice + shippingPrice}</Typography>
            </Stack>
            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              fullWidth
              onClick={() => shippingHandler()}
              className="bg-[#2196f3]"
              loading={isLoading}
            >
              Place Order
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Shipping;
