import { CircularProgress, Paper, Typography, Grid } from "@mui/material";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { GiClothes } from "react-icons/gi";
import { useRouter } from "next/router";
import { useAllOrders } from "../../hooks/orders/orders.hooks";
import { useGetProductsList } from "../../hooks/products/products.hooks";
import { useGetUsersList } from "../../hooks/users/user.hooks";
import { OrderType } from "../../types/order.type";
import { OrdersType } from "../../types/orders.type";
import { usersType } from "../../types/users.type";
import { ProductsType } from "../../types/products.type";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  const { route } = useRouter();
  const [orders, setOrders] = useState<OrdersType>([]);
  const [users, setUsers] = useState<usersType>([]);
  const [products, setProducts] = useState<ProductsType>([]);
  const { isLoading: ordersLoading } = useAllOrders({
    onSuccess: (data: any) => {
      setOrders(data?.data?.data);
    },
  });

  const { isLoading: productsLoading } = useGetProductsList({
    onSuccess: (data: any) => {
      setProducts(data?.data.data);
    },
  });

  const { isLoading: usersLoading } = useGetUsersList({
    onSuccess: (data: any) => {
      setUsers(data?.data.data);
    },
  });

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
        {route !== "/admin-dashboard" ? (
          children
        ) : (
          <>
            <Grid container spacing="20px">
              <Grid item xs={3}>
                <Paper elevation={2} className="text-center py-8">
                  <HiMiniCurrencyDollar className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[20px] font-bold mb-2">
                    Sales
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {ordersLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      "$" +
                      orders.reduce(
                        (accumulator: number, currentValue: OrderType) =>
                          accumulator + currentValue.totalPrice,
                        0
                      )
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className="text-center py-8">
                  <FaUsers className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[20px] font-bold mb-2">
                    Users
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {usersLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      users.length
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className="text-center py-8">
                  <RiShoppingBag3Fill className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[20px] font-bold mb-2">
                    Orders
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {ordersLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      orders.length
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className="text-center py-8">
                  <GiClothes className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[20px] font-bold mb-2">
                    Products
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {productsLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      products.length
                    )}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing="20px" my={"20px"}></Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
