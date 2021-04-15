import Layout from "../components/Layout";
import Directory from "../components/Directory";

export const getAllCodes = async () => {
  return await fetch(
    "https://huookxl2na.execute-api.eu-west-2.amazonaws.com/gokhan"
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const codes = await getAllCodes();
  return {
    props: {
      codes,
    },
  };
}

const Home = ({ codes }) => {
  return (
    <Layout>
      <Directory codes={codes} />
    </Layout>
  );
};

export default Home;
