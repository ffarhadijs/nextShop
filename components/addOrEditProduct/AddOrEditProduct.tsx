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
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "../../hooks/useAlert";
import { useEffect, useState } from "react";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller } from "react-hook-form";

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
const AddOrEditProduct = ({ product }: { product?: any }) => {
  const [showAlert, Alert] = useAlert();
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [editProduct, setEditProduct] = useState<any>();

  const getProduct = async () => {
    const response = await fetch(`/api/products/getProduct/${product?.id}`);
    const data = await response.json();
    setEditProduct(data.data);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const resp = await fetch(`/api/products/getProduct/${product?.id}`);
      const data = await resp.json();
      return data.data;
    },
  });

  const onSubmit = async (formData: any) => {
    const data = {
      ...formData,
      image: "/images/" + formData.image.name,
      slug: formData.name.replace(/\s/g, "-"),
      rating: 0,
      numReviews: 0,
    };

    const response = await fetch("/api/products/addProduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    // const data = await response.json();

    // if (response.ok) {
    //   showAlert("Profile Info has been updated successfully", "success");
    // } else {
    //   showAlert(data.message, "error");
    // }
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
    getProduct();
  }, []);


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
            {editProduct?.image && (
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

          <Button
            type="submit"
            variant="contained"
            className="bg-[#2196f3]"
            sx={{ marginTop: "30px" }}
          >
            submit
          </Button>
        </Stack>
      </Stack>

      <Alert />
    </>
  );
};

export default AddOrEditProduct;
