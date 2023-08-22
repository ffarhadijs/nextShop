import { Box, Paper, CircularProgress, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import AdminDashboard from ".";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { v4 } from "uuid";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteUser, useGetUsersList } from "../../hooks/users/user.hooks";
import DeleteConfirmation from "../../components/modals/deleteConfirmation/DeleteConfirmation";
import toast from "react-hot-toast";
import { productRowType } from "../../types/row.type";
import { useUserExist } from "../../hooks/users/useUserExist";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string>();
  const userToken = useUserExist();

  const { isLoading } = useGetUsersList({
    onSuccess: (data: any) => {
      setUsers(data?.data.data);
    },
  });

  const deleteHandler = useCallback(
    (params: GridRowParams<any>) => () => {
      setOpenDeleteModal(true);
      setDeleteUserId(params.row.id);
    },
    []
  );
  const { mutate, isLoading: deleteLoading } = useDeleteUser(deleteUserId!, {
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

  const columns: GridColDef[] = [
    {
      field: "name",
      align: "left",
      headerAlign: "left",
      headerName: "Full Name",
      minWidth: 100,
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
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
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.isAdmin === false ? (
              <AiOutlineClose className="text-[20px]" />
            ) : (
              <AiOutlineCheck className="text-[20px]" />
            )}
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
      renderCell: (params: GridRenderCellParams) => {
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
      getActions: (params) => [
        <GridActionsCellItem
          key={2}
          icon={<MdDeleteOutline className="text-[20px]" color="red" />}
          label="Delete"
          onClick={deleteHandler(params)}
          hidden={params.row.isAdmin === true}
        />,
      ],
    },
  ];

  const rows: productRowType[] = users?.map((user: productRowType) => {
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

      <DeleteConfirmation
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete User"
        text="Are you sure to delete this user?"
        confirmDeleteHandler={confirmDeleteHandler}
        isLoading={deleteLoading}
      />
    </AdminDashboard>
  );
}

UsersList.title = "Users List Page|Shop Next";
