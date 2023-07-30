import { useEffect, useState } from "react";
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

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const getOrdersList = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data.data);
  };
  console.log(products, "products");

  useEffect(() => {
    getOrdersList();
  }, []);
  return (
    <Paper style={{ maxWidth: "800px", marginInline: "auto" }}>
      {" "}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2}>
                Images
              </TableCell>
              <TableCell align="left" colSpan={4}>
                Name
              </TableCell>
              <TableCell align="left" colSpan={2}>
                Brand
              </TableCell>
              <TableCell align="left" colSpan={2}>
                Price
              </TableCell>
              <TableCell align="left" colSpan={2}>
                Category
              </TableCell>
              <TableCell align="left" colSpan={2}>
                Count In Stock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item: any) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" colSpan={2}>
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.name}
                  />
                </TableCell>
                <TableCell align="left" colSpan={4}>
                  {item.name}
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  {item.brand}
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  {item.price}
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  {item.category}
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  {item.countInStock}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
