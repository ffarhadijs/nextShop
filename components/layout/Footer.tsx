import {
  Container,
  Button,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";

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
  const theme = useTheme();
  return (
    <footer
      className={`py-14 ${
        theme.palette.mode === "dark" ? "bg-[#212121]" : "bg-[#e0e0e0]"
      }`}
    >
      <Container maxWidth="lg">
        <Grid container spacing={"20px"}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p className="font-[600] text-[20px] mb-4">About The Store</p>
            <p className="text-[14px] mb-2 ">
              One of the most popular on the web is shopping.
            </p>
            <p className="text-[14px] w-fit flex flex-row items-start mb-2">
              <IoLocationOutline className="text-[18px] mr-2" />
              <Link
                href={"#"}
                className="hover:text-[#2196f3] transition-colors duration-500"
              >
                Wonder Street, USA, New York
              </Link>
            </p>
            <p className="text-[14px] flex flex-row items-start mb-2">
              <BiSolidPhoneCall className="text-[18px] mr-2" />
              <Link
                href={"tel:+01 321 654 214"}
                className="hover:text-[#2196f3] transition-colors duration-500"
              >
                +01 321 654 214
              </Link>
            </p>
            <p className="text-[14px] flex flex-row items-start mb-2">
              <AiOutlineMail className="text-[18px] mr-2" />
              <Link
                href={"mailto:rb0214192@gmail.com"}
                className="hover:text-[#2196f3] transition-colors duration-500"
              >
                rb0214192@gmail.com
              </Link>
            </p>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={3}
            style={{ display: "flex", flexDirection: "column" }}
            
          >
            <p className="font-[600] text-[20px] mb-4">Quick Links</p>
            {quickLinks.map((item: { link: string }, index: number) => (
              <Link
                key={index + item.link}
                href={"#"}
                className="text-[14px] hover:text-[#2196f3] transition-colors duration-500 w-fit mb-2"
              >
                {item.link}
              </Link>
            ))}
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={3}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p className="font-[600] text-[20px] mb-4">Customer Support</p>
            {customerSupport.map((item: { link: string }, index: number) => (
              <Link
                key={index + item.link}
                href={"#"}
                className="text-[14px] hover:text-[#2196f3] transition-colors duration-500 w-fit mb-2"
              >
                {item.link}
              </Link>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p className="font-[600] text-[20px] mb-4">Newsletter</p>
            <p className="text-[14px] mb-2">
              To get the latest news and latest updates from us.
            </p>
            <TextField label="Email Address" variant="outlined" size="small" />
            <Button
              variant="contained"
              color="primary"
              sx={{marginTop:"8px"}}
              className="bg-[#2196f3]"
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
