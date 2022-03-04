import LayoutRice from "layout/value-chains/rice";
import { GetStaticProps, GetStaticPaths } from "next";
import { fetchWidget } from "services/widget";
import { ValueChainPageProps } from "types/value-chain";
import { APIWidgetSpec } from "types/widget";

const RicePage = (props: ValueChainPageProps) => {
    return (
        <LayoutRice {...props} />
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const cid = params?.cid;
    const widget: APIWidgetSpec = await fetchWidget('20096f90-59c5-483c-9bfa-4d998ec4ce15');

    return {
        props: {
            cid: cid,
            widget
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { cid: 'india' } }
        ],
        fallback: false
    }
}

export default RicePage;