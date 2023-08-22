import {
  AppBar,
  Badge,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Container,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import {
  MdAccountCircle,
  MdOutlineListAlt,
  MdOutlineLogout,
  MdOutlineDashboard,
  MdFavoriteBorder,
} from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { useGetUser } from "../../hooks/users/user.hooks";
import toast from "react-hot-toast";

export default function Header({
  colorMode,
}: {
  colorMode: {
    toggleColorMode: () => void;
  };
}) {
  const theme = useTheme();
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { state } = useContext(Store);
  const { isSuccess, data: user, refetch } = useGetUser();

  const logoutHandler = async () => {
    const response = await fetch("/api/auth/logout");
    const data = await response.json();
    if (response.ok) {
      toast.success("User signed out successfully");
      push("/login");
      refetch();
    } else {
      toast.error(data.message);
    }
    setAnchorEl(null);
  };

  const dashboardHandler = () => {
    push("/admin-dashboard");
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const orderHandler = () => {
    push("/orders-list");
    setAnchorEl(null);
  };

  const profileHandler = () => {
    push("/profile");
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      className={` ${
        theme.palette.mode === "dark"
          ? "bg-[#212121] text-[#eeeeee]"
          : "bg-[#e0e0e0] text-[#212121]"
      }`}
    >
      <Container maxWidth="lg">
        <Toolbar className="!px-0">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Link href="/">
              <Typography fontWeight={700} fontSize={"20px"}>
                Next Shop
              </Typography>
            </Link>

            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
                className="hover:bg-inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <FaSun size={24} />
                ) : (
                  <BsFillMoonStarsFill size={24} />
                )}
              </IconButton>
              <Link href="/cart">
                <Badge
                  badgeContent={state?.cart.cartItems.length}
                  color="primary"
                >
                  <IoBagHandleSharp size={24} />
                </Badge>
              </Link>
              <Link href={"/favorite"}>
                <Badge
                  badgeContent={state?.wishList.withListItems.length}
                  color="primary"
                >
                  <MdFavoriteBorder size={24} />
                </Badge>
              </Link>

              {isSuccess ? (
                <>
                  <Button
                    onClick={handleClick}
                    variant="text"
                    className={` font-[700] ${
                      theme.palette.mode === "dark"
                        ? " text-[#eeeeee]"
                        : " text-[#212121]"
                    } hover:bg-inherit`}
                  >
                    {user?.data?.data.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={profileHandler}>
                      <ListItemIcon>
                        <MdAccountCircle fontSize={20} />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    {user?.data.data.isAdmin ? (
                      <MenuItem onClick={dashboardHandler}>
                        <ListItemIcon>
                          <MdOutlineDashboard fontSize={20} />
                        </ListItemIcon>
                        <ListItemText> Admin Dashboard </ListItemText>
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={orderHandler}>
                        <ListItemIcon>
                          <MdOutlineListAlt fontSize={20} />
                        </ListItemIcon>
                        <ListItemText> Orders List</ListItemText>
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutHandler}>
                      <ListItemIcon>
                        <MdOutlineLogout fontSize={20} />
                      </ListItemIcon>
                      <ListItemText> Logout </ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login">
                  <Typography> Login </Typography>
                </Link>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
