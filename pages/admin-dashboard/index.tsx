import { verifyToken } from "../../utils/verifyToken";
import Layout from "../../components/layout/Layout";
import { Box, Button, Paper, Stack, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import InterestsIcon from "@mui/icons-material/Interests";
import { useRouter } from "next/router";

const AdminDashboard = ({ children }: any) => {
  const { route } = useRouter();
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
  console.log(route);
  return (
    <Grid container spacing={5}>
      <Grid item xs={2}>
        <Paper elevation={2} className="py-4 px-2">
          <Link
            href="/admin-dashboard/ordersList"
            className={`block px-2 py-1 rounded-sm ${
              route === "/admin-dashboard/ordersList"
                ? "bg-[#2196f3]"
                : "bg-transparent"
            }`}
          >
            Orders List
          </Link>
          <Link
            href="/admin-dashboard/productsList"
            className={`block my-4 px-2 py-1 rounded-sm ${
              route === "/admin-dashboard/productsList"
                ? "bg-[#2196f3]"
                : "bg-transparent"
            }`}
          >
            Products List
          </Link>
          <Link
            href="/admin-dashboard/usersList"
            className={`block px-2 py-1 rounded-sm ${
              route === "/admin-dashboard/usersList"
                ? "bg-[#2196f3]"
                : "bg-transparent"
            }`}
          >
            Users List
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing="20px">
          <Grid item xs={3}>
            <Paper elevation={2} className="text-center py-8">
              <MonetizationOnIcon className="text-[50px] mb-3" />
              <Typography className="text-[20px] font-bold mb-2">
                Sales
              </Typography>
              <Typography className="text-[#2196f3] font-semibold text-[16px]">
                $
                {orders.reduce(
                  (accumulator: any, currentValue: any) =>
                    accumulator + currentValue.totalPrice,
                  0
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="text-center py-8">
              <Diversity1Icon className="text-[50px] mb-3" />
              <Typography className="text-[20px] font-bold mb-2">
                Users
              </Typography>
              <Typography className="text-[#2196f3] font-semibold text-[16px]">
                {users.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="text-center py-8">
              <LocalMallIcon className="text-[50px] mb-3" />
              <Typography className="text-[20px] font-bold mb-2">
                Orders
              </Typography>
              <Typography className="text-[#2196f3] font-semibold text-[16px]">
                {orders.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="text-center py-8">
              <InterestsIcon className="text-[50px] mb-3" />
              <Typography className="text-[20px] font-bold mb-2">
                Products
              </Typography>
              <Typography className="text-[#2196f3] font-semibold text-[16px]">
                {products.length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Stack></Stack>
        {route !== "/admin-dashboard" ? children : null}
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
