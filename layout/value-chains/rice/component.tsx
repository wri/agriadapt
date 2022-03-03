import Layout from "layout/layout/layout-app";
import { ValueChainPageProps } from "types/value-chain";

const LayoutRice = ({ cid }: ValueChainPageProps) => {
    return (
        <Layout>
            Rice: {cid}
        </Layout>
    )
}

export default LayoutRice;