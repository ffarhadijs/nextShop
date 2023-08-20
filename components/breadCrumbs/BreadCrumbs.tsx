import {
  Box,
  Breadcrumbs,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrFormNext } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

export default function BreadCrumbs() {
  const theme = useTheme();
  const router = useRouter();
  const path = router.asPath.split("/");

  const breadCrumbs = path.map((bc, i) => {
    return { label: bc, link: `${path.slice(0, i + 1).join("/")}` };
  });

  return (
    <Box
      className={`my-4 py-2 ${
        theme.palette.mode === "dark" ? "bg-[#505050] " : "bg-[#cfcfcf] "
      }`}
    >
      <Container maxWidth="lg">
        <Breadcrumbs separator={<GrFormNext className="!text-red-500" />}>
          {breadCrumbs.map((item, index) => (
            <Box key={index}>
              {index === 0 ? (
                <Link
                  href={"/"}
                  className="flex flex-row justify-start items-center"
                >
                  <FaHome className="mr-1" /> Home
                </Link>
              ) : index === breadCrumbs.length - 1 ? (
                <Typography>{item.label}</Typography>
              ) : (
                <Link href={item.link}>{item.label}</Link>
              )}
            </Box>
          ))}
        </Breadcrumbs>
      </Container>
    </Box>
  );
}
