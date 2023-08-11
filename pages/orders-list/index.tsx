import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useOrdersList } from "../../hooks/orders/orders.hooks";
import Image from "next/image";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const { isLoading, isSuccess } = useOrdersList({
    onSuccess: (data: any) => {
      setOrders(data?.data.data);
    },
  });

  return (
    <Box>
      {isSuccess && (
        <Paper style={{ maxWidth: "100%", marginInline: "auto" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold text-[16px]">
                    Image
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
                    Quantity
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
                    Total
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={2}
                    className="font-bold text-[16px]"
                  >
                    Order Date
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
                          width={100}
                          height={100}
                          src={oItem.image}
                          alt={oItem.name}
                          className="w-20 h-auto"
                        />
                      </TableCell>
                      <TableCell className="text-left text-[16px]" colSpan={4}>
                        {oItem.name}
                      </TableCell>
                      <TableCell className="text-left text-[16px]" colSpan={2}>
                        {oItem.quantity}
                      </TableCell>
                      <TableCell className="text-left text-[16px]" colSpan={2}>
                        $ {oItem.price}
                      </TableCell>
                      <TableCell className="text-left text-[16px]" colSpan={2}>
                        $ {oItem.price * oItem.quantity}
                      </TableCell>
                      <TableCell className="text-left text-[16px]" colSpan={2}>
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ));
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {isLoading && (
        <Box className="mx-auto w-8">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
