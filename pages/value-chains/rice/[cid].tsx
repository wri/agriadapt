import LayoutRice from "layout/value-chains/rice";
import { GetStaticProps, GetStaticPaths } from "next";
import { ValueChainPageProps } from "types/value-chain";

const RicePage = (props: ValueChainPageProps) => {
    return (
        <LayoutRice {...props} />
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const cid = params?.cid;

    return {
        props: {
            cid: cid
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