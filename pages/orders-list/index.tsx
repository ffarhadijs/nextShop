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
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const getOrdersList = async () => {
    const response = await fetch("/api/order/ordersList");
    const data = await response.json();
    setOrders(data.data);
  };
  console.log(orders, "data");

  useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <Box>
      <Typography fontSize={"18px"} fontWeight={600} variant="h1">
        Orders List
      </Typography>
      <Paper  style={{ maxWidth: "800px", marginInline:"auto" }}>
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
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((item: any) => {
                return item.orderItems.map((oItem: any) => (
                  <TableRow
                    key={oItem._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" colSpan={2}>
                      <Image
                        width={50}
                        height={50}
                        src={oItem.image}
                        alt={oItem.name}
                      />
                    </TableCell>
                    <TableCell align="left" colSpan={4}>
                      {oItem.name}
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      {oItem.quantity}
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      {oItem.price}
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      {oItem.price * oItem.quantity}
                    </TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
