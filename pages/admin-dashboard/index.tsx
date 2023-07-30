import { verifyToken } from "../../utils/verifyToken";
import Layout from "../../components/layout/Layout";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const getOrdersList = async () => {
    const response = await fetch("/api/order/ordersList");
    const data = await response.json();
    setOrders(data.data);
  };
  const getProductsList = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data.data);
  };
  const getUsersList = async () => {
    const response = await fetch("/api/user/usersList");
    const data = await response.json();
    setUsers(data.data);
  };

  useEffect(() => {
    getOrdersList();
    getUsersList();
    getProductsList();
  }, []);

  return (
    <Stack direction={"row"} justifyContent={"start"} alignItems={"start"} spacing={5}>
      <Paper elevation={2}>
        <Stack direction={"column"}>
          <Button
            variant="text"
            LinkComponent={Link}
            href="/admin-dashboard/ordersList"
          >
            Orders List
          </Button>
          <Button
            variant="text"
            LinkComponent={Link}
            href="/admin-dashboard/productsList"
          >
            Products List
          </Button>
          <Button
            variant="text"
            LinkComponent={Link}
            href="/admin-dashboard/usersList"
          >
            Users List
          </Button>
        </Stack>
      </Paper>
      <Stack direction={"column"} justifyContent={"start"} alignItems={"start"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Paper elevation={2}>
            <Typography>Sales</Typography>
            <Typography>
              $
              {orders.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + currentValue.totalPrice,
                0
              )}
            </Typography>
          </Paper>
          <Paper>
            <Typography>Users</Typography>
            <Typography>{users.length}</Typography>
          </Paper>
          <Paper>
            <Typography>Orders</Typography>
            <Typography>{orders.length}</Typography>
          </Paper>
          <Paper>
            <Typography>Products</Typography>
            <Typography>{products.length}</Typography>
          </Paper>
        </Stack>
        <Stack></Stack>
      </Stack>
    </Stack>
  );
};

export default AdminDashboard;
