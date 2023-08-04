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
import AdminDashboard from ".";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const getOrdersList = async () => {
    const response = await fetch("/api/order/allOrders");
    const data = await response.json();
    setOrders(data.data);
  };
  console.log(orders, "data");

  useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <AdminDashboard>
      <Paper style={{ maxWidth: "100%", marginInline: "auto" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: "max-conteent", maxWidth: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={4}>
                  Image
                </TableCell>
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
                <TableCell align="left" colSpan={2}>
                  Paid At
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Customer
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Address
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
                    <TableCell align="left" colSpan={4}>
                      <Image
                        src={oItem.image}
                        alt={oItem.name}
                        height={500}
                        width={500}
                        className="w-16 h-auto"
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
                    <TableCell align="left" colSpan={2}>
                      {item.createdAt}
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      {item.shippingAddress.name}{" "}
                      {item.shippingAddress.lastName}
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      {item.shippingAddress.country} {item.shippingAddress.city}{" "}
                      {item.shippingAddress.address}
                    </TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </AdminDashboard>
  );
}
