import { Container, Typography, Button, Grid, TextField, useTheme } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "next/link";

const quickLinks = [
  { link: "About Us" },
  { link: "Shop Now!" },
  { link: "Womans" },
  { link: "FAQ" },
  { link: "Contact Us" },
  { link: "Customer Services" },
];

const customerSupport = [
  { link: "My Account" },
  { link: "Checkout" },
  { link: "Cart" },
  { link: "FAQ" },
  { link: "Order Tracking" },
  { link: "Help & Support" },
];

export default function Footer() {
  const theme = useTheme()
  return (
    <footer className={`py-14 ${
      theme.palette.mode === "dark" ? "bg-[#212121]" : "bg-[#e0e0e0]"
    }`}>
      <Container
        maxWidth="lg"
        
      >
        <Grid container spacing={"20px"}>
          <Grid item xs={3} className="flex flex-col space-y-3">
            <Typography className="font-[600] text-[20px] mb-4">
              About The Store
            </Typography>
            <Typography className="text-[14px] ">
              One of the most popular on the web is shopping.
            </Typography>
            <Typography className="text-[14px] w-fit flex flex-row items-start">
              <LocationOnOutlinedIcon className="text-[18px] mr-2" />
              <Link
                href={"#"}
                className="hover:text-[#2196f3] transition-colors duration-500"
              >
                Wonder Street, USA, New York
              </Link>
            </Typography>
            <Typography className="text-[14px] flex flex-row items-start">
              <PhoneInTalkOutlinedIcon className="text-[18px] mr-2" />
              <Link
                href={"tel:+01 321 654 214"}
                className="hover:text-[#2196f3] transition-colors duration-500"
              >
                +01 321 654 214
              </Link>
            </Typography>
            <Typography className="text-[14px] flex flex-row items-start">
              <EmailOutlinedIcon className="text-[18px] mr-2" />
              <Link
                href={"mailto:rb0214192@gmail.com"}
                className="hover:text-[#2196f3] transition-colors duration-500"
              >
                rb0214192@gmail.com
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={3} className="flex flex-col space-y-3">
            <Typography className="font-[600] text-[20px] mb-4">
              Quick Links
            </Typography>
            {quickLinks.map((item: { link: string }, index: number) => (
              <Link
                key={index + item.link}
                href={"#"}
                className="text-[14px] hover:text-[#2196f3] transition-colors duration-500 w-fit "
              >
                {item.link}
              </Link>
            ))}
          </Grid>
          <Grid item xs={3} className="flex flex-col space-y-3">
            <Typography className="font-[600] text-[20px] mb-4">
              Customer Support
            </Typography>
            {customerSupport.map((item: { link: string }, index: number) => (
              <Link
                key={index + item.link}
                href={"#"}
                className="text-[14px] hover:text-[#2196f3] transition-colors duration-500 w-fit"
              >
                {item.link}
              </Link>
            ))}
          </Grid>
          <Grid item xs={3} className="flex flex-col space-y-3">
            <Typography className="font-[600] text-[20px] mb-4">
              Newsletter
            </Typography>
            <Typography className="text-[14px]">
              To get the latest news and latest updates from us.
            </Typography>
            <TextField label="Email Address" variant="outlined" size="small" />
            <Button
              variant="contained"
              color="primary"
              className="bg-[#2196f3] "
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
