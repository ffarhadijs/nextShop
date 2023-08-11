import {
  Box,
  Modal,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import AdminDashboard from ".";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { v4 } from "uuid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUser, useGetUsersList } from "../../hooks/users/user.hooks";
import DeleteConfirmation from "../../components/modals/deleteConfirmation/DeleteConfirmation";
import toast from "react-hot-toast";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<any>();

  const { isLoading } = useGetUsersList({
    onSuccess: (data: any) => {
      setUsers(data?.data.data);
    },
  });

  const deleteHandler = useCallback(
    (params: any) => () => {
      setOpenDeleteModal(true);
      setDeleteUserId(params.row.id);
    },
    []
  );
  const { mutate, isLoading: deleteLoading } = useDeleteUser(deleteUserId, {
    onSuccess: () => {
      toast.success("User has been deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const confirmDeleteHandler = async () => {
    mutate();
  };

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
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Typography>
            {params.row.country}, {params.row.city}, {params.row.address}
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
          hidden={params.row.isAdmin === true}
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
      {isLoading ? (
        <Box className="w-8 mx-auto">
          <CircularProgress />
        </Box>
      ) : (
        <Paper
          style={{
            maxWidth: "100%",
            width: "max-content",
            marginInline: "auto",
          }}
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
        </Paper>
      )}
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteConfirmation
          title="Delete User"
          text="Are you sure to delete this user?"
          confirmDeleteHandler={confirmDeleteHandler}
          isLoading={deleteLoading}
          setOpen={setOpenDeleteModal}
        />
      </Modal>
    </AdminDashboard>
  );
}
