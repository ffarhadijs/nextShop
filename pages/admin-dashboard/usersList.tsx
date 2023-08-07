import {
  Box,
  Button,
  Card,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import AdminDashboard from ".";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { v4 } from "uuid";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<any>();
  const getUsersList = async () => {
    const response = await fetch("/api/user/usersList");
    const data = await response.json();
    setUsers(data.data);
  };

  const deleteHandler = useCallback(
    (params: any) => () => {
      setOpenDeleteModal(true);
      setDeleteUserId(params.row.id);
    },
    []
  );
  const confirmDeleteHandler = async () => {
    const response = await fetch(`/api/user/deleteUser/${deleteUserId}`, {
      method: "DELETE",
    });
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const columns = [
    {
      field: "name",
      align: "left",
      headerAlign: "left",
      headerName: "Full Name",
      minWidth: 100,
      width: 200,
      renderCell: (params: any) => {
        return (
          <Typography>
            {params.row.name} {params.row.lastName}
          </Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      align: "left",
      headerAlign: "left",
      minWidth: 100,
      width: 200,
    },
    {
      field: "isAdmin",
      align: "left",
      headerAlign: "left",
      headerName: "Admin",
      minWidth: 60,
      renderCell: (params: any) => {
        return (
          <Box>
            {params.row.isAdmin === false ? <CloseIcon /> : <CheckIcon />}
          </Box>
        );
      },
    },
    {
      field: "address",
      align: "left",
      headerAlign: "left",
      headerName: "Address",
      minWidth: 100,
      width: 300,
      renderCell: (params: any) => {
        return (
          <Typography>
            {params.row.country} {params.row.city} {params.row.address}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params: any) => [
        <GridActionsCellItem
          key={2}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteHandler(params)}
        />,
      ],
    },
  ];

  const rows = users?.map((user: any) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
      country: user.country,
      city: user.city,
      lastName: user.lastName,
    };
  });

  return (
    <AdminDashboard>
      <Paper
        style={{ maxWidth: "100%", width: "max-content", marginInline: "auto" }}
      >
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
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography fontSize={"16px"} fontWeight={"700"} mb={"10px"}>
              Delete User
            </Typography>
            <Typography>Are you sure to delete this user?</Typography>
            <Stack
              direction="row"
              justifyContent={"end"}
              mt={"20px"}
              spacing={"10px"}
            >
              <Button
                onClick={() => setOpenDeleteModal(false)}
                className="bg-[#2196f3]"
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteHandler}
                className="bg-[#f44336]"
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Paper>
    </AdminDashboard>
  );
}
