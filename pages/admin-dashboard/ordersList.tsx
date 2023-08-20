import { Paper, Typography, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AdminDashboard from ".";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { v4 } from "uuid";
import { useAllOrders } from "../../hooks/orders/orders.hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { OrdersType } from "../../types/orders.type";
import { OrderType } from "../../types/order.type";
import { OrderItemType } from "../../types/orderItem.type";
import { orderRowType } from "../../types/row.type";

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Image
          width={100}
          height={100}
          alt={"order image"}
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
    renderCell: (params: GridRenderCellParams) => {
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
    renderCell: (params: GridRenderCellParams) => {
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
    renderCell: (params: GridRenderCellParams) => {
      return <Typography>{new Date(params.value).toLocaleString()}</Typography>;
    },
  },
];

export default function OrdersList() {
  const [orders, setOrders] = useState<OrdersType>([]);
  const { isLoading } = useAllOrders({
    onSuccess: (data: any) => {
      setOrders(data?.data?.data);
    },
  });

  const rows = ([] as any[])
    .concat(
      ...orders?.map((order: OrderType) =>
        order.orderItems.map((item: OrderItemType) => ({
          ...item,
          createdAt: order.createdAt,
          shippingAddress: order.shippingAddress,
        }))
      )
    )
    .map((oItem: orderRowType) => {
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
      {isLoading ? (
        <Box className="mx-auto w-8">
          <CircularProgress />
        </Box>
      ) : (
        <Paper style={{ maxWidth: "100%", marginInline: "auto" }}>
          <DataGrid
            className="px-3"
            getRowId={(row) => v4()}
            rows={rows}
            rowSelection={false}
            checkboxSelection={false}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            rowHeight={80}
          />
        </Paper>
      )}
    </AdminDashboard>
  );
}

OrdersList.title = "Orders List Page|Shop Next";
