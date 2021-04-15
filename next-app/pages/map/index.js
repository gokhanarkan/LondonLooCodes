import dynamic from "next/dynamic";
import Layout from "../../components/Layout";

export const getAllCodes = async () => {
  return await fetch(
    "https://huookxl2na.execute-api.eu-west-2.amazonaws.com/geojson"
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const codes = await getAllCodes();
  return {
    props: {
      positions: codes.features,
    },
  };
}

const Map = ({ positions }) => {
  const MapWithNoSSR = dynamic(() => import("../../components/MapView"), {
    ssr: false,
  });
  return (
    <Layout>
      <MapWithNoSSR positions={positions} />
    </Layout>
  );
};

export default Map;
