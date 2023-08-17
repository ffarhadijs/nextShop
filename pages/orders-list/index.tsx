import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useOrdersList } from "../../hooks/orders/orders.hooks";
import Image from "next/image";
import { OrderType } from "../../types/order.type";
import { OrderItemType } from "../../types/orderItem.type";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { v4 } from "uuid";
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
          alt={"Asdasd"}
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
    minWidth: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    align: "center",
    headerAlign: "center",
    minWidth: 120,
  },
  {
    field: "unitPrice",
    align: "center",
    headerAlign: "center",
    headerName: "Unit Price",
    type: "number",
    minWidth: 120,
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
    minWidth: 120,
    renderCell: (params: GridRenderCellParams) => {
      return <Typography>$ {params.value}</Typography>;
    },
  },

  {
    field: "paidAt",
    align: "center",
    headerAlign: "center",
    headerName: "PaidAt",
    minWidth: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <Typography>{new Date(params.value).toLocaleString()}</Typography>;
    },
  },
];

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  const { isLoading, isSuccess } = useOrdersList({
    onSuccess: (data: any) => {
      setOrders(data?.data.data);
    },
  });

  const rows = ([] as any[])
    .concat(
      ...orders?.map((order: OrderType) =>
        order.orderItems.map((item: OrderItemType) => ({
          ...item,
          createdAt: order.createdAt,
        }))
      )
    )
    .map((oItem: orderRowType) => {
      return {
        image: oItem.image,
        quantity: oItem.quantity,
        paidAt: oItem.createdAt,
        name: oItem.name,
        total: oItem.price,
        unitPrice: oItem.price / oItem.quantity,
      };
    });

  return (
    <Box>
      {isSuccess && (
        <DataGrid
          className="px-3 max-w-4xl mx-auto"
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
      )}
      {isLoading && (
        <Box className="mx-auto w-8">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
