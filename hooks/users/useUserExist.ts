import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useUserExist() {
  const userToken = Cookies.get("token");
  const { push } = useRouter();
  useEffect(() => {
    if (!userToken) push("/");
  }, [userToken]);
}
