import { CircularProgress, Paper, Typography, Grid } from "@mui/material";
import { ReactNode } from "react";
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
import ReactEcharts from "echarts-for-react";
import { useUserExist } from "../../hooks/users/useUserExist";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  const { route } = useRouter();
  const { isLoading: ordersLoading, data: ordersList } = useAllOrders();
  const userToken = useUserExist();

  const { isLoading: productsLoading, data: productsList } =
    useGetProductsList();

  const { isLoading: usersLoading, data: usersList } = useGetUsersList();

  const barOption = {
    tooltip: {},
    xAxis: {
      data: [2019, 2020, 2021, 2022, 2023],
    },
    yAxis: {},
    series: [
      {
        name: "Products",
        data: [15, 25, 20, 12, 19],
        type: "bar",
        color: "#2196f3",
      },
    ],
  };

  const pieOption = {
    color: ["#91cc75", "#73c0de", "#ee6666"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#black",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: usersList?.data.data.length, name: "Users" },
          { value: productsList?.data?.data.length, name: "Products" },
          { value: ordersList?.data.data.length, name: "Orders" },
        ],
      },
    ],
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={3} md={2}>
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
      <Grid item xs={12} sm={9} md={10}>
        {route !== "/admin-dashboard" ? (
          children
        ) : (
          <>
            <Grid container spacing="20px">
              <Grid item xs={6} sm={3}>
                <Paper elevation={2} className="text-center py-8">
                  <HiMiniCurrencyDollar className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[18px] sm:text-[20px] font-bold mb-2">
                    Sales
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {ordersLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      "$" +
                      ordersList?.data.data.reduce(
                        (accumulator: number, currentValue: OrderType) =>
                          accumulator + currentValue.totalPrice,
                        0
                      )
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className="text-center py-8">
                  <FaUsers className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[18px] sm:text-[20px] font-bold mb-2">
                    Users
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {usersLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      usersList.data.data.length
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className="text-center py-8">
                  <RiShoppingBag3Fill className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[18px] sm:text-[20px] font-bold mb-2">
                    Orders
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {ordersLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      ordersList?.data.data.length
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className="text-center py-8">
                  <GiClothes className="text-[50px] mb-3 mx-auto" />
                  <Typography className="text-[18px] sm:text-[20px] font-bold mb-2">
                    Products
                  </Typography>
                  <Typography className="text-[#2196f3] font-semibold text-[16px]">
                    {productsLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      productsList?.data?.data.length
                    )}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid container my={"20px"}>
              <Grid item xs={12} md={6}>
                <ReactEcharts
                  option={barOption}
                  style={{ height: "400px", width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ReactEcharts
                  option={pieOption}
                  style={{ height: "400px", width: "100%" }}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
AdminDashboard.title = "Admin Dashboard Page|Shop Next";
