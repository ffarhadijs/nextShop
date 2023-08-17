import { useCallback, useState } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import AdminDashboard from ".";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { v4 } from "uuid";
import { Modal, Button } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import AddOrEditProduct from "../../components/addOrEditProduct/AddOrEditProduct";
import {
  useDeleteProduct,
  useGetProductsList,
} from "../../hooks/products/products.hooks";
import { useQueryClient } from "react-query";
import DeleteConfirmation from "../../components/modals/deleteConfirmation/DeleteConfirmation";
import toast from "react-hot-toast";
import { ProductsType } from "../../types/products.type";
import { ProductType } from "../../types/product.type";
import { rowProductType } from "../../types/rowProduct.type";

function EditToolbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <GridToolbarContainer>
      <Button variant="outlined" onClick={handleOpen}>
        Add Product
      </Button>
      <Modal open={open} onClose={handleClose}>
        <AddOrEditProduct setOpen={setOpen} />
      </Modal>
    </GridToolbarContainer>
  );
}

export default function ProductsList() {
  const queryClient = useQueryClient();
  const [products, setProducts] = useState<ProductsType>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<rowProductType>();
  const [deleteProduct, setDeleteProduct] = useState<rowProductType>();

  const { isLoading: getProductsLoading } = useGetProductsList({
    onSuccess: (data: any) => {
      setProducts(data?.data.data);
    },
  });

  const editHandler = useCallback(
    (params: GridRowParams<any>) => () => {
      setOpenEditModal(true);
      setEditProduct(params.row);
    },
    []
  );

  const { mutate, isLoading } = useDeleteProduct(deleteProduct?.id!, {
    onSuccess: () => {
      toast.success("Product has been deleted successfully");
      setOpenDeleteModal(false);
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const deleteHandler = useCallback(
    (params: GridRowParams<any>) => () => {
      setOpenDeleteModal(true);
      setDeleteProduct(params.row);
    },
    []
  );

  const confirmDeleteHandler = async () => {
    mutate();
  };

  const rows: rowProductType[] = products?.map((product: ProductType) => {
    return {
      id: product._id,
      image: product.image,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
    };
  });

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
            alt={params.value}
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
      renderCell: (params: GridRenderCellParams) => {
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
      getActions: (params) => [
        <GridActionsCellItem
          key={1}
          icon={<MdEdit fontSize={18}/>}
          label="Edit"
          onClick={editHandler(params)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          icon={<MdDeleteOutline fontSize={18}/>}
          label="Delete"
          onClick={deleteHandler(params)}
          showInMenu
        />,
      ],
    },
  ];
  return (
    <AdminDashboard>
      <Modal
        open={openEditModal || openDeleteModal}
        onClose={
          openEditModal
            ? () => setOpenEditModal(false)
            : () => setOpenDeleteModal(false)
        }
      >
        {openEditModal ? (
          <AddOrEditProduct product={editProduct!} setOpen={setOpenEditModal} />
        ) : (
          <DeleteConfirmation
            title={"Delete Product"}
            text={"Are you sure to delete this product?"}
            setOpen={setOpenDeleteModal}
            confirmDeleteHandler={confirmDeleteHandler}
            isLoading={isLoading}
          />
        )}
      </Modal>
      {getProductsLoading ? (
        <Box className="mx-auto w-8">
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
            slots={{
              toolbar: EditToolbar,
            }}
            editMode="row"
          />
        </Paper>
      )}
    </AdminDashboard>
  );
}
