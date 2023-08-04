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
import { useEffect, useState } from "react";
import AdminDashboard from ".";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const getUsersList = async () => {
    const response = await fetch("/api/user/usersList");
    const data = await response.json();
    setUsers(data.data);
  };
  console.log(users, "users");

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <AdminDashboard>
      <Paper style={{ maxWidth: "800px", marginInline: "auto" }}>
        {" "}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={4}>
                  Name
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Last Name
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Email
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Country
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  city
                </TableCell>
                <TableCell align="left" colSpan={2}>
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((item: any) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" colSpan={4}>
                    {item.name}
                  </TableCell>
                  <TableCell align="left" colSpan={2}>
                    {item.lastName}
                  </TableCell>
                  <TableCell align="left" colSpan={2}>
                    {item.email}
                  </TableCell>
                  <TableCell align="left" colSpan={2}>
                    {item.country}
                  </TableCell>
                  <TableCell align="left" colSpan={2}>
                    {item.city}
                  </TableCell>
                  <TableCell align="left" colSpan={2}>
                    {item.address}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </AdminDashboard>
  );
}
