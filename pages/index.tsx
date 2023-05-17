import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import data from "../utils/data";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Typography>Products</Typography>
      <Grid container spacing={3}>
        {data.products.map((product, index) => (
          <Grid item xs={6} sm={4} md={3} key={product.slug + index}>
            <Card>
              <Link href={`product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="auto"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Typography>{product.price} $</Typography>
                <Button size="small" color="primary">
                  {" "}
                  Add To Cart{" "}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
