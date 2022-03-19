import LayoutRice from "layout/value-chains/rice";
import { GetStaticProps, GetStaticPaths } from "next";
import { fetchWidget } from "services/widget";
import { ValueChainPageProps } from "types/value-chain";
import { APIWidgetSpec } from "types/widget";

const RicePage = (props: ValueChainPageProps) => {
  return <LayoutRice {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cid = params?.cid;
  const widgetIds = [
    "20096f90-59c5-483c-9bfa-4d998ec4ce15",
    "a009abe8-96da-4665-9457-8b1941ba0e25",
  ];
  const widgets: Array<APIWidgetSpec> = await Promise.allSettled(
    widgetIds.map((id) => fetchWidget(id))
  ).then((results) =>
    results.map((r) => {
      if (r.status === "fulfilled") return r.value;
    })
  );

  return {
    props: {
      cid: cid,
      widgets,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { cid: "india" } }],
    fallback: false,
  };
};

export default RicePage;
