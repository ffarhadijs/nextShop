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
  Modal,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import {
  useAddProduct,
  useUpdateProduct,
} from "../../../hooks/products/products.hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { rowProductType } from "../../../types/rowProduct.type";

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
  open,
}: {
  product?: rowProductType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const editable = !!product;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [eProduct, setEProduct] = useState<rowProductType | null>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const data = {
    name: watch("name"),
    description: watch("description"),
    brand: watch("brand"),
    price: watch("price"),
    category: watch("category"),
    countInStock: watch("countInStock"),
    image: previewImage ? "/images/" + watch("image").name : product?.image,
    slug: watch("name")?.replace(/\s/g, "-"),
    rating: product?.rating || 0,
    numReviews: product?.numReviews || 0,
  };

  const { mutate, isLoading } = useAddProduct(data, {
    onSuccess() {
      toast.success("Product has been added successfully");
      setOpen(false);
      queryClient.invalidateQueries();
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateProduct(
    data,
    product?.id!,
    {
      onSuccess: () => {
        toast.success("Product has been updated successfully");
        setOpen(false);
        queryClient.invalidateQueries();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  const onSubmit = async () => {
    if (editable) {
      updateMutate();
    } else {
      mutate();
    }
    setEProduct(null);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setValue("image", selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      register("image");
    }
  };
  useEffect(() => {
    setEProduct(product!);
    setValue("name", product?.name);
    setValue("description", product?.description);
    setValue("brand", product?.brand);
    setValue("price", product?.price);
    setValue("category", product?.category);
    setValue("countInStock", product?.countInStock);
    setValue("image", product?.image);
  }, [product]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setEProduct(null);
      }}
    >
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
          minWidth: 360,
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
            {product?.image && !previewImage && (
              <Box mb={2}>
                <Image
                  src={product?.image}
                  alt="Selected"
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </Box>
            )}
            <Stack direction="column">
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  hidden
                />
              </Button>
              <FormHelperText className="text-[#F44336] pl-4">
                {errors.image?.message as string}
              </FormHelperText>
            </Stack>

            <Stack direction="column">
              <FormLabel className="text-[14px] sm:text-[16px]">
                Name:
              </FormLabel>
              <TextField
                {...register("name")}
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message as string}
                defaultValue={eProduct?.name}
              />
            </Stack>

            <Stack direction="column">
              <FormLabel className="text-[14px] sm:text-[16px]">
                Description:
              </FormLabel>
              <TextField
                {...register("description")}
                size="small"
                error={!!errors.description}
                helperText={errors.description?.message as string}
                defaultValue={eProduct?.description}
                multiline
              />
            </Stack>
            <Stack direction={"row"} spacing={"10px"}>
              <Stack direction="column" width={"50%"}>
                <FormLabel className="text-[14px] sm:text-[16px]">
                  Brand:
                </FormLabel>
                <TextField
                  {...register("brand")}
                  size="small"
                  error={!!errors.brand}
                  helperText={errors.brand?.message as string}
                  defaultValue={eProduct?.brand}
                />
              </Stack>

              <Stack direction="column" width={"50%"}>
                <FormLabel className="text-[14px] sm:text-[16px]">
                  Category
                </FormLabel>
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
                <FormLabel className="text-[14px] sm:text-[16px]">
                  Price:
                </FormLabel>
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
                  defaultValue={eProduct?.price}
                />
              </Stack>
              <Stack direction="column">
                <FormLabel className="text-[14px] sm:text-[16px]">
                  Count In Stock:
                </FormLabel>
                <TextField
                  {...register("countInStock")}
                  size="small"
                  type="number"
                  error={!!errors.countInStock}
                  helperText={errors.countInStock?.message as string}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  defaultValue={eProduct?.countInStock}
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
    </Modal>
  );
};

export default AddOrEditProduct;
