import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormLabel,
  Stack,
  TextField,
  Button,
  Box,
  Select,
  FormHelperText,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { alertType } from "../../hooks/useAlert";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import {
  useAddProduct,
  useGetProduct,
  useUpdateProduct,
} from "../../hooks/products/products.hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQueryClient } from "react-query";

const schema = yup.object({
  image: yup.mixed().required("Please upload a image"),
  name: yup
    .string()
    .min(3, "It should be at least 3 characters")
    .required("You should input product name"),
  description: yup
    .string()
    .min(3, "It should be at least 5 characters")
    .required("You should input product description"),
  brand: yup
    .string()
    .min(3, "It should be at least 3 characters")
    .required("You should input product brand"),
  price: yup.string().required("You should input product price"),
  category: yup.string().required("You should input product category"),
  countInStock: yup
    .string()
    .required("You should input product count in stock"),
});
const AddOrEditProduct = ({
  product,
  setOpen,
  showAlert,
}: {
  product?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showAlert: any;
}) => {
  const editable = !!product;
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [editProduct, setEditProduct] = useState<any>();
  const queryClient = useQueryClient();
  const { isFetching: productLoading, data: productData } = useGetProduct(
    product?.id,
    {
      onSuccess: (data: any) => {
        setEditProduct(data?.data?.data);
      },
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      return productData?.data?.data;
    },
  });
  const data = {
    name: watch("name"),
    description: watch("description"),
    brand: watch("brand"),
    price: watch("price"),
    category: watch("category"),
    countInStock: watch("countInStock"),
    image: previewImage ? "/images/" + watch("image").name : editProduct?.image,
    slug: watch("name")?.replace(/\s/g, "-"),
    rating: editProduct?.rating || 0,
    numReviews: editProduct?.numReviews || 0,
  };

  const { mutate, isLoading } = useAddProduct(data, {
    onSuccess() {
      showAlert("Product has been added successfully", alertType.success);
      setOpen(false);
      queryClient.invalidateQueries();
    },
    onError(error: any) {
      showAlert(error?.response?.data?.message, alertType.error);
    },
  });
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateProduct(
    data,
    product?.id,
    {
      onSuccess: () => {
        showAlert("Product has been updated successfully", alertType.success);
        setOpen(false);
        queryClient.invalidateQueries();
      },
      onError: (error: any) => {
        showAlert(error?.response?.data?.message, alertType.error);
      },
    }
  );

  const onSubmit = async () => {
    if (editable) {
      updateMutate();
    } else {
      mutate();
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setValue("image", selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      register("image");
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"left"}
        alignItems={"start"}
        p={0}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 400,
          minWidth: 300,
          maxHeight: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"end"}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width={"100%"}
          marginX={"auto"}
        >
          <Stack direction="column" width={"100%"} rowGap={2}>
            {previewImage && (
              <Box mb={2}>
                <Image
                  src={previewImage}
                  alt="Selected"
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </Box>
            )}
            {editProduct?.image && !previewImage && (
              <Box mb={2}>
                <Image
                  src={editProduct?.image}
                  alt="Selected"
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </Box>
            )}
            {productLoading && (
              <Box className="mx-auto w-8">
                <CircularProgress />
              </Box>
            )}
            <Stack direction="column">
              <Button variant="contained" component="label">
                Upload Image
                <TextField type="file" onChange={handleFileChange} hidden />
              </Button>
              <FormHelperText className="text-[#F44336] pl-4">
                {errors.image?.message as string}
              </FormHelperText>
            </Stack>

            <Stack direction="column">
              <FormLabel>Name:</FormLabel>
              <TextField
                {...register("name")}
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message as string}
              />
            </Stack>

            <Stack direction="column">
              <FormLabel>Description:</FormLabel>
              <TextField
                {...register("description")}
                size="small"
                error={!!errors.description}
                helperText={errors.description?.message as string}
                multiline
              />
            </Stack>
            <Stack direction={"row"} spacing={"10px"}>
              <Stack direction="column" width={"50%"}>
                <FormLabel>Brand:</FormLabel>
                <TextField
                  {...register("brand")}
                  size="small"
                  error={!!errors.brand}
                  helperText={errors.brand?.message as string}
                />
              </Stack>

              <Stack direction="column" width={"50%"}>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category")}
                  size="small"
                  error={!!errors.category}
                  defaultValue={product?.category}
                >
                  <MenuItem value={"Shirts"}>Shirts</MenuItem>
                  <MenuItem value={"Pants"}>Pants</MenuItem>
                  <MenuItem value={"T-Shirt"}>T-Shirts</MenuItem>
                  <MenuItem value={"Socks"}>Socks</MenuItem>
                  <MenuItem value={"Hats"}>Hats</MenuItem>
                </Select>

                <FormHelperText className="text-[#F44336] pl-4">
                  {errors.category?.message as string}
                </FormHelperText>
              </Stack>
            </Stack>

            <Stack direction={"row"} spacing={"10px"}>
              <Stack direction="column">
                <FormLabel>Price:</FormLabel>
                <TextField
                  {...register("price")}
                  size="small"
                  error={!!errors.price}
                  helperText={errors.price?.message as string}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                />
              </Stack>
              <Stack direction="column">
                <FormLabel>Count In Stock:</FormLabel>
                <TextField
                  {...register("countInStock")}
                  size="small"
                  type="number"
                  error={!!errors.countInStock}
                  helperText={errors.countInStock?.message as string}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          <LoadingButton
            type="submit"
            variant="contained"
            className="bg-[#2196f3]"
            sx={{ marginTop: "30px" }}
            loading={isLoading || isUpdateLoading}
          >
            submit
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
};

export default AddOrEditProduct;
