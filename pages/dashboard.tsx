import { verifyToken } from "../utils/verifyToken";
import Layout from "../components/layout/Layout";

const dashboard = ({ result }: { result: any }) => {
  return <Layout>dashboard</Layout>;
};

export default dashboard;

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey!);

  if (!result) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  return { props: { result } };
}
