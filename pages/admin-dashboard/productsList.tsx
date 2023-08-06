import { useCallback, useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import Image from "next/image";
import AdminDashboard from ".";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { v4 } from "uuid";
import { Modal, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddOrEditProduct from "../../components/addOrEditProduct/AddOrEditProduct";

function EditToolbar(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <GridToolbarContainer>
      <Button
        variant="contained"
        className="bg-[#2196f3] "
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add Product
      </Button>
      <Modal open={open} onClose={handleClose}>
        <AddOrEditProduct />
      </Modal>
    </GridToolbarContainer>
  );
}

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>();
  const getOrdersList = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data.data);
  };

  const editHandler = useCallback(
    (params: any) => () => {
      setOpenEditModal(true);
      setEditProduct(params.row);
    },
    []
  );

  const deleteHandler = useCallback(
    (id: any) => () => {
      setOpenDeleteModal(true);
    },
    []
  );

  useEffect(() => {
    getOrdersList();
  }, []);

  const rows = products?.map((product: any) => {
    return {
      id: product._id,
      image: product.image,
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
    };
  });

  const columns = [
    {
      field: "image",
      headerName: "Image",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        return (
          <Image
            width={100}
            height={100}
            alt={params.value.image}
            src={params.value}
            className="w-16 h-auto"
          />
        );
      },
      sortable: false,
      width: 100,
      type: "actions",
    },
    {
      field: "name",
      align: "center",
      headerAlign: "center",
      headerName: "Name",
      minWidth: 100,
    },
    {
      field: "brand",
      headerName: "Brand",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "price",
      align: "center",
      headerAlign: "center",
      headerName: "Price",
      type: "number",
      minWidth: 80,
      renderCell: (params: any) => {
        return <Typography>$ {params.value}</Typography>;
      },
    },
    {
      field: "category",
      align: "center",
      headerAlign: "center",
      headerName: "Category",
      minWidth: 100,
    },
    {
      field: "countInStock",
      align: "center",
      headerAlign: "center",
      headerName: "Count In Stock",
      minWidth: 80,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params: any) => [
        <GridActionsCellItem
          key={1}
          icon={<EditIcon />}
          label="Edit"
          onClick={editHandler(params)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteHandler(params)}
          showInMenu
        />,
      ],
    },
  ];
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
          slots={{
            toolbar: EditToolbar,
          }}
          editMode="row"
        />
      </Paper>
      <Modal
        open={openEditModal || openDeleteModal}
        onClose={
          openEditModal
            ? () => setOpenEditModal(false)
            : () => setOpenDeleteModal(false)
        }
      >
        {openEditModal ? (
          <AddOrEditProduct product={editProduct} />
        ) : (
          <Box
            sx={{
              position: "absolute" as "absolute",
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
            asdsssssssss
          </Box>
        )}
      </Modal>
    </AdminDashboard>
  );
}
