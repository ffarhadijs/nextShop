import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import AdminDashboard from ".";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { v4 } from "uuid";
const columns = [
  {
    field: "image",
    headerName: "Image",
    align: "center",
    headerAlign: "center",
    renderCell: (params: any) => {
      return (
        <Image
          width={100}
          height={100}
          alt={params.value.image}
          src={params.value}
          className="w-16 h-auto"
        />
      );
    },
    sortable: false,
    width: 100,
  },
  {
    field: "name",
    align: "center",
    headerAlign: "center",
    headerName: "Name",
    minWidth: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    align: "center",
    headerAlign: "center",
    minWidth: 80,
  },
  {
    field: "unitPrice",
    align: "center",
    headerAlign: "center",
    headerName: "Unit Price",
    type: "number",
    minWidth: 80,
    renderCell: (params: any) => {
      return <Typography>$ {params.value}</Typography>;
    },
  },
  {
    field: "total",
    align: "center",
    headerAlign: "center",
    headerName: "Total",
    type: "number",
    minWidth: 80,
    renderCell: (params: any) => {
      return <Typography>$ {params.value}</Typography>;
    },
  },
  {
    field: "customer",
    align: "center",
    headerAlign: "center",
    headerName: "Customer",
    minWidth: 150,
  },
  {
    field: "address",
    align: "center",
    headerAlign: "center",
    headerName: "Address",
    sortable: false,
    minWidth: 160,
  },
  {
    field: "paidAt",
    align: "center",
    headerAlign: "center",
    headerName: "PaidAt",
    minWidth: 160,

    renderCell: (params: any) => {
      return <Typography>{new Date(params.value).toLocaleString()}</Typography>;
    },
  },
];

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const getOrdersList = async () => {
    const response = await fetch("/api/order/allOrders");
    const data = await response.json();
    setOrders(data.data);
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  const rows = []
    .concat(
      ...orders?.map((order: any) =>
        order.orderItems.map((item: any) => ({
          ...item,
          createdAt: order.createdAt,
          shippingAddress: order.shippingAddress,
        }))
      )
    )
    .map((oItem: any) => {
      return {
        image: oItem.image,
        quantity: oItem.quantity,
        customer:
          oItem.shippingAddress.name + " " + oItem.shippingAddress.lastName,
        address:
          oItem.shippingAddress.country +
          " " +
          oItem.shippingAddress.city +
          " " +
          oItem.shippingAddress.address,
        paidAt: oItem.createdAt,
        name: oItem.name,
        total: oItem.price,
        unitPrice: oItem.price / oItem.quantity,
      };
    });

  return (
    <AdminDashboard>
      <Paper style={{ maxWidth: "100%", marginInline: "auto" }}>
        <DataGrid
          className="px-3"
          getRowId={(row) => v4()}
          rows={rows}
          rowSelection={false}
          checkboxSelection={false}
          columns={columns as any}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          rowHeight={80}
        />
      </Paper>
    </AdminDashboard>
  );
}
